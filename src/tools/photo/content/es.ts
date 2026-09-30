import type { ToolContent } from '../../types';
import type { PhotoLabels } from '../labels';

const labels: PhotoLabels = {
  choose: 'Elegir foto',
  change: 'Cambiar foto',
  dropHint: 'Toma la foto con el celular, elige una de tu galería o arrástrala aquí. No se sube a ningún servidor.',
  loadError: 'No se pudo abrir la imagen. Prueba con una foto JPG o PNG.',
  docType: 'Tamaño',
  specNames: {
    'mx-infantil': 'Infantil · 2,5 × 3 cm',
    'mx-credencial': 'Credencial o pasaporte · 3,5 × 4,5 cm',
    'es-dni': 'DNI España · 26 × 32 mm',
    'intl-35x45': 'Visa Schengen · 35 × 45 mm',
    'us-passport': 'Visa o pasaporte EE. UU. · 2 × 2 pulgadas',
    'uk-passport': 'Pasaporte Reino Unido · 35 × 45 mm',
    'ca-passport': 'Pasaporte Canadá · 50 × 70 mm',
  },
  specOrder: ['mx-infantil', 'mx-credencial', 'es-dni', 'intl-35x45', 'us-passport', 'uk-passport', 'ca-passport'],
  paper: 'Hoja para imprimir',
  paperNames: { '4x6': 'Foto 10 × 15 cm (4 × 6")', letter: 'Carta', a4: 'A4' },
  defaultPaper: '4x6',
  zoom: 'Acercar',
  rotate: 'Enderezar',
  reset: 'Volver a centrar',
  frameLabel: 'Vista previa de la foto. Arrástrala para moverla; pellizca o usa la rueda del ratón para acercar.',
  frameRole: 'editor de foto',
  keysHint: 'Con el teclado: flechas para mover, + y − para acercar.',
  guide: 'Arrastra la foto para que la cabeza quede dentro del óvalo: la coronilla en la línea de arriba y la barbilla en la de abajo.',
  size: '{w} × {h} mm',
  headSize: 'cabeza de {min} a {max} mm (de la barbilla a la coronilla)',
  headGuideOnly: 'sin medida oficial de cabeza; el óvalo sigue el encuadre habitual',
  perSheet: '{n} fotos por hoja',
  resolution: 'Tu foto: {w} × {h} px · al imprimir, unos {dpi} ppp',
  lowRes:
    'Esta foto tiene poca resolución para ese tamaño (unos {dpi} ppp; lo ideal son 300) y puede salir borrosa. Usa la foto original de la cámara, no una captura ni una copia de WhatsApp, o acerca menos.',
  sheetPreview: 'Hoja',
  downloadSheet: 'Descargar hoja para imprimir',
  downloadSingle: 'Descargar una foto',
  printTip: 'Imprime al 100 % o «tamaño real», sin «ajustar a la página». La hoja 10 × 15 se revela como una foto normal en cualquier laboratorio.',
  fileStem: 'foto',
};

const content: ToolContent<PhotoLabels> = {
  slug: 'foto-tamano-infantil',
  metaTitle: 'Foto tamaño infantil y pasaporte para imprimir, gratis',
  metaDescription:
    'Haz tu foto tamaño infantil (2,5 × 3 cm), credencial, pasaporte o DNI desde el celular y descarga una hoja lista para imprimir. Tu foto no se sube a internet.',
  eyebrow: 'Fotos',
  h1: 'Foto tamaño infantil y pasaporte',
  intro:
    'Elige una foto de frente con fondo claro, colócala en el recuadro y descarga una hoja con varias copias del tamaño exacto. Todo ocurre en tu navegador: la foto no sale de tu dispositivo.',
  labels,
  sections: [
    {
      heading: 'Medidas de fotos en México',
      html: `<table><thead><tr><th>Tamaño</th><th>Medida</th><th>Fotos en una hoja 10 × 15</th></tr></thead><tbody>
<tr><td>Infantil</td><td>2,5 × 3 cm</td><td>12</td></tr>
<tr><td>Credencial (rectangular) o pasaporte</td><td>3,5 × 4,5 cm</td><td>6</td></tr></tbody></table>
<p>No encontramos una norma oficial para la foto infantil ni para la de credencial: son las medidas con que trabajan los estudios fotográficos, y así las piden escuelas y oficinas. Si tu trámite indica otra medida o un fondo distinto, sigue lo que diga el trámite.</p>
<p>Para el <strong>pasaporte mexicano</strong> normalmente no hace falta llevar fotos: la SRE toma la fotografía durante la cita, junto con las huellas y la firma. Revisa las indicaciones de tu cita por si en tu caso piden fotos impresas.</p>`,
    },
    {
      heading: 'Otros documentos',
      html: `<table><thead><tr><th>Documento</th><th>Medida</th><th>Cabeza (barbilla a coronilla)</th></tr></thead><tbody>
<tr><td>DNI de España</td><td>32 × 26 mm (alto × ancho)</td><td>no la fija</td></tr>
<tr><td>Visa Schengen</td><td>35 × 45 mm</td><td>31,5 a 36 mm (70–80 % de la altura)</td></tr>
<tr><td>Visa y pasaporte de EE. UU.</td><td>2 × 2 pulgadas (51 × 51 mm)</td><td>25 a 35 mm</td></tr>
<tr><td>Pasaporte del Reino Unido</td><td>35 × 45 mm</td><td>29 a 34 mm</td></tr>
<tr><td>Pasaporte de Canadá</td><td>50 × 70 mm</td><td>31 a 36 mm</td></tr></tbody></table>
<p>Fuentes: Real Decreto 1553/2005 (DNI: «fondo uniforme blanco y liso»), Código de Visados de la UE, que remite a la norma ICAO 9303 (Schengen), travel.state.gov, gov.uk y canada.ca. Canadá exige además que la foto la haga un fotógrafo profesional, que anota sus datos al reverso, así que para ese pasaporte esta herramienta solo sirve de prueba.</p>`,
    },
    {
      heading: 'Cómo tomar la foto con el celular',
      html: `<ul>
<li><strong>Fondo:</strong> una pared blanca o muy clara, sin objetos ni sombras.</li>
<li><strong>Luz:</strong> de frente, por ejemplo mirando hacia una ventana. Evita el flash y la luz del techo, que marcan sombras bajo los ojos.</li>
<li><strong>Distancia:</strong> que otra persona tome la foto a 1 o 1,5 m, con el celular a la altura de tus ojos. Una selfie de cerca deforma la cara.</li>
<li><strong>Postura:</strong> de frente, hombros rectos, expresión neutra y boca cerrada, sin lentes y con la cara y las orejas despejadas.</li>
</ul>
<p>Esta herramienta no borra el fondo: si la pared no es clara, la foto no servirá para trámites que piden fondo blanco.</p>`,
    },
    {
      heading: 'Cómo imprimir sin que cambie el tamaño',
      html: `<p>La hoja se descarga a 300 puntos por pulgada, con líneas grises finas para recortar. La opción más barata es mandar la hoja 10 × 15 a revelar como una foto normal: en ella caben 12 fotos infantiles o 6 de 3,5 × 4,5 cm. En carta caben 60 infantiles y en A4, 63.</p>
<p>Si la imprimes en casa, elige «tamaño real» o escala al 100 %, nunca «ajustar a la página», y mide una foto con una regla antes de recortar.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Cuánto mide una foto tamaño infantil?',
      a: '2,5 cm de ancho por 3 cm de alto (25 × 30 mm). En una foto de 10 × 15 cm caben 12.',
    },
    {
      q: '¿Cuánto mide la foto tamaño credencial?',
      a: 'La rectangular mide 3,5 × 4,5 cm, igual que la tamaño pasaporte. Algunos estudios también hacen una credencial ovalada, que esta herramienta no hace.',
    },
    {
      q: '¿Tengo que llevar fotos para sacar el pasaporte mexicano?',
      a: 'Por lo general no: la SRE toma la foto durante la cita. Revisa las indicaciones de tu cita por si en tu caso piden fotos impresas.',
    },
    {
      q: '¿Puedo sacar la foto con el celular?',
      a: 'Sí, si otra persona la toma de frente a 1 o 1,5 m, contra una pared clara y con buena luz. Después la colocas en el recuadro y descargas la hoja.',
    },
    {
      q: '¿Se sube mi foto a algún servidor?',
      a: 'No. La imagen se procesa en tu navegador y la hoja se genera en tu dispositivo. Tampoco la guardamos: al cerrar la página desaparece.',
    },
  ],
  updated: '2026-10-01',
};

export default content;
