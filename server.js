/* Plain Node server — same protocol, no Cloudflare needed.
   npm install && npm start        (PORT env respected; free on Render/Railway/Fly) */
import { WebSocketServer } from "ws";
import { createServer } from "http";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { Room } from "./room.js";

const PORT = process.env.PORT || 8787;
/* ── who is allowed to talk to this thing ──────────────────────────────────
   It used to accept a socket from anywhere and take your word for which
   franchise you were, which meant anyone could arrive claiming to be the
   commissioner and grade every market. Three gates now: the request has to
   come from our own page, it has to carry the league key, and commissioner
   actions need a second key the other owners never see. */
const ALLOWED = new Set([
  "https://nationalfantasyleague.us",
  "https://www.nationalfantasyleague.us",
  "https://3go-47.github.io",
  "http://localhost:8080", "http://127.0.0.1:8080"
]);
const LEAGUE_KEY  = process.env.LEAGUE_KEY  || "1e9d3a6130b43593b22ac8ea4c1811a7";
const COMMISH_KEY = process.env.COMMISH_KEY || "eaf3473b02d07bacecb4c3c6f5b1abb8";
const MAX_MSG = 4096;                       /* nothing legitimate is bigger */
const RATE = {N:40, MS:10000};              /* 40 messages per ten seconds */
const FILE = process.env.STATE_FILE || "./clubhouse-state.json";
const saved = existsSync(FILE) ? JSON.parse(readFileSync(FILE,"utf8")) : null;
const rooms = new Map();
const getRoom = n => { if(!rooms.has(n)) rooms.set(n, new Room(n==="main"?saved:null)); return rooms.get(n); };

const http = createServer((req,res)=>{
  const o = req.headers.origin;
  res.writeHead(200,{"content-type":"text/plain",
    ...(ALLOWED.has(o) ? {"access-control-allow-origin":o} : {}),
    "x-content-type-options":"nosniff",
    "referrer-policy":"no-referrer"});
  res.end("National Fantasy League clubhouse server\n");
});
const wss = new WebSocketServer({server:http, path:"/ws"});

wss.on("connection", (ws, req) => {
  const url = new URL(req.url, "http://x");
  /* the page it came from, and the key it brought */
  const origin = req.headers.origin;
  if(origin && !ALLOWED.has(origin)){
    try{ ws.close(4003,"origin"); }catch(e){}
    console.log("refused origin:", origin); return; }
  if(url.searchParams.get("k") !== LEAGUE_KEY){
    try{ ws.close(4001,"key"); }catch(e){}
    console.log("refused key from", origin||"no-origin"); return; }
  ws.isAlive = true;
  ws.on("pong", () => { ws.isAlive = true; });
  const room = getRoom(url.searchParams.get("room") || "main");
  const cid  = Math.random().toString(36).slice(2,10);
  /* a claim of "I am the commissioner" is only honoured with the second key */
  const claimsCommish = url.searchParams.get("team") === "Flacc Shots";
  if(claimsCommish && url.searchParams.get("c") !== COMMISH_KEY){
    try{ ws.close(4002,"commish"); }catch(e){}
    console.log("refused a Flacc Shots claim with no commissioner key"); return; }
  const meta = {
    commish: claimsCommish,
    team:  (url.searchParams.get("team")  || "Guest").slice(0,40),
    owner: (url.searchParams.get("owner") || "Guest").slice(0,24),
    x:1660, y:430, vx:0, vy:0, sit:false, mode:"world"
  };
  room.add(cid, s => { if(ws.readyState===1) ws.send(s); }, meta);
  let hits=[], flood=false;
  ws.on("message", d => {
    if(d.length > MAX_MSG){ try{ ws.close(4009,"oversize"); }catch(e){} return; }
    const now = Date.now();
    hits = hits.filter(t => now-t < RATE.MS); hits.push(now);
    if(hits.length > RATE.N){
      if(!flood){ flood=true; console.log("flood from", meta.owner); }
      try{ ws.close(4008,"rate"); }catch(e){} return; }
    let m; try{ m=JSON.parse(d); }catch(e){ return; }
    if(!m || typeof m.t !== "string" || m.t.length > 24) return;
    room.handle(cid,m);
  });
  ws.on("close", () => room.drop(cid));
  ws.on("error", () => room.drop(cid));
});

setInterval(() => {
  const main = rooms.get("main");
  if(main && main.dirty){ try{ writeFileSync(FILE, JSON.stringify(main.persist())); }catch(e){} }
}, 5000);

/* keep sockets warm — idle proxies hang up on quiet connections, and a browser
   tab in the background stops its animation loop entirely */
setInterval(() => {
  for(const ws of wss.clients){
    if(ws.isAlive === false){ ws.terminate(); continue; }
    ws.isAlive = false;
    try{ ws.ping(); }catch(e){}
  }
}, 25000);

http.listen(PORT, () => console.log("clubhouse listening on :"+PORT+"/ws"));
