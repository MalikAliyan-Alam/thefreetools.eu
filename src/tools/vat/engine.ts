/**
 * VAT / IVA: net, tax and gross from any one of them, plus Mexican withholdings.
 * Pure functions, covered by tests/vat.test.ts. Money is rounded half up per
 * currency decimals (2, or 0 for Chilean pesos).
 */

export type Field = 'net' | 'vat' | 'gross';
export type Breakdown = { net: number; vat: number; gross: number };

/** Half-up rounding without float noise (1.005 → 1.01). */
export function round(n: number, decimals = 2): number {
  const shifted = Math.round(Number(`${Number(n.toPrecision(12))}e${decimals}`));
  return Number(`${shifted}e-${decimals}`) + 0;
}

/**
 * Solves the other two amounts from the one the user typed.
 * The tax is rounded once and the third amount is derived from the other two,
 * so net + vat always equals gross exactly (as on an invoice).
 */
export function solve(from: Field, value: number, ratePct: number, decimals = 2): Breakdown {
  const r = ratePct / 100;
  if (from === 'net') {
    const net = round(value, decimals);
    const vat = round(net * r, decimals);
    return { net, vat, gross: round(net + vat, decimals) };
  }
  if (from === 'gross') {
    const gross = round(value, decimals);
    const net = round(gross / (1 + r), decimals);
    return { net, vat: round(gross - net, decimals), gross };
  }
  const vat = round(value, decimals);
  const net = r > 0 ? round(vat / r, decimals) : 0;
  return { net, vat, gross: round(net + vat, decimals) };
}

export type Withholding = { ivaRet: number; isrRet: number; receive: number };

/**
 * Mexico: when a company pays a self-employed person (honorarios, arrendamiento),
 * it withholds two thirds of the IVA and a share of the net as ISR
 * (10 %, or 1.25 % under RESICO). The person receives gross minus both.
 */
export function mxWithholding(b: Breakdown, ivaTwoThirds: boolean, isrPct: number): Withholding {
  const ivaRet = ivaTwoThirds ? round((b.vat * 2) / 3) : 0;
  const isrRet = round((b.net * isrPct) / 100);
  return { ivaRet, isrRet, receive: round(b.gross - ivaRet - isrRet) };
}

export type Country = {
  id: string;
  rate: number;
  /** Currency code for the amount in words (numbers-to-words engine), if supported. */
  currency?: string;
  decimals?: number;
  /** Shows the Mexican withholding options. */
  mx?: boolean;
};

export const COUNTRIES: Record<string, Country> = {
  SA: { id: 'SA', rate: 15, currency: 'SAR' },
  AE: { id: 'AE', rate: 5, currency: 'AED' },
  BH: { id: 'BH', rate: 10 },
  OM: { id: 'OM', rate: 5 },
  EG: { id: 'EG', rate: 14, currency: 'EGP' },
  GB: { id: 'GB', rate: 20, currency: 'GBP' },
  MX: { id: 'MX', rate: 16, currency: 'MXN', mx: true },
  MXF: { id: 'MXF', rate: 8, currency: 'MXN', mx: true },
  CL: { id: 'CL', rate: 19, currency: 'CLP', decimals: 0 },
  ES: { id: 'ES', rate: 21, currency: 'EUR' },
  PE: { id: 'PE', rate: 18, currency: 'PEN' },
  CO: { id: 'CO', rate: 19, currency: 'COP' },
  AR: { id: 'AR', rate: 21, currency: 'ARS' },
};
