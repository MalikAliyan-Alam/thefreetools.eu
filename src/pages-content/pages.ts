import type { Locale } from '../i18n/locales';
import { SITE } from '../site';

export type StaticPage = { slug: string; title: string; description: string; html: string };
export type StaticPageId = 'about' | 'privacy' | 'contact';

/** Bump a locale's date when its About/Privacy/Contact text changes (used for sitemap lastmod). */
export const PAGES_UPDATED: Record<Locale, string> = { en: '2026-09-30', ar: '2026-09-30', es: '2026-09-30', fr: '2026-09-30' };

const mail = `<a href="mailto:${SITE.email}">${SITE.email}</a>`;
const suggest = `<a href="mailto:${SITE.suggestEmail}">${SITE.suggestEmail}</a>`;
const author = `<a href="${SITE.author.url}" rel="me noopener">${SITE.author.name}</a>`;

export const PAGES: Record<StaticPageId, Record<Locale, StaticPage>> = {
  about: {
    en: {
      slug: 'about',
      title: 'About thefreetools',
      description: 'Who builds thefreetools, how every calculator is checked against the official rule it applies, and how to report a mistake.',
      html: `<p>thefreetools is a small, independent collection of calculators and converters for everyday paperwork: grades, dates, invoices and forms.</p>
<p>Every tool runs in your browser. We don't ask you to sign up, and what you type stays on your device.</p>
<p>thefreetools is built and maintained by ${author}, an AI automation engineer.</p>
<h2>How we check the results</h2>
<p>Each tool is built from the official rule or formula it applies, and the page explains that formula so you can check it yourself. Where rules differ between countries or institutions, the tool lets you pick or edit them.</p>
<p>Found a mistake or a missing option? Write to ${mail}. We read every message.</p>`,
    },
    ar: {
      slug: 'about',
      title: 'من نحن',
      description: 'من يطوّر thefreetools، وكيف نتحقق من كل حاسبة وفق القاعدة الرسمية التي تطبقها، وكيف تبلغنا عن أي خطأ.',
      html: `<p>thefreetools مجموعة صغيرة ومستقلة من الحاسبات والمحولات للمعاملات اليومية: الدرجات والتواريخ والفواتير والنماذج.</p>
<p>كل أداة تعمل داخل متصفحك. لا نطلب منك التسجيل، وما تكتبه يبقى على جهازك.</p>
<p>يطوّر الموقع ويديره <span dir="ltr">${author}</span>، مهندس أتمتة بالذكاء الاصطناعي.</p>
<h2>كيف نتحقق من النتائج</h2>
<p>نبني كل أداة على القاعدة أو المعادلة الرسمية التي تطبقها، ونشرح المعادلة في الصفحة لتتمكن من التحقق بنفسك. وعندما تختلف القواعد بين الدول أو الجهات، تتيح لك الأداة اختيارها أو تعديلها.</p>
<p>وجدت خطأً أو خياراً ناقصاً؟ راسلنا على ${mail}.</p>`,
    },
    es: {
      slug: 'quienes-somos',
      title: 'Quiénes somos',
      description: 'Quién hace thefreetools, cómo comprobamos cada calculadora con la regla oficial que aplica y cómo avisarnos de un error.',
      html: `<p>thefreetools es una colección pequeña e independiente de calculadoras y conversores para el papeleo de todos los días: notas, fechas, facturas y formularios.</p>
<p>Todas las herramientas funcionan en tu navegador. No pedimos registro y lo que escribes se queda en tu dispositivo.</p>
<p>thefreetools lo crea y mantiene ${author}, ingeniero de automatización con IA.</p>
<h2>Cómo revisamos los resultados</h2>
<p>Cada herramienta se basa en la regla o fórmula oficial que aplica, y la página la explica para que puedas comprobarla. Cuando las reglas cambian según el país o la institución, puedes elegirlas o editarlas.</p>
<p>¿Encontraste un error o falta una opción? Escríbenos a ${mail}.</p>`,
    },
    fr: {
      slug: 'a-propos',
      title: 'À propos de thefreetools',
      description: 'Qui crée thefreetools, comment chaque outil est vérifié d’après la règle officielle qu’il applique et comment nous signaler une erreur.',
      html: `<p>thefreetools est une petite collection indépendante de calculatrices et de convertisseurs pour les démarches du quotidien : notes, dates, factures et formulaires.</p>
<p>Tous les outils fonctionnent dans votre navigateur. Aucune inscription n’est demandée et ce que vous saisissez reste sur votre appareil.</p>
<p>thefreetools est créé et maintenu par ${author}, ingénieur en automatisation par l’IA.</p>
<h2>Comment nous vérifions les résultats</h2>
<p>Chaque outil repose sur la règle ou la formule officielle qu’il applique, et la page l’explique pour que vous puissiez la vérifier vous-même. Quand les règles changent d’un pays ou d’un établissement à l’autre, l’outil vous permet de les choisir ou de les modifier.</p>
<p>Une erreur ou une option manquante ? Écrivez-nous à ${mail}. Nous lisons tous les messages.</p>`,
    },
  },
  privacy: {
    en: {
      slug: 'privacy',
      title: 'Privacy policy',
      description: 'What thefreetools collects: the tools run in your browser, your entries stay on your device and our host sees only standard request data.',
      html: `<p><strong>The short version:</strong> the tools run in your browser and we don't receive what you type into them.</p>
<h2>What stays on your device</h2>
<p>Some tools remember your last entries in your browser's local storage so you can pick up where you left off. This data never leaves your device, and each tool has a button to clear it.</p>
<h2>What our host sees</h2>
<p>Like any website, our hosting provider processes standard request data (such as IP address and browser type) to deliver pages and protect against abuse.</p>
<h2>Changes</h2>
<p>If we add advertising or analytics, we will update this page first and ask for your consent where the law requires it.</p>
<p>Questions: ${mail}</p>`,
    },
    ar: {
      slug: 'privacy',
      title: 'سياسة الخصوصية',
      description: 'ما الذي يجمعه thefreetools: الأدوات تعمل داخل متصفحك، ومدخلاتك تبقى على جهازك، ولا يرى مزود الاستضافة إلا بيانات الطلبات المعتادة.',
      html: `<p><strong>باختصار:</strong> الأدوات تعمل داخل متصفحك، ولا نستلم ما تكتبه فيها.</p>
<h2>ما يبقى على جهازك</h2>
<p>بعض الأدوات تحفظ آخر مدخلاتك في التخزين المحلي لمتصفحك لتكمل من حيث توقفت. هذه البيانات لا تغادر جهازك، وفي كل أداة زر لمسحها.</p>
<h2>ما يراه مزود الاستضافة</h2>
<p>مثل أي موقع، يعالج مزود الاستضافة بيانات الطلبات المعتادة (مثل عنوان IP ونوع المتصفح) لعرض الصفحات والحماية من إساءة الاستخدام.</p>
<h2>التغييرات</h2>
<p>إذا أضفنا إعلانات أو أدوات تحليل، سنحدّث هذه الصفحة أولاً ونطلب موافقتك حيث يلزم القانون.</p>
<p>للاستفسار: ${mail}</p>`,
    },
    es: {
      slug: 'privacidad',
      title: 'Política de privacidad',
      description: 'Qué datos recoge thefreetools: las herramientas funcionan en tu navegador, lo que escribes queda en tu dispositivo y el hosting solo ve datos técnicos.',
      html: `<p><strong>En resumen:</strong> las herramientas funcionan en tu navegador y no recibimos lo que escribes en ellas.</p>
<h2>Lo que queda en tu dispositivo</h2>
<p>Algunas herramientas recuerdan tus últimos datos en el almacenamiento local del navegador para que continúes donde lo dejaste. Esos datos no salen de tu dispositivo y cada herramienta tiene un botón para borrarlos.</p>
<h2>Lo que ve nuestro proveedor de hosting</h2>
<p>Como en cualquier web, el proveedor de hosting procesa datos técnicos de cada visita (como la dirección IP y el tipo de navegador) para servir las páginas y evitar abusos.</p>
<h2>Cambios</h2>
<p>Si añadimos publicidad o analítica, actualizaremos primero esta página y pediremos tu consentimiento cuando la ley lo exija.</p>
<p>Preguntas: ${mail}</p>`,
    },
    fr: {
      slug: 'confidentialite',
      title: 'Politique de confidentialité',
      description: 'Ce que collecte thefreetools\u00a0: les outils tournent dans votre navigateur, vos saisies restent chez vous et l’hébergeur ne voit que les données techniques.',
      html: `<p><strong>En résumé :</strong> les outils fonctionnent dans votre navigateur et nous ne recevons pas ce que vous y saisissez.</p>
<h2>Ce qui reste sur votre appareil</h2>
<p>Certains outils mémorisent vos dernières saisies dans le stockage local du navigateur pour que vous puissiez reprendre là où vous vous êtes arrêté. Ces données ne quittent pas votre appareil et chaque outil propose un bouton pour les effacer.</p>
<h2>Ce que voit notre hébergeur</h2>
<p>Comme pour tout site web, notre hébergeur traite les données techniques des requêtes (comme l’adresse IP et le type de navigateur) pour afficher les pages et prévenir les abus.</p>
<h2>Modifications</h2>
<p>Si nous ajoutons de la publicité ou des outils de mesure d’audience, nous mettrons d’abord cette page à jour et demanderons votre consentement lorsque la loi l’exige.</p>
<p>Questions : ${mail}</p>`,
    },
  },
  contact: {
    en: {
      slug: 'contact',
      title: 'Contact',
      description: 'Email thefreetools with a question, a wrong result or an idea for a new tool. We read every message and usually reply within a few days.',
      html: `<p>Questions or a wrong result: email ${mail}. We usually reply within a few days.</p>
<p>A tool you'd like us to build: ${suggest}.</p>`,
    },
    ar: {
      slug: 'contact',
      title: 'تواصل معنا',
      description: 'راسل فريق thefreetools بسؤال أو نتيجة خاطئة أو فكرة أداة جديدة. نقرأ كل رسالة ونرد عادة خلال أيام قليلة.',
      html: `<p>لديك سؤال أو وجدت نتيجة خاطئة؟ راسلنا على ${mail}، ونرد عادة خلال أيام قليلة.</p>
<p>تريد أداة جديدة؟ اقترحها على ${suggest}.</p>`,
    },
    es: {
      slug: 'contacto',
      title: 'Contacto',
      description: 'Escribe a thefreetools con una pregunta, un resultado incorrecto o la idea de una nueva herramienta. Leemos todos los mensajes.',
      html: `<p>¿Tienes una pregunta o encontraste un resultado incorrecto? Escríbenos a ${mail}. Solemos responder en pocos días.</p>
<p>¿Quieres que hagamos una herramienta? Proponla en ${suggest}.</p>`,
    },
    fr: {
      slug: 'contact',
      title: 'Nous contacter',
      description: 'Écrire à l’équipe de thefreetools\u00a0: une question, une erreur ou une idée d’outil.',
      html: `<p>Une question ou un résultat incorrect ? Écrivez-nous à ${mail}. Nous répondons généralement en quelques jours.</p>
<p>Un outil que vous aimeriez voir sur le site ? Proposez-le à ${suggest}.</p>`,
    },
  },
};
