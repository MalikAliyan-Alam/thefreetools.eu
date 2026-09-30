import type { ToolContent } from '../../types';
import type { PhotoLabels } from '../labels';

const labels: PhotoLabels = {
  choose: 'Choose a photo',
  change: 'Change photo',
  dropHint: 'Take it with your phone, pick one from your gallery or drop it here. It is never uploaded.',
  loadError: 'That image could not be opened. Try a JPG or PNG photo.',
  docType: 'Size',
  specNames: {
    'us-passport': 'US passport or visa · 2 × 2 in',
    'uk-passport': 'UK passport · 35 × 45 mm',
    'intl-35x45': 'Schengen visa · 35 × 45 mm',
    'ca-passport': 'Canadian passport · 50 × 70 mm',
    'es-dni': 'Spanish DNI · 26 × 32 mm',
    'mx-infantil': 'Mexico "infantil" · 2.5 × 3 cm',
    'mx-credencial': 'Mexico "credencial" · 3.5 × 4.5 cm',
  },
  specOrder: ['us-passport', 'uk-passport', 'intl-35x45', 'ca-passport', 'es-dni', 'mx-infantil', 'mx-credencial'],
  paper: 'Print on',
  paperNames: { '4x6': '4 × 6 in photo print', letter: 'US Letter', a4: 'A4' },
  defaultPaper: '4x6',
  zoom: 'Zoom',
  rotate: 'Straighten',
  reset: 'Re-centre',
  frameLabel: 'Photo preview. Drag to move; pinch or use the mouse wheel to zoom.',
  frameRole: 'photo editor',
  keysHint: 'With a keyboard: arrow keys move, + and − zoom.',
  guide: 'Drag the photo so your head fills the oval: the top of your head on the upper line, your chin on the lower line.',
  size: '{w} × {h} mm',
  headSize: 'head {min}–{max} mm (chin to top of head)',
  headGuideOnly: 'no official head size; the oval follows usual studio framing',
  perSheet: '{n} photos per sheet',
  lowRes:
    'This photo is low resolution for that size (about {dpi} dpi; 300 is ideal) and may print blurry. Use the original camera photo, not a screenshot or a WhatsApp copy, or zoom in less.',
  sheetPreview: 'Sheet',
  downloadSheet: 'Download print sheet',
  downloadSingle: 'Download one photo',
  printTip: 'Print at 100% or "actual size", never "fit to page". The 4 × 6 sheet can be ordered as a normal photo print at any photo counter.',
  fileStem: 'photo',
};

const content: ToolContent<PhotoLabels> = {
  slug: 'passport-photo-maker',
  metaTitle: 'Passport Photo Maker: 2×2 in, 35×45 mm, Print at Home',
  metaDescription:
    'Make a US 2×2, UK, Schengen or Canadian passport photo from your phone and download a print sheet at the exact size. Your photo is never uploaded. Free.',
  eyebrow: 'Photos',
  h1: 'Passport photo maker',
  intro:
    'Pick a straight-on photo against a light wall, line your head up with the guide and download a sheet of copies at the exact size. Everything happens in your browser, so the photo never leaves your device.',
  labels,
  sections: [
    {
      heading: 'Official sizes',
      html: `<table><thead><tr><th>Document</th><th>Photo size</th><th>Head, chin to top</th><th>On a 4 × 6 print</th></tr></thead><tbody>
<tr><td>US passport and visa</td><td>2 × 2 in (51 × 51 mm)</td><td>1 to 1 3/8 in (25–35 mm)</td><td>2</td></tr>
<tr><td>UK passport</td><td>35 × 45 mm</td><td>29–34 mm</td><td>6</td></tr>
<tr><td>Schengen visa</td><td>35 × 45 mm</td><td>31.5–36 mm (70–80% of the height)</td><td>6</td></tr>
<tr><td>Canadian passport</td><td>50 × 70 mm</td><td>31–36 mm</td><td>2</td></tr>
<tr><td>Spanish DNI</td><td>32 × 26 mm (height × width)</td><td>not set</td><td>12</td></tr></tbody></table>
<p>Sources: travel.state.gov, gov.uk, the EU Visa Code (which refers to ICAO 9303), canada.ca and Spain's Real Decreto 1553/2005. The UK asks for a plain cream or light grey background and a photo taken in the last month; the US asks for white or off-white, and Canada for plain white or light-coloured.</p>
<p>Canada also requires photos taken by a commercial photographer, who writes their details on the back, so for a Canadian passport use this tool only to check your framing.</p>`,
    },
    {
      heading: 'Taking the photo with a phone',
      html: `<ul>
<li><strong>Background:</strong> a plain white or very light wall, with nothing behind you and no shadow.</li>
<li><strong>Light:</strong> from the front, for example facing a window. Avoid flash and ceiling lights, which cast shadows under the eyes.</li>
<li><strong>Distance:</strong> have someone else take it from 1 to 1.5 m (3 to 5 ft) at eye level. A close-up selfie distorts the face.</li>
<li><strong>Pose:</strong> face the camera, neutral expression, mouth closed, no glasses, face and ears clear.</li>
</ul>
<p>The tool crops and resizes but does not change your face or remove the background, which offices do not allow anyway. If the wall is not light enough, retake the photo.</p>`,
    },
    {
      heading: 'Printing at the right size',
      html: `<p>The sheet is saved at 300 dots per inch with thin grey cutting lines. The cheapest option is to order it as a standard 4 × 6 photo print. A 4 × 6 print holds two US 2 × 2 photos or six 35 × 45 mm photos; US Letter holds 28 at 35 × 45 mm and A4 holds 30.</p>
<p>At home, choose "actual size" or 100% scale, never "fit to page", and measure one photo with a ruler before cutting.</p>`,
    },
  ],
  faq: [
    {
      q: 'What size is a US passport photo?',
      a: '2 × 2 inches (51 × 51 mm), with the head between 1 and 1 3/8 inches (25–35 mm) from chin to top of head.',
    },
    {
      q: 'What size is a UK passport photo?',
      a: '45 mm high by 35 mm wide, with the head 29–34 mm from chin to crown, against a plain cream or light grey background.',
    },
    {
      q: 'Can I take a passport photo with my phone?',
      a: 'For a US passport, yes: the State Department accepts photos taken at home if they meet the rules and are not edited. Other offices and visa centres set their own rules, so check theirs. Canada requires a commercial photographer.',
    },
    {
      q: 'How many passport photos fit on a 4 × 6 print?',
      a: 'Two US 2 × 2 photos, or six 35 × 45 mm photos, leaving a small margin and a gap for cutting.',
    },
    {
      q: 'Is my photo uploaded?',
      a: 'No. The image is processed in your browser and the print sheet is created on your device. Nothing is stored after you close the page.',
    },
  ],
  updated: '2026-10-01',
};

export default content;
