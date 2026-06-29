/*
 * Seyfor kontaktni sekce — datova vrstva prototypu (stav k 1.1.2027)
 * ------------------------------------------------------------------
 * Lookup tabulka most ZNACKA -> SMLUVNI STRANA (firma + IC/DIC/sidlo + zeme).
 * Karta, formular i paticka ctou z TOHOTO jednoho zdroje.
 * Pridani firmy = zmena dat zde, nikde jinde.
 *
 * Pole s hodnotou null se renderuji jako oznaceny placeholder
 * "doplnime k 1.1.2027" (nikdy prazdne pole).
 * Polozka "assumption: true" je predpoklad k overeni (napr. SK jadrove brandy).
 *
 * Archibald paralelne uklada kanonickou verzi do _knowledge/. Tento soubor
 * ma na ni sedet, ale pro prototyp staci data nize.
 */

// ---- Smluvni strany (pravnicke osoby) ------------------------------------
// klic -> identifikacni a fakturacni udaje firmy
const ENTITIES = {
  "seyfor-cesko": {
    name: "Seyfor Česko",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ"
  },
  "seyfor-slovensko": {
    name: "Seyfor Slovensko, a. s.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "SK",
    assumption: true
  },
  "dotykacka-cr": {
    name: "Dotykačka ČR s.r.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ"
  },
  "radium": {
    name: "Radium s.r.o.",
    ico: "61247685",
    dic: null,
    sidlo: "nám. Chuchelských bojovníků 18/1, Praha 5",
    datovka: null,
    country: "CZ"
  },
  "t-cars-system": {
    name: "T-Cars System s.r.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ"
  },
  "commander-services": {
    name: "Commander Services s.r.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "SK"
  },
  "seyfor-solutions": {
    name: "Seyfor Solutions",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ"
  },
  "seyfor-as": {
    name: "Seyfor, a. s.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ/SK"
  }
};

// ---- Produktove znacky (komercni cesta 2) --------------------------------
// Kazda znacka ma podle zeme prirazenou smluvni stranu (klic do ENTITIES).
// "provider" muze byt objekt { CZ: "...", SK: "..." } nebo jeden klic.
const BRANDS = [
  {
    slug: "idoklad",
    name: "iDoklad",
    desc: "Online fakturace pro živnostníky a malé firmy.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" }
  },
  {
    slug: "money-s3",
    name: "Money S3",
    desc: "Účetní a ekonomický systém pro malé firmy.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" }
  },
  {
    slug: "money-erp",
    name: "Money ERP",
    desc: "ERP systém pro střední a rostoucí firmy.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" }
  },
  {
    slug: "evala",
    name: "Evala",
    desc: "Online účetnictví a fakturace v cloudu.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" }
  },
  {
    slug: "vema",
    name: "Vema",
    desc: "Personalistika, mzdy a HR pro organizace.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" }
  },
  {
    slug: "byznys",
    name: "Byznys",
    desc: "Podnikový informační systém pro střední a velké firmy.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" }
  },
  {
    slug: "vario",
    name: "Vario",
    desc: "Modulární ERP a podnikový systém.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" }
  },
  {
    slug: "onecore",
    name: "OneCore",
    desc: "Systém pro autopůjčovny a operativní leasing.",
    provider: { CZ: "seyfor-cesko", SK: "seyfor-slovensko" }
  },
  {
    slug: "dotykacka",
    name: "Dotykačka",
    desc: "Pokladní a prodejní systém pro provozovny.",
    provider: { CZ: "dotykacka-cr" }
  },
  {
    slug: "prodejna-sql",
    name: "Prodejna SQL",
    desc: "Pokladní a skladový software pro maloobchod.",
    provider: { CZ: "dotykacka-cr" }
  },
  {
    slug: "profi-uctenka",
    name: "Profi Účtenka",
    desc: "Mobilní pokladna pro drobné podnikatele.",
    provider: { CZ: "dotykacka-cr" }
  },
  {
    slug: "smartpos",
    name: "SmartPOS",
    desc: "Platební terminál s pokladnou v jednom.",
    provider: { CZ: "dotykacka-cr" }
  },
  {
    slug: "fleetware",
    name: "Fleetware",
    desc: "Sledování a správa vozového parku.",
    provider: { CZ: "radium" }
  },
  {
    slug: "t-cars",
    name: "T-Cars",
    desc: "Systém pro správu vozového parku a leasing.",
    provider: { CZ: "t-cars-system" }
  },
  {
    slug: "commander",
    name: "Commander",
    desc: "Monitoring vozidel a kniha jízd.",
    provider: { SK: "commander-services" }
  }
];

// ---- Komercni cesta 1: Software a sluzby (divize Solutions) ----------------
const SOLUTIONS = {
  CZ: {
    entity: "seyfor-solutions",
    label: "Software a služby Seyfor",
    desc: "Implementace, konzultace a rozvoj podnikového softwaru divize Solutions."
  },
  SK: {
    entity: "seyfor-slovensko",
    label: "Softvér a služby Seyfor",
    desc: "Implementácia, konzultácie a rozvoj podnikového softvéru divízie Solutions."
  }
};

// ---- Skupinove cesty 3 + 4 (Seyfor, a. s.) --------------------------------
const GROUP = {
  ma: {
    entity: "seyfor-as",
    label: "Prodej nebo přidružení firmy do skupiny (M&A)",
    desc: "Akviziční kontakt pro majitele firem, kteří zvažují prodej nebo vstup do skupiny Seyfor.",
    showContractParty: true,
    isInvoicing: true,
    note: null
  },
  press: {
    entity: "seyfor-as",
    label: "Pro novináře a média",
    desc: "Tiskový a PR kontakt skupiny Seyfor pro média, novináře a tiskové dotazy.",
    showContractParty: false,
    isInvoicing: false,
    note: "Nejde o fakturační vztah. Tento kontakt slouží výhradně médiím a tiskovým dotazům."
  }
};

// ---- Texty prepinace zeme (ponechano pro referenci, UI je jen CZ) ---------
const COUNTRIES = {
  CZ: { code: "CZ", label: "ČR" },
  SK: { code: "SK", label: "SK" }
};

// ---- Vizualni hierarchie subjektu (jen CZ) --------------------------------
// Tri urovne vahy. Karta cte smluvni stranu z ENTITIES[key] primo na CZ.
// icon = klic do brandove ikonove sady (inline SVG v index.html, brand tokeny).
// logo = cesta k realnemu logu znacky, pokud existuje (jinak wordmark badge).
const HIERARCHY = {
  // PRIMARNI — dominantni, hero pozice
  primary: {
    key: "seyfor-solutions",
    brandName: "Seyfor Solutions",
    label: "Software a služby Seyfor",
    desc: "Implementace, konzultace a rozvoj podnikového softwaru. Divize Solutions je hlavní vstup pro firmy, které řeší informační systém na míru.",
    icon: "solutions",
    showParty: true
  },
  // SEKUNDARNI — stredni vaha
  secondary: [
    {
      key: "seyfor-cesko",
      brandName: "Seyfor Česko",
      label: "Produkty Seyfor",
      desc: "Účetní, ekonomické a HR produkty skupiny: iDoklad, Money, Vema, Byznys, Vario, Evala a další.",
      icon: "products",
      showParty: true
    },
    {
      key: "seyfor-as",
      brandName: "Seyfor, a. s.",
      label: "Skupina Seyfor",
      desc: "Mateřská společnost a provozovatel webu. Kontakt pro média a pro majitele firem, kteří zvažují prodej nebo vstup do skupiny.",
      icon: "building",
      showParty: true,
      purposes: ["ma", "press"]   // skupinove kontakty matky
    }
  ],
  // TERCIARNI — nejmene vyrazne, seskupene
  tertiary: [
    {
      key: "dotykacka-cr",
      brandName: "Dotykačka",
      desc: "Pokladní a prodejní systém pro provozovny.",
      logo: null
    },
    {
      key: "commander-services",
      brandName: "Commander",
      desc: "Monitoring vozidel a kniha jízd.",
      logo: null
    },
    {
      key: "radium",
      brandName: "Fleetware",
      desc: "Sledování a správa vozového parku.",
      logo: null
    },
    {
      key: "t-cars-system",
      brandName: "T-Cars",
      desc: "Správa vozového parku a leasing.",
      logo: "assets/t-cars-logo.svg"
    }
  ]
};

window.SEYFOR_DATA = { ENTITIES, BRANDS, SOLUTIONS, GROUP, COUNTRIES, HIERARCHY };
