# 🏈 NFL — National Fantasy League HQ

> **The motherboard for a 12-franchise dynasty.** One self-contained HTML file: live draft war room, AI mock drafts trained on your rivals' real habits, 20,000 Monte Carlo simulations, an interactive clubhouse, and a vault where champions live forever.

**[▶ Open the live HQ](https://3go-47.github.io/national-fantasy-league/)** · League: *National Fantasy League* (Yahoo ID #109943) · Est. 2022 · $1,200 pot · last place eats the 9/9/9

---

## What this is

Every August, twelve grown men lose their minds. This is the app they lose them in.

The HQ is a **single `index.html`** — no server, no build step, no dependencies. Open it in any browser (phone included) and everything runs locally: rankings, boards, simulations, physics engines, the chat, all of it. Each league member's boards, tags, notes, and avatar persist in their own browser.

Built in the same spirit as its sibling projects — **[rainman](../rainman)** (defense-vs-position intelligence) and the family of one-file analytical dashboards — the rule is: *one file, zero excuses, everything traceable to data.*

## The rooms

| Tab | What happens there |
|---|---|
| 🏟️ **Home** | Draft countdown, stakes ($1,000 / $200 / the 9·9·9), positional scarcity map, preseason power index |
| 📊 **Rankings** | Yahoo top 300 with league-scoring projections, auto-tiers, tags & private notes |
| 🎯 **My Board** | Drag-and-drop personal big board with Board DNA, market-deviation chart, bye exposure, draft path |
| 🧨 **Draft Room** | Live draft tracker + **AI mock drafts** — rivals pick by their actual 2025 tendencies — plus results of **20,000 pre-run Monte Carlo drafts** |
| 🗄️ **Rosters '25** | Last season's final rosters, the keeper pool, confirmed vs projected keepers |
| 🏛️ **Clubhouse** | A fullscreen **free-roam lounge** — walk the floor 2K7-style, talk to your rivals, break the rack, flip the big screen, order a round, spin the jukebox 🪩 |
| 🏆 **The Vault** | Champions wall, rafter banners, glass trophy cases, Tesla-coil arcs |
| 🔒 **War Room** | PIN-locked commissioner intel: master board, edges vs ADP, SOS matrix, opponent dossiers, pick optimizer, the Player Universe |

## The data

- **Rankings & projections** — Yahoo Fantasy (league-scoped: 5-pt pass TDs, 1 pt/20 pass yds, full PPR)
- **Historical production** — rebuilt from 10,700+ box-score rows (2024–25), rescored under league rules
- **Draft tendencies** — extracted from the league's actual 2025 draft, round by round, per franchise
- **Monte Carlo** — 20,000 full simulated drafts of this exact league (snake order, keepers, tendencies)
- **Schedule intel** — 2026 strength-of-schedule by position from defense-vs-position composites

## Deploy your own

1. Fork / clone
2. Settings → Pages → deploy from `main`, root
3. That's it. It's one file.

## House rules

- The War Room stays locked. The sauce stays with the chef.
- Last place wears the shirt. **"I CAME LAST."** Nine beers. Nine hot dogs. Nine innings.
- The trophy is worth $1,000. The flex is worth more.

---

*Built for the boys. Rankings courtesy of Yahoo Fantasy. Not affiliated with the other NFL — ours has better trash talk.*
