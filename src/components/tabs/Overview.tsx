import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UserData } from '@/types';
import { buildTasks, today, parseD, rel, fmt, diffDays, milestones } from '@/lib/data';
import { Baby, AlertTriangle, CheckCircle2, Clock, Star, Pencil } from 'lucide-react';

interface Props {
  user: UserData;
  updateUser: (fn: (u: UserData) => UserData) => void;
}

export default function OverviewTab({ user, updateUser }: Props) {
  const [showEdit, setShowEdit] = useState(false);
  const tasks = useMemo(() => buildTasks(user.ctx), [user.ctx]);
  const ms = useMemo(() => milestones(user.ctx), [user.ctx]);
  const et = parseD(user.ctx.et);
  const isPast = et < today();
  const days = diffDays(et);

  const byPh = useMemo(() => {
    const map: Record<string | number, typeof tasks> = {};
    for (const t of tasks) {
      if (!map[t.ph]) map[t.ph] = [];
      map[t.ph].push(t);
    }
    return map;
  }, [tasks]);

  const open = tasks.filter((t) => !user.status[t.id]);
  const urgent = open.filter((t) => t.due && diffDays(t.due) <= 14 && !isPast);
  const sec = open.filter((t) => t.sec);
  const nextMs = ms.find((m) => diffDays(m.d) >= 0);

  const changeEt = (newEt: string) => {
    updateUser((u) => ({ ...u, ctx: { ...u.ctx, et: newEt } }));
  };

  const toggleStatus = (id: string) => {
    updateUser((u) => ({ ...u, status: { ...u.status, [id]: u.status[id] ? '' : 'done' } }));
  };

  const countFor = (ph: number) => byPh[ph]?.filter((t) => !user.status[t.id]).length || 0;

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <section>
        <h2 className="text-2xl font-heading font-bold text-ink mb-1">Hallo, {user.profile.name}</h2>
        <p className="text-muted-custom text-sm">Hier ist der aktuelle Stand eures Baby-Kompass.</p>
      </section>

      {/* Termin */}
      <Card className="border-0 overflow-hidden glass" style={{ borderRadius: '20px' }}>
        <div className="bg-gradient-to-r from-vs-dark/10 to-transparent px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-mint flex items-center justify-center">
              <Baby className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-custom uppercase tracking-wider">{isPast ? 'Geburtstag' : 'Geburtstermin'}</p>
              <p className="text-lg font-heading font-bold text-ink">
                {fmt(et)} · {days === 0 ? 'heute' : days > 0 ? `${days} Tage` : `${-days} Tage her`}
              </p>
            </div>
            <button onClick={() => setShowEdit(!showEdit)} className="p-2 rounded-full hover:bg-black/5">
              <Pencil className="w-4 h-4 text-muted-custom" />
            </button>
          </div>
          {showEdit && (
            <div className="mt-3 flex gap-2">
              <input
                type="date"
                value={user.ctx.et}
                onChange={(e) => changeEt(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl border border-line bg-white/60 text-sm text-ink"
              />
            </div>
          )}
        </div>
        <CardContent className="p-5 space-y-3">
          {nextMs && (
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-ink">Nächster Meilenstein: {nextMs.t}</p>
                <p className="text-sm text-muted-custom">{rel(nextMs.d)} · {fmt(nextMs.d)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-heading font-bold text-ink">{open.length}</p>
          <p className="text-xs text-muted-custom font-semibold mt-1">Offen</p>
        </div>
        <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--warnbg)', border: '1px solid rgba(224,122,95,0.12)' }}>
          <p className="text-2xl font-heading font-bold text-warn">{urgent.length}</p>
          <p className="text-xs text-warn font-semibold mt-1">Dringend</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-heading font-bold text-ink">{sec.length}</p>
          <p className="text-xs text-muted-custom font-semibold mt-1">Sicherheit</p>
        </div>
      </div>

      {/* Urgent */}
      {urgent.length > 0 && (
        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider text-warn mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Bald fällig
          </h3>
          <div className="space-y-2">
            {urgent.map((t) => (
              <Card key={t.id} className="border-0 rounded-xl" style={{ background: 'var(--warnbg)', border: '1px solid rgba(224,122,95,0.12)' }}>
                <CardContent className="p-4 flex items-center gap-3">
                  <button onClick={() => toggleStatus(t.id)} className="w-6 h-6 rounded-full border-2 border-warn flex items-center justify-center shrink-0">
                    {user.status[t.id] && <CheckCircle2 className="w-4 h-4 text-warn" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink">{t.t}</p>
                    <p className="text-xs text-muted-custom">{t.due ? rel(t.due) + (t.why ? ' · ' + t.why.slice(0, 60) + '...' : '') : t.why?.slice(0, 60) + '...'}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Next Steps by Phase */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-custom mb-3">Nächste Schritte</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((ph) => {
            const list = byPh[ph]?.filter((t) => !user.status[t.id]).slice(0, 2) || [];
            if (list.length === 0) return null;
            const colors = ['rgba(255,200,180,0.3)', 'rgba(255,220,220,0.35)', 'rgba(180,230,210,0.3)', 'rgba(220,200,240,0.3)'];
            const labels = ['Vor der Geburt', 'Direkt nach der Geburt', 'Spätestens 3 Monate', 'Finanzen & Sicherheit'];
            return (
              <Card key={ph} className="border-0 glass overflow-hidden" style={{ borderRadius: '20px' }}>
                <div className="px-4 py-3 flex items-center justify-between" style={{ background: colors[ph - 1] }}>
                  <p className="text-sm font-bold text-ink">Phase {ph}: {labels[ph - 1]}</p>
                  <Badge variant="secondary" className="text-xs bg-white/60 text-ink border-0">{countFor(ph)} offen</Badge>
                </div>
                <CardContent className="p-4 space-y-2">
                  {list.map((t) => (
                    <div key={t.id} className="flex items-start gap-3">
                      <button onClick={() => toggleStatus(t.id)} className="mt-0.5 w-5 h-5 rounded-full border-2 border-line flex items-center justify-center shrink-0">
                        {user.status[t.id] && <CheckCircle2 className="w-3.5 h-3.5 text-mint" />}
                      </button>
                      <div className="flex-1">
                        <p className="text-sm text-ink">{t.t}</p>
                        {t.due && <p className="text-xs text-muted-custom">Fällig: {rel(t.due)}</p>}
                        {t.sec && <Badge className="mt-1 text-[10px] bg-lav text-ink border-0">Sicherheit</Badge>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Tip */}
      <Card className="border-0 glass rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-butter mt-0.5 shrink-0" fill="currentColor" />
            <div>
              <p className="text-sm font-bold text-ink">Fokus-Tipp</p>
              <p className="text-sm text-muted-custom mt-1">Die erste Vorsorgeuntersuchung und Impfberatung beim Kinderarzt am besten direkt nach der Geburt besprechen. Hebammenbesuche bis 56 Tage nach der Geburt zahlt die Grundversicherung.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
