# prototype-seyfor-contact

Klikací prototyp kontaktní sekce webu seyfor.com. Čistě statický web (HTML/CSS/JS), bez build stepu.

Součást projektu P-SWR (Seyfor Web Redesign).

## Obsah

- `index.html` — vstupní stránka prototypu (root)
- `style.css` — styly
- `data.js` — data kontaktů / fakturační struktury skupiny
- `assets/` — loga

## Lokální spuštění

Stačí otevřít `index.html` v prohlížeči. Pro korektní načítání `data.js` (kvůli omezení `file://`) doporučeno spustit lokální server:

```bash
python3 -m http.server 8080
# pak otevřít http://localhost:8080
```

## Deploy

Nasazení přes **Cloudflare Pages** napojené na tento GitHub repozitář.

- Framework preset: **None** (statický web)
- Build command: **prázdný**
- Output directory: **`/`** (root — `index.html` je v rootu)

Každý push do hlavní větve spustí nový deploy.
