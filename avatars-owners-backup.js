/* ══════════════════════════════════════════════════════════════════════
   OWNER AVATARS — the real twelve, exactly as they stood before the
   celebrity experiment. This is the restore point.
   To revert by hand: replace the OWNART block in club_rpg3.js with this.
   To revert in the app: the CAST control in the clubhouse HUD.
   ══════════════════════════════════════════════════════════════════════ */
  const OWNART={

  /* ── PHILLIPS · Bosnian garb, kufi, Notre Dame ── */
  bosnian(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=11.4, sk="#d9a06b";
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#efe7d4",shoe:"#5a3a18",baggy:1,sole:"#3a2410"});
    OA.belly(a,tw+2,th,hy,"#f4efe0");                                  // long white tunic
    cx.strokeStyle="#c9a227"; cx.lineWidth=1.5;                        // gold embroidery
    cx.beginPath(); cx.moveTo(a.x,hy+2); cx.lineTo(a.x,hy+th-2); cx.stroke();
    for(let i=0;i<4;i++){ cx.beginPath();
      cx.arc(a.x,hy+7+i*7,3.4,-1.1,1.1); cx.stroke(); }
    cx.fillStyle="#0a2240";                                            // ND navy waistcoat
    cx.beginPath(); cx.moveTo(a.x-tw-1,hy+1); cx.lineTo(a.x-tw*.34,hy+3);
    cx.lineTo(a.x-tw*.5,hy+th); cx.lineTo(a.x-tw-2,hy+th-1); cx.closePath(); cx.fill();
    cx.beginPath(); cx.moveTo(a.x+tw+1,hy+1); cx.lineTo(a.x+tw*.34,hy+3);
    cx.lineTo(a.x+tw*.5,hy+th); cx.lineTo(a.x+tw+2,hy+th-1); cx.closePath(); cx.fill();
    cx.fillStyle="#0c6b3f"; cx.fillRect(a.x-tw-2,hy+th-10,tw*2+4,8);   // green sash
    cx.strokeStyle="#c9a227"; cx.lineWidth=1; cx.strokeRect(a.x-tw-2,hy+th-10,tw*2+4,8);
    OA.arms(a,tw+1,th,hy,"#f4efe0",sk,{});
    cx.fillStyle="#c9a227"; cx.font="900 8.4px Georgia"; cx.textAlign="center";
    cx.fillText("ND",a.x,hy+th*.44);
    cx.strokeStyle="#0c6b3f"; cx.lineWidth=1;
    cx.beginPath(); cx.arc(a.x+tw+5,hy+29,4.2,0,7); cx.stroke();
    for(let i=0;i<7;i++){ const an=i/7*6.283; cx.fillStyle="#1f7a41";
      cx.beginPath(); cx.arc(a.x+tw+5+Math.cos(an)*4.2,hy+29+Math.sin(an)*4.2,1.1,0,7); cx.fill(); }
    OA.head(a,headY,hr,sk);
    OA.beard(a,headY,hr,"#2b1c10",1);
    OA.eyes(a,headY,hr,{});
    /* the kufi */
    cx.fillStyle="#f7f4ec"; cx.beginPath(); cx.ellipse(a.x,headY-hr*.86,hr*.98,hr*.56,0,Math.PI,0); cx.fill();
    cx.fillRect(a.x-hr*.98,headY-hr*.9,hr*1.96,hr*.34);
    cx.strokeStyle="#c9a227"; cx.lineWidth=1;
    cx.beginPath(); cx.moveTo(a.x-hr*.98,headY-hr*.72); cx.lineTo(a.x+hr*.98,headY-hr*.72); cx.stroke();
    for(let i=0;i<6;i++) cx.fillStyle="#0c6b3f", cx.fillRect(a.x-hr*.8+i*hr*.3,headY-hr*1.08,2,2);
    return hr; },

  /* ── FERRAND · an actual skeleton, dressed for Indianapolis ── */
  "colts-skel"(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=10.4, BONE="#efeadd", BONE2="#cfc7b4";
    OA.shadow(a,wf);
    /* bare leg bones — femur, knee, tibia, and a shoe */
    for(const lx of [a.x-7,a.x+7]){
      cx.strokeStyle=BONE; cx.lineWidth=3.4; cx.lineCap="round";
      cx.beginPath(); cx.moveTo(lx,a.y+1); cx.lineTo(lx-.6,a.y+11); cx.stroke();
      cx.beginPath(); cx.moveTo(lx-.6,a.y+13); cx.lineTo(lx-1,a.y+23); cx.stroke();
      cx.fillStyle=BONE2; cx.beginPath(); cx.arc(lx-.6,a.y+12,2.6,0,7); cx.fill();
      cx.fillStyle="#1a1a1a"; cx.beginPath(); cx.roundRect(lx-5,a.y+22,10,6,2.4); cx.fill(); }
    /* pelvis */
    cx.fillStyle=BONE; cx.beginPath();
    cx.moveTo(a.x-9,a.y-4); cx.lineTo(a.x+9,a.y-4); cx.lineTo(a.x+6,a.y+3);
    cx.lineTo(a.x-6,a.y+3); cx.closePath(); cx.fill();
    /* the Colts jersey, hanging on a frame with nothing in it */
    cx.fillStyle="#003a70"; cx.beginPath(); cx.roundRect(a.x-tw,hy,tw*2,th-6,7); cx.fill();
    cx.fillStyle="#00284e"; cx.fillRect(a.x-tw,hy+th-16,tw*2,4);
    cx.fillStyle="#f2efe4"; cx.fillRect(a.x-tw,hy+th-12,tw*2,2);
    /* ribs showing through the collar */
    cx.fillStyle=BONE; cx.beginPath(); cx.roundRect(a.x-6,hy-6,12,10,3); cx.fill();
    cx.strokeStyle=BONE; cx.lineWidth=1.5;
    for(let r=0;r<2;r++){ cx.beginPath();
      cx.moveTo(a.x-6,hy+1+r*3.4); cx.quadraticCurveTo(a.x,hy+3.4+r*3.4,a.x+6,hy+1+r*3.4); cx.stroke(); }
    /* the horseshoe and the number */
    cx.strokeStyle="#f2efe4"; cx.lineWidth=3;
    cx.beginPath(); cx.arc(a.x,hy+th*.5,5.4,Math.PI*1.12,Math.PI*1.88); cx.stroke();
    cx.fillStyle="#f2efe4"; cx.font="900 9px 'Archivo Black'"; cx.textAlign="center";
    cx.fillText("12",a.x,hy+th*.84);
    /* bare arm bones out of the sleeves */
    for(const sgn of [-1,1]){
      const sx=a.x+sgn*(tw-1);
      cx.fillStyle="#003a70"; cx.beginPath(); cx.roundRect(sx-(sgn<0?7:0),hy+1,7,11,3.4); cx.fill();
      cx.strokeStyle=BONE; cx.lineWidth=2.8; cx.lineCap="round";
      cx.beginPath(); cx.moveTo(sx+sgn*2,hy+12); cx.lineTo(sx+sgn*4,hy+21); cx.stroke();
      cx.fillStyle=BONE2; cx.beginPath(); cx.arc(sx+sgn*4,hy+22,2.2,0,7); cx.fill();
      cx.strokeStyle=BONE; cx.lineWidth=2.4;
      cx.beginPath(); cx.moveTo(sx+sgn*4,hy+23); cx.lineTo(sx+sgn*5,hy+31); cx.stroke();
      cx.fillStyle=BONE;
      for(let f=-1;f<=1;f++){ cx.beginPath(); cx.roundRect(sx+sgn*5-1.6+f*2.2,hy+31,1.6,4.4,.8); cx.fill(); } }
    /* THE SKULL */
    cx.fillStyle=BONE;
    cx.beginPath(); cx.ellipse(a.x,headY-1,hr,hr*1.02,0,0,7); cx.fill();
    cx.beginPath(); cx.roundRect(a.x-hr*.52,headY+hr*.5,hr*1.04,hr*.5,2.6); cx.fill();
    cx.fillStyle="#141414";
    cx.beginPath(); cx.ellipse(a.x-hr*.38,headY-hr*.1,hr*.27,hr*.33,0,0,7); cx.fill();
    cx.beginPath(); cx.ellipse(a.x+hr*.38,headY-hr*.1,hr*.27,hr*.33,0,0,7); cx.fill();
    cx.beginPath();
    cx.moveTo(a.x,headY+hr*.06); cx.lineTo(a.x-hr*.13,headY+hr*.36);
    cx.lineTo(a.x+hr*.13,headY+hr*.36); cx.closePath(); cx.fill();
    cx.fillStyle=BONE2; cx.fillRect(a.x-hr*.52,headY+hr*.5,hr*1.04,1.4);
    cx.fillStyle="#141414";
    for(let i2=-2;i2<=2;i2++) cx.fillRect(a.x+i2*hr*.2-.5,headY+hr*.52,1,hr*.46);
    /* Colts knit cap */
    cx.fillStyle="#003a70"; cx.beginPath(); cx.ellipse(a.x,headY-hr*.5,hr*1.04,hr*.6,0,Math.PI,0); cx.fill();
    cx.fillRect(a.x-hr*1.04,headY-hr*.54,hr*2.08,hr*.3);
    cx.fillStyle="#00284e"; cx.fillRect(a.x-hr*1.04,headY-hr*.34,hr*2.08,2.6);
    cx.fillStyle="#f2efe4"; cx.beginPath(); cx.arc(a.x,headY-hr*1.24,3,0,7); cx.fill();
    /* still arguing */
    const t=Date.now()/1000;
    cx.strokeStyle="rgba(255,255,255,.28)"; cx.lineWidth=1;
    for(let i2=1;i2<4;i2++){ cx.globalAlpha=.42-i2*.1;
      cx.beginPath(); cx.arc(a.x+11,headY+hr*.5,6+i2*5+Math.sin(t*4)*1.4,-.85,.85); cx.stroke(); }
    cx.globalAlpha=1;
    return hr; },

  /* ── GRIFF · the biggest man in the room ── */
  pnw(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=12.2, sk="#e0b58a";
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#3a4a3a",shoe:"#5a3a18",baggy:1,cuff:"#2a2418",sole:"#c8a45a"});
    cx.fillStyle="#7a1f1f";                                             // flannel under-layer
    cx.beginPath(); cx.roundRect(a.x-tw-9,hy,tw*2+18,th*.9,8); cx.fill();
    cx.strokeStyle="#3a1010"; cx.lineWidth=1.1;
    for(let i=0;i<7;i++){ cx.beginPath(); cx.moveTo(a.x-tw-9+i*((tw*2+18)/6),hy); cx.lineTo(a.x-tw-9+i*((tw*2+18)/6),hy+th*.9); cx.stroke(); }
    for(let i=0;i<5;i++){ cx.beginPath(); cx.moveTo(a.x-tw-9,hy+i*(th*.9/4)); cx.lineTo(a.x+tw+9,hy+i*(th*.9/4)); cx.stroke(); }
    OA.body(a,tw,th,hy,"#0a2240",8);                                    // Rams navy jersey
    cx.fillStyle="#ffd100"; cx.fillRect(a.x-tw,hy+th*.62,tw*2,3);
    cx.fillStyle="#f7f4ec"; cx.font="900 12px 'Archivo Black'"; cx.textAlign="center";
    cx.fillText("10",a.x,hy+th*.54);
    OA.arms(a,tw,th,hy,"#7a1f1f",sk,{bulk:1,rolled:1});
    OA.head(a,headY,hr,sk);
    OA.beard(a,headY,hr,"#4a3018",1);
    OA.eyes(a,headY,hr,{squint:1});
    cx.fillStyle="#2e5b3a"; cx.beginPath(); cx.ellipse(a.x,headY-hr*.62,hr*1.04,hr*.62,0,Math.PI,0); cx.fill();
    cx.fillRect(a.x-hr*1.04,headY-hr*.66,hr*2.08,hr*.34);               // beanie
    cx.fillStyle="#1f4028"; cx.fillRect(a.x-hr*1.04,headY-hr*.5,hr*2.08,3);
    cx.fillStyle="#c9c3b4"; cx.beginPath(); cx.arc(a.x,headY-hr*1.24,3,0,7); cx.fill();
    cx.fillStyle="#2a5a3a"; cx.beginPath(); cx.roundRect(a.x+tw+6,hy+26,7,11,2); cx.fill();
    cx.fillStyle="#c9c3b4"; cx.fillRect(a.x+tw+6,hy+24.4,7,2.6);
    return hr; },

  /* ── KENNY · full pads, helmet, and a motor ── */
  pads(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=10.8, sk="#8a5a34";
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#e8e4d8",shoe:"#141414",sock:"#1c2f5e",sole:"#c9cfe4"});
    cx.fillStyle="#c9cfe4"; cx.fillRect(a.x-9.4,a.y+3,7.4,8); cx.fillRect(a.x+2.6,a.y+3,7.4,8);  // thigh pads
    cx.fillStyle="#1c2f5e";                                            // shoulder pads
    cx.beginPath(); cx.roundRect(a.x-tw-8,hy-6,tw*2+16,15,7); cx.fill();
    cx.fillStyle="#243d78";
    cx.beginPath(); cx.roundRect(a.x-tw-9,hy-3,11,18,5); cx.fill();
    cx.beginPath(); cx.roundRect(a.x+tw-2,hy-3,11,18,5); cx.fill();
    OA.body(a,tw,th,hy,"#1c2f5e",7);
    cx.fillStyle="#c9cfe4"; cx.fillRect(a.x-tw,hy+th*.68,tw*2,2.4);
    cx.fillStyle="#f7f4ec"; cx.font="900 10px 'Archivo Black'"; cx.textAlign="center";
    cx.fillText("28",a.x,hy+th*.58);
    OA.arms(a,tw,th,hy,"#1c2f5e",sk,{bulk:1});
    cx.fillStyle="#c9cfe4";                                            // elbow pads
    cx.beginPath(); cx.roundRect(a.x-tw-10,hy+16,10,7,3); cx.fill();
    cx.beginPath(); cx.roundRect(a.x+tw,hy+16,10,7,3); cx.fill();
    /* the helmet */
    cx.fillStyle="#1c2f5e"; cx.beginPath(); cx.arc(a.x,headY-1,hr+2.2,Math.PI*.86,Math.PI*2.14); cx.fill();
    cx.fillStyle="#243d78"; cx.beginPath(); cx.arc(a.x,headY-1,hr+2.2,Math.PI*1.06,Math.PI*1.5); cx.fill();
    cx.fillStyle="#f7f4ec"; cx.fillRect(a.x-1.8,headY-hr-3.4,3.6,hr+2);
    cx.fillStyle=sk;                                                    // the face in the opening
    cx.beginPath(); cx.ellipse(a.x,headY+hr*.28,hr*.66,hr*.6,0,0,7); cx.fill();
    cx.fillStyle="#1a1410";
    cx.beginPath(); cx.arc(a.x-3,headY+hr*.06,1.4,0,7); cx.fill();
    cx.beginPath(); cx.arc(a.x+3,headY+hr*.06,1.4,0,7); cx.fill();
    cx.strokeStyle="#c9cfe4"; cx.lineWidth=1.5;                         // facemask
    cx.beginPath(); cx.moveTo(a.x-hr*.86,headY+2.4); cx.lineTo(a.x+hr*.86,headY+2.4);
    cx.moveTo(a.x-hr*.78,headY+6.4); cx.lineTo(a.x+hr*.78,headY+6.4);
    cx.moveTo(a.x-hr*.5,headY+1); cx.lineTo(a.x-hr*.5,headY+8);
    cx.moveTo(a.x+hr*.5,headY+1); cx.lineTo(a.x+hr*.5,headY+8); cx.stroke();
    cx.strokeStyle="#f7f4ec"; cx.lineWidth=1.2;                         // chin strap
    cx.beginPath(); cx.moveTo(a.x-hr*.9,headY+3); cx.quadraticCurveTo(a.x,headY+hr*1.15,a.x+hr*.9,headY+3); cx.stroke();
    if(Math.abs(a.vx)+Math.abs(a.vy)>1.1){ cx.strokeStyle="rgba(240,201,92,.55)"; cx.lineWidth=1.8;
      for(let i=1;i<4;i++){ cx.globalAlpha=.55/i;
        cx.beginPath(); cx.moveTo(a.x-a.vx*i*5,a.y+6+i*2); cx.lineTo(a.x-a.vx*i*9,a.y+6+i*2); cx.stroke(); }
      cx.globalAlpha=1; }
    return hr; },

  /* ── JACOB · candy stripes and an empty cup ── */
  iu(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=10.6, sk="#e8c8a8";
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#9d2235",shoe:"#f2efe4",stripe:"#f7f4ec",baggy:1,sole:"#c9c3b4"});
    OA.body(a,tw,th,hy,"#9d2235",9);
    cx.fillStyle="#7a1a29"; cx.beginPath(); cx.roundRect(a.x-tw,hy+th*.5,tw*2,th*.5,7); cx.fill();
    cx.fillStyle="#f7f4ec"; cx.font="900 10px 'Archivo Black'"; cx.textAlign="center";
    cx.fillText("IU",a.x,hy+th*.46);
    cx.strokeStyle="#7a1a29"; cx.lineWidth=1.2;                        // hoodie strings
    cx.beginPath(); cx.moveTo(a.x-3,hy+2); cx.lineTo(a.x-4,hy+9);
    cx.moveTo(a.x+3,hy+2); cx.lineTo(a.x+4,hy+9); cx.stroke();
    OA.arms(a,tw,th,hy,"#9d2235",sk,{thin:1});
    cx.fillStyle="#3a3a3a";                                            // fingerless gloves
    cx.beginPath(); cx.arc(a.x-tw-3.2,hy+23,4.6,0,7); cx.fill();
    cx.fillStyle="#c9c3b4"; cx.beginPath();
    cx.moveTo(a.x+tw+2,hy+25); cx.lineTo(a.x+tw+9,hy+25); cx.lineTo(a.x+tw+7.8,hy+32); cx.lineTo(a.x+tw+3.2,hy+32); cx.closePath(); cx.fill();
    cx.fillStyle="#8a8378"; cx.fillRect(a.x+tw+2,hy+25,7,1.8);
    OA.head(a,headY,hr,sk);
    OA.hair(a,headY,hr,"#3a2a18","mop");
    OA.eyes(a,headY,hr,{});
    OA.beard(a,headY,hr,"#3a2a18",0);
    return hr; },

  /* ── JAKE · dad bod, thin gold, always holding something ── */
  dadbod(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=11.2, sk="#e0b58a";
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#5a6b4a",shoe:"#2a2a2a",sock:"#f7f4ec",baggy:1});
    OA.belly(a,tw+1,th,hy,"#2e5b8a");                                  // polo over the gut
    cx.fillStyle="#25496e"; cx.beginPath(); cx.roundRect(a.x-6,hy-1,12,11,3); cx.fill();
    cx.fillStyle="#c9a227"; cx.beginPath(); cx.arc(a.x,hy+4,1.2,0,7); cx.fill();
    cx.beginPath(); cx.arc(a.x,hy+8,1.2,0,7); cx.fill();
    OA.arms(a,tw+1,th,hy,"#2e5b8a",sk,{short:1});
    cx.strokeStyle="#e8c14a"; cx.lineWidth=1.5;                        // thin chain
    cx.beginPath(); cx.arc(a.x,hy+2,7.4,.3,Math.PI-.3); cx.stroke();
    cx.lineWidth=1.2;                                                   // bracelet
    cx.beginPath(); cx.arc(a.x+tw+4,hy+18,4.4,0,7); cx.stroke();
    cx.fillStyle="#3f6b45"; cx.beginPath(); cx.roundRect(a.x-tw-9,hy+24,8,5.4,1.8); cx.fill();
    cx.strokeStyle="#dfe6d8"; cx.lineWidth=.8;
    cx.beginPath(); cx.moveTo(a.x-tw-9,hy+26.6); cx.lineTo(a.x-tw-1,hy+26.6); cx.stroke();
    OA.head(a,headY,hr,sk);
    OA.hair(a,headY,hr,"#3a2a18","buzz");
    OA.beard(a,headY,hr,"#3a2a18",0);
    OA.eyes(a,headY,hr,{});
    cx.fillStyle="#1a1a1a"; cx.beginPath(); cx.ellipse(a.x,headY-hr*.9,hr*1.02,hr*.4,0,Math.PI,0); cx.fill();
    cx.fillRect(a.x-hr*1.02,headY-hr*.94,hr*2.04,3);                    // backwards cap
    cx.fillStyle="#2a2a2a"; cx.fillRect(a.x+hr*.7,headY-hr*1.02,hr*.7,4);
    return hr; },

  /* ── SCOTT · navy 18, orange pants, ginger under a hood ── */
  bears(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=10.8, sk="#f0cfae";
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#c83803",shoe:"#0b162a",sole:"#f2efe4"});
    cx.fillStyle="#5a5f66";                                            // hoodie underneath
    cx.beginPath(); cx.roundRect(a.x-tw-6,hy-1,tw*2+12,th*.94,9); cx.fill();
    OA.body(a,tw,th,hy,"#0b162a",8);                                   // navy jersey
    cx.strokeStyle="#c83803"; cx.lineWidth=2;
    cx.beginPath(); cx.roundRect(a.x-tw+2,hy+2,tw*2-4,th-4,6); cx.stroke();
    cx.fillStyle="#c83803"; cx.fillRect(a.x-tw,hy+th*.66,tw*2,3);
    cx.fillStyle="#f7f4ec"; cx.font="900 10px 'Archivo Black'"; cx.textAlign="center";
    cx.fillText("18",a.x,hy+th*.56);
    OA.arms(a,tw,th,hy,"#5a5f66",sk,{});
    cx.fillStyle="#5a5f66";                                            // hood behind the head
    cx.beginPath(); cx.ellipse(a.x,headY+hr*.5,hr*1.32,hr*.9,0,Math.PI,0); cx.fill();
    OA.head(a,headY,hr,sk);
    OA.hair(a,headY,hr,"#d2601a","flame");
    OA.eyes(a,headY,hr,{});
    return hr; },

  /* ── GARRETT · pizza boy with a board ── */
  pizza(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=10.8, sk="#e8c8a8";
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#22252b",shoe:"#1a1a1a",sole:"#f2efe4"});
    OA.body(a,tw,th,hy,"#c8102e",8);
    cx.fillStyle="#1a1a1a"; cx.beginPath();                            // apron
    cx.moveTo(a.x-tw*.66,hy+6); cx.lineTo(a.x+tw*.66,hy+6);
    cx.lineTo(a.x+tw*.8,hy+th); cx.lineTo(a.x-tw*.8,hy+th); cx.closePath(); cx.fill();
    cx.strokeStyle="#f7f4ec"; cx.lineWidth=1.2;
    cx.beginPath(); cx.moveTo(a.x-tw,hy+9); cx.lineTo(a.x+tw,hy+9); cx.stroke();
    OA.arms(a,tw,th,hy,"#c8102e",sk,{});
    cx.fillStyle="#8a0d22"; cx.fillRect(a.x-tw-7,hy+1,tw*2+14,4);    // squared shoulders
    /* a slice box carried flat in one hand */
    cx.fillStyle="#d8c9a8"; cx.beginPath(); cx.roundRect(a.x-tw-13,hy+22,15,9,1.6); cx.fill();
    cx.fillStyle="#c2b18c"; cx.fillRect(a.x-tw-13,hy+22,15,2.6);
    cx.strokeStyle="#8a7a58"; cx.lineWidth=.8; cx.strokeRect(a.x-tw-13,hy+22,15,9);
    /* the board, standing at his heel */
    cx.save(); cx.translate(a.x+tw+6,hy+26); cx.rotate(-.18);
    cx.fillStyle="#3a2a52"; cx.beginPath(); cx.roundRect(-2.6,-10,5.2,21,2.6); cx.fill();
    cx.fillStyle="#c959ff"; cx.beginPath(); cx.roundRect(-1.8,-8.6,3.6,18,1.8); cx.fill();
    cx.fillStyle="#c9c3b4"; cx.beginPath(); cx.arc(-2.8,-5,1.5,0,7); cx.fill();
    cx.beginPath(); cx.arc(2.8,-5,1.5,0,7); cx.fill();
    cx.beginPath(); cx.arc(-2.8,6,1.5,0,7); cx.fill();
    cx.beginPath(); cx.arc(2.8,6,1.5,0,7); cx.fill();
    cx.restore();
    OA.head(a,headY,hr,sk);
    cx.fillStyle="#3a2a18";                                   // short hair, mostly under the cap
    cx.beginPath(); cx.ellipse(a.x,headY-hr*.4,hr*1.0,hr*.54,0,Math.PI,0); cx.fill();
    cx.fillRect(a.x-hr,headY-hr*.44,hr*2,hr*.24);
    cx.fillRect(a.x-hr*1.0,headY-hr*.12,hr*.26,hr*.3);        // sideburns
    cx.fillRect(a.x+hr*.74,headY-hr*.12,hr*.26,hr*.3);
    OA.eyes(a,headY,hr,{});
    cx.fillStyle="#c8102e"; cx.beginPath(); cx.ellipse(a.x,headY-hr*.6,hr*1.06,hr*.56,0,Math.PI,0); cx.fill();
    cx.fillRect(a.x-hr*1.06,headY-hr*.64,hr*2.12,3.4);
    cx.fillStyle="#8a0d22"; cx.fillRect(a.x-hr*1.5,headY-hr*.64,hr*.7,3.6);     // brim
    cx.fillStyle="#f0c95c"; cx.beginPath();                                     // slice logo
    cx.moveTo(a.x,headY-hr*1.16); cx.lineTo(a.x-3.4,headY-hr*.86); cx.lineTo(a.x+3.4,headY-hr*.86); cx.closePath(); cx.fill();
    return hr; },

  /* ── SAM · the jester, dripped ── */
  jester(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=10.8, sk="#e8c8a8";
    const t=Date.now()/1000;
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#5b2a86",shoe:"#f7f4ec",sole:"#c959ff"});
    cx.fillStyle="#c9a227";                                            // one gold leg
    cx.fillRect(a.x-9.4,a.y+1+b*.3,7.4,21);
    OA.body(a,tw,th,hy,"#5b2a86",8);
    cx.fillStyle="#c9a227";                                            // motley diamonds
    for(let r=0;r<4;r++) for(let c=0;c<3;c++){ if((r+c)%2) continue;
      cx.beginPath();
      const dx=a.x-tw+4+c*(tw*2-8)/2, dy=hy+5+r*(th-10)/3;
      cx.moveTo(dx,dy-3.4); cx.lineTo(dx+3.4,dy); cx.lineTo(dx,dy+3.4); cx.lineTo(dx-3.4,dy); cx.closePath(); cx.fill(); }
    cx.fillStyle="#f7f4ec"; cx.beginPath();                            // ruff collar
    for(let i=0;i<7;i++){ cx.arc(a.x-tw+2+i*(tw*2-4)/6,hy+1,3.4,0,7); }
    cx.fill();
    OA.arms(a,tw,th,hy,"#5b2a86",sk,{});
    cx.strokeStyle="#e8c14a"; cx.lineWidth=1.8;                        // the drip
    cx.beginPath(); cx.arc(a.x,hy+6,8.4,.3,Math.PI-.3); cx.stroke();
    cx.fillStyle="#e8c14a"; cx.beginPath(); cx.arc(a.x,hy+14,2.4,0,7); cx.fill();
    OA.head(a,headY,hr,sk);
    OA.eyes(a,headY,hr,{});
    /* three-point jester hat */
    const pts=[[-1.25,-1.1],[0,-1.5],[1.25,-1.1]];
    pts.forEach(([px,py],i)=>{
      const sw=Math.sin(t*2.4+i)*2.4;
      cx.fillStyle=i%2?"#c9a227":"#5b2a86";
      cx.beginPath();
      cx.moveTo(a.x+px*hr*.7-4,headY-hr*.74);
      cx.quadraticCurveTo(a.x+px*hr*1.1+sw,headY+py*hr*1.5,a.x+px*hr*1.35+sw,headY+py*hr*1.9);
      cx.lineTo(a.x+px*hr*.7+4,headY-hr*.74); cx.closePath(); cx.fill();
      cx.fillStyle="#f0c95c"; cx.shadowColor="#f0c95c"; cx.shadowBlur=7;
      cx.beginPath(); cx.arc(a.x+px*hr*1.35+sw,headY+py*hr*1.9,2.2,0,7); cx.fill(); cx.shadowBlur=0; });
    cx.fillStyle="#5b2a86"; cx.beginPath(); cx.ellipse(a.x,headY-hr*.66,hr*1.04,hr*.5,0,Math.PI,0); cx.fill();
    cx.fillStyle="#c9a227"; cx.fillRect(a.x-hr*1.04,headY-hr*.7,hr*2.08,3);
    return hr; },

  /* ── ALEX · scarlet and grey, seams complaining ── */
  buckeye(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=11.0, sk="#f2d5b4";
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#6b6f78",shoe:"#f7f4ec",sole:"#bb0000"});
    OA.body(a,tw,th,hy,"#bb0000",7);
    cx.strokeStyle="rgba(255,255,255,.45)"; cx.lineWidth=1;            // straining seams
    for(let i=0;i<3;i++){ cx.beginPath(); cx.moveTo(a.x-tw+1,hy+8+i*7); cx.lineTo(a.x-tw+6,hy+11+i*7); cx.stroke();
      cx.beginPath(); cx.moveTo(a.x+tw-1,hy+8+i*7); cx.lineTo(a.x+tw-6,hy+11+i*7); cx.stroke(); }
    cx.fillStyle="#f7f4ec"; cx.font="900 9px Georgia"; cx.textAlign="center";
    cx.fillText("O-H",a.x,hy+th*.5);
    OA.arms(a,tw,th,hy,"#bb0000",sk,{bulk:1,short:1});
    cx.fillStyle=sk;                                                    // forearms
    cx.beginPath(); cx.roundRect(a.x-tw-11,hy+16,10,14,5); cx.fill();
    cx.beginPath(); cx.roundRect(a.x+tw+1,hy+16,10,14,5); cx.fill();
    cx.fillStyle="rgba(0,0,0,.10)";
    cx.beginPath(); cx.ellipse(a.x-tw-6,hy+20,3.4,4.4,0,0,7); cx.fill();
    cx.beginPath(); cx.ellipse(a.x+tw+6,hy+20,3.4,4.4,0,0,7); cx.fill();
    cx.fillStyle="#2e6b39"; cx.beginPath(); cx.ellipse(a.x-tw*.6,hy+6,3.4,2.2,-.5,0,7); cx.fill();  // buckeye leaf
    cx.fillStyle="#c9a227"; cx.beginPath(); cx.arc(a.x-tw*.6,hy+6,1.2,0,7); cx.fill();
    OA.head(a,headY,hr,sk);
    OA.hair(a,headY,hr,"#e8d48a","fade");
    OA.eyes(a,headY,hr,{pupil:"#3b6fe2"});
    return hr; },

  /* ── TYLOR · New Balance, Colts cap, actually ── */
  nb(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=10.8, sk="#a8703f";
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#8d96a8",shoe:"#dfe3ea",baggy:1,sole:"#9aa2ae",cuff:"#7a828f"});
    cx.fillStyle="#c8102e"; cx.font="800 6px Sora"; cx.textAlign="center";   // the N
    cx.fillText("N",a.x-5.6,a.y+26); cx.fillText("N",a.x+6.6,a.y+26);
    OA.body(a,tw,th,hy,"#f2efe4",9);                                     // white sweater
    cx.fillStyle="#1d3f8f";                                              // royal puffer vest
    cx.beginPath(); cx.roundRect(a.x-tw-2,hy-1,tw*.86,th+2,6); cx.fill();
    cx.beginPath(); cx.roundRect(a.x+tw-tw*.86+2,hy-1,tw*.86,th+2,6); cx.fill();
    cx.strokeStyle="rgba(255,255,255,.22)"; cx.lineWidth=1;
    for(let i=0;i<4;i++){ cx.beginPath(); cx.moveTo(a.x-tw-2,hy+5+i*7); cx.lineTo(a.x-tw-2+tw*.86,hy+5+i*7); cx.stroke();
      cx.beginPath(); cx.moveTo(a.x+tw-tw*.86+2,hy+5+i*7); cx.lineTo(a.x+tw+2,hy+5+i*7); cx.stroke(); }
    cx.fillStyle="#c9c3b4"; cx.fillRect(a.x-1,hy+1,2,th-2);
    OA.arms(a,tw,th,hy,"#f2efe4",sk,{});
    cx.fillStyle=sk; cx.beginPath(); cx.roundRect(a.x+tw+4.6,hy+13,2.8,7,1.4); cx.fill();
    OA.head(a,headY,hr,sk);
    OA.hair(a,headY,hr,"#241a12","fade");
    OA.eyes(a,headY,hr,{glasses:1});
    cx.fillStyle="#0a2240"; cx.beginPath(); cx.ellipse(a.x,headY-hr*.8,hr*1.0,hr*.5,0,Math.PI,0); cx.fill();
    cx.fillRect(a.x-hr,headY-hr*.84,hr*2,3);
    cx.fillStyle="#071a30"; cx.fillRect(a.x-hr*1.36,headY-hr*.84,hr*.7,3.4);
    return hr; },

  /* ── JOSH · the commissioner ── */
  gatsby(a,isMe,o,hs,wf,tw,th,hy,headY,b){
    const hr=11.0, sk="#e8c8a8", t=Date.now()/1000, gl=.55+Math.sin(t*1.5)*.2;
    const ag=cx.createRadialGradient(a.x,a.y-14,6,a.x,a.y-14,60);
    ag.addColorStop(0,`rgba(240,201,92,${.11*gl})`); ag.addColorStop(1,"transparent");
    cx.fillStyle=ag; cx.beginPath(); cx.arc(a.x,a.y-14,60,0,7); cx.fill();
    OA.shadow(a,wf);
    OA.legs(a,wf,b,{c:"#141420",shoe:"#f2efe4",sole:"#1a1a1a"});
    cx.fillStyle="#0b0b12"; cx.beginPath(); cx.roundRect(a.x-tw-1,hy-1,tw*2+2,th+2,6); cx.fill();
    cx.fillStyle="#15151f";                                             // tails
    cx.beginPath(); cx.moveTo(a.x-tw-1,hy+th); cx.lineTo(a.x-tw+5,hy+th+14); cx.lineTo(a.x-1,hy+th+2); cx.closePath(); cx.fill();
    cx.beginPath(); cx.moveTo(a.x+tw+1,hy+th); cx.lineTo(a.x+tw-5,hy+th+14); cx.lineTo(a.x+1,hy+th+2); cx.closePath(); cx.fill();
    const sg=cx.createLinearGradient(a.x-tw,hy,a.x+tw,hy+th);
    sg.addColorStop(0,"#23233a"); sg.addColorStop(.5,"#3a3a55"); sg.addColorStop(1,"#191927");
    cx.fillStyle=sg;
    cx.beginPath(); cx.moveTo(a.x-4,hy); cx.lineTo(a.x-tw+2,hy+3); cx.lineTo(a.x-3,hy+th*.62); cx.closePath(); cx.fill();
    cx.beginPath(); cx.moveTo(a.x+4,hy); cx.lineTo(a.x+tw-2,hy+3); cx.lineTo(a.x+3,hy+th*.62); cx.closePath(); cx.fill();
    cx.fillStyle="#f7f4ec"; cx.beginPath(); cx.moveTo(a.x-4,hy); cx.lineTo(a.x+4,hy);
    cx.lineTo(a.x+3,hy+th*.6); cx.lineTo(a.x-3,hy+th*.6); cx.closePath(); cx.fill();
    cx.fillStyle="#d4af37";
    for(let i=0;i<3;i++){ cx.beginPath(); cx.arc(a.x,hy+10+i*7,1.1,0,7); cx.fill(); }
    cx.fillStyle="#0e0e14";
    cx.beginPath(); cx.moveTo(a.x-6,hy+2); cx.lineTo(a.x,hy+5); cx.lineTo(a.x-6,hy+8); cx.closePath(); cx.fill();
    cx.beginPath(); cx.moveTo(a.x+6,hy+2); cx.lineTo(a.x,hy+5); cx.lineTo(a.x+6,hy+8); cx.closePath(); cx.fill();
    cx.fillStyle="#f0c95c";
    cx.beginPath(); cx.moveTo(a.x-tw+4,hy+14); cx.lineTo(a.x-tw+10,hy+11); cx.lineTo(a.x-tw+9,hy+16); cx.closePath(); cx.fill();
    OA.arms(a,tw,th,hy,"#0b0b12",sk,{});
    cx.strokeStyle="#d4af37"; cx.lineWidth=1;
    cx.beginPath(); cx.moveTo(a.x-tw+7,hy+18); cx.quadraticCurveTo(a.x-3,hy+26,a.x+5,hy+21); cx.stroke();
    OA.head(a,headY,hr,sk);
    OA.hair(a,headY,hr,"#171310","slick");
    OA.eyes(a,headY,hr,{});
    cx.strokeStyle="#d4af37"; cx.lineWidth=1.4;                          // monocle
    cx.beginPath(); cx.arc(a.x+hr*.4,headY-hr*.06,4.4,0,7); cx.stroke();
    cx.beginPath(); cx.moveTo(a.x+hr*.4+4,headY+2); cx.quadraticCurveTo(a.x+12,headY+10,a.x+7,hy+9); cx.stroke();
    cx.globalAlpha=.6*gl; cx.strokeStyle="#fff"; cx.lineWidth=1;
    cx.beginPath(); cx.moveTo(a.x+1.6,headY-3); cx.lineTo(a.x+5.4,headY+.6); cx.stroke(); cx.globalAlpha=1;
    cx.strokeStyle="#e8e0cc"; cx.lineWidth=1.4;                          // cigarette holder
    cx.beginPath(); cx.moveTo(a.x-3,headY+hr*.5); cx.lineTo(a.x-16,headY+hr*.1); cx.stroke();
    cx.fillStyle="#ff8c2a"; cx.beginPath(); cx.arc(a.x-16.4,headY+hr*.08,1.2,0,7); cx.fill();
    cx.globalAlpha=.16; cx.fillStyle="#d9d2c2";
    for(let i=0;i<4;i++){ const sy=headY-((t*22+i*9)%36);
      cx.beginPath(); cx.arc(a.x-17+Math.sin(t*1.6+i)*4,sy,2.4+i*1.5,0,7); cx.fill(); }
    cx.globalAlpha=1;
    cx.strokeStyle="#2b1a0a"; cx.lineWidth=2.4;                          // cane
    cx.beginPath(); cx.moveTo(a.x+tw+6,hy+18); cx.lineTo(a.x+tw+9,a.y+24); cx.stroke();
    cx.fillStyle="#d4af37"; cx.beginPath(); cx.arc(a.x+tw+6,hy+17,3,0,7); cx.fill();
    cx.font="900 8px 'Archivo Black'"; cx.textAlign="center";
    const bw=cx.measureText("COMMISSIONER").width+12;
    cx.fillStyle="rgba(240,201,92,.94)";
    cx.beginPath(); cx.roundRect(a.x-bw/2,a.y+66,bw,13,3); cx.fill();
    cx.fillStyle="#14100c"; cx.fillText("COMMISSIONER",a.x,a.y+75);
    return hr; }
  }
