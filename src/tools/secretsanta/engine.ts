/**
 * Secret Santa / amigo invisible draw. Pure functions, covered by tests/secretsanta.test.ts.
 * Everyone gives to exactly one person and receives from exactly one person, nobody draws
 * themselves, and pairs listed as exclusions (for example a couple) never draw each other.
 * Nothing here talks to a server: the draw and the private links are built in the browser.
 */

export type Pair = [string, string];
export type Draw = { giver: string; receiver: string }[];

export const MIN_PEOPLE = 3;
export const MAX_PEOPLE = 60;

const key = (s: string) => s.trim().toLocaleLowerCase();

/** Trims, drops empty lines and duplicates (ignoring case), keeps the first spelling. */
export function cleanNames(raw: string | string[]): string[] {
  const lines = Array.isArray(raw) ? raw : raw.split(/\r?\n|,/);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const l of lines) {
    const n = l.trim().replace(/\s+/g, ' ');
    if (!n || seen.has(key(n))) continue;
    seen.add(key(n));
    out.push(n);
  }
  return out;
}

/** Parses "Ana - Luis", "Ana, Luis" or "Ana / Luis" lines into pairs of names. */
export function parseExclusions(raw: string): Pair[] {
  const pairs: Pair[] = [];
  for (const line of raw.split(/\r?\n/)) {
    const parts = line.split(/\s*(?:-|,|\/|&|\+|y|and)\s+|\s*[-,/&+]\s*/i).map((p) => p.trim()).filter(Boolean);
    if (parts.length === 2) pairs.push([parts[0], parts[1]]);
  }
  return pairs;
}

/** Fisher-Yates with an injectable random function (for tests). */
export function shuffle<T>(items: T[], rng: () => number = Math.random): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Returns a valid draw or null if the constraints cannot be met.
 * Backtracking over a shuffled order, so every valid draw is reachable.
 */
export function draw(names: string[], exclusions: Pair[] = [], rng: () => number = Math.random): Draw | null {
  const n = names.length;
  if (n < MIN_PEOPLE || n > MAX_PEOPLE) return null;
  const banned = new Set<string>();
  for (const [a, b] of exclusions) {
    banned.add(`${key(a)}\u0000${key(b)}`);
    banned.add(`${key(b)}\u0000${key(a)}`);
  }
  const allowed = (g: string, r: string) => key(g) !== key(r) && !banned.has(`${key(g)}\u0000${key(r)}`);
  const order = shuffle(names, rng);
  const taken = new Array<boolean>(n).fill(false);
  const result: string[] = new Array(n);
  let steps = 0;

  const place = (i: number): boolean => {
    if (i === n) return true;
    if (++steps > 200000) return false;
    const candidates = shuffle(
      order.map((_, idx) => idx).filter((idx) => !taken[idx] && allowed(order[i], order[idx])),
      rng,
    );
    for (const idx of candidates) {
      taken[idx] = true;
      result[i] = order[idx];
      if (place(i + 1)) return true;
      taken[idx] = false;
    }
    return false;
  };

  return place(0) ? order.map((giver, i) => ({ giver, receiver: result[i] })) : null;
}

/** True when every person gives once, receives once, and no rule is broken. */
export function isValid(d: Draw, names: string[], exclusions: Pair[] = []): boolean {
  if (d.length !== names.length) return false;
  const givers = new Set(d.map((x) => key(x.giver)));
  const receivers = new Set(d.map((x) => key(x.receiver)));
  if (givers.size !== names.length || receivers.size !== names.length) return false;
  for (const n of names) if (!givers.has(key(n)) || !receivers.has(key(n))) return false;
  const banned = new Set<string>();
  for (const [a, b] of exclusions) {
    banned.add(`${key(a)}\u0000${key(b)}`);
    banned.add(`${key(b)}\u0000${key(a)}`);
  }
  return d.every((x) => key(x.giver) !== key(x.receiver) && !banned.has(`${key(x.giver)}\u0000${key(x.receiver)}`));
}

// ---- private links: the pairing travels in the URL fragment, which browsers never send to a server.

const toB64 = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const fromB64 = (s: string) => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export type Reveal = { giver: string; receiver: string; budget?: string };

export function encodeReveal(r: Reveal): string {
  return toB64(JSON.stringify(r));
}

export function decodeReveal(token: string): Reveal | null {
  try {
    const o = JSON.parse(fromB64(token));
    if (typeof o?.giver === 'string' && typeof o?.receiver === 'string') {
      return { giver: o.giver, receiver: o.receiver, budget: typeof o.budget === 'string' ? o.budget : undefined };
    }
  } catch {
    /* not a valid token */
  }
  return null;
}
