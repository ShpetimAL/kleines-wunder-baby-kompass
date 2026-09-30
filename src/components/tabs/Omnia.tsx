import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Smartphone, LayoutDashboard, FileText, TrendingUp, Activity, Shield, CheckCircle2, ArrowRight
} from 'lucide-react';

export default function OmniaTab() {
  const features = [
    { icon: LayoutDashboard, title: 'Alles im Überblick', desc: 'Versicherungen, Dokumente, Finanzen und Gesundheit – klar an einem Ort.' },
    { icon: FileText, title: 'Dokumente sicher', desc: 'Wichtige Unterlagen immer griffbereit, direkt in der App.' },
    { icon: TrendingUp, title: 'Budget & Finanzen', desc: 'Fixkosten, Ausgaben und Reserven im persönlichen Überblick.' },
    { icon: Activity, title: 'Gesundheitstagebuch', desc: 'Ernährung, Aktivitäten und Vitalwerte als persönliches Tagebuch.' },
  ];

  const benefits = [
    'Erinnerungen an Fristen und Termine',
    'Policenübersicht auf einen Blick',
    'Dokumente digital sicher hinterlegt',
    'Laufende Unterstützung für Familien',
    'Kostenlos für VitaSecura Kunden',
  ];

  return (
    <div className="space-y-5">
      {/* Hero */}
      <Card className="border-0 overflow-hidden" style={{ borderRadius: '24px', background: 'linear-gradient(135deg, rgba(42,142,158,0.12) 0%, rgba(54,161,139,0.08) 100%)' }}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <img src="/assets/omnia-app-icon-1024.png" alt="OMNIA" className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-heading font-bold text-ink">OMNIA</h2>
                <Badge className="bg-teal/15 text-teal text-[10px] border-0">by VitaSecura</Badge>
              </div>
              <p className="text-sm text-muted-custom">Ihr digitaler Versicherungsbegleiter</p>
            </div>
          </div>
          <p className="text-sm text-text-custom leading-relaxed mb-5">
            Kennen Sie schon <strong className="text-ink">OMNIA</strong>? Unsere App, in der Sie alle Versicherungen, Dokumente und Finanzen im Überblick behalten. Für unsere Kunden mit Kleinem Wunder bieten wir den vollen OMNIA-Service – damit nichts verloren geht.
          </p>
          <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-teal to-mint hover:opacity-90 text-white font-bold text-sm border-0">
            <Smartphone className="w-4 h-4 mr-2" />
            Mehr über OMNIA erfahren
          </Button>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Card key={f.title} className="border-0 glass rounded-2xl">
              <CardContent className="p-4">
                <Icon className="w-6 h-6 text-teal mb-2" />
                <p className="text-sm font-bold text-ink">{f.title}</p>
                <p className="text-xs text-muted-custom mt-1 leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Benefits */}
      <Card className="border-0 glass rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-teal" />
            <h3 className="font-heading font-bold text-ink">Ihre Vorteile mit OMNIA</h3>
          </div>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-mint shrink-0" />
                <span className="text-sm text-ink">{b}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="border-0 overflow-hidden" style={{ borderRadius: '24px', background: 'linear-gradient(135deg, rgba(42,142,158,0.15) 0%, rgba(54,161,139,0.1) 100%)' }}>
        <CardContent className="p-6 text-center">
          <p className="text-lg font-heading font-bold text-ink mb-2">Bereit für mehr Überblick?</p>
          <p className="text-sm text-muted-custom mb-4">Der Kompass gibt Orientierung. Mit OMNIA gehen wir mit – damit nichts verloren geht.</p>
          <Button className="h-11 rounded-xl bg-gradient-to-r from-teal to-mint hover:opacity-90 text-white font-bold text-sm border-0 px-6">
            OMNIA entdecken
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
