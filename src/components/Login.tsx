import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { hashPin, getUser, saveUser, setSession, createAccount } from '@/lib/storage';
import { Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (user: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [et, setEt] = useState('');
  const [born, setBorn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !pin.trim()) { setError('Bitte Name und PIN eingeben.'); return; }
    const user = getUser(name.trim());
    if (!user) { setError('Dieser Name ist nicht registriert.'); return; }
    const hash = await hashPin(pin.trim(), user.salt);
    if (hash !== user.pinHash) { setError('PIN ist falsch.'); return; }
    setSession(user.username, true);
    onLogin(user.username);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !pin.trim() || !et) { setError('Bitte alle Felder ausfüllen.'); return; }
    if (pin.length < 4) { setError('PIN muss mindestens 4 Ziffern haben.'); return; }
    if (pin !== confirmPin) { setError('Die PINs stimmen nicht überein.'); return; }
    const username = name.trim().toLowerCase();
    if (getUser(username)) { setError('Dieser Name ist bereits registriert.'); return; }
    setLoading(true);
    const user = createAccount(username, pin, name.trim(), et, born);
    user.pinHash = await hashPin(pin, user.salt);
    saveUser(user);
    setSession(user.username, true);
    setLoading(false);
    onLogin(user.username);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* Hero with image */}
      <div className="relative h-[42vh] min-h-[300px] overflow-hidden">
        <img
          src="/assets/Mother and Baby Picture for the Page.jpg"
          alt="Mutter mit Baby"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
        <div className="absolute top-8 left-0 right-0 flex justify-center">
          <img
            src="/assets/kleines-wunder-logo.png"
            alt="Kleines Wunder"
            className="h-14 object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-8 -mt-6 relative z-10">
        <div className="glass-strong rounded-3xl p-6 max-w-md mx-auto shadow-xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal to-mint flex items-center justify-center mx-auto mb-3 glow-teal">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-ink">
              {mode === 'login' ? 'Willkommen zurück' : 'Neuer Kompass'}
            </h1>
            <p className="text-sm text-muted-custom mt-1">
              {mode === 'login' ? 'Dein persönlicher Begleiter für das grösste Glück.' : 'Erstelle deinen persönlichen Baby-Kompass.'}
            </p>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="text-ink font-semibold text-sm">Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="z. B. Lea Keller" className="mt-1.5 h-12 text-base border-line bg-white/60 text-ink placeholder:text-muted-custom focus:border-teal focus:ring-teal" style={{ borderRadius: '12px' }} />
              </div>
              <div>
                <Label className="text-ink font-semibold text-sm">PIN</Label>
                <Input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="4-6 Ziffern" className="mt-1.5 h-12 text-base border-line bg-white/60 text-ink placeholder:text-muted-custom focus:border-teal focus:ring-teal" style={{ borderRadius: '12px' }} />
              </div>
              {error && <p className="text-warn text-sm font-medium">{error}</p>}
              <Button type="submit" className="w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-teal to-mint hover:opacity-90 text-white border-0">
                Einloggen
              </Button>
              <p className="text-center text-sm text-muted-custom">
                Noch kein Kompass?{' '}
                <button type="button" onClick={() => { setMode('register'); setError(''); }} className="text-teal font-semibold underline underline-offset-2">
                  Jetzt erstellen
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label className="text-ink font-semibold text-sm">Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="z. B. Lea Keller" className="mt-1.5 h-12 text-base border-line bg-white/60 text-ink placeholder:text-muted-custom focus:border-teal focus:ring-teal" style={{ borderRadius: '12px' }} />
              </div>
              <div>
                <Label className="text-ink font-semibold text-sm">{born ? 'Geburtsdatum' : 'Geburtstermin'}</Label>
                <Input type="date" value={et} onChange={(e) => setEt(e.target.value)} className="mt-1.5 h-12 text-base border-line bg-white/60 text-ink placeholder:text-muted-custom focus:border-teal focus:ring-teal" style={{ borderRadius: '12px' }} />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={born} onChange={(e) => setBorn(e.target.checked)} className="w-5 h-5 accent-teal rounded" />
                <span className="text-muted-custom">Unser Baby ist schon da</span>
              </label>
              <div>
                <Label className="text-ink font-semibold text-sm">PIN wählen</Label>
                <Input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="4-6 Ziffern" className="mt-1.5 h-12 text-base border-line bg-white/60 text-ink placeholder:text-muted-custom focus:border-teal focus:ring-teal" style={{ borderRadius: '12px' }} />
              </div>
              <div>
                <Label className="text-ink font-semibold text-sm">PIN wiederholen</Label>
                <Input type="password" inputMode="numeric" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} placeholder="4-6 Ziffern" className="mt-1.5 h-12 text-base border-line bg-white/60 text-ink placeholder:text-muted-custom focus:border-teal focus:ring-teal" style={{ borderRadius: '12px' }} />
              </div>
              {error && <p className="text-warn text-sm font-medium">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-teal to-mint hover:opacity-90 text-white border-0">
                {loading ? 'Wird erstellt...' : 'Kompass erstellen'}
              </Button>
              <p className="text-center text-sm text-muted-custom">
                Schon registriert?{' '}
                <button type="button" onClick={() => { setMode('login'); setError(''); }} className="text-teal font-semibold underline underline-offset-2">
                  Einloggen
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Footer logos */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 opacity-60">
            <img src="/assets/VS-Icon-.jpg" alt="VitaSecura" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-xs text-muted-custom">Powered by VitaSecura AG</span>
          </div>
          <p className="text-[10px] text-muted-custom/60 text-center">FINMA-Vermittlerregister Nr. F01533362</p>
        </div>
      </div>
    </div>
  );
}
