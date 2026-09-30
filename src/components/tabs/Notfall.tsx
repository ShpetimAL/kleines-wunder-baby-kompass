import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { UserData } from '@/types';
import { NF_FIELDS, NF_DOCS, NF_NUMS } from '@/lib/data';
import { Phone, Stethoscope, Baby, ClipboardList, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  user: UserData;
  updateUser: (fn: (u: UserData) => UserData) => void;
}

export default function NotfallTab({ user, updateUser }: Props) {
  const [filled, setFilled] = useState<Record<string, string>>(user.notfall || {});

  const save = (key: string, val: string) => {
    const next = { ...filled, [key]: val };
    setFilled(next);
    updateUser((u) => ({ ...u, notfall: next }));
  };

  const allFields = [...NF_FIELDS, ...NF_DOCS];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-heading font-bold text-ink">Notfall-Checkliste</h2>
      <p className="text-muted-custom text-sm">Fülle diese Liste schon vor der Geburt aus. Im Notfall weisst du sofort Bescheid.</p>

      {/* Emergency Numbers */}
      <div className="grid grid-cols-2 gap-3">
        {NF_NUMS.map((n) => (
          <a key={n[0]} href={`tel:${n[0]}`} className="glass rounded-2xl p-4 flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
            <Phone className="w-5 h-5 text-warn" />
            <span className="text-lg font-heading font-bold text-ink">{n[0]}</span>
            <span className="text-xs text-muted-custom text-center">{n[1]}</span>
          </a>
        ))}
      </div>

      {/* Medical Emergency */}
      <Card className="border-0 glass rounded-2xl" style={{ background: 'var(--warnbg)' }}>
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Stethoscope className="w-5 h-5 text-warn mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-ink">Bei medizinischen Notfällen</p>
              <p className="text-sm text-muted-custom mt-1">Geh bei akuten Beschwerden in die Notaufnahme oder rufe 144. Informiere danach die Versicherung. Trage immer die Karte des Babys bei dir.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="border-0 glass rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-teal" />
            <h3 className="font-heading font-bold text-ink">Wichtige Daten</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allFields.map(([key, label]) => (
              <div key={key}>
                <label className="text-xs text-muted-custom font-semibold uppercase tracking-wider">{label}</label>
                <input
                  type="text"
                  value={filled[key] || ''}
                  onChange={(e) => save(key, e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-xl border border-line bg-white/60 text-sm text-ink placeholder:text-muted-custom focus:border-teal focus:ring-1 focus:ring-teal outline-none"
                  placeholder={label.includes('Tel') ? 'Nummer eingeben...' : 'Daten eingeben...'}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Doc List */}
      <Card className="border-0 glass rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-teal" />
            <h3 className="font-heading font-bold text-ink">Dokumente im Notfall</h3>
          </div>
          <div className="space-y-2">
            {NF_DOCS.map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                {filled[key] ? (
                  <CheckCircle2 className="w-4 h-4 text-mint shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-line shrink-0" />
                )}
                <span className={`text-sm ${filled[key] ? 'text-ink' : 'text-muted-custom'}`}>{label}</span>
                {filled[key] && <Badge className="text-[10px] bg-mint/20 text-mint border-none ml-auto">Gespeichert</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={() => { updateUser((u) => ({ ...u, notfall: filled })); alert('Gespeichert!'); }}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-teal to-mint hover:opacity-90 text-white font-bold text-sm border-0"
      >
        Speichern
      </Button>

      <Card className="border-0 glass rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Baby className="w-5 h-5 text-butter mt-0.5 shrink-0" fill="currentColor" />
            <div>
              <p className="text-sm font-bold text-ink">Tipp</p>
              <p className="text-sm text-muted-custom mt-1">Speichere diese Daten auch auf deinem Telefon und teile sie mit engen Verwandten. Im Notfall sind Sekunden kostbar.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
