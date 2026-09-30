import type { Task, PhaseInfo } from '@/types';

export const CONFIG = {
  STAND: 'September 2026',
  EO_MAX_TAG: 220,
  KZ_MIN: 215,
  SB_KIND: 350,
  SB_ERW: 700,
  KINDERABZUG_BUND: "6'700",
  FREMDBETREUUNG_BUND: "25'500",
  PHONE: '+41 71 221 00 11',
  EMAIL: 'info@vitasecura.ch',
};

export const PHASES: Record<number, PhaseInfo> = {
  1: { name: 'Vor der Geburt', cls: 'p1', box: 'peach', sub: 'Die wichtigsten Vorbereitungen, die sich früh und ohne Zeitdruck klären lassen.' },
  2: { name: 'Direkt nach der Geburt', cls: 'p2', box: 'rose', sub: 'Die ersten Schritte in den ersten Tagen – kurz, praktisch und ohne Überforderung.' },
  3: { name: 'Spätestens innert 3 Monaten', cls: 'p3', box: 'mint', sub: 'Jetzt werden die wichtigsten Anmeldungen und Anpassungen definitiv abgeschlossen.' },
  4: { name: 'Finanzen & Sicherheit', cls: 'p4', box: 'lav', sub: 'Die Fragen, die in vielen Beratungen zu kurz kommen – und die Punkte, an die fast keine Eltern denken.' },
};

const DAY = 86400000;
export const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
export const parseD = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const isoD = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
export const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, d.getDate());
export const fmt = (d: Date) => d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
export const diffDays = (d: Date) => Math.round((d.getTime() - today().getTime()) / DAY);
export const chf = (n: number) => 'CHF ' + Math.round(n).toLocaleString('de-CH').replace(/[',]/g, "'");

export function rel(d: Date) {
  const n = diffDays(d);
  if (n === 0) return 'heute';
  if (n === 1) return 'morgen';
  if (n > 1 && n < 14) return `in ${n} Tagen`;
  if (n >= 14 && n < 120) return `in ${Math.round(n / 7)} Wochen`;
  if (n >= 120) return `in ${Math.round(n / 30.4)} Monaten`;
  if (n === -1) return 'gestern';
  if (n > -14) return `vor ${-n} Tagen`;
  if (n > -120) return `vor ${Math.round(-n / 7)} Wochen`;
  return `vor ${Math.round(-n / 30.4)} Monaten`;
}

function nextNov30() {
  const t = today();
  let d = new Date(t.getFullYear(), 10, 30);
  if (t > d) d = new Date(t.getFullYear() + 1, 10, 30);
  return d;
}

export function buildTasks(ctx: { et: string; born: boolean; married: string; tz: boolean; selb: boolean }): Task[] {
  const et = parseD(ctx.et);
  const unm = ctx.married === 'nein';
  const tz = ctx.tz;
  const selb = ctx.selb;
  const C = CONFIG;
  const y = nextNov30().getFullYear();

  const L: Task[] = [
    { id: 'dokumente', ph: 1, rec: addDays(et, -28), t: 'Dokumente für die Geburtsmeldung klären', why: 'Spital, Geburtshaus oder Zivilstandsamt nach der persönlichen Liste fragen. Meist braucht es Ausweise, Familienausweis oder Heiratsurkunde.' },
    ...(unm ? [{ id: 'sorge', ph: 1, due: et, imp: true, t: 'Vaterschaft anerkennen und gemeinsame Sorge erklären', why: 'Die Anerkennung ist beim Zivilstandsamt schon vor der Geburt möglich. Ohne sie hat das Kind gegenüber dem Vater keine Unterhalts- und Erbansprüche. Erklärt die gemeinsame elterliche Sorge am besten gleich mit – sonst liegt sie allein bei der Mutter.' }] : []),
    { id: 'kvg_wahl', ph: 1, due: et, sec: true, topic: 'Grundversicherung Baby', tool: 'check:babykk', t: 'Grundversicherung fürs Baby vergleichen', why: `Kasse, Modell und Kostenbeteiligung bewusst wählen. Das Baby darf bei einer anderen Kasse versichert sein als ihr. Für Kinder ist die Franchise 0 möglich, der Selbstbehalt ist auf CHF ${C.SB_KIND} pro Jahr begrenzt.` },
    { id: 'zusatz', ph: 1, due: et, sec: true, imp: true, topic: 'Zusatzversicherung Baby', tool: 'check:babykk', t: 'Zusatzversicherung vor der Geburt anmelden', why: 'Vor der Geburt ist das meist ohne Gesundheitsprüfung möglich. Zahn, Spital und Ausland gezielt anschauen – nicht automatisch alles abschliessen. Die Grundversicherung zahlt keine Kieferorthopädie – ein Zahnzusatz ist früh am einfachsten, später prüfen die Versicherer die Zähne.' },
    { id: 'kinderarzt', ph: 1, rec: addDays(et, -42), t: 'Kinderarztpraxis auswählen', why: 'Erreichbarkeit und Aufnahme neuer Patienten früh sichern. In vielen Regionen sind die Praxen voll.' },
    { id: 'hebamme', ph: 1, rec: addDays(et, -56), t: 'Hebamme und Wochenbett organisieren', why: 'Hausbesuche der Hebamme bis 56 Tage nach der Geburt zahlt die Grundversicherung – ohne Franchise und Selbstbehalt. Hebammen sind gefragt – fragt deshalb früh an.' },
    ...(!selb ? [{ id: 'arbeitgeber', ph: 1, t: 'Arbeitgeber informieren, Rückkehr besprechen', why: 'Urlaub, Ferien, Pensum und Stillzeiten klären und den Partnerurlaub gleich mitplanen. Während der ganzen Schwangerschaft und 16 Wochen nach der Geburt darf der Arbeitgeber nicht kündigen.' }] : []),
    { id: 'kita', ph: 1, t: 'Kita oder Betreuungslösung vormerken', why: 'In vielen Regionen gibt es Wartelisten von über einem Jahr. Frühes Reservieren lohnt sich.' },
    { id: 'kindersitz', ph: 1, rec: addDays(et, -14), t: 'Kindersitz vor der ersten Fahrt vorbereiten', why: 'Modell wählen, Einbau testen – die Heimfahrt aus dem Spital ist die erste Fahrt.' },
    { id: 'ausstattung', ph: 1, t: 'Erstausstattung bewusst planen', why: 'Lieber funktional als zu viel: Vieles kann warten, vieles gibt es gebraucht oder zum Ausleihen.' },
    { id: 'budget', ph: 1, tool: 'budget', topic: 'Budget & Reserve', t: 'Familienbudget vorher und nachher ausfüllen', why: 'Prämien, Betreuung und Einkommensänderungen mitdenken. Die Differenz zwischen vorher und nachher ist die wichtigste Zahl im ganzen Kompass. Mit der ersten echten Kita-Rechnung nochmals nachführen.' },
    { id: 'notfallkontakte', ph: 1, tool: 'notfall', t: 'Notfallkontakte bestimmen', why: 'Wer hilft, wenn spontan Unterstützung nötig ist? Direkt in eurer Notfallkarte eintragen.' },
    { id: 'geburtsmeldung', ph: 2, due: addDays(et, 3), t: 'Geburtsmeldung kontrollieren', why: 'Die Geburt muss innert 3 Tagen beim Zivilstandsamt des Geburtsorts gemeldet sein. Meist übernimmt das Spital oder das Geburtshaus – lasst es euch kurz bestätigen. Bei einer Hausgeburt meldet die Hebamme oder ihr selbst.' },
    { id: 'urkunde', ph: 2, rec: addDays(et, 14), t: 'Geburtsurkunde bestellen, falls benötigt', why: 'Zum Beispiel für Arbeitgeber, Ausland, Ausweise oder Behörden. Bei Bedarf gleich mehrere Exemplare.' },
    { id: 'eo', ph: 2, rec: addDays(et, 14), t: 'Mutterschaftsentschädigung (EO) anmelden', why: (selb ? 'Gilt auch für Selbstständige – Basis ist das AHV-pflichtige Einkommen. Die Anmeldung macht ihr direkt bei der Ausgleichskasse. ' : 'Läuft in der Regel über den Arbeitgeber und die Ausgleichskasse. Formular, Zuständigkeit und Lohnfortzahlung klären. ') + `14 Wochen ab Geburt, 80 % des Lohns, höchstens CHF ${C.EO_MAX_TAG} pro Tag.` },
    { id: 'zulagen', ph: 2, rec: addDays(et, 14), t: 'Familienzulagen beantragen', why: (selb ? 'Als Selbstständige habt ihr Anspruch – aber nur auf Antrag bei der Familienausgleichskasse. ' : 'Beim Arbeitgeber oder direkt bei der Familienausgleichskasse. ') + `Anspruch ab Geburtsmonat, mindestens CHF ${C.KZ_MIN} pro Monat, in vielen Kantonen mehr und teils mit Geburtszulage. Prüft Anspruch und Reihenfolge zwischen den Eltern – besonders bei einem Jobwechsel oder bei Arbeit in zwei Kantonen. Ein Antrag ist bis fünf Jahre rückwirkend möglich.` },
    { id: 'partnerurlaub', ph: 2, rec: addDays(et, 14), due: addMonths(et, 6), t: 'Vaterschafts- / Partnerurlaub einreichen', why: '10 Arbeitstage, 80 % des Lohns über die EO, am Stück oder tageweise. Antrag beim Arbeitgeber. Nicht bezogene Tage verfallen nach sechs Monaten.' },
    { id: 'kvg_anmelden', ph: 2, rec: addDays(et, 28), due: addMonths(et, 3), sec: true, topic: 'Grundversicherung Baby', tool: 'check:babykk', t: 'Krankenkasse: Baby anmelden', why: 'Am besten in den ersten Wochen, spätestens innert 3 Monaten. Dann gelten Schutz und Prämien rückwirkend ab Geburt, ohne Gesundheitsprüfung. Danach gibt es keine rückwirkende Deckung mehr. Prüft anschliessend Police und Versicherungskarte auf Richtigkeit.' },
    { id: 'kinderarzttermine', ph: 2, rec: addDays(et, 28), t: 'Erste Vorsorgeuntersuchung und Kinderarzttermine', why: 'Erste Vorsorgeuntersuchung, Nachkontrollen und Impfberatung mit der Praxis besprechen. Die Mütter- und Väterberatung ist kostenlos.' },
    { id: 'unterlagen', ph: 2, rec: addDays(et, 42), tool: 'notfall', t: 'Unterlagen an einem Ort sammeln', why: 'Geburtsurkunde, Versicherungskarten, Impfausweis, Policen. Wenn jemand spontan helfen muss, sollte alles in fünf Minuten auffindbar sein.' },
    { id: 'pass', ph: 2, t: 'ID oder Pass beantragen, wenn Reisen geplant sind', why: 'Auch Babys brauchen ein eigenes Reisedokument. Beide sorgeberechtigten Eltern müssen zustimmen.' },
    { id: 'hilfe', ph: 2, t: 'Hilfe im Alltag aktivieren', why: 'Einkauf, Essen, Geschwisterbetreuung oder kurze Entlastung verteilen. Wer fragt, bekommt meist gerne Hilfe.' },
    { id: 'unfall', ph: 3, rec: addMonths(et, 3), sec: true, topic: 'Unfall & Taggeld', t: 'Unfalldeckung prüfen', why: 'Kinder sind über die Grundversicherung gegen Unfall versichert. Bei der Mutter nach Austritt oder Pensumsreduktion neu prüfen: Wer unter 8 Stunden pro Woche arbeitet, ist beim Arbeitgeber nur noch gegen Berufsunfall versichert – Freizeitunfall dann sofort in die Krankenkasse einschliessen.' },
    { id: 'pv', ph: 3, t: 'Prämienverbilligung prüfen', why: 'Je nach Kanton automatisch oder nur auf Antrag. Mit dem neuen Familieneinkommen lohnt sich ein Blick – auch für die Kinderprämien.' },
    { id: 'haftpflicht', ph: 3, sec: true, topic: 'Haftpflicht & Hausrat', t: 'Privathaftpflicht und Hausrat anpassen', why: 'Familiengrösse, neue Anschaffungen und Deckungssummen prüfen. Teure Anschaffungen wie Kinderwagen oder Möbel sollten im Hausrat erfasst sein. Die Privathaftpflicht deckt Schäden, die das Kind verursacht – auch wenn es erst laufen kann.' },
    { id: 'fahrzeug', ph: 3, t: 'Auto oder KFZ-Versicherung prüfen', why: 'Neuer Kindersitz, neue Fahrer oder geänderter Gebrauch: Passe die Deckung an. Vollkasko prüfen, wenn das Auto für Familienausflüge wichtig ist.' },
    { id: 'wohnen', ph: 3, t: 'Wohnsituation und Mietvertrag', why: 'Platzbedarf, Kündigungsfristen und Anpassungen prüfen. Bei einem Umzug: neue Adresse überall melden und Anmeldungen für Kita, Arzt und Versicherungen aktualisieren.' },
    { id: 'rechtsschutz', ph: 3, sec: true, topic: 'Rechtsschutz', t: 'Rechtsschutz prüfen', why: 'Bei Streitigkeiten rund um Arbeitsrecht, Mietrecht oder Sorgerecht kann ein Rechtsschutz wertvoll sein. Familienerweiterung prüfen und ggf. anpassen.' },
    { id: '3s', ph: 3, sec: true, topic: 'Säule 3a', t: 'Säule 3a: Steuervorteil nutzen', why: 'Steuerlich absetzbarer Betrag pro Jahr prüfen. Für Selbstständige besonders wichtig. Auch als Angestellter lohnt sich der jährliche Einbezug für die Steuerersparnis.' },
    { id: 'beguenstigung', ph: 3, sec: true, topic: 'Begünstigungen & Erbfolge', t: 'Begünstigungen aktualisieren', why: 'Pensionskasse, Säule 3a, Lebensversicherung und Testament prüfen. Ein Kind verändert die gesetzliche Erbfolge. Bei unverheirateten Paaren erbt der Partner gesetzlich nichts – hier ist ein Testament zwingend.' },
    { id: 'taggeld', ph: 3, sec: true, topic: 'Unfall & Taggeld', t: 'Taggeld- und Erwerbsunfähigkeitsversicherung', why: 'Was passiert, wenn ein Elternteil länger ausfällt? Taggeld bei Krankheit und Erwerbsunfähigkeitsversicherung prüfen. Die EO zahlt nur bei Mutterschaft, nicht bei Krankheit oder Unfall.' },
    { id: 'pensionskasse', ph: 3, sec: true, topic: 'Vorsorge', t: 'Pensionskasse und Hinterlassenenleistungen', why: 'Kindereintritt melden, Erziehungsgutschriften sicherstellen. Hinterlassenenrenten prüfen: Reicht die Deckung für die Familie im Todesfall? Bei unverheirateten Paaren: Begünstigung prüfen.' },
    { id: 'eo_geschwister', ph: 3, t: 'EO-Geschwisterurlaub', why: 'Bei mehreren Kindern: Anspruch auf Geschwisterurlaub prüfen. Dieser kann mit dem Partnerurlaub kombiniert werden.' },
    { id: 'weiterbildung', ph: 3, t: 'Weiterbildung oder Wiedereinstieg planen', why: 'Fortbildungen, Brückenangebote oder Coaching für den Wiedereinstieg. Berufliche Perspektiven früh besprechen.' },
    { id: 'kita_vertrag', ph: 3, t: 'Kita-Vertrag abschliessen', why: 'Vertragsdetails, Kündigungsfristen und Flexibilität klären. Rückstellungen für Ferien und Ausfallzeiten besprechen.' },
    { id: 'steuern', ph: 3, t: 'Steuerabzüge prüfen', why: `Kinderabzug und Betreuungskostenabzug gelten ab dem Geburtsjahr. Beim Bund: Kinderabzug CHF ${C.KINDERABZUG_BUND} pro Kind, Fremdbetreuung bis CHF ${C.FREMDBETREUUNG_BUND} pro Kind und Jahr, wenn beide arbeiten. Kantonal unterschiedlich – Steuerberatung lohnt sich.` },
    { id: 'sparen_kind', ph: 4, sec: true, topic: 'Sparziel Kind', t: 'Sparziel fürs Kind definieren', why: 'Ausbildung, Führerausweis, erste Wohnung. Früh beginnen mit regelmässigem Sparen. Klare Regelung: Mit 18 gehört das Geld dem Kind. Sparkonto, Vorsorge oder Investment: je nach Ziel und Risikobereitschaft wählen.' },
    { id: 'testament', ph: 4, sec: true, topic: 'Testament & Vorsorge', t: 'Testament und Vorsorgeauftrag', why: 'Besonders bei unverheirateten Paaren oder komplexen Familienverhältnissen. Sorgeregelung, Vormund und Vermögensverwaltung festlegen. Notarielle Beurkundung empfohlen.' },
    { id: 'spital', ph: 4, sec: true, topic: 'Spitalzusatz', t: 'Spitalzusatz prüfen', why: 'Freie Spitalwahl, Chefarztbehandlung, Halbprivat oder Privat. Die Grundversicherung deckt nur die allgemeine Spitalabteilung. Bei geplanten Eingriffen oder Risikoschwangerschaft besonders wichtig.' },
    { id: 'ausland', ph: 4, sec: true, topic: 'Ausland & Reise', t: 'Auslanddeckung und Reiseversicherung', why: 'Die Grundversicherung zahlt im europäischen Bereich und bei Notfällen weltweit nur bis zu einem bestimmten Betrag. Rettung und Transport nur zur Hälfte. Reise- und Rettungskostenversicherung bewusst prüfen.' },
  ];

  return L;
}

export function milestones(ctx: { et: string; born: boolean }) {
  const et = parseD(ctx.et);
  return [
    { t: 'Geburtsmeldung', d: addDays(et, 3), ds: 'Innert 3 Tagen beim Zivilstandsamt' },
    { t: 'EO-Antrag', d: addDays(et, 14), ds: 'Mutterschaftsentschädigung beantragen' },
    { t: 'Familienzulagen', d: addDays(et, 14), ds: 'Kinder- und Geburtszulage' },
    { t: 'Vaterschaftsurlaub', d: addDays(et, 14), ds: '10 Tage beantragen' },
    { t: 'Krankenkasse', d: addMonths(et, 3), ds: 'Spätestens innert 3 Monaten anmelden' },
    { t: 'U1 / Erstuntersuchung', d: addDays(et, 3), ds: 'Erste Vorsorge beim Kinderarzt' },
    { t: '6-Wochen-Kontrolle', d: addDays(et, 42), ds: 'Mutter und Kind kontrollieren' },
    { t: 'Impfung 2. Monat', d: addMonths(et, 2), ds: '6-fach Impfung erste Dosis' },
    { t: 'U3 / 4.–6. Woche', d: addDays(et, 35), ds: 'Entwicklungskontrolle' },
    { t: 'U4 / 3.–4. Monat', d: addMonths(et, 3.5), ds: 'Entwicklungskontrolle' },
    { t: 'Impfung 4. Monat', d: addMonths(et, 4), ds: '6-fach Impfung zweite Dosis' },
    { t: 'Impfung 6. Monat', d: addMonths(et, 6), ds: '6-fach Impfung dritte Dosis' },
    { t: 'U5 / 6.–7. Monat', d: addMonths(et, 6.5), ds: 'Entwicklungskontrolle' },
    { t: 'U6 / 10.–12. Monat', d: addMonths(et, 11), ds: 'Entwicklungskontrolle' },
    { t: 'MMR-Impfung', d: addMonths(et, 12), ds: 'Erste MMR-Dosis' },
  ];
}

export const FOKUS = [
  'Grundversicherung & Zusatzleistungen',
  'Familienzulagen & Prämienverbilligung',
  'Arbeitgeber, Urlaub & Teilzeit',
  'Kinderarzt, Hebamme & Betreuung',
  'Budget & Reserve',
  'Vorsorge, Todesfall & Begünstigungen',
  'Sparziel fürs Kind',
  'Wohnen, Auto & Sicherheit',
  'Notfallkarte & Dokumentenablage',
  'Später erneut prüfen',
];

export const NF_FIELDS = [
  ['arzt', 'Kinderarztpraxis · Telefon'],
  ['hebamme', 'Hebamme · Telefon'],
  ['mvb', 'Mütter- / Väterberatung'],
  ['apo', 'Apotheke in der Nähe'],
  ['kkk', 'Krankenkasse Kind · Versichertennummer'],
  ['kke', 'Krankenkasse Eltern · Versichertennummer'],
  ['nk1', 'Notfallkontakt 1 (Name, Telefon, Beziehung)'],
  ['nk2', 'Notfallkontakt 2 (Name, Telefon, Beziehung)'],
  ['allerg', 'Allergien / Medikamente des Kindes'],
  ['blut', 'Blutgruppe · Besonderheiten'],
];

export const NF_DOCS = [
  ['fam', 'Familienausweis / Geburtsurkunde'],
  ['pass', 'Pässe und Identitätskarten'],
  ['pol', 'Versicherungskarten und Policen'],
  ['impf', 'Impfausweis und Gesundheitsheft'],
  ['vollm', 'Vollmachten, Testament, Vorsorgeauftrag'],
  ['zug', 'Zugangsdaten (Passwort-Manager, Konto)'],
];

export const NF_NUMS = [
  ['144', 'Sanität / Notruf', 'bei jedem medizinischen Notfall'],
  ['145', 'Tox Info Suisse', 'Vergiftungen, rund um die Uhr'],
  ['117 · 118', 'Polizei · Feuerwehr', ''],
  ['0848 35 45 55', 'Elternnotruf', '24 h, wenn es zu Hause nicht mehr geht'],
  ['058 261 61 61', 'Pro Juventute Elternberatung', 'Rat bei Erziehung, Schlaf, Stillen'],
  ['1811', 'Ärztlicher Notfalldienst', 'Auskunft für Ärzte und Apotheken'],
];

export const BUDGET: [string, [string, string][], 'in' | 'out'][] = [
  ['Einnahmen', [['n1', 'Nettolohn Elternteil 1 (neues Pensum)'], ['n2', 'Nettolohn Elternteil 2 (neues Pensum)'], ['fz', 'Familienzulagen (Kinder- / Geburtszulage)'], ['eo', 'EO Mutterschaft / Partnerurlaub (befristet)']], 'in'],
  ['Fixkosten', [['miete', 'Miete oder Hypothek, Nebenkosten'], ['kke', 'Krankenkasse Eltern (Grund + Zusatz)'], ['kkk', 'Krankenkasse Kind (Grund + Zusatz)'], ['kita', 'Kita, Tagesfamilie, Nanny, Mittagstisch'], ['vers', 'Versicherungen (Haftpflicht, Hausrat, Auto, Rechtsschutz)'], ['steu', 'Steuern (monatliche Rückstellung)'], ['mob', 'Mobilität, Kommunikation, Strom, Abos']], 'out'],
  ['Variable Kosten', [['hh', 'Haushalt, Lebensmittel'], ['baby', 'Baby (Windeln, Kleidung, Pflege, Ausstattung)'], ['frei', 'Freizeit, Ferien, Geschenke, Persönliches']], 'out'],
  ['Sparen & Vorsorge', [['res', 'Notreserve (bis 3 Monatsausgaben erreicht sind)'], ['s3a', 'Säule 3a, Sparen fürs Kind']], 'out'],
];
