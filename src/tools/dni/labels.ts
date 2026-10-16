export type DniLabels = {
  field: string;
  placeholder: string;
  hint: string;
  letter: string;
  remainder: string;
  full: string;
  kindDni: string;
  kindNie: string;
  /** Shown when the typed letter is right. */
  valid: string;
  /** Shown when the typed letter is wrong; "{letter}" is replaced with the correct one. */
  invalid: string;
  errFormat: string;
  errLength: string;
  steps: string;
  example: string;
  copy: string;
  copied: string;
  reset: string;
};
