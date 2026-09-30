import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UserData } from '@/types';
import { buildTasks, PHASES, rel } from '@/lib/data';
import { CheckCircle2, ChevronDown, ChevronUp, Shield, Clock } from 'lucide-react';

interface Props {
  user: UserData;
  updateUser: (fn: (u: UserData) => UserData) => void;
}

export default function PhasenTab({ user, updateUser }: Props) {
  const tasks = useMemo(() => buildTasks(user.ctx), [user.ctx]);
  const [openPh, setOpenPh] = useState<Record<number, boolean>>({ 1: true, 2: false, 3: false, 4: false });

  const toggle = (ph: number) => setOpenPh((p) => ({ ...p, [ph]: !p[ph] }));

  const toggleStatus = (id: string) => {
    updateUser((u) => ({ ...u, status: { ...u.status, [id]: u.status[id] ? '' : 'done' } }));
  };

  const phaseTasks = (ph: number) => tasks.filter((t) => t.ph === ph && !user.status[t.id]);
  const doneTasks = (ph: number) => tasks.filter((t) => t.ph === ph && user.status[t.id]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-heading font-bold text-ink">Die 4 Phasen</h2>
      <p className="text-muted-custom text-sm">Alle Aufgaben, geordnet nach dem Zeitpunkt an dem sie anstehen.</p>

      {[1, 2, 3, 4].map((ph) => {
        const p = PHASES[ph];
        const open = phaseTasks(ph);
        const done = doneTasks(ph);
        const isOpen = openPh[ph];
        const colors = ['rgba(255,200,180,0.3)', 'rgba(255,220,220,0.35)', 'rgba(180,230,210,0.3)', 'rgba(220,200,240,0.3)'];

        return (
          <Card key={ph} className="border-0 glass overflow-hidden" style={{ borderRadius: '20px' }}>
            <button
              onClick={() => toggle(ph)}
              className="w-full px-5 py-4 flex items-center justify-between text-left"
              style={{ background: isOpen ? colors[ph - 1] : 'transparent' }}
            >
              <div>
                <p className="font-heading font-bold text-ink">Phase {ph}: {p.name}</p>
                <p className="text-sm text-muted-custom mt-0.5">{p.sub}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/60 text-ink text-xs border-0">{open.length} offen</Badge>
                {isOpen ? <ChevronUp className="w-5 h-5 text-muted-custom" /> : <ChevronDown className="w-5 h-5 text-muted-custom" />}
              </div>
            </button>

            {isOpen && (
              <CardContent className="p-0">
                {open.length === 0 && done.length === 0 && (
                  <p className="p-5 text-sm text-muted-custom">Keine Aufgaben in dieser Phase.</p>
                )}
                {open.map((t) => (
                  <div key={t.id} className="p-4 border-t border-line/50 flex items-start gap-3">
                    <button
                      onClick={() => toggleStatus(t.id)}
                      className="mt-0.5 w-5 h-5 rounded-full border-2 border-line flex items-center justify-center shrink-0"
                    >
                      {user.status[t.id] && <CheckCircle2 className="w-3.5 h-3.5 text-mint" />}
                    </button>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink">{t.t}</p>
                      <p className="text-sm text-muted-custom mt-1">{t.why}</p>
                      <div className="flex gap-2 mt-2">
                        {t.due && (
                          <span className="inline-flex items-center gap-1 text-xs text-warn font-semibold">
                            <Clock className="w-3 h-3" /> {rel(t.due)}
                          </span>
                        )}
                        {t.sec && (
                          <Badge className="text-[10px] bg-lav text-ink border-none">
                            <Shield className="w-3 h-3 mr-1" /> Sicherheit
                          </Badge>
                        )}
                        {t.topic && <Badge variant="outline" className="text-[10px] border-line text-muted-custom">{t.topic}</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
                {done.map((t) => (
                  <div key={t.id} className="p-4 border-t border-line/50 flex items-start gap-3 opacity-40">
                    <CheckCircle2 className="w-5 h-5 text-mint mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-ink line-through">{t.t}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
