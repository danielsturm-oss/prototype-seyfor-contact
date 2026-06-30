# prototype-seyfor-contact

Klikací prototyp kontaktní sekce webu seyfor.com. Čistě statický web (HTML/CSS/JS), bez build stepu.

Součást projektu P-SWR (Seyfor Web Redesign).

## Model: akčně-vyhledávací (revize 2026-06-30)

Kontaktní cesta NENÍ akviziční. Žádný lead formulář nikde. Primární vstup je
jedno univerzální vyhledávací pole, které rozpozná typ vstupu a vrátí kartu,
jejíž hlavní prvek je AKCE (Volat / Kopírovat / Navigovat), ne odkaz.

### Detekce typu vstupu a routování
- jméno osoby → karta s tlačítkem **Volat recepci** pobočky (tap-to-call, `tel:`)
- značka (iDoklad, Dotykačka) → provozovatel + **Fakturační údaje** + podpora (směrovka)
- firma (Seyfor Solutions, a. s., Seyfor, a. s., Seyfor Česko, a. s.) → **Fakturační údaje** + Kopírovat / Zobrazit velké
- IČO (6 až 8 číslic) → obrácený lookup → potvrzení „Ano, je to Seyfor" + údaje
- město / pobočka (Praha, Rustonka) → mapa + tlačítko **Navigovat** (deep-link)
- nejasné → záchytná síť (obecný kontakt) + návrhy

Našeptávač je seskupený po kategoriích: **Lidé / Firmy / Produkty / Pobočky**.

### Tři akční flow
1. **Volat (UC1):** osoba → recepce pobočky, kde tým sedí (ne osobní linka).
2. **Kopírovat / Ukázat (UC2):** fakturační blok s kopírováním po polích + režim „Zobrazit velké".
3. **Navigovat (UC3):** mapa + Navigovat (detekce platformy Apple / Google / Mapy.cz + univerzální `geo:` fallback) + recepční telefon; na sdílené adrese výpis subjektů s patrem.

### Procházecí vrstva (kdo nehledá, projde)
Taby **Firmy / Pobočky / Další kontakty**. Firmy jsou ve 5 úrovních; úrovně 3-5
jsou sbalené do kompaktních řádků. Produkty nejsou v browse vrstvě, zůstávají jen
ve vyhledávání a našeptávači.
Tiché vstupy: Podpora, Pro média, M&A (jen kontaktní karta), Kariéra (jen kontaktní
karta), Právní info, Obecný kontakt. M&A i Kariéra jsou pouze kontaktní karta.

### Tichý most veřejná vrstva → smluvní strana
Relevantní karty ukazují smluvní stranu a IČO z lookupu (SSOT). U značek most
funguje směrem značka → právnická osoba; u firem je hlavní obsah fakturace (UC2).

## Soubory
- `index.html` - vstupní stránka + aplikační logika (search, detekce typu, render karet)
- `style.css` - styly, brandové tokeny a responzivní layout
- `data.js` - datová vrstva (SSOT): ENTITIES, DIVISIONS, BRANDS, BRANCHES + BRANCH_PRESENCE, PEOPLE
- `assets/` - loga, reálné Seyfor ikony jsou inline SVG v `index.html`

## Datový model (`data.js`)
- `ENTITIES` = právnické osoby (drží IČO/DIČ/sídlo/datovku). MOST na smluvní stranu.
- `DIVISIONS` = divize → firma. `BRANDS` = značka → firma.
- `BRANCHES` = fyzická místa (adresa + recepční telefon). Pobočka **nikdy nenese IČO**.
- `BRANCH_PRESENCE` = kdo na adrese sedí (many-to-many + patro + most na firmu).
- `PEOPLE` = **ukázkové** osoby (jméno → tým/divize → pobočka → recepce).

Placeholdery nikdy prázdné, vždy označené („doplníme" / „ukázková data"). Reálná
data některých firem, osob, produktová loga a IČO k 1.1.2027 zatím nemáme → placeholder.

## Lokální spuštění
```bash
python3 -m http.server 8080
# pak otevřít http://localhost:8080
```

## Deploy (Cloudflare Pages)
- Framework preset: **None** (statický web) · Build command: **prázdný** · Output: **`/`**
- Každý push do hlavní větve spustí nový deploy.
