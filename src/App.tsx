import { useState, useEffect } from 'react';
import Login from './components/Login';
import AppShell from './components/AppShell';
import { getSession } from './lib/storage';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const s = getSession();
    if (s) setUser(s);
  }, []);

  return user ? (
    <AppShell username={user} onLogout={() => setUser(null)} />
  ) : (
    <Login onLogin={(u) => setUser(u)} />
  );
}

export default App;
// Build trigger: 2026-09-30
