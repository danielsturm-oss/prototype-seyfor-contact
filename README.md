# prototype-seyfor-contact

Klikací prototyp kontaktní sekce webu seyfor.com. Čistě statický web (HTML/CSS/JS), bez build stepu.

Součást projektu P-SWR (Seyfor Web Redesign).

## Obsah

- `index.html` — vstupní stránka prototypu (root)
- `style.css` — styly
- `data.js` — data kontaktů / fakturační struktury skupiny + vrstva poboček
- `assets/` — loga

## Jedna obrazovka (revize 2026-06-29)

- Nahoře jedno vyhledávací pole nad celou hierarchií: filtruje subjekty i pobočky živě podle značky, firmy, IČ i města.
- Hierarchie subjektů je inline akordeon (žádný samostatný panel). Hero (Seyfor Solutions) je rozbalený rovnou.
- **Deep-link** na konkrétní rozbalenou dlaždici přes hash:
  - `#produkt-idoklad` (a další jádrové značky pod Produkty: `money-s3`, `money-erp`, `evala`, `vema`, `byznys`, `vario`, `onecore`)
  - `#produkt-dotykacka`, `#produkt-commander`, `#produkt-fleetware`, `#produkt-t-cars`
  - `#subjekt-solutions`, `#subjekt-produkty`, `#subjekt-skupina`, `#pobocky`

## Datový model poboček (`data.js`)

- `BRANCHES` = fyzická místa (adresy). Pobočka **nikdy nenese IČO**, jen odkazuje na firmu.
- `BRANCH_PRESENCE` = kdo na adrese sedí (zobrazovaný název cedule + typ vstupu divize/firma/značka + odkaz na smluvní stranu v `ENTITIES`). Vztah pobočka↔smluvní strana je many-to-many.
- Worked example: Rustonka (Praha) se 4 subjekty. Zbývajících 16 poboček jsou označené placeholdery („doplníme"), aby seděl počet 17.

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
