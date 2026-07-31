/* Plain Node server — same protocol, no Cloudflare needed.
   npm install && npm start        (PORT env respected; free on Render/Railway/Fly) */
import { WebSocketServer } from "ws";
import { createServer } from "http";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { Room } from "./room.js";

const PORT = process.env.PORT || 8787;
const FILE = process.env.STATE_FILE || "./clubhouse-state.json";
const saved = existsSync(FILE) ? JSON.parse(readFileSync(FILE,"utf8")) : null;
const rooms = new Map();
const getRoom = n => { if(!rooms.has(n)) rooms.set(n, new Room(n==="main"?saved:null)); return rooms.get(n); };

const http = createServer((req,res)=>{
  res.writeHead(200,{"content-type":"text/plain","access-control-allow-origin":"*"});
  res.end("National Fantasy League clubhouse server\n");
});
const wss = new WebSocketServer({server:http, path:"/ws"});

wss.on("connection", (ws, req) => {
  ws.isAlive = true;
  ws.on("pong", () => { ws.isAlive = true; });
  const url  = new URL(req.url, "http://x");
  const room = getRoom(url.searchParams.get("room") || "main");
  const cid  = Math.random().toString(36).slice(2,10);
  const meta = {
    team:  (url.searchParams.get("team")  || "Guest").slice(0,40),
    owner: (url.searchParams.get("owner") || "Guest").slice(0,24),
    x:1660, y:430, vx:0, vy:0, sit:false, mode:"world"
  };
  room.add(cid, s => { if(ws.readyState===1) ws.send(s); }, meta);
  ws.on("message", d => { let m; try{ m=JSON.parse(d); }catch(e){ return; } room.handle(cid,m); });
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
