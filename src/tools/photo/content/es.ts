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
  metaTitle: 'Tamaño de foto infantil: 2,5 × 3 cm, medidas y hoja para imprimir',
  metaDescription:
    'La foto tamaño infantil mide 2,5 × 3 cm (0,98 × 1,18 pulgadas). Haz la tuya, también credencial o pasaporte, y descarga la hoja lista para imprimir. Gratis y sin subir tu foto.',
  eyebrow: 'Fotos',
  h1: 'Foto tamaño infantil y pasaporte',
  intro:
    'Una foto tamaño infantil mide 2,5 × 3 cm; la de credencial o pasaporte, 3,5 × 4,5 cm. Sube una foto de frente, acomódala en el recuadro y descarga una hoja con las copias ya al tamaño exacto, lista para llevar a revelar. La foto no sale de tu celular ni de tu computadora.',
  labels,
  sections: [
    {
      heading: 'Medidas de fotos en México',
      html: `<p>La foto tamaño infantil mide <strong>2,5 × 3 cm</strong> (0,98 × 1,18 pulgadas).</p>
<table><thead><tr><th>Tamaño</th><th>Medida en cm</th><th>Medida en pulgadas</th><th>Fotos en una hoja 10 × 15</th></tr></thead><tbody>
<tr><td>Infantil</td><td>2,5 × 3 cm</td><td>0,98 × 1,18</td><td>12</td></tr>
<tr><td>Credencial (rectangular) o pasaporte</td><td>3,5 × 4,5 cm</td><td>1,38 × 1,77</td><td>6</td></tr></tbody></table>
<p>Ninguna de las dos medidas viene de una norma oficial: son las que usan los estudios fotográficos y las que suelen pedir escuelas y oficinas. Por eso, si tu trámite indica otra medida o un fondo distinto, manda lo que diga el trámite, no esta tabla.</p>
<p><strong>Un ejemplo con números.</strong> Para imprimir a 300 puntos por pulgada, una foto infantil necesita 295 × 354 píxeles (2,5 cm ÷ 2,54 × 300 y 3 cm ÷ 2,54 × 300), y una de credencial, 413 × 531 píxeles. Una foto normal de celular tiene miles de píxeles de ancho, así que sobra. El problema aparece si recortas solo la cara de una foto tomada de lejos: si el rostro ocupa un cuadro de 250 píxeles de ancho y lo estiras a 3,5 cm, quedas en unos 181 puntos por pulgada y se verá borroso. La herramienta te avisa cuando baja de 200.</p>
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
      heading: 'Tamaño de foto infantil en píxeles y en pulgadas',
      html: `<table><thead><tr><th>Foto</th><th>Centímetros</th><th>Pulgadas</th><th>Píxeles a 300 ppp</th></tr></thead><tbody>
<tr><td>Infantil</td><td>2,5 × 3</td><td>0,98 × 1,18</td><td>295 × 354</td></tr>
<tr><td>Credencial</td><td>3,5 × 4,5</td><td>1,38 × 1,77</td><td>413 × 531</td></tr></tbody></table>
<p>Los píxeles salen de multiplicar las pulgadas por 300 (la resolución habitual para imprimir): 2,5 cm son 0,98 pulgadas, y 0,98 × 300 son unos 295 píxeles. Si tu foto original tiene bastante más que eso, se imprimirá nítida; si recortas solo el rostro de una foto tomada de lejos y queda con menos de 295 × 354 píxeles, saldrá borrosa.</p>`,
    },
    {
      heading: 'Cómo dejar una foto en 2,5 × 3 cm en Word',
      html: `<ol>
<li>Inserta la foto en Word (Insertar, Imágenes).</li>
<li>Recórtala primero con la herramienta Recortar, hasta que el rostro quede centrado y la proporción sea la de 2,5 por 3 (un poco más alta que ancha).</li>
<li>En Formato de imagen, Tamaño, escribe 3 cm de alto y 2,5 cm de ancho.</li>
</ol>
<p>Si cambias solo el ancho o el alto con la proporción desbloqueada, la cara se estira. Por eso se recorta antes. Para 12 copias en una hoja 10 × 15 es más rápido usar la herramienta de arriba, que ya las acomoda con líneas de corte.</p>`,
    },
    {
      heading: 'Cómo hacerlo en Canva',
      html: `<p>En Canva, crea un diseño con tamaño personalizado, cambia la unidad a centímetros y escribe 2,5 de ancho por 3 de alto. Coloca la foto, ajústala con el rostro al centro y descarga el archivo. Para imprimir varias en una hoja tendrías que duplicar la foto a mano; la herramienta de esta página lo hace de una vez.</p>`,
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
      heading: 'Plantilla para imprimir fotos tamaño infantil',
      html: `<p>No necesitas una plantilla en Word o PDF: la herramienta de esta página genera la hoja completa como una imagen JPG a 300 ppp, con las fotos ya acomodadas y líneas finas para recortar. Descárgala y mándala a imprimir tal cual, o ábrela en tu computadora y usa «tamaño real» al imprimir.</p>`,
    },
    {
      heading: 'Dónde sacar fotos tamaño infantil',
      html: `<p>Muchas papelerías, farmacias y estudios fotográficos las toman en el momento, y los laboratorios de fotos las imprimen aparte. Si prefieres no salir a buscar un estudio, haz la hoja aquí con una foto tuya o de tu hijo y llévala a imprimir como una foto 10 × 15 en cualquier lugar que imprima fotografías. Los precios cambian según la ciudad, así que pregunta antes.</p>`,
    },
    {
      heading: 'Cómo imprimir sin que cambie el tamaño',
      html: `<p>La hoja se descarga a 300 puntos por pulgada, con líneas grises finas para recortar. Lo más práctico es llevar la hoja 10 × 15 a un laboratorio y pedirla como una foto normal: en ella caben 12 fotos infantiles o 6 de 3,5 × 4,5 cm. Si prefieres imprimir en casa, en una hoja carta caben 60 infantiles y en una A4, 63.</p>
<p>El error más común al imprimir en casa es dejar activada la opción «ajustar a la página». Si la impresora reduce la hoja apenas un 5 %, una foto infantil de 3 cm de alto sale de 2,85 cm, y ya no sirve para un trámite que pide la medida exacta. Elige «tamaño real» o escala al 100 %, y mide una foto con una regla antes de recortar todas.</p>`,
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
      q: '¿Cuántas pulgadas mide una foto tamaño infantil?',
      a: '0,98 × 1,18 pulgadas (2,5 × 3 cm), es decir, casi 1 pulgada de ancho por poco más de 1 de alto. La de credencial mide 1,38 × 1,77 pulgadas.',
    },
    {
      q: '¿Puedo sacar la foto con el celular?',
      a: 'Sí, si otra persona la toma de frente a 1 o 1,5 m, contra una pared clara y con buena luz. Después la colocas en el recuadro y descargas la hoja.',
    },
    {
      q: '¿Cuánto mide en píxeles una foto tamaño infantil?',
      a: '295 × 354 píxeles a 300 ppp (2,5 × 3 cm). La de credencial, 413 × 531 píxeles.',
    },
    {
      q: '¿Cómo cambio una foto a 2,5 × 3 cm en Word o en Canva?',
      a: 'En Word, recorta primero y luego fija 3 cm de alto y 2,5 cm de ancho en Formato de imagen. En Canva, crea un diseño personalizado en centímetros con 2,5 × 3.',
    },
    {
      q: '¿Dónde puedo sacar fotos tamaño infantil?',
      a: 'En papelerías, farmacias y estudios fotográficos. También puedes hacer la hoja con esta herramienta y llevarla a imprimir como una foto 10 × 15.',
    },
    {
      q: '¿Hay una plantilla en PDF o Word para fotos tamaño infantil?',
      a: 'No hace falta: la herramienta descarga la hoja ya armada como imagen JPG a 300 ppp, lista para imprimir.',
    },
    {
      q: '¿Se sube mi foto a algún servidor?',
      a: 'No. La imagen se procesa en tu navegador y la hoja se genera en tu dispositivo. Tampoco la guardamos: al cerrar la página desaparece.',
    },
  ],
  updated: '2026-10-14',
};

export default content;
