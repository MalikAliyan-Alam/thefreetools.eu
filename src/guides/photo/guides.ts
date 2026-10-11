import type { GuideContent } from '../types';
import { SPECS, PAPERS, layoutSheet, mmToPx } from '../../tools/photo/engine.ts';

// Pixel sizes and sheet counts come from the photo engine, so they match what the tool does.
const px = (mm: number) => mmToPx(mm, 300);
const cells = (paper: keyof typeof PAPERS, spec: keyof typeof SPECS) => layoutSheet(PAPERS[paper], SPECS[spec]).cells.length;

const D = '2026-10-11';

export const photoPixelsEn: GuideContent = {
  key: 'photo-sizes-px',
  tool: 'photo',
  slug: 'passport-photo-size-pixels-mm-inches',
  metaTitle: 'Passport Photo Size in Pixels, mm and Inches (US, UK, EU, Canada)',
  metaDescription: `A US passport photo is 2 × 2 in, which is ${px(50.8)} × ${px(50.8)} px at 300 dpi. UK and Schengen photos are 35 × 45 mm, or ${px(35)} × ${px(45)} px. Every size in all three units.`,
  h1: 'Passport photo size in pixels, mm and inches',
  answer: `A US passport photo is 2 × 2 inches (51 × 51 mm), which is ${px(50.8)} × ${px(50.8)} pixels at 300 dpi. UK and Schengen photos are 35 × 45 mm (1.38 × 1.77 in), or ${px(35)} × ${px(45)} pixels.`,
  sections: [
    {
      heading: 'The sizes side by side',
      html: `<table><thead><tr><th>Country</th><th>Millimetres</th><th>Inches</th><th>Pixels at 300 dpi</th></tr></thead><tbody>
<tr><td>United States</td><td>51 × 51</td><td>2 × 2</td><td>${px(50.8)} × ${px(50.8)}</td></tr>
<tr><td>United Kingdom</td><td>35 × 45</td><td>1.38 × 1.77</td><td>${px(35)} × ${px(45)}</td></tr>
<tr><td>Schengen visa</td><td>35 × 45</td><td>1.38 × 1.77</td><td>${px(35)} × ${px(45)}</td></tr>
<tr><td>Canada</td><td>50 × 70</td><td>1.97 × 2.76</td><td>${px(50)} × ${px(70)}</td></tr></tbody></table>
<p>The pixel count is the size in inches multiplied by the print resolution. 35 mm is 1.378 in, and 1.378 × 300 is about ${px(35)} pixels. Most printing shops want 300 dpi, so that is the number to aim for.</p>`,
    },
    {
      heading: 'What to do with a photo that is too small',
      html: `<p>If your picture has fewer pixels than the table, enlarging it makes it soft, not sharper. A face cropped out of a wide shot is the usual cause: if the face fills only 250 pixels across and you stretch it to the full width of a US photo, you end up near 125 dpi and the print looks blurry.</p>
<p>The better fix is to retake the photo closer, at a distance of about one metre, with your phone at eye height. The photo tool warns you when the result falls under 200 dpi.</p>`,
    },
    {
      heading: 'How many fit on a print',
      html: `<p>On a standard 4 × 6 in print (the 10 × 15 cm you ask for at a lab) the tool fits ${cells('4x6', 'us-passport')} US passport photos or ${cells('4x6', 'uk-passport')} UK and Schengen ones. A US Letter sheet takes ${cells('letter', 'us-passport')} of the US size, and an A4 sheet ${cells('a4', 'us-passport')}. Print at 100 percent, never at "fit to page", or every photo shrinks.</p>
<p>Ready to make one? Open the <a href="/passport-photo-maker/">passport photo maker</a>, pick the country, and download the sheet.</p>`,
    },
    {
      heading: 'Where the sizes come from',
      html: `<p>The US size and head height come from travel.state.gov, the UK size from gov.uk, the Canadian size from canada.ca, and the Schengen size from the EU Visa Code, which points to the ICAO 9303 standard. If your office asks for something different, follow its instructions, not this table.</p>`,
    },
  ],
  faq: [
    {
      q: 'What size is a US passport photo in pixels?',
      a: `${px(50.8)} × ${px(50.8)} pixels at 300 dpi, because it is 2 × 2 inches.`,
    },
    {
      q: 'What size is a UK passport photo in pixels?',
      a: `${px(35)} × ${px(45)} pixels at 300 dpi, from 35 × 45 mm.`,
    },
    {
      q: 'Is a Schengen visa photo the same as a UK one?',
      a: 'The paper size is the same, 35 × 45 mm. The head height rules differ slightly, so check the one for your visa.',
    },
    {
      q: 'Is 300 dpi required?',
      a: 'Printing shops generally want 300 dpi. For online uploads, follow the pixel limits the website gives you.',
    },
  ],
  published: D,
  updated: D,
};

export const photoPrintEs: GuideContent = {
  key: 'photo-print-home',
  tool: 'photo',
  slug: 'como-imprimir-fotos-tamano-infantil',
  metaTitle: 'Cómo imprimir fotos tamaño infantil sin que cambie el tamaño',
  metaDescription: `En una hoja carta caben ${cells('letter', 'mx-infantil')} fotos tamaño infantil (2,5 × 3 cm) y en una A4, ${cells('a4', 'mx-infantil')}. Cómo imprimirlas en casa o en el laboratorio sin perder la medida.`,
  h1: 'Cómo imprimir fotos tamaño infantil sin que cambie el tamaño',
  answer: `Imprime la hoja al 100 %, sin «ajustar a la página». En una foto de 10 × 15 cm caben ${cells('4x6', 'mx-infantil')} fotos infantiles, en una hoja carta ${cells('letter', 'mx-infantil')} y en una A4 ${cells('a4', 'mx-infantil')}.`,
  sections: [
    {
      heading: 'Cuántas caben en cada papel',
      html: `<table><thead><tr><th>Papel</th><th>Infantil (2,5 × 3 cm)</th><th>Credencial (3,5 × 4,5 cm)</th></tr></thead><tbody>
<tr><td>Foto de 10 × 15 cm</td><td>${cells('4x6', 'mx-infantil')}</td><td>${cells('4x6', 'mx-credencial')}</td></tr>
<tr><td>Hoja carta</td><td>${cells('letter', 'mx-infantil')}</td><td>${cells('letter', 'mx-credencial')}</td></tr>
<tr><td>Hoja A4</td><td>${cells('a4', 'mx-infantil')}</td><td>${cells('a4', 'mx-credencial')}</td></tr></tbody></table>
<p>Las medidas infantil y credencial no vienen de una norma oficial, son las que usan los estudios fotográficos. Si tu trámite pide otra, manda la que diga el trámite.</p>`,
    },
    {
      heading: 'Por qué a veces salen más chicas',
      html: `<p>La causa casi siempre es la opción «ajustar a la página» de la impresora. Si reduce la hoja apenas un 5 %, una foto de 3 cm de alto sale de 2,85 cm. Elige «tamaño real» o escala al 100 %, y mide una foto con una regla antes de recortar todas.</p>
<p>Otra causa es mandar a imprimir un archivo con poca resolución. La hoja de la herramienta se descarga a 300 puntos por pulgada, y una foto infantil necesita ${mmToPx(25, 300)} × ${mmToPx(30, 300)} píxeles para verse nítida.</p>`,
    },
    {
      heading: 'En casa o en el laboratorio',
      html: `<p>Lo más sencillo es llevar la hoja de 10 × 15 cm a un laboratorio y pedirla como una foto normal, porque la hoja ya tiene el tamaño de una foto normal. Si prefieres casa, usa papel fotográfico y recorta por las líneas grises que trae la hoja.</p>
<p>Para armar la hoja, abre la <a href="/es/foto-tamano-infantil/">herramienta de fotos infantil y pasaporte</a>. La foto no sale de tu dispositivo.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Cuántas fotos infantiles caben en una hoja carta?',
      a: `${cells('letter', 'mx-infantil')}. En una A4 caben ${cells('a4', 'mx-infantil')}.`,
    },
    {
      q: '¿Cuánto mide una foto tamaño infantil?',
      a: '2,5 cm de ancho por 3 cm de alto, es decir 0,98 × 1,18 pulgadas.',
    },
    {
      q: '¿Qué hago si salen más chicas de lo que debían?',
      a: 'Vuelve a imprimir al 100 %, sin la opción de ajustar a la página, y mide una foto antes de recortar.',
    },
  ],
  published: D,
  updated: D,
};
