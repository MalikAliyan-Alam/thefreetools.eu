import type { FrVariant, Lang, LetterCase } from './engine';

export type WordsLabels = {
  amount: string;
  amountPlaceholder: string;
  /** {n} = the number as we understood it */
  readAs: string;
  language: string;
  langNames: Record<Lang, string>;
  currency: string;
  plainNumber: string;
  options: string;
  cheque: string;
  andOption: string;
  indianOption: string;
  onlyOption: Record<Lang, string>;
  frVariant: string;
  frVariantNames: Record<FrVariant, string>;
  reformOption: string;
  letterCase: string;
  caseNames: Record<LetterCase, string>;
  resultLabel: string;
  empty: string;
  invalid: string;
  tooBig: string;
  examples: string;
  copy: string;
  copied: string;
  share: string;
  shared: string;
};
