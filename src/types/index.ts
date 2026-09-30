export interface Task {
  id: string;
  ph: number | string;
  t: string;
  why: string;
  due?: Date;
  rec?: Date;
  sec?: boolean;
  imp?: boolean;
  topic?: string;
  tool?: string;
}

export interface UserContext {
  et: string;
  born: boolean;
  married: string;
  tz: boolean;
  selb: boolean;
}

export interface UserProfile {
  name: string;
  baby?: string;
}

export interface UserData {
  username: string;
  pinHash: string;
  salt: string;
  created: string;
  profile: UserProfile;
  ctx: UserContext;
  status: Record<string, string>;
  checks: Record<string, any>;
  budget: Record<string, Record<string, string>>;
  fokus: string[];
  notfall?: Record<string, string>;
  beratung?: Record<string, any>;
}

export interface StoredAccounts {
  [username: string]: UserData;
}

export type TabId = 'home' | 'phasen' | 'kalender' | 'wissen' | 'budget' | 'notfall' | 'checks' | 'absicherungen' | 'beratung' | 'omnia';

export interface PhaseInfo {
  name: string;
  cls: string;
  box: string;
  sub: string;
}
