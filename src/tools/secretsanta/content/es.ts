import type { ToolContent } from '../../types';
import type { SecretSantaLabels } from '../labels';

const labels: SecretSantaLabels = {
  names: 'Participantes (uno por línea)',
  namesHint: 'Escribe al menos 3 nombres. Se quitan los repetidos.',
  namesPlaceholder: 'Ana\nLuis\nMarta\nPedro',
  exclusions: 'Quién no puede tocarle a quién (opcional)',
  exclusionsHint: 'Una pareja por línea, por ejemplo «Ana - Luis». Sirve para parejas o hermanos.',
  exclusionsPlaceholder: 'Ana - Luis\nMarta - Pedro',
  budget: 'Presupuesto (opcional)',
  budgetPlaceholder: 'Por ejemplo 20 €',
  draw: 'Sortear',
  redraw: 'Repetir el sorteo',
  example: 'Probar con un ejemplo',
  reset: 'Empezar de nuevo',
  count: '{n} participantes',
  errFew: 'Hacen falta al menos 3 personas.',
  errMany: 'El máximo es 60 personas.',
  errImpossible: 'Con esas excepciones no hay forma de sortear. Quita alguna pareja o añade más gente.',
  done: 'El sorteo está hecho. Elige cómo entregar los resultados sin que nadie vea los de los demás.',
  modeHand: 'Pasar el móvil',
  modeLinks: 'Enlaces por WhatsApp',
  passTo: 'Pásale el móvil a {name}.',
  showMine: 'Ver a quién le regalo',
  hide: 'Terminar',
  next: 'Ocultar y pasar al siguiente',
  youGive: '{name}, le regalas a',
  finished: 'Listo: todos han visto su resultado. Puedes empezar de nuevo.',
  linksIntro: 'Cada persona recibe un enlace propio que muestra solo a quién le regala. No hace falta correo ni registro.',
  message: 'Hola {name}, ya hicimos el sorteo del amigo invisible. Abre este enlace para ver a quién le regalas y no se lo cuentes a nadie: {link}',
  messageBudget: 'Hola {name}, ya hicimos el sorteo del amigo invisible (presupuesto: {budget}). Abre este enlace para ver a quién le regalas y no se lo cuentes a nadie: {link}',
  copyMessage: 'Copiar mensaje',
  copyLink: 'Copiar enlace',
  copied: 'Copiado',
  openWhatsapp: 'Enviar por WhatsApp',
  revealTitle: 'Hola {giver}:',
  revealBody: 'Tu amigo invisible es',
  revealBudget: 'Presupuesto: {budget}.',
  revealKeep: 'Guarda el secreto hasta el día del intercambio.',
  makeOwn: 'Hacer otro sorteo',
  organizerNote: 'Quien organiza tiene los enlaces y podría abrirlos. Si nadie debe saber los cruces, usa «Pasar el móvil».',
};

const content: ToolContent<SecretSantaLabels> = {
  slug: 'sorteo-amigo-invisible',
  metaTitle: 'Sorteo de amigo invisible o secreto online, sin email',
  metaDescription:
    'Haz el sorteo del amigo invisible (amigo secreto) con tus nombres: sin registro, sin correo, con excepciones para parejas y resultados por WhatsApp o pasando el móvil.',
  eyebrow: 'Navidad',
  h1: 'Sorteo de amigo invisible (amigo secreto)',
  intro:
    'Escribe los nombres, marca quién no puede tocarle a quién y haz el sorteo. Cada persona ve solo su resultado, por WhatsApp o pasando el móvil. No hace falta correo ni registro, y los nombres no salen de tu navegador.',
  labels,
  sections: [
    {
      heading: 'Cómo hacer el sorteo en tres pasos',
      html: `<ol>
<li>Escribe los participantes, uno por línea. Hacen falta al menos 3 y el máximo es 60.</li>
<li>Si hay parejas o hermanos que no deben tocarse, anótalos en el segundo cuadro, una pareja por línea (por ejemplo «Ana - Luis»).</li>
<li>Pulsa «Sortear» y elige cómo entregar los resultados: pasando el móvil de uno en uno, o con un enlace por WhatsApp para cada persona.</li>
</ol>
<p>El sorteo cumple siempre tres reglas: cada persona regala a una sola y recibe de una sola, nadie se saca a sí mismo, y las parejas excluidas nunca se tocan, en ningún sentido.</p>`,
    },
    {
      heading: 'Sin correo y sin registro: dos formas de repartir los resultados',
      html: `<p><strong>Pasar el móvil.</strong> La herramienta te dice a quién le toca el móvil. Esa persona pulsa para ver a quién le regala, lo apunta de cabeza, pulsa «ocultar» y pasa el móvil al siguiente. Nadie, ni quien organiza, ve los cruces de los demás.</p>
<p><strong>Enlaces por WhatsApp.</strong> Cada persona recibe un enlace que abre una página con solo su resultado. El cruce viaja dentro de la dirección, después del símbolo #, y los navegadores nunca envían esa parte a ningún servidor, así que no hay cuentas ni base de datos. Una advertencia honesta: quien organiza tiene los enlaces y, si los abre, ve los cruces. Si lo importante es que nadie lo sepa, usa el método de pasar el móvil.</p>`,
    },
    {
      heading: 'Excepciones: cuántas personas hacen falta',
      html: `<p>Con 3 personas no se puede excluir ni una sola pareja: en un sorteo de tres, cada persona toca con las otras dos, así que cualquier excepción deja a alguien sin opciones. Con 4 personas ya puedes excluir una pareja, y con más gente, varias. Si las excepciones hacen imposible el sorteo, la herramienta te lo dice en lugar de dar un resultado incorrecto.</p>
<p>Que el número de participantes sea par o impar no importa. Funciona igual con 3, 4, 7 o 25 personas.</p>`,
    },
    {
      heading: 'Amigo invisible, amigo secreto o amigo oculto',
      html: `<p>Es el mismo juego con tres nombres según el país: en España se le llama sobre todo amigo invisible, en México y buena parte de Latinoamérica amigo secreto, y en Brasil amigo oculto. En inglés se llama Secret Santa. Cada persona le regala a otra elegida al azar y el nombre de quien regala se descubre el día del intercambio, o no se descubre.</p>`,
    },
    {
      heading: 'Qué conviene acordar antes del intercambio',
      html: `<ul>
<li><strong>Presupuesto:</strong> una cifra máxima para que todos gasten parecido. Puedes escribirla en el cuadro de presupuesto y aparecerá en cada mensaje.</li>
<li><strong>Fecha y lugar</strong> del intercambio, y si los regalos se abren a la vez.</li>
<li><strong>Pistas:</strong> cada persona puede dar tres gustos o una lista de deseos a quien le toque.</li>
<li><strong>Quién no puede venir:</strong> acuerda cómo le llegará el regalo.</li>
</ul>`,
    },
    {
      heading: 'Privacidad',
      html: `<p>Los nombres que escribes se procesan en tu navegador y no se guardan en tu dispositivo ni se envían a nuestros servidores. Si cierras la página, el sorteo desaparece: para recuperar un resultado necesitas el enlace que enviaste. Por eso conviene hacer el sorteo cuando ya estén todos los participantes confirmados.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Hace falta registrarse o dar un correo?',
      a: 'No. Escribes los nombres, sorteas y repartes los resultados pasando el móvil o con un enlace por WhatsApp. No se pide registro ni correo.',
    },
    {
      q: '¿Cuántas personas hacen falta para el amigo invisible?',
      a: 'Al menos 3. Con 3 personas no se puede excluir ninguna pareja; con 4 ya se puede excluir una.',
    },
    {
      q: '¿Puedo evitar que dos personas se toquen, por ejemplo una pareja?',
      a: 'Sí. Escribe la pareja en el cuadro de excepciones, por ejemplo «Ana - Luis», y nunca se tocarán, en ningún sentido.',
    },
    {
      q: '¿Quien organiza puede ver quién le toca a quién?',
      a: 'Con «Pasar el móvil», no. Con los enlaces por WhatsApp, quien organiza tiene los enlaces y podría abrirlos, así que si nadie debe saberlo, usa el método de pasar el móvil.',
    },
    {
      q: '¿Funciona con un número impar de personas?',
      a: 'Sí, con cualquier número desde 3 hasta 60, par o impar.',
    },
    {
      q: '¿Se guardan los nombres?',
      a: 'No. Todo ocurre en tu navegador y no se envía a ningún servidor. Al cerrar la página, el sorteo desaparece.',
    },
  ],
  updated: '2026-10-17',
};

export default content;
