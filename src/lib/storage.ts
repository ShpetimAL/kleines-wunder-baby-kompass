const STORAGE_KEY = 'baby-kompass-accounts-v1';
const SESSION_KEY = 'baby-kompass-session';

export async function hashPin(pin: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(pin + salt), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256);
  return Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function getStorage(): any {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStorage(data: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getUser(username: string): any {
  const store = getStorage();
  return store[username.toLowerCase()] || null;
}

export function saveUser(user: any) {
  const store = getStorage();
  store[user.username.toLowerCase()] = user;
  setStorage(store);
}

export function getSession(): string | null {
  try {
    const s = localStorage.getItem(SESSION_KEY);
    if (!s) return null;
    const data = JSON.parse(s);
    if (!data?.user) return null;
    return data.user;
  } catch {
    return null;
  }
}

export function setSession(user: string | null, _remember = true) {
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user, ts: Date.now() }));
}

export function createAccount(
  username: string,
  _pin: string,
  displayName: string,
  et: string,
  born: boolean
) {
  const salt = crypto.randomUUID();
  return {
    username: username.toLowerCase(),
    pinHash: '',
    salt,
    created: new Date().toISOString(),
    profile: { name: displayName || username },
    ctx: { et, born, married: '', tz: false, selb: false },
    status: {},
    checks: {},
    budget: { vor: {}, nach: {} },
    fokus: [],
    notfall: {},
    beratung: {},
  };
}
