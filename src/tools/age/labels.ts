export type AgeLabels = {
  /** Which calendar the birth date is entered in by default, and which age is shown first. */
  primary: 'gregorian' | 'hijri';
  birthIn: string;
  gregorian: string;
  hijri: string;
  day: string;
  month: string;
  year: string;
  yearPlaceholder: string;
  onDate: string;
  onDateHint: string;
  enterBirth: string;
  invalid: string;
  future: string;
  ageLabel: string;
  hijriAgeLabel: string;
  gregAgeLabel: string;
  /** {y} {m} {d} placeholders, each filled with number + correctly pluralised unit */
  ageFormat: string;
  /** Unit words per Intl.PluralRules category (one, two, few, many, other). */
  units: Record<'y' | 'm' | 'd', Partial<Record<Intl.LDMLPluralRule, string>>>;
  totalDays: string;
  totalWeeks: string;
  totalMonths: string;
  nextBirthday: string;
  /** {n} = number + day unit, {weekday} */
  nextBirthdayIn: string;
  birthdayToday: string;
  bornOn: string;
  copy: string;
  copied: string;
  share: string;
  shared: string;
  hijriSuffix: string;
};
