import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CONFIG } from '@/lib/data';
import { Lightbulb, Baby, Heart, Pill, ShieldCheck, Plane, FileText, ArrowRight } from 'lucide-react';

export default function WissenTab() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setOpen((p) => ({ ...p, [id]: !p[id] }));

  const cards = [
    {
      id: 'eo', title: 'Mutterschaftsentschädigung (EO)', icon: Heart,
      text: `14 Wochen nach der Geburt. Die meisten Mütter erhalten 80 % des Lohns, maximal CHF ${CONFIG.EO_MAX_TAG} pro Tag. Bei Selbstständigen läuft das gleiche über die Ausgleichskasse. Die ersten 8 Wochen gibt es ein generelles Arbeitsverbot.`,
    },
    {
      id: 'kz', title: 'Familienzulagen (Kinderzulagen)', icon: Baby,
      text: `Ab Geburtsmonat, mindestens CHF ${CONFIG.KZ_MIN} pro Monat. Viele Kantone zahlen mehr und eine Geburtszulage. Ein Antrag ist bis fünf Jahre rückwirkend möglich.`,
    },
    {
      id: 'kk', title: 'Grundversicherung (KVG)', icon: ShieldCheck,
      text: 'Die Grundversicherung deckt alle notwendigen Behandlungen und Vorsorgeuntersuchungen. Kinder bis 18 Jahre dürfen bei einer anderen Kasse versichert sein als die Eltern. Die Franchise für Kinder kann 0 sein, der Selbstbehalt ist begrenzt.',
    },
    {
      id: 'zusatz', title: 'Zusatzversicherung (VVG)', icon: Pill,
      text: 'Zahn, Spital, Medikamente oder Komplementärmedizin. Vor der Geburt anmelden, dann ohne Gesundheitsprüfung. Später können Risiken ausgeschlossen werden. Die Grundversicherung zahlt keine Kieferorthopädie.',
    },
    {
      id: 'pv', title: 'Prämienverbilligung', icon: FileText,
      text: 'Je nach Kanton automatisch oder nur auf Antrag. Lohnt sich mit neuem Familieneinkommen. Einige Kantone gewähren sie auch bei höherem Einkommen, wenn viele Kinder da sind.',
    },
    {
      id: 'reise', title: 'Reise & Ausland', icon: Plane,
      text: 'Die Grundversicherung zahlt im europäischen Bereich und bei Notfällen weltweit nur bis zu einem bestimmten Betrag. Rettung und Transport nur zur Hälfte. Reise- und Rettungskostenversicherung bewusst prüfen.',
    },
    {
      id: 'steuer', title: 'Steuerabzüge', icon: FileText,
      text: `Kinderabzug und Betreuungskostenabzug gelten ab dem Geburtsjahr. Beim Bund: Kinderabzug CHF ${CONFIG.KINDERABZUG_BUND} pro Kind, Fremdbetreuung bis CHF ${CONFIG.FREMDBETREUUNG_BUND} pro Kind und Jahr, wenn beide arbeiten.`,
    },
    {
      id: 'beg', title: 'Begünstigungen & Nachlass', icon: Heart,
      text: 'Pensionskasse, Säule 3a, Lebensversicherung und Testament prüfen. Ein Kind verändert die gesetzliche Erbfolge. Bei unverheirateten Paaren erbt der Partner gesetzlich nichts.',
    },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-heading font-bold text-ink">Zahlen & Fakten</h2>
      <p className="text-muted-custom text-sm">Wissenswertes zu den wichtigsten Themen – kurz und praktisch.</p>

      <div className="space-y-3">
        {cards.map((c) => {
          const Icon = c.icon;
          const isOpen = open[c.id];
          return (
            <Card key={c.id} className="border-0 glass overflow-hidden" style={{ borderRadius: '20px' }}>
              <button
                onClick={() => toggle(c.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
                style={{ background: isOpen ? 'rgba(42,142,158,0.06)' : 'transparent' }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-teal" />
                  <span className="font-semibold text-ink">{c.title}</span>
                </div>
                <ArrowRight className={`w-5 h-5 text-muted-custom transition-transform ${isOpen ? 'rotate-90' : ''}`} />
              </button>
              {isOpen && (
                <CardContent className="p-5 pt-0">
                  <p className="text-sm text-text-custom leading-relaxed">{c.text}</p>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="border-0 glass rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-butter mt-0.5 shrink-0" fill="currentColor" />
            <div>
              <p className="text-sm font-bold text-ink">Wussten Sie schon?</p>
              <p className="text-sm text-muted-custom mt-1">Der Arbeitgeber darf während der ganzen Schwangerschaft und 16 Wochen nach der Geburt nicht kündigen. Beim Wiedereinstieg bleiben Stillzeiten im ersten Jahr bezahlt.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
