import type { Locale } from '../i18n/locales';
import { SITE } from '../site';

export type StaticPage = { slug: string; title: string; description: string; html: string };
export type StaticPageId = 'about' | 'privacy' | 'contact';

/** Bump when About/Privacy/Contact text changes (used for sitemap lastmod). */
export const PAGES_UPDATED = '2026-09-27';

const mail = `<a href="mailto:${SITE.email}">${SITE.email}</a>`;

export const PAGES: Record<StaticPageId, Record<Locale, StaticPage>> = {
  about: {
    en: {
      slug: 'about',
      title: 'About thefreetools',
      description: 'Who builds thefreetools and how we keep the calculators accurate.',
      html: `<p>thefreetools is a small, independent collection of calculators and converters for everyday paperwork: grades, dates, invoices and forms.</p>
<p>Every tool runs in your browser. We don't ask you to sign up, and what you type stays on your device.</p>
<h2>How we check the results</h2>
<p>Each tool is built from the official rule or formula it applies, and the page explains that formula so you can check it yourself. Where rules differ between countries or institutions, the tool lets you pick or edit them.</p>
<p>Found a mistake or a missing option? Write to ${mail}. We read every message.</p>`,
    },
    ar: {
      slug: 'about',
      title: 'من نحن',
      description: 'من يطوّر thefreetools وكيف نتأكد من دقة الحاسبات.',
      html: `<p>thefreetools مجموعة صغيرة ومستقلة من الحاسبات والمحولات للمعاملات اليومية: الدرجات والتواريخ والفواتير والنماذج.</p>
<p>كل أداة تعمل داخل متصفحك. لا نطلب منك التسجيل، وما تكتبه يبقى على جهازك.</p>
<h2>كيف نتحقق من النتائج</h2>
<p>نبني كل أداة على القاعدة أو المعادلة الرسمية التي تطبقها، ونشرح المعادلة في الصفحة لتتمكن من التحقق بنفسك. وعندما تختلف القواعد بين الدول أو الجهات، تتيح لك الأداة اختيارها أو تعديلها.</p>
<p>وجدت خطأً أو خياراً ناقصاً؟ راسلنا على ${mail}.</p>`,
    },
    es: {
      slug: 'quienes-somos',
      title: 'Quiénes somos',
      description: 'Quién hace thefreetools y cómo revisamos que las calculadoras sean exactas.',
      html: `<p>thefreetools es una colección pequeña e independiente de calculadoras y conversores para el papeleo de todos los días: notas, fechas, facturas y formularios.</p>
<p>Todas las herramientas funcionan en tu navegador. No pedimos registro y lo que escribes se queda en tu dispositivo.</p>
<h2>Cómo revisamos los resultados</h2>
<p>Cada herramienta se basa en la regla o fórmula oficial que aplica, y la página la explica para que puedas comprobarla. Cuando las reglas cambian según el país o la institución, puedes elegirlas o editarlas.</p>
<p>¿Encontraste un error o falta una opción? Escríbenos a ${mail}.</p>`,
    },
  },
  privacy: {
    en: {
      slug: 'privacy',
      title: 'Privacy policy',
      description: 'What data thefreetools collects and how it is used.',
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
      description: 'ما البيانات التي يجمعها موقع thefreetools وكيف تُستخدم.',
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
      description: 'Qué datos recoge thefreetools y cómo se usan.',
      html: `<p><strong>En resumen:</strong> las herramientas funcionan en tu navegador y no recibimos lo que escribes en ellas.</p>
<h2>Lo que queda en tu dispositivo</h2>
<p>Algunas herramientas recuerdan tus últimos datos en el almacenamiento local del navegador para que continúes donde lo dejaste. Esos datos no salen de tu dispositivo y cada herramienta tiene un botón para borrarlos.</p>
<h2>Lo que ve nuestro proveedor de hosting</h2>
<p>Como en cualquier web, el proveedor de hosting procesa datos técnicos de cada visita (como la dirección IP y el tipo de navegador) para servir las páginas y evitar abusos.</p>
<h2>Cambios</h2>
<p>Si añadimos publicidad o analítica, actualizaremos primero esta página y pediremos tu consentimiento cuando la ley lo exija.</p>
<p>Preguntas: ${mail}</p>`,
    },
  },
  contact: {
    en: {
      slug: 'contact',
      title: 'Contact',
      description: 'Get in touch with the thefreetools team.',
      html: `<p>Questions, a wrong result, or a tool you'd like us to build: email ${mail}. We usually reply within a few days.</p>`,
    },
    ar: {
      slug: 'contact',
      title: 'تواصل معنا',
      description: 'تواصل مع فريق thefreetools.',
      html: `<p>لديك سؤال، أو وجدت نتيجة خاطئة، أو تريد أداة جديدة؟ راسلنا على ${mail}، ونرد عادة خلال أيام قليلة.</p>`,
    },
    es: {
      slug: 'contacto',
      title: 'Contacto',
      description: 'Escribe al equipo de thefreetools.',
      html: `<p>¿Tienes una pregunta, encontraste un resultado incorrecto o quieres que hagamos una herramienta? Escríbenos a ${mail}. Solemos responder en pocos días.</p>`,
    },
  },
};
