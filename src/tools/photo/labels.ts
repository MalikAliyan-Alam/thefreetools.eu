import type { PaperId, SpecId } from './engine';

export type PhotoLabels = {
  choose: string;
  change: string;
  /** Under the upload button. */
  dropHint: string;
  loadError: string;
  docType: string;
  specNames: Record<SpecId, string>;
  /** Which sizes this page offers, in order; the first is the default. */
  specOrder: SpecId[];
  paper: string;
  paperNames: Record<PaperId, string>;
  defaultPaper: PaperId;
  zoom: string;
  rotate: string;
  reset: string;
  /** Accessible name of the crop frame. */
  frameLabel: string;
  /** Screen-reader role name for the crop frame, e.g. "photo editor". */
  frameRole: string;
  guide: string;
  /** Keyboard help, read after the guide. */
  keysHint: string;
  /** {w} × {h} */
  size: string;
  /** {min}–{max} */
  headSize: string;
  /** Shown instead of headSize when the office publishes no head size. */
  headGuideOnly: string;
  /** {n} */
  perSheet: string;
  /** Shown when the framing gives under 200 dpi; {dpi} */
  lowRes: string;
  sheetPreview: string;
  downloadSheet: string;
  downloadSingle: string;
  printTip: string;
  /** File name stem, e.g. "foto" or "photo". */
  fileStem: string;
};
