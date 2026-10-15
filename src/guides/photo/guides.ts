import type { GuideContent } from '../types';
import { SPECS, PAPERS, layoutSheet, mmToPx } from '../../tools/photo/engine.ts';

// Pixel sizes and sheet counts come from the photo engine, so they match what the tool does.
const px = (mm: number) => mmToPx(mm, 300);
const cells = (paper: keyof typeof PAPERS, spec: keyof typeof SPECS) => layoutSheet(PAPERS[paper], SPECS[spec]).cells.length;

const D = '2026-10-11';
const share = (spec: keyof typeof SPECS, i: 0 | 1) => Math.round(((SPECS[spec].head![i] as number) / SPECS[spec].h) * 100);

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
    {
      heading: 'Head height: the rule that rejects most photos',
      html: `<p>The photo size is only half the rule. Offices also fix how big the head must be, measured from chin to the top of the head:</p>
<table><thead><tr><th>Country</th><th>Head height</th><th>Share of photo height</th></tr></thead><tbody>
<tr><td>United States</td><td>25 to 35 mm (1 to 1⅜ in)</td><td>${share('us-passport', 0)}% to ${share('us-passport', 1)}%</td></tr>
<tr><td>United Kingdom</td><td>29 to 34 mm</td><td>${share('uk-passport', 0)}% to ${share('uk-passport', 1)}%</td></tr></tbody></table>
<p>This is why a photo that is the right size can still be refused: if you stand too far from the camera the head looks small, and if you crop too tightly it looks too big. The framing oval in the photo tool helps you place the head inside the allowed range.</p>`,
    },
    {
      heading: 'US passport photo checklist',
      html: `<ul>
<li>Size 2 × 2 inches (51 × 51 mm), square, with a plain white or off-white background.</li>
<li>Taken in the last six months, facing the camera with both eyes open and a neutral expression or a natural smile.</li>
<li>No glasses, and no filters or editing that change how you look.</li>
<li>For an online application, a square JPEG between 600 × 600 and 1200 × 1200 pixels.</li>
</ul>
<p>Check travel.state.gov for the current rules before you upload, because the digital requirements can change.</p>`,
    },
    {
      heading: '4 × 6 inches is not exactly 10 × 15 cm',
      html: `<p>A 4 × 6 inch print is 101.6 × 152.4 mm, slightly bigger than 10 × 15 cm (100 × 150 mm). Most labs sell both under the same name and cut one from the other, so a sheet laid out for the larger size can lose a millimetre or two on the smaller one. Keep your photos away from the edge of the sheet, which the tool already does with its margin, and ask the lab to print without cropping or fitting to the page.</p>`,
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
    {
      q: 'How big does the head need to be in a US passport photo?',
      a: `Between 25 and 35 mm from chin to the top of the head, which is about ${share('us-passport', 0)}% to ${share('us-passport', 1)}% of the photo height.`,
    },
    {
      q: 'Can I use a photo taken with my phone?',
      a: 'Yes, if it follows the rules: plain light background, even light on the face, and the camera about a metre away at eye height. Avoid selfies taken at arm length, which distort the face.',
    },
  ],
  published: D,
  updated: '2026-10-15',
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
    {
      heading: 'Ajustes de la impresora, uno por uno',
      html: `<ol>
<li><strong>Papel:</strong> papel fotográfico (brillante o satinado) en el tamaño que vas a usar, por ejemplo 10 × 15. En papel normal la foto sale opaca y la tinta se corre.</li>
<li><strong>Calidad:</strong> elige «foto» o «alta», no «borrador».</li>
<li><strong>Escala:</strong> «tamaño real», «100 %» o «sin ajustar a la página». Es el ajuste que más importa.</li>
<li><strong>Márgenes:</strong> si tu impresora tiene «sin bordes», actívalo solo si la hoja ya trae su propio margen; si no, déjalo desactivado para que no recorte.</li>
<li><strong>Prueba:</strong> imprime una sola hoja y mide una foto con regla antes de gastar más papel. La foto infantil debe medir 2,5 cm de ancho y 3 cm de alto.</li>
</ol>`,
    },
    {
      heading: 'La resolución que necesita tu foto',
      html: `<p>Para imprimir una foto infantil a 300 puntos por pulgada necesitas ${px(25)} × ${px(30)} píxeles. Como el rostro ocupa más o menos el 75 % de la altura, el rostro de tu foto original debe medir al menos unos ${Math.round(px(30) * 0.75)} píxeles de alto. Una foto de celular de 3000 × 2000 píxeles tiene de sobra; el problema aparece cuando recortas solo la cara de una foto tomada de lejos.</p>`,
    },
    {
      heading: 'Cómo recortar sin arruinar las fotos',
      html: `<p>Corta con guillotina o con tijeras y una regla, siguiendo las líneas grises finas que trae la hoja. Haz primero los cortes largos y luego los cortes de cada foto. Si una foto te queda más pequeña por un milímetro, no pasa nada para un trámite escolar, pero para un documento oficial usa la medida exacta que pide la oficina y descarta las que se desvíen.</p>`,
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
    {
      q: '¿En qué papel imprimo las fotos tamaño infantil?',
      a: 'En papel fotográfico del tamaño de tu hoja (10 × 15, carta o A4), con la calidad de impresión en «foto» y la escala en «tamaño real».',
    },
    {
      q: '¿Cuántos píxeles necesita una foto infantil para imprimirse nítida?',
      a: `${px(25)} × ${px(30)} píxeles a 300 puntos por pulgada. Si tu recorte es más chico, se verá borroso.`,
    },
  ],
  published: D,
  updated: '2026-10-15',
};
