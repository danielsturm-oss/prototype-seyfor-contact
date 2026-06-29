/*
 * Seyfor kontaktni sekce - datova vrstva prototypu (stav k 1.1.2027)
 * ------------------------------------------------------------------
 * AKCNE-VYHLEDAVACI MODEL. Jeden vstup rozpozna typ (jmeno / znacka /
 * firma / ICO / mesto-pobocka) a vrati kartu s AKCNIM tlacitkem
 * (Volat / Kopirovat / Navigovat), ne lead formular.
 *
 * SSOT: kazdy fakt zije na jednom miste.
 *   - ENTITIES   = pravnicke osoby (drzi ICO/DIC/sidlo/datovku). MOST na smluvni stranu.
 *   - DIVISIONS  = divize -> firma (klic do ENTITIES).
 *   - BRANDS     = znacka -> firma (provider, klic do ENTITIES).
 *   - BRANCHES   = fyzicka mista (adresa + recepcni telefon). NIKDY nenese ICO.
 *   - BRANCH_PRESENCE = kdo na adrese sedi (many-to-many, most na firmu).
 *   - PEOPLE     = UKAZKOVE osoby: jmeno -> tym/divize -> pobocka -> recepce.
 *
 * Pole s hodnotou null se renderuji jako oznaceny placeholder
 * "doplnime k 1.1.2027" (nikdy prazdne pole).
 * sample:true = UKAZKOVA DATA (osoby, recepcni linky, patra) - realna nemame.
 * assumption:true = predpoklad k overeni.
 */

// ---- Smluvni strany (pravnicke osoby) ------------------------------------
const ENTITIES = {
  "seyfor-cesko": {
    name: "Seyfor Česko",
    ico: null, dic: null, sidlo: null, datovka: null, country: "CZ"
  },
  "seyfor-slovensko": {
    name: "Seyfor Slovensko, a. s.",
    ico: null, dic: null, sidlo: null, datovka: null, country: "SK", assumption: true
  },
  "dotykacka-cr": {
    name: "Dotykačka ČR s.r.o.",
    ico: null, dic: null, sidlo: null, datovka: null, country: "CZ"
  },
  "radium": {
    name: "Radium s.r.o.",
    ico: "61247685", dic: null,
    sidlo: "nám. Chuchelských bojovníků 18/1, Praha 5",
    datovka: null, country: "CZ"
  },
  "t-cars-system": {
    name: "T-Cars System s.r.o.",
    ico: null, dic: null, sidlo: null, datovka: null, country: "CZ"
  },
  "commander-services": {
    name: "Commander Services s.r.o.",
    ico: null, dic: null, sidlo: null, datovka: null, country: "SK"
  },
  "seyfor-solutions": {
    name: "Seyfor Solutions",
    ico: null, dic: null, sidlo: null, datovka: null, country: "CZ"
  },
  "seyfor-as": {
    name: "Seyfor, a. s.",
    ico: "01572377", dic: "CZ01572377",
    sidlo: "Drobného 49, 602 00 Brno",
    datovka: null, country: "CZ/SK"
  },
  "datacruit": {
    name: "Datacruit s.r.o.",
    ico: null, dic: null, sidlo: null, datovka: null, country: "CZ"
  }
};

// ---- Divize -> smluvni strana --------------------------------------------
// Divize je verejne jmeno; smluvni strana je firma z ENTITIES.
const DIVISIONS = {
  "seyfor-solutions": { display: "Seyfor Solutions", entity: "seyfor-solutions",
    desc: "Implementace, konzultace a rozvoj podnikového softwaru." },
  "seyfor-products":  { display: "Seyfor Products",  entity: "seyfor-cesko",
    desc: "Účetní, ekonomické a HR produkty skupiny." }
};

// ---- Produktove znacky (znacka -> smluvni strana) ------------------------
const BRANDS = [
  { slug: "idoklad", name: "iDoklad", desc: "Online fakturace pro živnostníky a malé firmy.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" } },
  { slug: "money-s3", name: "Money S3", desc: "Účetní a ekonomický systém pro malé firmy.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" } },
  { slug: "money-erp", name: "Money ERP", desc: "ERP systém pro střední a rostoucí firmy.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" } },
  { slug: "evala", name: "Evala", desc: "Online účetnictví a fakturace v cloudu.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" } },
  { slug: "vema", name: "Vema", desc: "Personalistika, mzdy a HR pro organizace.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" } },
  { slug: "byznys", name: "Byznys", desc: "Podnikový informační systém pro střední a velké firmy.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" } },
  { slug: "vario", name: "Vario", desc: "Modulární ERP a podnikový systém.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" } },
  { slug: "onecore", name: "OneCore", desc: "Systém pro autopůjčovny a operativní leasing.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" } },
  { slug: "dotykacka", name: "Dotykačka", desc: "Pokladní a prodejní systém pro provozovny.",
    provider: { CZ: "dotykacka-cr" } },
  { slug: "prodejna-sql", name: "Prodejna SQL", desc: "Pokladní a skladový software pro maloobchod.",
    provider: { CZ: "dotykacka-cr" } },
  { slug: "profi-uctenka", name: "Profi Účtenka", desc: "Mobilní pokladna pro drobné podnikatele.",
    provider: { CZ: "dotykacka-cr" } },
  { slug: "smartpos", name: "SmartPOS", desc: "Platební terminál s pokladnou v jednom.",
    provider: { CZ: "dotykacka-cr" } },
  { slug: "fleetware", name: "Fleetware", desc: "Sledování a správa vozového parku.",
    provider: { CZ: "radium" } },
  { slug: "t-cars", name: "T-Cars", desc: "Systém pro správu vozového parku a leasing.",
    provider: { CZ: "t-cars-system" } },
  { slug: "commander", name: "Commander", desc: "Monitoring vozidel a kniha jízd.",
    provider: { SK: "commander-services" } }
];

// ---- Skupinove cesty (M&A, media) - jen kontaktni karta, zadna poptavka ---
const GROUP = {
  ma: {
    entity: "seyfor-as",
    label: "Prodej firmy nebo vstup do skupiny (M&A)",
    desc: "Kontakt na akviziční tým pro majitele firem, kteří zvažují prodej nebo vstup do skupiny Seyfor.",
    contactName: "Akviziční tým Seyfor",
    phone: null, email: "ma@seyfor.com",
    note: "Samotný proces vedeme individuálně. Zde najdete jen kontakt."
  },
  press: {
    entity: "seyfor-as",
    label: "Pro novináře a média",
    desc: "Tiskový a PR kontakt skupiny Seyfor pro média a tiskové dotazy.",
    contactName: "Tiskové oddělení Seyfor",
    phone: null, email: "press@seyfor.com",
    note: "Nejde o fakturační vztah. Kontakt slouží výhradně médiím."
  },
  career: {
    entity: "seyfor-as",
    label: "Kariéra a nábor",
    desc: "Kontakt na náborový tým. Výběrová řízení a otevřené pozice vedeme jinde.",
    contactName: "Náborový tým Seyfor",
    phone: null, email: "kariera@seyfor.com",
    note: "Samotná výběrová řízení probíhají jinde. Zde je jen kontaktní karta."
  }
};

// ---- Podpora a reklamace - smerovka na support znacky (bez odkazu ven) ----
// Hard rule: zadne odkazy ven na produktove weby. Support je SMEROVKA:
// rekneme, ze podporu resi smluvni strana znacky + obecna support linka.
const SUPPORT = {
  label: "Podpora a reklamace",
  desc: "Technickou podporu a reklamace řeší poskytovatel konkrétní značky. Vyberte produkt nebo nám zavolejte na obecnou linku.",
  phone: null,
  email: "podpora@seyfor.com"
};

// ---- Obecny kontakt (zachytna sit) ---------------------------------------
const GENERAL = {
  label: "Obecný kontakt",
  desc: "Když si nejste jistí, kam patříte. Spojíme vás dál.",
  entity: "seyfor-as",
  phone: null,
  email: "kontakt@seyfor.com"
};

// ---- Pravni a smluvni info -----------------------------------------------
const LEGAL = {
  label: "Právní a smluvní informace",
  desc: "Seyfor je skupina samostatných právních osob. Smluvní strana se liší podle vybrané služby; konkrétní firmu a IČO najdete vždy na kartě dané služby.",
  operator: "seyfor-as"
};

// ---- Vrstva pobocek (fyzicka mista) --------------------------------------
// pobocka = adresa + recepcni telefon. NIKDY nenese ICO ani smluvni stranu.
// recepce = recepcni linka pobocky (UKAZKOVA DATA). geoQuery = textovy dotaz
// do map (nevymyslime souradnice; navigujeme na znamou oblast, presnou
// adresu doplnime). placeholder:true = adresu i obsazeni zatim nemame.
const BRANCHES = [
  {
    id: "rustonka-praha",
    city: "Praha",
    label: "Rustonka",
    address: null,                         // presnou ulici/c.p. doplnime
    recepce: "+420 222 990 000",           // UKAZKOVA recepcni linka
    recepceSample: true,
    geoQuery: "Rustonka, Praha 8",         // znama oblast (real), presny vchod doplnime
    placeholder: false
  }
];

// 16 dalsich pobocek: data zatim nemame -> oznacene placeholdery (pocet 17).
for (let i = 2; i <= 17; i++) {
  BRANCHES.push({
    id: "pobocka-" + String(i).padStart(2, "0"),
    city: null, label: null, address: null,
    recepce: null, recepceSample: false, geoQuery: null,
    placeholder: true
  });
}

// ---- Obsazeni pobocek (kdo na adrese sedi) -------------------------------
// branch -> id pobocky; display -> nazev na cedulce; entryType divize|firma|znacka;
// entity -> klic do ENTITIES (MOST na smluvni stranu); spot -> patro (UKAZKOVE);
// bridge -> tichy most divize/znacka -> firma.
const BRANCH_PRESENCE = [
  { branch: "rustonka-praha", display: "Seyfor Solutions", entryType: "divize",
    entity: "seyfor-solutions", spot: "3. patro", spotSample: true, bridge: null },
  { branch: "rustonka-praha", display: "Seyfor Products", entryType: "divize",
    entity: "seyfor-cesko", spot: "3. patro", spotSample: true,
    bridge: "Divize Products, smluvní strana Seyfor Česko." },
  { branch: "rustonka-praha", display: "Seyfor, a. s.", entryType: "firma",
    entity: "seyfor-as", spot: "4. patro", spotSample: true,
    bridge: "Skupinová a akviziční agenda (M&A, média)." },
  { branch: "rustonka-praha", display: "Datacruit", entryType: "znacka",
    entity: "datacruit", spot: "2. patro", spotSample: true,
    bridge: "Samostatná značka skupiny (vlastní doména datacruit.com)." }
];

// ---- UKAZKOVE osoby ------------------------------------------------------
// jmeno -> tym (divize) -> pobocka -> recepce (z BRANCHES). UKAZKOVA DATA.
// Volame VZDY recepci pobocky, ne osobni linku.
const PEOPLE = [
  { name: "Jan Novák", team: "Seyfor Solutions", division: "seyfor-solutions",
    branch: "rustonka-praha", sample: true },
  { name: "Petra Svobodová", team: "Seyfor Products", division: "seyfor-products",
    branch: "rustonka-praha", sample: true },
  { name: "Martin Dvořák", team: "Seyfor, a. s. (skupina)", division: null,
    entity: "seyfor-as", branch: "rustonka-praha", sample: true },
  { name: "Eva Horáková", team: "Datacruit", division: null,
    entity: "datacruit", branch: "rustonka-praha", sample: true }
];

// ---- Texty prepinace zeme (UI je jen CZ) ---------------------------------
const COUNTRIES = { CZ: { code: "CZ", label: "ČR" }, SK: { code: "SK", label: "SK" } };

window.SEYFOR_DATA = {
  ENTITIES, DIVISIONS, BRANDS, GROUP, SUPPORT, GENERAL, LEGAL,
  BRANCHES, BRANCH_PRESENCE, PEOPLE, COUNTRIES
};
