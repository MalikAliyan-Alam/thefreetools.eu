/**
 * Spanish DNI / NIE control letter. The Ministerio del Interior publishes the rule:
 * divide the number by 23 and look the remainder up in a 23-letter table. For a NIE the
 * leading X, Y or Z is first replaced by 0, 1 or 2. The letters I, Ñ, O and U are not in the
 * table. Company NIFs and the K, L and M NIFs use other rules and are out of scope.
 * Pure functions, covered by tests/dni.test.ts.
 */

export const LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';
const NIE_PREFIX: Record<string, string> = { X: '0', Y: '1', Z: '2' };

/** Remainder of the digit string divided by 23, without overflow for long inputs. */
export function mod23(digits: string): number {
  let r = 0;
  for (const ch of digits) r = (r * 10 + Number(ch)) % 23;
  return r;
}

/** Control letter for a DNI number (1 to 8 digits). */
export function dniLetter(digits: string): string {
  return LETTERS[mod23(digits)];
}

export type Checked =
  | { ok: false; reason: 'empty' | 'format' | 'length' }
  | {
      ok: true;
      kind: 'dni' | 'nie';
      /** Digits that go into the division (for a NIE, the prefix is already turned into a digit). */
      number: string;
      remainder: number;
      expected: string;
      /** Normalised document without spaces or dashes, with the correct letter. */
      full: string;
      /** The letter the user typed, if any. */
      given?: string;
      /** true or false when a letter was typed, undefined when only the number was typed. */
      valid?: boolean;
    };

/** Accepts "12345678", "12345678Z", "12.345.678-Z", "X1234567", "x-1234567-l". */
export function checkId(raw: string): Checked {
  const s = raw.toUpperCase().replace(/[\s.\-]/g, '');
  if (s === '') return { ok: false, reason: 'empty' };
  const nie = s.match(/^([XYZ])(\d{1,7})([A-Z])?$/);
  if (nie) {
    const digits = nie[2];
    if (digits.length !== 7) return { ok: false, reason: 'length' };
    const number = NIE_PREFIX[nie[1]] + digits;
    const remainder = mod23(number);
    const expected = LETTERS[remainder];
    return finish('nie', nie[1] + digits, number, remainder, expected, nie[3]);
  }
  const dni = s.match(/^(\d{1,8})([A-Z])?$/);
  if (!dni) return { ok: false, reason: 'format' };
  const number = dni[1];
  const remainder = mod23(number);
  const expected = LETTERS[remainder];
  return finish('dni', number.padStart(8, '0'), number, remainder, expected, dni[2]);
}

function finish(kind: 'dni' | 'nie', body: string, number: string, remainder: number, expected: string, given?: string): Checked {
  return { ok: true, kind, number, remainder, expected, full: body + expected, given, valid: given === undefined ? undefined : given === expected };
}
