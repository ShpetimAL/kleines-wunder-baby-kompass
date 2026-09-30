import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { UserData } from '@/types';
import { Phone, Mail, MapPin, CheckCircle2, Send, Shield } from 'lucide-react';

interface Props {
  user: UserData;
  updateUser: (fn: (u: UserData) => UserData) => void;
}

export default function BeratungTab({ user, updateUser }: Props) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: user.profile.name, email: '', tel: '', topic: '', msg: '' });

  const topics = [
    'Krankenversicherung Baby',
    'Zusatzdeckung / Zahn',
    'Prämienverbilligung',
    'Vorsorge / 3. Säule',
    'Risiko-Absicherung',
    'Finanzplanung Familie',
    'Steueroptimierung',
    'Erbfolge / Testament',
    'Unfall / Taggeld',
    'OMNIA App Beratung',
  ];

  const handleSend = () => {
    setSent(true);
    updateUser((u) => ({ ...u, beratung: { ...u.beratung, last: new Date().toISOString(), gesendet: true } }));
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-heading font-bold text-ink">Beratung anfragen</h2>
      <p className="text-muted-custom text-sm">Von VitaSecura – unabhängige Maklerberatung für Familien.</p>

      {/* Contact Info */}
      <Card className="border-0 overflow-hidden" style={{ borderRadius: '24px', background: 'linear-gradient(135deg, rgba(42,142,158,0.12) 0%, rgba(54,161,139,0.06) 100%)' }}>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-3 mb-1">
            <img src="/assets/VS-Icon-.jpg" alt="VitaSecura" className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <p className="font-heading font-bold text-ink">VitaSecura AG</p>
              <p className="text-xs text-muted-custom">FINMA-Vermittler Nr. F01533362</p>
            </div>
          </div>
          <a href="tel:+41712210011" className="flex items-center gap-3 p-3 rounded-xl bg-black/5 hover:bg-black/10 transition-colors">
            <Phone className="w-5 h-5 text-teal" />
            <div>
              <p className="text-sm font-semibold text-ink">+41 71 221 00 11</p>
              <p className="text-xs text-muted-custom">Mo–Fr 08:00–17:00 Uhr</p>
            </div>
          </a>
          <a href="mailto:info@vitasecura.ch" className="flex items-center gap-3 p-3 rounded-xl bg-black/5 hover:bg-black/10 transition-colors">
            <Mail className="w-5 h-5 text-teal" />
            <div>
              <p className="text-sm font-semibold text-ink">info@vitasecura.ch</p>
              <p className="text-xs text-muted-custom">Wir antworten innert 24h</p>
            </div>
          </a>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/5">
            <MapPin className="w-5 h-5 text-teal" />
            <div>
              <p className="text-sm font-semibold text-ink">St. Gallen, Schweiz</p>
              <p className="text-xs text-muted-custom">Termine auch online möglich</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card className="border-0 glass rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-teal" />
            <h3 className="font-heading font-bold text-ink">Unsere Leistungen</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Krankenversicherung', 'Zusatzdeckung', 'Prämienverbilligung', 'Vorsorge 3. Säule', 'Risiko-Absicherung', 'Finanzplanung', 'Steueroptimierung', 'Erbfolge', 'OMNIA App'].map((s) => (
              <Badge key={s} className="bg-black/5 text-muted-custom text-xs font-medium border-0">
                <CheckCircle2 className="w-3 h-3 mr-1 text-mint" />
                {s}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      {sent ? (
        <Card className="border-0 glass rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-mint/20 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6 text-mint" />
            </div>
            <p className="text-lg font-bold text-ink">Anfrage gesendet!</p>
            <p className="text-sm text-muted-custom mt-1">Wir melden uns innert 24 Stunden bei Ihnen.</p>
            <Button
              onClick={() => setSent(false)}
              className="mt-4 rounded-xl bg-black/5 text-ink hover:bg-black/10 border-0"
            >
              Neue Anfrage
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 glass rounded-2xl">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-heading font-bold text-ink">Beratungsanfrage</h3>
            <div>
              <label className="text-xs text-muted-custom font-semibold uppercase tracking-wider">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="mt-1 w-full h-11 px-3 rounded-xl border border-line bg-white/60 text-sm text-ink placeholder:text-muted-custom focus:border-teal outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-muted-custom font-semibold uppercase tracking-wider">E-Mail</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="mt-1 w-full h-11 px-3 rounded-xl border border-line bg-white/60 text-sm text-ink placeholder:text-muted-custom focus:border-teal outline-none"
                placeholder="ihre@email.ch"
              />
            </div>
            <div>
              <label className="text-xs text-muted-custom font-semibold uppercase tracking-wider">Telefon (optional)</label>
              <input
                type="tel"
                value={form.tel}
                onChange={(e) => setForm((p) => ({ ...p, tel: e.target.value }))}
                className="mt-1 w-full h-11 px-3 rounded-xl border border-line bg-white/60 text-sm text-ink placeholder:text-muted-custom focus:border-teal outline-none"
                placeholder="+41 79 ..."
              />
            </div>
            <div>
              <label className="text-xs text-muted-custom font-semibold uppercase tracking-wider">Thema</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm((p) => ({ ...p, topic: t }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      form.topic === t
                        ? 'bg-teal text-white'
                        : 'bg-black/5 text-muted-custom hover:bg-black/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-custom font-semibold uppercase tracking-wider">Nachricht (optional)</label>
              <textarea
                value={form.msg}
                onChange={(e) => setForm((p) => ({ ...p, msg: e.target.value }))}
                rows={3}
                className="mt-1 w-full px-3 py-2 rounded-xl border border-line bg-white/60 text-sm text-ink placeholder:text-muted-custom focus:border-teal outline-none resize-none"
                placeholder="Beschreiben Sie Ihre Situation kurz..."
              />
            </div>
            <Button
              onClick={handleSend}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-teal to-mint hover:opacity-90 text-white font-bold text-sm border-0"
            >
              <Send className="w-4 h-4 mr-2" />
              Anfrage senden
            </Button>
          </CardContent>
        </Card>
      )}

      <p className="text-center text-xs text-muted-custom/60 pb-4">
        Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
      </p>
    </div>
  );
}
