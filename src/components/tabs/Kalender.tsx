import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UserData } from '@/types';
import { buildTasks, milestones, diffDays, rel, fmt } from '@/lib/data';
import { CalendarDays, Clock, AlertTriangle, Shield } from 'lucide-react';

interface Props {
  user: UserData;
  updateUser: (fn: (u: UserData) => UserData) => void;
}

export default function KalenderTab({ user, updateUser }: Props) {
  const tasks = useMemo(() => buildTasks(user.ctx), [user.ctx]);
  const ms = useMemo(() => milestones(user.ctx), [user.ctx]);

  const withDate = tasks
    .filter((t) => !user.status[t.id])
    .map((t) => {
      const date = t.due || t.rec;
      if (!date) return null;
      const d = diffDays(date);
      return { ...t, date, sort: d < 0 ? d + 10000 : d };
    })
    .filter(Boolean)
    .sort((a, b) => a!.sort - b!.sort);

  const toggleStatus = (id: string) => {
    updateUser((u) => ({ ...u, status: { ...u.status, [id]: u.status[id] ? '' : 'done' } }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-ink">Kalender</h2>
      <p className="text-muted-custom text-sm">Alle fälligen Aufgaben und Meilensteine in chronologischer Reihenfolge.</p>

      {/* Meilensteine */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-custom mb-3">Meilensteine</h3>
        <div className="space-y-2">
          {ms.map((m) => {
            const d = diffDays(m.d);
            const done = d < 0;
            return (
              <Card key={m.t} className={`border-0 glass rounded-xl ${done ? 'opacity-40' : ''}`}>
                <CardContent className="p-4 flex items-start gap-3">
                  <CalendarDays className={`w-5 h-5 mt-0.5 shrink-0 ${done ? 'text-muted-custom' : 'text-teal'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{m.t}</p>
                    <p className="text-sm text-muted-custom mt-1">{m.ds}</p>
                    <p className="text-xs text-muted-custom mt-2">{fmt(m.d)} · {rel(m.d)}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Aufgaben */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-custom mb-3">Fällige Aufgaben</h3>
        {withDate.length === 0 ? (
          <p className="text-sm text-muted-custom">Keine fälligen Aufgaben. Gut gemacht!</p>
        ) : (
          <div className="space-y-2">
            {withDate.map((t) => (
              <Card key={t!.id} className="border-0 glass rounded-xl">
                <CardContent className="p-4 flex items-start gap-3">
                  <button
                    onClick={() => toggleStatus(t!.id)}
                    className="mt-0.5 w-5 h-5 rounded-full border-2 border-line flex items-center justify-center shrink-0"
                  >
                    {user.status[t!.id] && <div className="w-3 h-3 rounded-full bg-mint" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-ink">{t!.t}</p>
                      {t!.sec && <Badge className="text-[10px] bg-lav text-ink border-none"><Shield className="w-3 h-3 mr-1" />Sicherheit</Badge>}
                    </div>
                    <p className="text-xs text-muted-custom mt-1">{t!.why?.slice(0, 80)}...</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-semibold flex items-center gap-1 ${diffDays(t!.date!) <= 14 ? 'text-warn' : 'text-muted-custom'}`}>
                        {diffDays(t!.date!) <= 14 && <AlertTriangle className="w-3 h-3" />}
                        <Clock className="w-3 h-3" /> {rel(t!.date!)} · {fmt(t!.date!)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
