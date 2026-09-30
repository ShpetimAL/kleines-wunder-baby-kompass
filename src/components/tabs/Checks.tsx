import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UserData } from '@/types';
import { CheckCircle2, ChevronDown, ChevronUp, HeartPulse, Stethoscope, Pill, Clock } from 'lucide-react';

interface Props {
  user: UserData;
  updateUser: (fn: (u: UserData) => UserData) => void;
}

export default function ChecksTab({ user, updateUser }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setOpen((p) => ({ ...p, [id]: !p[id] }));

  const checks = [
    {
      id: 'v1', title: 'Vorsorgeuntersuchung U1 (Neugeborenenuntersuchung)', icon: Stethoscope, when: 'Direkt nach der Geburt', done: false, urgent: true,
      text: 'Die erste Untersuchung direkt nach der Geburt umfasst die vollständige körperliche Untersuchung, Reflexe, Herz, Lunge und organische Anomalien. Die U1 ist die Grundlage für alle weiteren Vorsorgeuntersuchungen.',
    },
    {
      id: 'v2', title: 'Vorsorgeuntersuchung U2 (nach 3–10 Tagen)', icon: Stethoscope, when: '3–10 Tage nach Geburt', done: false, urgent: true,
      text: 'Wichtig für die Früherkennung von Hüftgelenksdysplasie und angeborenen Erkrankungen. Auch Gelbsucht und Gewichtsentwicklung werden kontrolliert.',
    },
    {
      id: 'v3', title: 'Impfung Hepatitis B (2. Dosis)', icon: Pill, when: '1 Monat', done: false,
      text: 'Die zweite Impfung gegen Hepatitis B fällt in den ersten Lebensmonat. Falls die erste Dosis direkt nach der Geburt gegeben wurde, ist der Abstand etwa 4 Wochen.',
    },
    {
      id: 'v4', title: 'Vorsorgeuntersuchung U3 (4.–6. Woche)', icon: Stethoscope, when: '4.–6. Woche', done: false,
      text: 'Umfassende Entwicklungskontrolle: Sehen, Hören, Motorik, soziales Verhalten. Auch die Hüftsonographie wird durchgeführt.',
    },
    {
      id: 'v5', title: 'Vorsorgeuntersuchung U4 (3.–4. Monat)', icon: Stethoscope, when: '3.–4. Monat', done: false,
      text: 'Entwicklungskontrolle mit Schwerpunkt auf Motorik und Interaktion. Die Impfung gegen Diphtherie, Tetanus, Pertussis, Polio, Hib und Hepatitis B fällt in diesen Zeitraum.',
    },
    {
      id: 'v6', title: 'Impfung 6-fach (DTPa-IPV-Hib-HepB)', icon: Pill, when: '2. Monat', done: false, urgent: true,
      text: 'Erste Dosis der 6-fach Impfung. Schützt gegen Diphtherie, Tetanus, Keuchhusten, Polio, Hib-Infektionen und Hepatitis B.',
    },
    {
      id: 'v7', title: 'Impfung 6-fach (2. Dosis)', icon: Pill, when: '4. Monat', done: false,
      text: 'Zweite Dosis der 6-fach Impfung zur Auffrischung des Impfschutzes.',
    },
    {
      id: 'v8', title: 'Impfung 6-fach (3. Dosis)', icon: Pill, when: '6. Monat', done: false,
      text: 'Dritte Dosis der 6-fach Impfung. Damit ist der Grundimmunisierung abgeschlossen.',
    },
    {
      id: 'v9', title: 'Vorsorgeuntersuchung U5 (6.–7. Monat)', icon: Stethoscope, when: '6.–7. Monat', done: false,
      text: 'Entwicklungskontrolle mit Fokus auf Feinmotorik, Sprache und soziale Entwicklung.',
    },
    {
      id: 'v10', title: 'Impfung Pneumokokken', icon: Pill, when: '2., 4. und 12. Monat', done: false,
      text: 'Dreifachimpfung gegen Pneumokokken, eine häufige Ursache für Lungenentzündung und Mittelohrentzündung bei Kleinkindern.',
    },
    {
      id: 'v11', title: 'Impfung Meningokokken C', icon: Pill, when: '12. Monat', done: false,
      text: 'Empfohlene Impfung gegen Meningokokken der Gruppe C, die Hirnhautentzündung verursachen können.',
    },
    {
      id: 'v12', title: 'Impfung MMR (Masern, Mumps, Röteln)', icon: Pill, when: '12. Monat', done: false,
      text: 'Erste Dosis der MMR-Impfung. Wichtig für den Schutz vor den drei Kinderkrankheiten.',
    },
    {
      id: 'v13', title: 'Vorsorgeuntersuchung U6 (10.–12. Monat)', icon: Stethoscope, when: '10.–12. Monat', done: false,
      text: 'Umfassende Entwicklungskontrolle vor dem ersten Geburtstag. Schwerpunkt auf Motorik, Sprache und soziales Verhalten.',
    },
    {
      id: 'v14', title: 'Impfung Varizellen (Windpocken)', icon: Pill, when: '12.–15. Monat', done: false,
      text: 'Empfohlene Impfung gegen Windpocken, besonders wichtig wenn das Kind in die Kita geht.',
    },
  ];

  const toggleStatus = (id: string) => {
    updateUser((u) => ({ ...u, status: { ...u.status, [id]: u.status[id] ? '' : 'done' } }));
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-heading font-bold text-ink">Vorsorge-Checklisten</h2>
      <p className="text-muted-custom text-sm">U-Untersuchungen und Impfungen nach dem Schweizer Impfplan. Spreche die Termine früh mit deinem Kinderarzt ab.</p>

      <div className="space-y-3">
        {checks.map((c) => {
          const isOpen = open[c.id];
          const isDone = user.status[c.id];
          return (
            <Card key={c.id} className={`border-0 glass overflow-hidden ${isDone ? 'opacity-50' : ''}`} style={{ borderRadius: '20px' }}>
              <div className="px-5 py-4 flex items-start gap-3">
                <button
                  onClick={() => toggleStatus(c.id)}
                  className="mt-0.5 w-5 h-5 rounded-full border-2 border-line flex items-center justify-center shrink-0"
                >
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-mint" />}
                </button>
                <div className="flex-1" onClick={() => toggle(c.id)}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-semibold ${isDone ? 'line-through text-muted-custom' : 'text-ink'}`}>{c.title}</span>
                    {c.urgent && !isDone && <Badge className="text-[10px] bg-warn/20 text-warn border-none">Dringend</Badge>}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-muted-custom" />
                    <span className="text-xs text-muted-custom">{c.when}</span>
                  </div>
                </div>
                <button onClick={() => toggle(c.id)} className="p-1 mt-0.5">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-custom" /> : <ChevronDown className="w-4 h-4 text-muted-custom" />}
                </button>
              </div>
              {isOpen && (
                <CardContent className="px-5 pb-4 pt-0">
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
            <HeartPulse className="w-5 h-5 text-mint mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-ink">Wichtiger Hinweis</p>
              <p className="text-sm text-muted-custom mt-1">Die Impfungen und Vorsorgeuntersuchungen sind in der Grundversicherung inkludiert. Termine früh vereinbaren, besonders bei beliebten Kinderärzten. Der Impfausweis ist wichtig – führe ihn immer mit.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
