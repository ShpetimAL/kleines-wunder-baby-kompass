import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield, Heart, HeartPulse, Baby, ChevronDown, ChevronUp,
  Phone, Mail, CheckCircle2, AlertTriangle
} from 'lucide-react';

export default function AbsicherungenTab() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setOpen((p) => ({ ...p, [id]: !p[id] }));

  const sections = [
    {
      id: 'warum',
      title: 'Warum Vorsorge für Ihr Kind?',
      icon: Heart,
      color: 'bg-rose',
      content: `Ihr grösstes Glück im Leben verdient den besten Schutz. Als Versicherungsmakler der VitaSecura AG begleiten wir Familien bei den wichtigen Entscheidungen rund um Gesundheit, Vorsorge und Absicherung.

Ein Kind verändert nicht nur das Leben, sondern auch die finanzielle Planung. Wir helfen Ihnen, die richtigen Entscheidungen zu treffen – von der Grundversicherung über die Zusatzdeckung bis hin zur langfristigen Vorsorge.`,
    },
    {
      id: 'grund',
      title: 'Grundversicherung (KVG)',
      icon: Shield,
      color: 'bg-mintp',
      content: `Die Grundversicherung ist obligatorisch und deckt alle notwendigen Behandlungen ab. Für Kinder gibt es besondere Regelungen:

• Die Franchise kann bei 0 gesetzt werden
• Der Selbstbehalt ist auf CHF 350 pro Jahr begrenzt
• Vorsorgeuntersuchungen und Impfungen sind inkludiert
• Kinder können bei einer anderen Kasse sein als die Eltern

Wichtig: Das Baby muss innert 3 Monaten nach der Geburt angemeldet werden, sonst entfällt die rückwirkende Deckung.`,
    },
    {
      id: 'zusatz',
      title: 'Zusatzversicherung (VVG)',
      icon: HeartPulse,
      color: 'bg-sky',
      content: `Die Zusatzversicherung schliesst Lücken der Grundversicherung. Besonders wichtig für Kinder:

Zahnversicherung:
• Kieferorthopädie (nicht von KVG gedeckt)
• Prophylaxe und Behandlungen
• Am besten vor der Geburt abschliessen

Spitalzusatz:
• Freie Spitalwahl
• Chefarztbehandlung
• Halbprivat oder Privat

Ausland:
• Rettung und Transport
• Behandlungskosten im Ausland
• Reiseannullation`,
    },
    {
      id: 'vorsorge',
      title: 'Langfristige Vorsorge',
      icon: Baby,
      color: 'bg-peach',
      content: `Neben der Krankenversicherung gibt es weitere wichtige Vorsorge-Themen:

Pensionskasse & AHV:
• Erziehungsgutschriften für Kinder unter 16
• Hinterlassenenrenten prüfen
• Begünstigungen aktualisieren

Säule 3a:
• Steuerliche Vorteile nutzen
• Flexible Sparpläne
• Für Ausbildung oder Eigenheim

Sparziele fürs Kind:
• Ausbildung, Führerausweis, erste Wohnung
• Früh beginnen mit regelmässigem Sparen
• Klare Regelung: Mit 18 gehört das Geld dem Kind`,
    },
    {
      id: 'risiken',
      title: 'Risiko-Absicherung',
      icon: AlertTriangle,
      color: 'bg-butter',
      content: `Was passiert, wenn ein Elternteil ausfällt?

Todesfall:
• AHV-Hinterlassenenrente oft nicht ausreichend
• Pensionskassenleistungen prüfen
• Risiko-Lebensversicherung als Ergänzung

Erwerbsunfähigkeit:
• Taggeld bei Krankheit
• Invalidenversicherung (IV)
• Erwerbsunfähigkeitsversicherung

Unfall:
• Kinder sind über KVG gedeckt
• Bei Mutter nach Jobwechsel/Unterbruch prüfen
• Abredeversicherung bei Jobpausen`,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-mint flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-ink">Absicherungen</h2>
          <p className="text-sm text-muted-custom">Von VitaSecura – für das grösste Glück im Leben.</p>
        </div>
      </div>

      {/* Services */}
      <Card className="border-0 glass rounded-2xl">
        <CardContent className="p-5">
          <p className="text-sm text-text-custom leading-relaxed">
            Als <strong className="text-ink">Versicherungsmakler der VitaSecura AG</strong> begleiten wir Sie bei den wichtigen Entscheidungen rund um die Absicherung Ihrer Familie. Unabhängig, persönlich und kompetent.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Kostenloser Vergleich', 'Zusatzdeckung beraten', 'Prämienverbilligung prüfen', 'Vorsorge analysieren', 'Unabhängige Maklerberatung'].map((s) => (
              <Badge key={s} variant="secondary" className="bg-black/5 text-muted-custom text-xs font-medium border-0">
                <CheckCircle2 className="w-3 h-3 mr-1 text-mint" />
                {s}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accordion Sections */}
      <div className="space-y-3">
        {sections.map((s) => {
          const Icon = s.icon;
          const isOpen = open[s.id];
          return (
            <Card key={s.id} className="border-0 glass overflow-hidden" style={{ borderRadius: '20px' }}>
              <button
                onClick={() => toggle(s.id)}
                className={`w-full px-5 py-4 flex items-center justify-between text-left`}
                style={{ background: isOpen ? 'rgba(42,142,158,0.06)' : 'transparent' }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-teal" />
                  <span className="font-semibold text-ink">{s.title}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-muted-custom" /> : <ChevronDown className="w-5 h-5 text-muted-custom" />}
              </button>
              {isOpen && (
                <CardContent className="p-5 pt-0">
                  <p className="text-sm text-text-custom whitespace-pre-line leading-relaxed">{s.content}</p>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Contact Card */}
      <Card className="border-0 overflow-hidden" style={{ borderRadius: '24px', background: 'linear-gradient(135deg, rgba(42,142,158,0.12) 0%, rgba(54,161,139,0.06) 100%)' }}>
        <div className="px-5 py-5">
          <h3 className="font-heading font-bold text-lg text-ink">Persönliche Beratung</h3>
          <p className="text-sm text-muted-custom mt-1">Wir analysieren Ihre Situation und finden die optimale Lösung.</p>
        </div>
        <CardContent className="p-5 pt-0 space-y-3">
          <a href="tel:+41712210011" className="flex items-center gap-3 p-3 rounded-xl bg-black/5 hover:bg-black/10 transition-colors">
            <Phone className="w-5 h-5 text-teal" />
            <div>
              <p className="text-sm font-semibold text-ink">+41 71 221 00 11</p>
              <p className="text-xs text-muted-custom">Telefonisch erreichen</p>
            </div>
          </a>
          <a href="mailto:info@vitasecura.ch" className="flex items-center gap-3 p-3 rounded-xl bg-black/5 hover:bg-black/10 transition-colors">
            <Mail className="w-5 h-5 text-teal" />
            <div>
              <p className="text-sm font-semibold text-ink">info@vitasecura.ch</p>
              <p className="text-xs text-muted-custom">E-Mail schreiben</p>
            </div>
          </a>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-custom/60 pb-4">
        <p>FINMA-Vermittlerregister Nr. F01533362</p>
        <p>VitaSecura AG · St. Gallen</p>
      </div>
    </div>
  );
}
