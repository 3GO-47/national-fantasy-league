/* ═══════════════════════════════════════════════════════════════
   NATIONAL FANTASY LEAGUE — CLUBHOUSE ROOM
   The authoritative room: presence, chat, rent money, the book,
   and one shared blackjack shoe. Runtime-agnostic — the Cloudflare
   Worker and the Node server both drive this same class.
   ═══════════════════════════════════════════════════════════════ */

export const TEAMS = ["Kill Bill","DoughBoy$","Team Martens","Tig Bits","Suck my Footballz",
  "Django Achaned","Sandusky Shower Buddy","Flacc Shots","Silence of the Lamb",
  "Are you winning son?","Blitz","My Kupp Hurts"];
const START_RENT = 500;
const DECKS = 6;
const now = () => Date.now();
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));

export class Room {
  constructor(persisted){
    const p = persisted || {};
    this.clients = new Map();
    this.rent    = p.rent    || Object.fromEntries(TEAMS.map(t=>[t,START_RENT]));
    this.ledger  = p.ledger  || {house:0, handle:0, paid:0, tx:[]};
    this.bets    = p.bets    || [];
    this.results = p.results || {};
    this.chat    = p.chat    || [];
    this.bj      = p.bj      || {shoe:[],run:0,seen:0,dealer:[],seats:{},phase:"idle",turn:null};
    if(!this.bj.shoe || this.bj.shoe.length < 60) this.shuffle();
    this.seq = p.seq || 1;
    this.dirty = false;
  }
  persist(){ this.dirty=false;
    return {rent:this.rent, ledger:this.ledger, bets:this.bets.slice(0,300),
            results:this.results, chat:this.chat.slice(-120), bj:this.bj, seq:this.seq}; }
  snapshot(){
    return {rent:this.rent, ledger:this.ledger, bets:this.bets.slice(0,200),
            results:this.results, chat:this.chat.slice(-60), bj:this.pubBJ()}; }

  /* ── plumbing ── */
  add(id, send, meta){
    for(const [k,c] of this.clients)                       // one seat per franchise
      if(c.meta.team === meta.team){ try{ c.send(JSON.stringify({t:"bumped"})); }catch(e){} this.drop(k); }
    this.clients.set(id, {send, meta});
    send(JSON.stringify({t:"welcome", id, you:meta,
      players:[...this.clients].filter(([k])=>k!==id).map(([k,c])=>({id:k, meta:c.meta})),
      ...this.snapshot()}));
    this.bcast({t:"join", id, meta}, id);
    this.log(`${meta.owner||meta.team} walked in.`, "sys");
  }
  drop(id){
    const c = this.clients.get(id); if(!c) return;
    this.clients.delete(id);
    if(this.bj.seats[id]){ delete this.bj.seats[id]; this.bjMaybeResolve(); this.pushBJ(); }
    this.bcast({t:"leave", id});
    this.log(`${c.meta.owner||c.meta.team} stepped out.`, "sys");
  }
  bcast(msg, except){
    const s = JSON.stringify(msg);
    for(const [id,c] of this.clients) if(id!==except){ try{ c.send(s); }catch(e){} }
  }
  to(id,msg){ const c=this.clients.get(id); if(c){ try{ c.send(JSON.stringify(msg)); }catch(e){} } }
  log(text, kind){
    const line = {t:now(), x:text, k:kind||"sys"};
    this.chat.push(line); if(this.chat.length>240) this.chat = this.chat.slice(-240);
    this.dirty=true; this.bcast({t:"log", line});
  }
  tx(amt, who, why){
    this.ledger.house += amt;
    if(amt < 0) this.ledger.paid += -amt;
    this.ledger.tx.push({t:now(), a:amt, w:who, y:why});
    if(this.ledger.tx.length > 300) this.ledger.tx = this.ledger.tx.slice(-300);
    this.dirty=true; this.bcast({t:"ledger", ledger:this.ledger});
  }
  setRent(team, v){
    if(!(team in this.rent)) return;
    const before = this.rent[team];
    this.rent[team] = Math.max(0, Math.round(v));
    this.dirty=true; this.bcast({t:"rent", rent:this.rent});
    if(before > 0 && this.rent[team] === 0) this.log(`💸 ${team} is out of rent money.`, "bust");
  }

  /* ── router ── */
  handle(id, msg){
    const c = this.clients.get(id); if(!c) return;
    switch(msg.t){
      case "pos":
        Object.assign(c.meta, {x:msg.x, y:msg.y, vx:msg.vx, vy:msg.vy, sit:!!msg.sit, mode:msg.mode||"world"});
        this.bcast({t:"pos", id, x:msg.x, y:msg.y, vx:msg.vx, vy:msg.vy, sit:c.meta.sit, mode:c.meta.mode}, id);
        break;
      case "say": {
        const text = String(msg.x||"").slice(0,140); if(!text) return;
        const line = {t:now(), x:text, k:"chat", who:c.meta.owner||c.meta.team, team:c.meta.team};
        this.chat.push(line); if(this.chat.length>240) this.chat=this.chat.slice(-240);
        this.dirty=true; this.bcast({t:"say", id, x:text, line});
        break; }
      case "emote": this.bcast({t:"emote", id, e:String(msg.e||"").slice(0,12)}, id); break;
      /* the gavel is the commissioner's alone */
      case "seats":
        if(!c.meta.commish) return this.to(id,{t:"err",x:"Only the commissioner calls the table."});
        this.bcast({t:"seats", on:!!msg.on, by:c.meta.owner||c.meta.team}); break;
      case "fit":   Object.assign(c.meta, {fit:msg.fit}); this.bcast({t:"fit", id, fit:msg.fit}, id); break;

      /* ── the book ── */
      case "bet": {
        const stake = clamp(Math.round(msg.stk||0), 25, 1000);
        const team  = c.meta.team;
        if((this.rent[team]||0) < stake) return this.to(id,{t:"err",x:"Not enough rent money."});
        const dec = clamp(+msg.dec || 2, 1.05, 60);
        const bet = {id:"B"+String(this.seq++).padStart(4,"0"), human:1, by:team, owner:c.meta.owner||team,
          mk:msg.mk, mkt:msg.mkt, sel:msg.sel, dec:+dec.toFixed(2), am:msg.am,
          stk:stake, pay:Math.round(stake*dec), st:"LIVE", at:now()};
        this.setRent(team, this.rent[team]-stake);
        this.bets.unshift(bet); if(this.bets.length>400) this.bets.length=400;
        this.ledger.handle += stake;
        this.tx(stake, bet.owner, `ticket ${bet.id} · ${bet.mkt}`);
        this.bcast({t:"bet", bet});
        this.log(`🎟 ${bet.owner} takes ${bet.sel} at ${bet.am} for $${stake}`, "bet");
        break; }
      case "grade": {
        if(!c.meta.commish) return this.to(id,{t:"err",x:"Commissioner only."});
        const {mk, winner} = msg;
        this.results[mk] = {w:winner, at:now()};
        let paid=0, won=0, lost=0;
        for(const b of this.bets){
          if(b.mk!==mk || b.st!=="LIVE") continue;
          if(b.sel===winner){ b.st="WON"; won++; paid+=b.pay;
            this.setRent(b.by, (this.rent[b.by]||0)+b.pay);
            this.tx(-b.pay, b.owner, `paid ticket ${b.id}`); }
          else { b.st="LOST"; lost++; } }
        this.dirty=true;
        this.bcast({t:"graded", mk, winner, bets:this.bets.slice(0,200), results:this.results});
        this.log(`🏁 ${msg.mkt||mk} settled — ${winner}. ${won} paid $${paid}, ${lost} torn up.`, "bet");
        break; }

      /* ── one shoe, everybody ── */
      case "bjsit": {
        const bet = clamp(Math.round(msg.bet||25), 25, 500);
        if((this.rent[c.meta.team]||0) < bet) return this.to(id,{t:"err",x:"Not enough rent money."});
        this.bj.seats[id] = {team:c.meta.team, owner:c.meta.owner||c.meta.team, bet, hand:[], done:false, res:null};
        this.log(`🃏 ${c.meta.owner||c.meta.team} sits down for $${bet}.`, "sys");
        this.pushBJ(); break; }
      case "bjup":     delete this.bj.seats[id]; this.bjMaybeResolve(); this.pushBJ(); break;
      case "bjdeal":   this.bjDeal(); break;
      case "bjhit":    this.bjHit(id); break;
      case "bjstand":  this.bjStand(id); break;
      case "bjdouble": this.bjDouble(id); break;
      case "ping": this.to(id,{t:"pong", s:msg.s}); break;
    }
  }

  /* ── blackjack, dealt by the house ── */
  shuffle(){
    const shoe=[];
    for(let d=0;d<DECKS;d++) for(let s=0;s<4;s++) for(let r=1;r<=13;r++) shoe.push({r,s});
    for(let i=shoe.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [shoe[i],shoe[j]]=[shoe[j],shoe[i]]; }
    this.bj.shoe=shoe; this.bj.run=0; this.bj.seen=0;
  }
  draw(){ if(this.bj.shoe.length<52){ this.shuffle(); this.log("🃏 Fresh shoe. The count resets.","sys"); }
    const c=this.bj.shoe.pop(); const v=c.r>10?10:c.r;
    this.bj.run += (v>=2&&v<=6)?1:((v===10||c.r===1)?-1:0);
    this.bj.seen++; return c; }
  static total(h){ let t=0,a=0; for(const c of h){ t += c.r>10?10:(c.r===1?11:c.r); if(c.r===1)a++; }
    while(t>21&&a>0){ t-=10; a--; } return t; }
  pubBJ(){
    const seats={};
    for(const [id,s] of Object.entries(this.bj.seats))
      seats[id]={owner:s.owner, team:s.team, bet:s.bet, hand:s.hand, done:s.done, res:s.res, total:Room.total(s.hand)};
    return {phase:this.bj.phase, turn:this.bj.turn, run:this.bj.run, seen:this.bj.seen, decks:DECKS,
      dealer:this.bj.phase==="play" ? [this.bj.dealer[0], {h:1}] : this.bj.dealer,
      dealerTotal:this.bj.phase==="play" ? null : Room.total(this.bj.dealer), seats};
  }
  pushBJ(){ this.dirty=true; this.bcast({t:"bj", bj:this.pubBJ()}); }
  bjDeal(){
    const ids=Object.keys(this.bj.seats);
    if(!ids.length || this.bj.phase==="play") return;
    this.bj.dealer=[this.draw(),this.draw()];
    for(const id of ids){ const s=this.bj.seats[id];
      s.hand=[this.draw(),this.draw()]; s.done=false; s.res=null;
      if(Room.total(s.hand)===21){ s.done=true; s.res="BLACKJACK"; } }
    this.bj.phase="play";
    this.bj.turn=ids.find(i=>!this.bj.seats[i].done) || null;
    this.log("🃏 Cards are out.", "sys");
    if(!this.bj.turn) this.bjMaybeResolve(); else this.pushBJ();
  }
  bjHit(id){ const s=this.bj.seats[id]; if(!s||s.done||this.bj.turn!==id) return;
    s.hand.push(this.draw());
    if(Room.total(s.hand)>21){ s.done=true; s.res="BUST"; this.bjNext(); } else this.pushBJ(); }
  bjStand(id){ const s=this.bj.seats[id]; if(!s||s.done||this.bj.turn!==id) return; s.done=true; this.bjNext(); }
  bjDouble(id){ const s=this.bj.seats[id]; if(!s||s.done||this.bj.turn!==id) return;
    if((this.rent[s.team]||0) < s.bet*2) return this.bjStand(id);
    s.bet*=2; s.hand.push(this.draw()); s.done=true;
    if(Room.total(s.hand)>21) s.res="BUST";
    this.bjNext(); }
  bjNext(){ const ids=Object.keys(this.bj.seats);
    this.bj.turn = ids.find(i=>!this.bj.seats[i].done) || null;
    if(this.bj.turn) this.pushBJ(); else this.bjMaybeResolve(); }
  bjMaybeResolve(){
    if(this.bj.phase!=="play") return;
    const ids=Object.keys(this.bj.seats);
    if(!ids.length){ this.bj.phase="idle"; this.bj.turn=null; return; }
    if(ids.some(i=>!this.bj.seats[i].done)) return;
    while(Room.total(this.bj.dealer) < 17) this.bj.dealer.push(this.draw());
    const dt=Room.total(this.bj.dealer);
    for(const id of ids){
      const s=this.bj.seats[id], pt=Room.total(s.hand);
      let delta=0;
      if(s.res==="BLACKJACK") delta = Math.round(s.bet*1.5);
      else if(pt>21){ delta=-s.bet; s.res="BUST"; }
      else if(dt>21||pt>dt){ delta=s.bet; s.res="WON"; }
      else if(pt===dt){ delta=0; s.res="PUSH"; }
      else { delta=-s.bet; s.res="LOST"; }
      this.setRent(s.team, (this.rent[s.team]||0)+delta);
      if(delta) this.tx(-delta, s.owner, `blackjack · ${String(s.res).toLowerCase()}`);
      this.log(`🃏 ${s.owner} ${s.res}${delta?` ${delta>0?"+":"−"}$${Math.abs(delta)}`:""} (${pt} v ${dt>21?"bust":dt})`, "money");
    }
    this.bj.phase="idle"; this.bj.turn=null;
    for(const id of ids){ const s=this.bj.seats[id]; if(s && (this.rent[s.team]||0)<=0) delete this.bj.seats[id]; }
    this.pushBJ();
  }
}
