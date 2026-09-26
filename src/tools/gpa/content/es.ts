import type { ToolContent } from '../../types';
import type { GpaLabels } from '../labels';

const content: ToolContent<GpaLabels> = {
  slug: 'calcular-promedio',
  metaTitle: 'Calcular promedio de notas (ponderado) de 1 a 7, sobre 100 o GPA',
  metaDescription:
    'Calcula tu promedio de notas con porcentajes o créditos, en escala de 1 a 7, sobre 100 o GPA 4.0. Descubre qué nota necesitas para llegar a tu meta. Gratis y sin registro.',
  eyebrow: 'Estudiantes',
  h1: 'Calcular promedio de notas',
  intro:
    'Escribe tus notas y cuánto vale cada una (porcentaje o créditos). El promedio se actualiza mientras escribes. También puedes sumar tu promedio anterior o ver qué nota necesitas para llegar a tu meta.',
  labels: {
    scale: 'Escala de notas',
    scales: ['cl7', 'pct100', 'us4'],
    scaleNames: { cl7: 'De 1 a 7', pct100: 'Sobre 100', us4: 'GPA 4.0' },
    course: 'Evaluación o ramo',
    coursePlaceholder: 'Nota',
    grade: 'Nota',
    gradePick: 'Elegir',
    weight: 'Peso',
    weightHint: 'Porcentaje de la evaluación o créditos del ramo',
    addCourse: 'Agregar nota',
    removeCourse: 'Quitar nota',
    example: 'Probar un ejemplo',
    reset: 'Borrar',
    editPoints: 'Mi universidad usa otros puntos',
    pointsFor: 'Puntos de',
    previousToggle: 'Sumar promedio anterior',
    previousAverage: 'Promedio acumulado',
    previousWeight: 'Créditos o peso acumulado',
    resultTerm: 'Promedio',
    resultCumulative: 'Promedio acumulado',
    outOf: 'de',
    totalWeight: 'Peso total',
    emptyResult: 'Escribe una nota y su peso para ver tu promedio.',
    invalidRows: 'Algunas filas no se contaron. Revisa la nota o el peso marcados.',
    targetTitle: '¿Qué nota necesito?',
    targetAverage: 'Promedio que quiero',
    targetWeight: 'Peso que falta',
    targetNeed: 'Necesitas un {need} en lo que falta.',
    targetImpossible: 'Esa meta no se alcanza con el peso que falta.',
    targetAlready: 'Ya tienes asegurada esa meta, aunque saques la nota mínima.',
    copy: 'Copiar resultado',
    copied: 'Copiado',
    share: 'Copiar enlace',
    shared: 'Enlace copiado',
    copyTemplate: 'Mi promedio: {avg} de {max} (peso {weight})',
    exampleCourses: [
      { name: 'Prueba 1', weight: 25 },
      { name: 'Prueba 2', weight: 25 },
      { name: 'Trabajo grupal', weight: 20 },
      { name: 'Examen', weight: 30 },
    ],
  },
  sections: [
    {
      heading: 'Cómo se calcula el promedio ponderado',
      html: `<p>Cada nota se multiplica por su peso, se suman los resultados y se divide por la suma de los pesos. Si todas las notas valen lo mismo, es un promedio simple.</p>
<p class="formula">Promedio = (nota × peso + nota × peso + …) ÷ suma de los pesos</p>
<p>El peso puede ser un porcentaje (25 %, 30 %…) o los créditos de cada ramo. La fórmula es la misma.</p>`,
    },
    {
      heading: 'Ejemplo con notas de 1 a 7',
      html: `<p>Tienes dos pruebas de 25 % (5,0 y 6,0), un trabajo de 20 % (5,5) y un examen de 30 % (4,5):</p>
<ul><li>5,0 × 25 = 125</li><li>6,0 × 25 = 150</li><li>5,5 × 20 = 110</li><li>4,5 × 30 = 135</li></ul>
<p>Son 520 puntos sobre 100, así que tu promedio es <strong>5,2</strong>. Con la nota mínima de aprobación en 4,0, el ramo está aprobado.</p>`,
    },
    {
      heading: '¿Qué nota necesito en el examen?',
      html: `<p>Escribe las notas que ya tienes con su peso. En <em>¿Qué nota necesito?</em> pon el promedio que quieres (por ejemplo 4,0 para aprobar) y el peso que falta (por ejemplo 30 si el examen vale 30 %). La calculadora te dice la nota exacta que te hace falta.</p>`,
    },
    {
      heading: 'Escalas de notas',
      html: `<table><thead><tr><th>Escala</th><th>Rango</th><th>Aprobación habitual</th></tr></thead><tbody>
<tr><td>De 1 a 7</td><td>1,0 – 7,0</td><td>4,0 (Chile)</td></tr>
<tr><td>Sobre 100</td><td>0 – 100</td><td>Depende de la institución</td></tr>
<tr><td>GPA 4.0</td><td>F = 0 · A = 4,0</td><td>Universidades de EE. UU.</td></tr></tbody></table>
<p>Puedes escribir las notas con coma o con punto: 5,5 y 5.5 dan lo mismo.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Cómo saco el promedio si las notas no tienen porcentaje?',
      a: 'Pon el mismo peso a todas, por ejemplo 1. Así el resultado es el promedio simple: la suma de las notas dividida por la cantidad de notas.',
    },
    {
      q: '¿El promedio se redondea?',
      a: 'La calculadora muestra dos decimales. Muchos colegios y universidades de Chile redondean al primer decimal (5,45 pasa a 5,5); revisa el reglamento de tu institución.',
    },
    {
      q: '¿Sirve para calcular el promedio de todo el año?',
      a: 'Sí. Escribe el promedio de cada ramo como una fila y usa sus créditos u horas como peso, o pon peso 1 a cada uno si todos valen lo mismo.',
    },
    {
      q: '¿Se guardan mis notas?',
      a: 'Solo en tu navegador, para que no las pierdas si vuelves. No se envían a ningún servidor. Usa "Borrar" para eliminarlas.',
    },
  ],
  updated: '2026-09-27',
};

export default content;
