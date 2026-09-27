export type VatLabels = {
  /** Countries offered on this page, in order; ids from COUNTRIES in engine.ts, plus 'custom'. */
  countries: { id: string; name: string }[];
  defaultCountry: string;
  country: string;
  rate: string;
  net: string;
  vat: string;
  gross: string;
  /** Shown above the three boxes. */
  typeAny: string;
  share: string;
  inWords: string;
  /** Mexico only */
  withholdings: string;
  ivaRet: string;
  isr: string;
  isrNone: string;
  isr10: string;
  isrResico: string;
  receive: string;
  copy: string;
  copied: string;
  shareLink: string;
  shared: string;
  reset: string;
};
