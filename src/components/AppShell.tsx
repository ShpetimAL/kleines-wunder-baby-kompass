import { useState, useEffect, useCallback } from 'react';
import { getUser, saveUser, setSession } from '@/lib/storage';
import type { UserData, TabId } from '@/types';
import OverviewTab from './tabs/Overview';
import PhasenTab from './tabs/Phasen';
import KalenderTab from './tabs/Kalender';
import WissenTab from './tabs/Wissen';
import BudgetTab from './tabs/Budget';
import NotfallTab from './tabs/Notfall';
import ChecksTab from './tabs/Checks';
import AbsicherungenTab from './tabs/Absicherungen';
import BeratungTab from './tabs/Beratung';
import OmniaTab from './tabs/Omnia';
import {
  Home, ListChecks, Calendar, Lightbulb, Calculator,
  ShieldAlert, ClipboardCheck, Shield, MessageCircle, LogOut, MoreHorizontal, Smartphone
} from 'lucide-react';

interface AppShellProps {
  username: string;
  onLogout: () => void;
}

const TABS: { id: TabId; label: string; icon: React.ElementType; mobile?: boolean }[] = [
  { id: 'home', label: 'Übersicht', icon: Home, mobile: true },
  { id: 'phasen', label: 'Phasen', icon: ListChecks, mobile: true },
  { id: 'kalender', label: 'Kalender', icon: Calendar, mobile: true },
  { id: 'wissen', label: 'Wissen', icon: Lightbulb },
  { id: 'budget', label: 'Budget', icon: Calculator },
  { id: 'notfall', label: 'Notfall', icon: ShieldAlert },
  { id: 'checks', label: 'Checks', icon: ClipboardCheck },
  { id: 'absicherungen', label: 'Absicherungen', icon: Shield, mobile: true },
  { id: 'beratung', label: 'Beratung', icon: MessageCircle },
  { id: 'omnia', label: 'OMNIA', icon: Smartphone },
];

export default function AppShell({ username, onLogout }: AppShellProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const u = getUser(username);
    if (u) setUser(u);
  }, [username]);

  const updateUser = useCallback((updater: (u: UserData) => UserData) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = updater({ ...prev });
      saveUser(next);
      return next;
    });
  }, []);

  if (!user) return null;

  const mobileTabs = TABS.filter((t) => t.mobile);
  const moreTabs = TABS.filter((t) => !t.mobile);

  const renderTab = () => {
    const props = { user, updateUser };
    switch (activeTab) {
      case 'home': return <OverviewTab {...props} />;
      case 'phasen': return <PhasenTab {...props} />;
      case 'kalender': return <KalenderTab {...props} />;
      case 'wissen': return <WissenTab />;
      case 'budget': return <BudgetTab {...props} />;
      case 'notfall': return <NotfallTab {...props} />;
      case 'checks': return <ChecksTab {...props} />;
      case 'absicherungen': return <AbsicherungenTab />;
      case 'beratung': return <BeratungTab {...props} />;
      case 'omnia': return <OmniaTab />;
      default: return <OverviewTab {...props} />;
    }
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b-0">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/VS-Icon-.jpg" alt="VitaSecura" className="w-8 h-8 rounded-xl object-cover" />
            <img src="/assets/kleines-wunder-logo.png" alt="Kleines Wunder" className="h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-custom hidden sm:inline">Hallo, {user.profile.name}</span>
            <button
              onClick={() => { setSession(null); onLogout(); }}
              className="p-2 rounded-xl hover:bg-black/5 text-muted-custom hover:text-ink transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Scrollable Nav (Desktop/Tablet) */}
        <div className="hidden md:block border-t border-line/50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-[3px] transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal text-ink'
                      : 'border-transparent text-muted-custom hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 pt-6">
        {renderTab()}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass border-t border-line/50">
        <div className="flex items-center justify-around pb-safe">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setShowMore(false); window.scrollTo({ top: 0 }); }}
                className={`flex flex-col items-center gap-1 py-2 px-3 flex-1 transition-colors ${isActive ? 'text-teal' : 'text-muted-custom'}`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex flex-col items-center gap-1 py-2 px-3 flex-1 transition-colors ${showMore ? 'text-teal' : 'text-muted-custom'}`}
          >
            <MoreHorizontal className="w-5 h-5" strokeWidth={showMore ? 2.5 : 1.8} />
            <span className="text-[10px] font-semibold">Mehr</span>
          </button>
        </div>

        {/* More Sheet */}
        {showMore && (
          <div className="absolute bottom-full left-0 right-0 p-4" onClick={() => setShowMore(false)}>
            <div className="glass-strong rounded-2xl p-4 grid grid-cols-2 gap-2 shadow-xl" onClick={(e) => e.stopPropagation()}>
              {moreTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setShowMore(false); window.scrollTo({ top: 0 }); }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 text-left transition-colors"
                  >
                    <Icon className="w-5 h-5 text-teal" />
                    <span className="text-sm font-semibold text-ink">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
