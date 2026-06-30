/*
 * Seyfor kontaktni sekce - datova vrstva prototypu (stav k 1.1.2027)
 * ------------------------------------------------------------------
 * AKCNE-VYHLEDAVACI MODEL. Jeden vstup rozpozna typ (jmeno / znacka /
 * firma / ICO / mesto-pobocka) a vrati kartu s AKCNIM tlacitkem
 * (Volat / Kopirovat / Navigovat), ne lead formular.
 *
 * SSOT:
 *   - ENTITIES   = pravnicke osoby (drzi ICO/DIC/sidlo/datovku)
 *   - DIVISIONS  = divize -> smluvni strana
 *   - BRANDS     = znacka / produktova oblast -> smluvni strana
 *   - BRANCHES   = fyzicka mista (adresa + recepcni telefon)
 *   - BRANCH_PRESENCE = kdo na adrese fyzicky sedi
 *   - PEOPLE     = ukazkove osoby pro demonstraci toku "jmeno -> recepce"
 *
 * Prazdne identifikacni hodnoty se renderuji jako oznaceny placeholder
 * "doplnime k 1.1.2027". Nevymyslime ICO novych subjektu.
 */

// ---- Smluvni strany (pravnicke osoby) ------------------------------------
const ENTITIES = {
  "seyfor-solutions": {
    name: "Seyfor Solutions, a. s.",
    shortName: "Seyfor Solutions",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ",
    ownershipPct: 100,
    desc: "Samostatná firma pro software a služby Seyfor Solutions v ČR od 1. 1. 2027.",
    assumption: true
  },
  "seyfor-cesko": {
    name: "Seyfor Česko, a. s.",
    shortName: "Seyfor Česko",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ",
    ownershipPct: 100,
    desc: "Nová právní entita pro jádrové Products brandy v ČR od 1. 1. 2027.",
    assumption: true
  },
  "seyfor-as": {
    name: "Seyfor, a. s.",
    shortName: "Seyfor",
    ico: "01572377",
    dic: "CZ01572377",
    sidlo: "Drobného 49, 602 00 Brno",
    datovka: null,
    country: "CZ/SK",
    desc: "Mateřská firma skupiny Seyfor. Pro web zůstává smluvní stranou pro M&A, média a skupinové kontakty."
  },
  "seyfor-slovensko": {
    name: "Seyfor Slovensko, a. s.",
    shortName: "Seyfor Slovensko",
    ico: null,
    dic: null,
    sidlo: "Plynárenská 7/C, 821 09 Bratislava",
    datovka: null,
    country: "SK",
    ownershipPct: 100,
    desc: "Slovenská právní entita skupiny. Od 1. 1. 2027 navenek jedna smluvní strana pro SK část Products i Solutions.",
    assumption: true
  },
  "seyfor-doo-si": {
    name: "Seyfor d.o.o. (SI)",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "SI",
    ownershipPct: 100,
    desc: "Slovinská právní entita skupiny Seyfor."
  },
  "seyfor-doo-rs": {
    name: "Seyfor d.o.o. (RS)",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "RS",
    ownershipPct: 100,
    desc: "Srbská právní entita skupiny Seyfor."
  },
  "seyfor-hrvatska-doo": {
    name: "Seyfor Hrvatska d.o.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "HR",
    ownershipPct: 100,
    desc: "Chorvatská právní entita skupiny Seyfor."
  },
  "vasco-doo": {
    name: "Vasco d.o.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "SI",
    ownershipPct: 100,
    desc: "Slovinská právní entita skupiny Seyfor."
  },
  "commander-services": {
    name: "Commander Services s.r.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "SK",
    ownershipPct: 100,
    desc: "Slovenská právní entita skupiny pro systémy sledování vozů Commander.",
    assumption: true
  },
  "radium": {
    name: "Radium s.r.o.",
    ico: "61247685",
    dic: null,
    sidlo: "nám. Chuchelských bojovníků 18/1, Praha 5",
    datovka: null,
    country: "CZ",
    ownershipPct: 100,
    desc: "Právní entita skupiny pro značku Fleetware."
  },
  "ks-program": {
    name: "KS-program, s.r.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ",
    ownershipPct: 100,
    desc: "Právní entita skupiny pro personální a mzdové systémy KS Program.",
    assumption: true
  },
  "t-cars-system": {
    name: "T-Cars System s.r.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ",
    ownershipPct: 100,
    desc: "Právní entita skupiny pro systémy sledování vozů T-Cars.",
    assumption: true
  },
  "ncc": {
    name: "NCC, a.s.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "SK",
    ownershipPct: 100,
    desc: "Slovenská právní entita skupiny Seyfor a současně BU v oblasti Business Apps.",
    assumption: true
  },
  "datacruit": {
    name: "Datacruit s.r.o.",
    ico: "03545652",
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ",
    ownershipPct: 100,
    desc: "Samostatná dceřiná firma skupiny pro ATS Datacruit."
  },
  "revolution-software": {
    name: "Revolution Software Kft.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "HU",
    ownershipPct: 100,
    desc: "Maďarská právní entita skupiny Seyfor."
  },
  "mi-systems": {
    name: "M&I Systems, Co.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "RS",
    ownershipPct: 70,
    desc: "Srbská právní entita skupiny Seyfor."
  },
  "besteron": {
    name: "Besteron a.s.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "SK",
    ownershipPct: 68,
    desc: "Slovenská právní entita skupiny pro platební bránu Besteron.",
    assumption: true
  },
  "dotykacka-holding": {
    name: "Dotykačka holding a.s.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ",
    ownershipPct: 58.5,
    desc: "Mezivlastnický holding ve skupině Seyfor pro pokladní a platební systémy.",
    assumption: true
  },
  "dotykacka-cr": {
    name: "Dotykačka ČR s.r.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ",
    desc: "Právní entita pod Dotykačka holding a.s. pro pokladní produkty Dotykačka, Prodejna SQL, Profi Účtenka a SmartPOS.",
    assumption: true
  },
  "dotypay": {
    name: "Dotypay s.r.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ",
    desc: "Právní entita pod Dotykačka holding a.s. pro platební systémy.",
    assumption: true
  },
  "markeeta-slovensko": {
    name: "Markeeta Slovensko s.r.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "SK",
    desc: "Právní entita pod Dotykačka holding a.s. pro pokladní software Markeeta.",
    assumption: true
  },
  "kasamax-eu": {
    name: "KASAmax EU s.r.o.",
    ico: null,
    dic: null,
    sidlo: null,
    datovka: null,
    country: "CZ",
    ownershipPct: 90,
    desc: "Právní entita pod Dotykačka holding a.s. pro pokladní software KASAmax.",
    assumption: true
  },
  "aibility": {
    name: "AIbility s.r.o.",
    ico: "10684395",
    dic: "CZ10684395",
    sidlo: "Drobného 555/49, Brno",
    datovka: null,
    country: "CZ",
    ownershipPct: 55,
    desc: "Právní entita skupiny pro AI poradenství a AI gramotnost."
  },
  "recruitis-io": {
    name: "Recruitis.io s.r.o.",
    ico: "27508391",
    dic: "CZ27508391",
    sidlo: "Chmelova 357/2, Hradec Králové",
    datovka: null,
    country: "CZ",
    ownershipPct: 37.95,
    desc: "Přidružená právní entita skupiny Seyfor pro ATS Recruitis."
  },
  "raynet-holding": {
    name: "RAYNET Holding s.r.o.",
    ico: "29496837",
    dic: null,
    sidlo: "Hlavní třída 6078/13, 708 00 Ostrava-Poruba",
    datovka: null,
    country: "CZ",
    ownershipPct: 40,
    desc: "Přidružená právní entita ve skupině Seyfor a kanonický domov 40% podílu Seyforu v Raynet."
  },
  "raynet": {
    name: "RAYNET s.r.o.",
    ico: "26843820",
    dic: null,
    sidlo: "Hlavní třída 6078/13, Ostrava",
    datovka: null,
    country: "CZ",
    ownershipPct: 100,
    desc: "Operační CRM entita pod RAYNET Holding s.r.o."
  }
};

const GROUP_ENTITIES = [
  "seyfor-cesko",
  "seyfor-as",
  "seyfor-slovensko",
  "seyfor-doo-si",
  "seyfor-doo-rs",
  "seyfor-hrvatska-doo",
  "vasco-doo",
  "commander-services",
  "radium",
  "ks-program",
  "t-cars-system",
  "ncc",
  "datacruit",
  "revolution-software",
  "mi-systems",
  "besteron",
  "dotykacka-holding",
  "dotykacka-cr",
  "dotypay",
  "markeeta-slovensko",
  "kasamax-eu",
  "aibility",
  "recruitis-io",
  "raynet-holding",
  "raynet"
];

// ---- Divize -> smluvni strana --------------------------------------------
const DIVISIONS = {
  "seyfor-solutions": {
    display: "Seyfor Solutions",
    entity: "seyfor-solutions",
    desc: "Implementace, konzultace a rozvoj podnikového softwaru v ČR."
  },
  "seyfor-products": {
    display: "Seyfor Products",
    entity: "seyfor-cesko",
    desc: "Účetní, ekonomické a HR produkty skupiny v ČR."
  }
};

// ---- Produktove znacky / oblasti (znacka -> smluvni strana) --------------
const BRANDS = [
  { slug: "idoklad", name: "iDoklad", desc: "Online fakturace pro živnostníky a malé firmy.", provider: { CZ: "seyfor-cesko" } },
  { slug: "money-s3", name: "Money S3", desc: "Účetní a ekonomický systém pro malé firmy.", provider: { CZ: "seyfor-cesko" } },
  { slug: "money-erp", name: "Money ERP", desc: "ERP systém pro střední a rostoucí firmy.", provider: { CZ: "seyfor-cesko" } },
  { slug: "evala", name: "Evala", desc: "Online účetnictví a fakturace v cloudu.", provider: { CZ: "seyfor-cesko" } },
  { slug: "vema", name: "Vema", desc: "Personalistika, mzdy a HR pro organizace.", provider: { CZ: "seyfor-cesko" } },
  { slug: "byznys", name: "Byznys", desc: "Podnikový informační systém pro střední a velké firmy.", provider: { CZ: "seyfor-cesko" } },
  { slug: "vario", name: "Vario", desc: "Modulární ERP a podnikový systém.", provider: { CZ: "seyfor-cesko" } },
  { slug: "onecore", name: "OneCore", desc: "Systém pro autopůjčovny a operativní leasing.", provider: { CZ: "seyfor-cesko" } },

  { slug: "d365-cz", name: "Dynamics 365 CZ", desc: "Microsoft Dynamics 365 a navazující služby pro český trh.", provider: { CZ: "seyfor-solutions" } },
  { slug: "infor-cz", name: "Infor CZ", desc: "Infor LN, Infor Visual a navazující podniková řešení v ČR.", provider: { CZ: "seyfor-solutions" } },
  { slug: "incadea", name: "incadea", desc: "DMS řešení pro automotive segment.", provider: { CZ: "seyfor-solutions" } },
  { slug: "ecustoms", name: "eCustoms", desc: "Celní a eGovernment řešení.", provider: { CZ: "seyfor-solutions" } },
  { slug: "techniserv", name: "Techniserv", desc: "Technická a integrační řešení.", provider: { CZ: "seyfor-solutions" } },
  { slug: "data-ai", name: "Data & AI", desc: "Datová analytika, reporting a AI řešení.", provider: { CZ: "seyfor-solutions" } },
  { slug: "m365-adopce", name: "M365 & Adopce", desc: "Microsoft 365, adopce a moderní spolupráce.", provider: { CZ: "seyfor-solutions" } },
  { slug: "azure-security", name: "Azure & Security", desc: "Cloudová infrastruktura a kyberbezpečnost.", provider: { CZ: "seyfor-solutions" } },
  { slug: "gesteem", name: "Gesteem", desc: "Moderní digitální řešení v rámci Seyfor Solutions.", provider: { CZ: "seyfor-solutions" } },

  { slug: "vema-sk", name: "Vema SK", desc: "HR a mzdové řešení pro slovenský trh.", provider: { SK: "seyfor-slovensko" } },
  { slug: "money-s3-sk", name: "Money S3 SK", desc: "Money S3 pro slovenský trh.", provider: { SK: "seyfor-slovensko" } },
  { slug: "idoklad-sk", name: "iDoklad SK", desc: "iDoklad pro slovenský trh.", provider: { SK: "seyfor-slovensko" } },
  { slug: "money-erp-sk", name: "Money ERP SK", desc: "Money ERP pro slovenský trh.", provider: { SK: "seyfor-slovensko" } },
  { slug: "d365-sk", name: "D365 SK", desc: "Microsoft Dynamics 365 pro slovenský trh.", provider: { SK: "seyfor-slovensko" } },
  { slug: "infor-sk", name: "Infor SK", desc: "Infor řešení pro slovenský trh.", provider: { SK: "seyfor-slovensko" } },

  { slug: "dotykacka", name: "Dotykačka", desc: "Pokladní a prodejní systém pro provozovny.", provider: { CZ: "dotykacka-cr" } },
  { slug: "prodejna-sql", name: "Prodejna SQL", desc: "Pokladní a skladový software pro maloobchod.", provider: { CZ: "dotykacka-cr" } },
  { slug: "profi-uctenka", name: "Profi Účtenka", desc: "Mobilní pokladna pro drobné podnikatele.", provider: { CZ: "dotykacka-cr" } },
  { slug: "smartpos", name: "SmartPOS", desc: "Platební terminál s pokladnou v jednom.", provider: { CZ: "dotykacka-cr" } },
  { slug: "fleetware", name: "Fleetware", desc: "Sledování a správa vozového parku.", provider: { CZ: "radium" } },
  { slug: "t-cars", name: "T-Cars", desc: "Systém pro správu vozového parku a leasing.", provider: { CZ: "t-cars-system" } },
  { slug: "commander", name: "Commander", desc: "Monitoring vozidel a kniha jízd.", provider: { SK: "commander-services" } }
];

// ---- Skupinove cesty -----------------------------------------------------
const GROUP = {
  ma: {
    entity: "seyfor-as",
    label: "Prodej firmy nebo vstup do skupiny (M&A)",
    desc: "Kontakt na akviziční tým pro majitele firem, kteří zvažují prodej nebo vstup do skupiny Seyfor.",
    contactName: "Akviziční tým Seyfor",
    phone: null,
    email: "ma@seyfor.com",
    note: "Samotný proces vedeme individuálně. Zde najdete jen kontakt."
  },
  press: {
    entity: "seyfor-as",
    label: "Pro novináře a média",
    desc: "Tiskový a PR kontakt skupiny Seyfor pro média a tiskové dotazy.",
    contactName: "Tiskové oddělení Seyfor",
    phone: null,
    email: "press@seyfor.com",
    note: "Nejde o fakturační vztah. Kontakt slouží výhradně médiím."
  },
  career: {
    entity: "seyfor-as",
    label: "Kariéra a nábor",
    desc: "Kontakt na náborový tým. Výběrová řízení a otevřené pozice vedeme jinde.",
    contactName: "Náborový tým Seyfor",
    phone: null,
    email: "kariera@seyfor.com",
    note: "Samotná výběrová řízení probíhají jinde. Zde je jen kontaktní karta."
  }
};

const SUPPORT = {
  label: "Podpora a reklamace",
  desc: "Technickou podporu a reklamace řeší poskytovatel konkrétní značky. Vyberte produkt nebo využijte obecný kontakt.",
  phone: null,
  email: "podpora@seyfor.com"
};

const GENERAL = {
  label: "Obecný kontakt",
  desc: "Když si nejste jistí, kam patříte. Spojíme vás dál.",
  entity: "seyfor-as",
  phone: "+420 511 182 400",
  email: "czinfo@seyfor.com"
};

const LEGAL = {
  label: "Právní a smluvní informace",
  desc: "Seyfor je skupina samostatných právních osob. Smluvní strana se liší podle vybrané služby; konkrétní firmu a IČO najdete vždy na kartě dané služby.",
  operator: "seyfor-as"
};

// ---- Vrstva pobocek (fyzicka mista) --------------------------------------
const BRANCHES = [
  { id: "l-pra-rus", city: "Praha", label: "Sokolovská", address: "Sokolovská 695/115b, Praha", locationCode: "L-PRA-RUS", country: "CZ", size: "large", recepce: null, recepceSample: false, geoQuery: "Sokolovská 695/115b, Praha" },
  { id: "l-pra-str", city: "Praha", label: "Na strži", address: "Na strži 2097/63, Praha", locationCode: "L-PRA-STR", country: "CZ", size: "large", recepce: null, recepceSample: false, geoQuery: "Na strži 2097/63, Praha" },
  { id: "l-brn-aut", city: "Brno", label: "Okružní 732/5", address: "Okružní 732/5, Brno", locationCode: "L-BRN-AUT", country: "CZ", size: "large", recepce: null, recepceSample: false, geoQuery: "Okružní 732/5, Brno" },
  { id: "l-brn-dro", city: "Brno", label: "Drobného", address: "Drobného 555/49, Brno", locationCode: "L-BRN-DRO", country: "CZ", size: "large", recepce: "+420 511 182 400", recepceSample: false, geoQuery: "Drobného 555/49, Brno" },
  { id: "l-brn-vem", city: "Brno", label: "Okružní 871/3a", address: "Okružní 871/3a, Brno", locationCode: "L-BRN-VEM", country: "CZ", size: "large", recepce: null, recepceSample: false, geoQuery: "Okružní 871/3a, Brno" },
  { id: "l-usl-kli", city: "Ústí nad Labem", label: "Klíšská", address: "Klíšská 31, Ústí nad Labem", locationCode: "L-USL-KLI", country: "CZ", size: "large", recepce: null, recepceSample: false, geoQuery: "Klíšská 31, Ústí nad Labem" },
  { id: "l-pri-ziz", city: "Příbram", label: "Žižkova", address: "Žižkova 708, Příbram", locationCode: "L-PRI-ZIZ", country: "CZ", size: "large", recepce: null, recepceSample: false, geoQuery: "Žižkova 708, Příbram" },
  { id: "l-zli-vrs", city: "Zlín", label: "Pod Vrškem", address: "Pod Vrškem 5360, Zlín", locationCode: "L-ZLI-VRS", country: "CZ", size: "large", recepce: null, recepceSample: false, geoQuery: "Pod Vrškem 5360, Zlín" },
  { id: "l-ost-orc", city: "Ostrava", label: "Hornopolní", address: "Hornopolní 38, Ostrava", locationCode: "L-OST-ORC", country: "CZ", size: "large", recepce: null, recepceSample: false, geoQuery: "Hornopolní 38, Ostrava" },
  { id: "l-bra-ply", city: "Bratislava", label: "Plynárenská", address: "Plynárenská 7/C, Bratislava", locationCode: "L-BRA-PLY", country: "SK", size: "large", recepce: null, recepceSample: false, geoQuery: "Plynárenská 7/C, Bratislava" },

  { id: "l-pra-hne", city: "Praha", label: "Hněvkovská", address: "Hněvkovská 33, Praha", locationCode: "L-PRA-HNE", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Hněvkovská 33, Praha" },
  { id: "l-olo-vit", city: "Olomouc", label: "Na Zákopě", address: "Na Zákopě 452/1a, Olomouc", locationCode: "L-OLO-VIT", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Na Zákopě 452/1a, Olomouc" },
  { id: "l-olo-sle", city: "Olomouc", label: "Šlechtitelů", address: "Šlechtitelů 920, Olomouc", locationCode: "L-OLO-SLE", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Šlechtitelů 920, Olomouc" },
  { id: "l-kla-cti", city: "Kladno", label: "Ctiborova", address: "Ctiborova 3091, Kladno", locationCode: "L-KLA-CTI", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Ctiborova 3091, Kladno" },
  { id: "l-plz-pre", city: "Plzeň", label: "Přemyslova", address: "Přemyslova 23, Plzeň", locationCode: "L-PLZ-PRE", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Přemyslova 23, Plzeň" },
  { id: "l-kos-let", city: "Košice", label: "Letná", address: "Letná 42, Košice", locationCode: "L-KOS-LET", country: "SK", size: "small", recepce: null, recepceSample: false, geoQuery: "Letná 42, Košice" },
  { id: "l-bys-mas", city: "Bystřice nad Pernštejnem", label: "Masarykovo náměstí", address: "Masarykovo náměstí 11, Bystřice nad Pernštejnem", locationCode: "L-BYS-MAS", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Masarykovo náměstí 11, Bystřice nad Pernštejnem" },
  { id: "l-bab-sla", city: "Banská Bystrica", label: "Sládkovičova", address: "Sládkovičova 29, Banská Bystrica", locationCode: "L-BAB-SLA", country: "SK", size: "small", recepce: null, recepceSample: false, geoQuery: "Sládkovičova 29, Banská Bystrica" },
  { id: "l-ost-roh", city: "Ostrava", label: "Roháčova", address: "Roháčova 3339/5, Ostrava", locationCode: "L-OST-ROH", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Roháčova 3339/5, Ostrava" },
  { id: "l-cbu-kam", city: "České Budějovice", label: "Kamarytova", address: "Kamarytova 2689, České Budějovice", locationCode: "L-CBU-KAM", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Kamarytova 2689, České Budějovice" },
  { id: "l-hod-svc", city: "Hodonín", label: "Sv. Čecha", address: "Sv. Čecha 2461/4, Hodonín", locationCode: "L-HOD-SVC", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Sv. Čecha 2461/4, Hodonín" },
  { id: "l-ost-let", city: "Ostrava", label: "Letiště Mošnov", address: "Letiště Mošnov 401, Ostrava", locationCode: "L-OST-LET", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Letiště Mošnov 401, Ostrava" },
  { id: "l-ost-bra", city: "Ostrava", label: "Brandlova", address: "Brandlova 1267/6, Ostrava", locationCode: "L-OST-BRA", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Brandlova 1267/6, Ostrava" },
  { id: "l-brn-sad", city: "Brno", label: "Nové sady", address: "Nové sady 988/2, Brno", locationCode: "L-BRN-SAD", country: "CZ", size: "small", recepce: null, recepceSample: false, geoQuery: "Nové sady 988/2, Brno" },
  { id: "l-pre-kup", city: "Prešov", label: "Kúpeľná", address: "Kúpeľná 3, Prešov", locationCode: "L-PRE-KUP", country: "SK", size: "small", recepce: null, recepceSample: false, geoQuery: "Kúpeľná 3, Prešov" }
].map(branch => ({ ...branch, placeholder: false }));

// ---- Obsazeni pobocek (kdo na adrese sedi) -------------------------------
function pres(branch, display, entryType, entity, bridge) {
  return {
    branch,
    display,
    entryType,
    entity,
    spot: "přítomnost v alokační matici",
    spotSample: false,
    bridge: bridge || null
  };
}

const BRANCH_PRESENCE = [
  pres("l-pra-rus", "Seyfor Česko, a. s.", "firma", "seyfor-cesko", "S3, S4/S5, Vario a HR&Payroll."),
  pres("l-pra-rus", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "D365, Data Analytics, eCustoms a TMA."),
  pres("l-pra-rus", "Seyfor, a. s.", "firma", "seyfor-as", "Finance, IS, Marketing, IT a People&Culture."),
  pres("l-pra-rus", "Datacruit", "znacka", "datacruit", "Samostatná značka skupiny."),

  pres("l-pra-str", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "Gesteem, M365, Power Apps a Azure & Security."),
  pres("l-pra-str", "Seyfor, a. s.", "firma", "seyfor-as", "Finance, IT a People&Culture."),

  pres("l-brn-aut", "Seyfor Česko, a. s.", "firma", "seyfor-cesko", "Evala, Byznys, S4/S5 a Prytanis."),
  pres("l-brn-aut", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "Infor, Data Analytics a Techniserv."),
  pres("l-brn-aut", "Seyfor, a. s.", "firma", "seyfor-as", "Finance, P&C, IS, Marketing a IT."),
  pres("l-brn-aut", "Seyfor, a. s.", "firma", "seyfor-as", "Skupinová agenda."),

  pres("l-brn-dro", "Seyfor Česko, a. s.", "firma", "seyfor-cesko", "S3, iDoklad a Evala."),
  pres("l-brn-dro", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "Dynamics 365 CZ."),
  pres("l-brn-dro", "Seyfor, a. s.", "firma", "seyfor-as", "IS, Marketing, IT a People&Culture."),

  pres("l-brn-vem", "Seyfor Česko, a. s.", "firma", "seyfor-cesko", "HR&Payroll / Vema."),
  pres("l-brn-vem", "Seyfor Slovensko, a. s.", "firma", "seyfor-slovensko", "D365 SK a PAD v alokační matici."),
  pres("l-brn-vem", "Seyfor, a. s.", "firma", "seyfor-as", "Finance, Marketing a People&Culture."),

  pres("l-usl-kli", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "D365 CZ, ICT, BPO a WAD."),
  pres("l-usl-kli", "Seyfor, a. s.", "firma", "seyfor-as", "Finance, IS, IT a People&Culture."),

  pres("l-pri-ziz", "Seyfor Česko, a. s.", "firma", "seyfor-cesko", "Byznys."),
  pres("l-pri-ziz", "Seyfor, a. s.", "firma", "seyfor-as", "Finance, IS, Marketing a People&Culture."),

  pres("l-zli-vrs", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "D365 CZ, incadea, OneCore a D3 SOFT."),
  pres("l-zli-vrs", "Seyfor, a. s.", "firma", "seyfor-as", "Finance, IS, Marketing, IT a People&Culture."),

  pres("l-ost-orc", "Seyfor Česko, a. s.", "firma", "seyfor-cesko", "iDoklad."),
  pres("l-ost-orc", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "incadea, TMA, D3 SOFT a SOC."),
  pres("l-ost-orc", "Seyfor, a. s.", "firma", "seyfor-as", "IS, Marketing a People&Culture."),

  pres("l-bra-ply", "Seyfor Slovensko, a. s.", "firma", "seyfor-slovensko", "S3, S4/S5, HR&Payroll, D365 SK, OneCore a Infor SK."),

  pres("l-pra-hne", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "Techniserv."),
  pres("l-olo-vit", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "incadea a OneCore."),
  pres("l-olo-sle", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "D3 SOFT."),
  pres("l-kla-cti", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "Infor."),
  pres("l-plz-pre", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "Infor."),
  pres("l-kos-let", "Seyfor Slovensko, a. s.", "firma", "seyfor-slovensko", "HR&Payroll a Dynamics 365."),
  pres("l-bys-mas", "Seyfor Česko, a. s.", "firma", "seyfor-cesko", "Product OVH."),
  pres("l-bab-sla", "Seyfor Slovensko, a. s.", "firma", "seyfor-slovensko", "HR&Payroll."),
  pres("l-ost-roh", "Seyfor Česko, a. s.", "firma", "seyfor-cesko", "HR&Payroll."),
  pres("l-cbu-kam", "Seyfor Česko, a. s.", "firma", "seyfor-cesko", "HR&Payroll."),
  pres("l-hod-svc", "Seyfor Česko, a. s.", "firma", "seyfor-cesko", "HR&Payroll."),
  pres("l-ost-let", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "Techniserv."),
  pres("l-ost-bra", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "Techniserv."),
  pres("l-brn-sad", "Seyfor Solutions, a. s.", "firma", "seyfor-solutions", "Data Analytics a Gesteem."),
  pres("l-pre-kup", "Seyfor Slovensko, a. s.", "firma", "seyfor-slovensko", "S3, iDoklad a S4/S5.")
];

// ---- UKAZKOVE osoby ------------------------------------------------------
const PEOPLE = [
  { name: "Jan Novák", team: "Seyfor Solutions, a. s.", division: "seyfor-solutions", branch: "l-pra-rus", sample: true },
  { name: "Petra Svobodová", team: "Seyfor Česko, a. s.", division: "seyfor-products", branch: "l-brn-dro", sample: true },
  { name: "Martin Dvořák", team: "Seyfor, a. s. (skupina)", division: null, entity: "seyfor-as", branch: "l-brn-dro", sample: true },
  { name: "Eva Horáková", team: "Datacruit", division: null, entity: "datacruit", branch: "l-pra-rus", sample: true }
];

const COUNTRIES = { CZ: { code: "CZ", label: "ČR" }, SK: { code: "SK", label: "SK" } };

window.SEYFOR_DATA = {
  ENTITIES,
  GROUP_ENTITIES,
  DIVISIONS,
  BRANDS,
  GROUP,
  SUPPORT,
  GENERAL,
  LEGAL,
  BRANCHES,
  BRANCH_PRESENCE,
  PEOPLE,
  COUNTRIES
};
