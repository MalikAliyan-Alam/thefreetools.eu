export type SecretSantaLabels = {
  names: string;
  namesHint: string;
  namesPlaceholder: string;
  exclusions: string;
  exclusionsHint: string;
  exclusionsPlaceholder: string;
  budget: string;
  budgetPlaceholder: string;
  draw: string;
  redraw: string;
  example: string;
  reset: string;
  /** "{n}" is replaced by the number of people. */
  count: string;
  errFew: string;
  errMany: string;
  errImpossible: string;
  /** Shown after the draw. */
  done: string;
  modeHand: string;
  modeLinks: string;
  /** "{name}" is replaced by the person who should take the phone. */
  passTo: string;
  showMine: string;
  hide: string;
  next: string;
  /** "{name}" is replaced by the receiver. */
  youGive: string;
  finished: string;
  linksIntro: string;
  /** Message template for WhatsApp; "{name}", "{link}" and "{budget}" are replaced. */
  message: string;
  messageBudget: string;
  copyMessage: string;
  copyLink: string;
  copied: string;
  openWhatsapp: string;
  /** Page opened from a private link. "{giver}" and "{receiver}" are replaced. */
  revealTitle: string;
  revealBody: string;
  revealBudget: string;
  revealKeep: string;
  makeOwn: string;
  organizerNote: string;
};
