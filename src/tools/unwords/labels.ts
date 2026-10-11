export type UnwordsLabels = {
  input: string;
  placeholder: string;
  examples: string;
  resultLabel: string;
  /** {n} = the number, {words} = the usual spelling */
  usualSpelling: string;
  otherSpelling: string;
  empty: string;
  /** {word} = the word we could not read */
  unknown: string;
  order: string;
  tooBig: string;
  copy: string;
  copied: string;
  copyPlain: string;
  clear: string;
};
