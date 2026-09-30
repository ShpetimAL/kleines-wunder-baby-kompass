import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { UserData } from '@/types';
import { CONFIG, BUDGET } from '@/lib/data';
import { ArrowDownLeft, ArrowUpRight, Pencil, Check, Baby, Wallet } from 'lucide-react';

interface Props {
  user: UserData;
  updateUser: (fn: (u: UserData) => UserData) => void;
}

export default function BudgetTab({ user, updateUser }: Props) {
  const [editing, setEditing] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setEditing((p) => ({ ...p, [id]: !p[id] }));

  const updateVal = (period: 'vor' | 'nach', id: string, val: string) => {
    updateUser((u) => ({
      ...u,
      budget: {
        ...u.budget,
        [period]: { ...u.budget[period], [id]: val },
      },
    }));
  };

  const getVal = (period: 'vor' | 'nach', id: string, def: string) => {
    return user.budget[period]?.[id] ?? def;
  };

  const sumIn = (period: 'vor' | 'nach') =>
    BUDGET.filter((b) => b[2] === 'in').reduce(
      (acc, b) =>
        acc +
        b[1].reduce(
          (a, [key, def]) => a + Number(getVal(period, key, def) || 0),
          0
        ),
      0
    );

  const sumOut = (period: 'vor' | 'nach') =>
    BUDGET.filter((b) => b[2] === 'out').reduce(
      (acc, b) =>
        acc +
        b[1].reduce(
          (a, [key, def]) => a + Number(getVal(period, key, def) || 0),
          0
        ),
      0
    );

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-heading font-bold text-ink">Budget-Planer</h2>
      <p className="text-muted-custom text-sm">Beispielrechnung für die ersten Monate nach der Geburt. Passe die Werte an deine Situation an.</p>

      {/* Income vs Outgoing */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 glass rounded-2xl" style={{ background: 'var(--mintp)' }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownLeft className="w-4 h-4 text-mint" />
              <span className="text-xs font-bold text-muted-custom uppercase">Einnahmen</span>
            </div>
            <p className="text-lg font-heading font-bold text-ink">CHF {sumIn('nach').toLocaleString('de-CH')}</p>
            <p className="text-xs text-muted-custom mt-1">Nach der Geburt</p>
          </CardContent>
        </Card>
        <Card className="border-0 glass rounded-2xl" style={{ background: 'var(--warnbg)' }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-4 h-4 text-warn" />
              <span className="text-xs font-bold text-muted-custom uppercase">Ausgaben</span>
            </div>
            <p className="text-lg font-heading font-bold text-ink">CHF {sumOut('nach').toLocaleString('de-CH')}</p>
            <p className="text-xs text-muted-custom mt-1">Nach der Geburt</p>
          </CardContent>
        </Card>
      </div>

      {/* Net */}
      <Card className="border-0 glass rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-teal" />
              <span className="text-sm font-bold text-ink">Monatliches Netto (nach Geburt)</span>
            </div>
            <span className="text-xl font-heading font-bold text-ink">CHF {(sumIn('nach') - sumOut('nach')).toLocaleString('de-CH')}</span>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="border-0 glass rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-3 gap-0 text-sm">
            <div className="p-3 font-bold text-ink bg-black/5">Posten</div>
            <div className="p-3 font-bold text-ink bg-black/5 text-right">Vor der Geburt</div>
            <div className="p-3 font-bold text-ink bg-black/5 text-right">Nach der Geburt</div>
          </div>
          {BUDGET.map((cat) => {
            const [id, items, type] = cat;
            return (
              <div key={id}>
                <div
                  className="grid grid-cols-3 gap-0 text-xs font-bold uppercase tracking-wider"
                  style={{ background: type === 'in' ? 'var(--mintp)' : 'var(--rose)' }}
                >
                  <div className="p-2 px-3 text-ink">{id}</div>
                  <div className="p-2 px-3 text-right text-muted-custom"></div>
                  <div className="p-2 px-3 text-right text-muted-custom"></div>
                </div>
                {items.map(([key, def]) => {
                  const vorVal = getVal('vor', key, def);
                  const nachVal = getVal('nach', key, def);
                  const isEditing = editing[key];
                  return (
                    <div key={key} className="grid grid-cols-3 gap-0 text-sm border-t border-line/50">
                      <div className="p-2.5 px-3 text-muted-custom">{def}</div>
                      <div className="p-2.5 px-3 text-right text-ink">
                        {isEditing ? (
                          <input
                            type="number"
                            value={vorVal}
                            onChange={(e) => updateVal('vor', key, e.target.value)}
                            className="w-20 h-7 px-1 rounded border border-line bg-surface-solid text-right text-xs text-ink"
                          />
                        ) : (
                          <span>CHF {Number(vorVal || 0).toLocaleString('de-CH')}</span>
                        )}
                      </div>
                      <div className="p-2.5 px-3 text-right text-ink flex items-center justify-end gap-2">
                        {isEditing ? (
                          <input
                            type="number"
                            value={nachVal}
                            onChange={(e) => updateVal('nach', key, e.target.value)}
                            className="w-20 h-7 px-1 rounded border border-line bg-surface-solid text-right text-xs text-ink"
                          />
                        ) : (
                          <span>CHF {Number(nachVal || 0).toLocaleString('de-CH')}</span>
                        )}
                        <button onClick={() => toggle(key)} className="p-0.5 rounded hover:bg-black/5">
                          {isEditing ? <Check className="w-3 h-3 text-mint" /> : <Pencil className="w-3 h-3 text-muted-custom" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="grid grid-cols-3 gap-0 text-sm font-bold border-t-2 border-line">
            <div className="p-3 px-3 text-ink">Total</div>
            <div className="p-3 px-3 text-right text-ink">CHF {(sumIn('vor') - sumOut('vor')).toLocaleString('de-CH')}</div>
            <div className="p-3 px-3 text-right text-ink">CHF {(sumIn('nach') - sumOut('nach')).toLocaleString('de-CH')}</div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-0 glass rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Baby className="w-5 h-5 text-butter mt-0.5 shrink-0" fill="currentColor" />
            <div>
              <p className="text-sm font-bold text-ink">Tipps für das Budget</p>
              <ul className="text-sm text-muted-custom mt-2 space-y-1 list-disc list-inside">
                <li>Kinderzulagen ab Geburtsmonat: mind. CHF {CONFIG.KZ_MIN}/Mt.</li>
                <li>Fremdbetreuungsabzug: bis CHF {CONFIG.FREMDBETREUUNG_BUND}/Kind und Jahr (Bund).</li>
                <li>Prämienverbilligung kann den grössten Posten senken.</li>
                <li>Bei neuer Einkommenssituation: Anspruch früh prüfen.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
