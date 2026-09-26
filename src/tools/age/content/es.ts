import type { ToolContent } from '../../types';
import type { AgeLabels } from '../labels';

const content: ToolContent<AgeLabels> = {
  slug: 'calcular-edad',
  metaTitle: 'Calcular edad exacta: años, meses y días (gratis)',
  metaDescription:
    'Calcula tu edad exacta en años, meses y días a partir de tu fecha de nacimiento, o la edad en cualquier fecha. Días vividos, próximo cumpleaños y más.',
  eyebrow: 'Fechas',
  h1: 'Calcular edad',
  intro:
    'Escribe tu fecha de nacimiento y verás tu edad exacta en años, meses y días. También puedes calcular la edad que tendrás (o tenías) en cualquier otra fecha.',
  labels: {
    primary: 'gregorian',
    birthIn: 'Fecha de nacimiento en calendario',
    gregorian: 'Gregoriano',
    hijri: 'Hégira',
    day: 'Día',
    month: 'Mes',
    year: 'Año',
    yearPlaceholder: '1995',
    onDate: 'Edad en otra fecha',
    onDateHint: 'Calcular la edad al',
    enterBirth: 'Escribe tu fecha de nacimiento para ver tu edad.',
    invalid: 'Esa fecha no existe. Revisa el día y el mes.',
    future: 'La fecha de nacimiento es posterior a la fecha elegida.',
    ageLabel: 'Tu edad',
    hijriAgeLabel: 'Edad en años de la Hégira',
    gregAgeLabel: 'Edad',
    ageFormat: '{y}, {m} y {d}',
    units: { y: { one: 'año', other: 'años' }, m: { one: 'mes', other: 'meses' }, d: { one: 'día', other: 'días' } },
    totalDays: 'Días vividos',
    totalWeeks: 'Semanas',
    totalMonths: 'Meses',
    nextBirthday: 'Próximo cumpleaños',
    nextBirthdayIn: 'en {n} ({weekday})',
    birthdayToday: '¡Hoy! Feliz cumpleaños',
    bornOn: 'Naciste el',
    copy: 'Copiar resultado',
    copied: 'Copiado',
    share: 'Copiar enlace',
    shared: 'Enlace copiado',
    hijriSuffix: 'H',
  },
  sections: [
    {
      heading: 'Cómo se calcula la edad',
      html: `<p>Primero se cuentan los años completos, luego los meses completos y al final los días que sobran. Los meses se cuentan desde el día de nacimiento: si naciste un día 31, en los meses más cortos se toma el último día.</p>
<p class="formula">Nacido el 31 de enero de 2000, al 1 de marzo de 2025 → 25 años, 1 mes y 1 día</p>`,
    },
    {
      heading: 'Ejemplo',
      html: `<p>Una persona nacida el <strong>15 de mayo de 1990</strong> tiene, al 26 de septiembre de 2026, <strong>36 años, 4 meses y 11 días</strong>, es decir, 13.283 días vividos.</p>`,
    },
    {
      heading: 'Edad en una fecha concreta',
      html: `<p>Muchas becas, concursos y postulaciones piden la edad "al 31 de diciembre" u otra fecha. Abre <em>Edad en otra fecha</em>, elige ese día y tendrás la edad exacta en ese momento.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Qué pasa si nací el 29 de febrero?',
      a: 'En los años sin 29 de febrero, la calculadora toma el 1 de marzo como cumpleaños. Para trámites legales, revisa la norma de tu país.',
    },
    {
      q: '¿Se guarda mi fecha de nacimiento?',
      a: 'Solo en tu navegador, para que la encuentres la próxima vez. No se envía a ningún servidor.',
    },
  ],
  updated: '2026-09-26',
};

export default content;
