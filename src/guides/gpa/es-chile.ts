import type { GuideContent } from '../types';

const guide: GuideContent = {
  key: 'promedio-chile',
  tool: 'gpa',
  slug: 'como-calcular-promedio-notas-chile',
  metaTitle: 'Cómo calcular el promedio de notas en Chile (escala 1 a 7)',
  metaDescription:
    'Promedio simple y ponderado en la escala chilena de 1,0 a 7,0: fórmula, ejemplos con porcentajes, redondeo a un decimal y la nota mínima de aprobación.',
  h1: 'Cómo calcular el promedio de notas en Chile',
  answer:
    'Si todas las notas valen lo mismo, súmalas y divide por la cantidad de notas. Si tienen porcentajes, multiplica cada nota por su porcentaje y suma los resultados. En Chile se aprueba con 4,0.',
  sections: [
    {
      heading: 'La escala chilena',
      html: `<table><thead><tr><th>Dato</th><th>Valor habitual</th></tr></thead><tbody>
<tr><td>Nota mínima</td><td>1,0</td></tr>
<tr><td>Nota máxima</td><td>7,0</td></tr>
<tr><td>Nota de aprobación</td><td>4,0</td></tr>
<tr><td>Decimales</td><td>Uno (por ejemplo 5,4)</td></tr></tbody></table>
<p>El porcentaje de exigencia para obtener un 4,0 (a menudo 60 %) y la forma de redondear los define el reglamento de evaluación de cada colegio o universidad.</p>`,
    },
    {
      heading: 'Promedio simple',
      html: `<p>Cuatro notas que valen lo mismo: 5,0 · 6,2 · 4,5 · 5,8.</p>
<p class="formula">(5,0 + 6,2 + 4,5 + 5,8) ÷ 4 = 21,5 ÷ 4 = 5,375 → 5,4</p>`,
    },
    {
      heading: 'Promedio ponderado (con porcentajes)',
      html: `<p>Una prueba de 20 %, otra de 30 % y un examen de 50 %:</p>
<table><thead><tr><th>Evaluación</th><th>Nota</th><th>Peso</th><th>Nota × peso</th></tr></thead><tbody>
<tr><td>Prueba 1</td><td>5,2</td><td>20 %</td><td>1,04</td></tr>
<tr><td>Prueba 2</td><td>4,8</td><td>30 %</td><td>1,44</td></tr>
<tr><td>Examen</td><td>6,1</td><td>50 %</td><td>3,05</td></tr>
<tr><td><strong>Total</strong></td><td></td><td><strong>100 %</strong></td><td><strong>5,53</strong></td></tr></tbody></table>
<p>El promedio es 5,53, que con un decimal queda en <strong>5,5</strong>.</p>
<p>Si los porcentajes todavía no suman 100 %, divide por lo que llevas: con solo las dos pruebas, (1,04 + 1,44) ÷ 0,50 = 4,96 → 5,0.</p>`,
    },
    {
      heading: 'El redondeo',
      html: `<p>Lo más común es aproximar a un decimal: si la centésima es 5 o más, se sube (5,45 → 5,5; 3,95 → 4,0). Como la diferencia entre 3,9 y 4,0 decide si apruebas, confirma la regla en el reglamento de tu institución.</p>`,
    },
    {
      heading: 'Hazlo con la calculadora',
      html: `<p>En la <a href="/es/calcular-promedio/">calculadora de promedio</a> elige "De 1 a 7", escribe cada nota con su porcentaje y el promedio aparece al instante. Puedes escribir las notas con coma o con punto.</p>`,
    },
  ],
  faq: [
    {
      q: '¿El promedio final del año se calcula igual?',
      a: 'Sí. Usa el promedio de cada asignatura como una nota y dales el mismo peso, salvo que tu colegio o carrera indique otra ponderación.',
    },
    {
      q: '¿Con 3,95 apruebo?',
      a: 'Si tu institución aproxima a un decimal, 3,95 sube a 4,0 y apruebas. Hay reglamentos que truncan en vez de aproximar, así que revísalo.',
    },
  ],
  published: '2026-09-26',
  updated: '2026-09-26',
};

export default guide;
