import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faDownload,
  faXRay,
  faStethoscope,
  faPills,
  faStore,
  faCalendarCheck,
  faComments,
  faUserDoctor
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import certificate from '../assets/images/homzdoctor-certificate.jpg';
import '../assets/styles/ProjectPage.scss';
import '../assets/styles/HackathonPage.scss';

/* Standalone credential + project page for the lablab.ai Band of Agents
   hackathon. Every fact in `credential` is taken from the certificate itself —
   keep them in sync if the certificate is ever reissued. */

const CERTIFICATE_URL =
  'https://lablab.ai/u/@haroon-ai/ai-hackathons/band-of-agents-hackathon/certificate';
const CERTIFICATE_PDF = '/Band-of-Agents-Hackathon-Certificate.pdf';
const REPO_URL = 'https://github.com/minagayid/homzdoctor';

/* Icons for the agent grid, matched by index to `agents` below */
const agentIcons = [faXRay, faStethoscope, faPills, faStore, faCalendarCheck, faComments];

type PageContent = {
  back: string;
  eyebrow: string;
  title: string;
  event: string;
  tagline: string;
  certHeading: string;
  certAlt: string;
  /* `ltr` forces a value to stay left-to-right on the Arabic page — names,
     event titles and the credential ID read wrong when mirrored */
  facts: { label: string; value: string; ltr?: boolean }[];
  citationLabel: string;
  citation: string;
  verify: string;
  download: string;
  repo: string;
  stackLabel: string;
  aboutHeading: string;
  about: string[];
  flowHeading: string;
  flowIntro: string;
  flow: { step: string; title: string; body: string }[];
  agentsHeading: string;
  agentsIntro: string;
  agents: { name: string; body: string }[];
  solvesHeading: string;
  solves: string[];
  teamHeading: string;
  team: string[];
  contributions: { title: string; body: string }[];
};

/* Named on the certificate, so they are the credential's own words */
const STACK = [
  'AMD Developer Cloud',
  'Antigravity',
  'Claude Code',
  'LangChain',
  'HuggingFace Spaces',
  'Gemma'
];

const en: PageContent = {
  back: 'Back to portfolio',
  eyebrow: 'Hackathon · Certificate of Completion',
  title: 'HomzDoctor',
  event: 'Band of Agents Hackathon · lablab.ai',
  tagline:
    'An AI-powered healthcare platform built over eight days with a three-person team. Specialized agents read medical reports, lab results, and scans, and a licensed doctor approves every AI finding before it is ever shown to a patient as a diagnosis.',
  certHeading: 'The credential',
  certAlt: 'Certificate of completion, Band of Agents Hackathon, awarded to Haroon Sajid by lablab.ai',
  facts: [
    { label: 'Awarded to', value: 'Haroon Sajid' },
    { label: 'Event', value: 'Band of Agents Hackathon' },
    { label: 'Issued by', value: 'lablab.ai, part of NativelyAI' },
    { label: 'Held', value: 'June 12 to 19, 2026' },
    { label: 'Signed by', value: 'Paweł Czech, Founder, NativelyAI' },
    { label: 'Credential ID', value: 'CMRYQE5G000YTS601P0RHHG8H' }
  ],
  citationLabel: 'Citation',
  citation:
    'For outstanding performance, attendance, successfully completing and submitting a solution based on AMD Developer Cloud, Antigravity, Claude Code, LangChain, HuggingFace Spaces, and Gemma in the Band of Agents Hackathon.',
  verify: 'Verify on lablab.ai',
  download: 'Download PDF',
  repo: 'Source on GitHub',
  stackLabel: 'Built with',
  aboutHeading: 'About the project',
  about: [
    'HomzDoctor is an AI-powered healthcare platform built to assist both patients and healthcare providers throughout the healthcare journey. The goal is not to replace doctors, but to help them make faster and better informed decisions.',
    'Patients upload medical reports, lab results, X-rays, MRI and CT scans, and other healthcare documents. The platform processes that information and generates structured insights, so a doctor can review a case in a fraction of the time it would take to read every document from scratch.',
    'The platform was built to answer healthcare problems that have nothing to do with medical skill: delayed access to information, missed medications, reports patients cannot understand, and the slow hunt for a pharmacy or an appointment.'
  ],
  flowHeading: 'How it works',
  flowIntro:
    'Four stages, with a licensed professional standing between the AI and the patient at the point where it matters.',
  flow: [
    {
      step: '01',
      title: 'Patients upload their documents',
      body: 'Medical reports, lab results, X-rays, MRI scans, CT scans, and other healthcare documents go into one place instead of being scattered across clinics and phones.'
    },
    {
      step: '02',
      title: 'Agents turn documents into structured insights',
      body: 'Specialized AI agents read the uploads and produce organised findings that a doctor can scan quickly, rather than a wall of raw text and images.'
    },
    {
      step: '03',
      title: 'A licensed doctor verifies every finding',
      body: 'No AI-generated finding is presented as a diagnosis or treatment recommendation until a licensed healthcare professional has reviewed and approved it. This is the layer that keeps patients safe and keeps doctors in control of medical decisions.'
    },
    {
      step: '04',
      title: 'The platform keeps supporting the patient',
      body: 'After approval, patients can ask an AI assistant questions about their reports, receive medication reminders, track adherence to their prescriptions, find nearby pharmacies, and schedule appointments with providers.'
    }
  ],
  agentsHeading: 'Multi-agent architecture',
  agentsIntro:
    'Rather than one model doing everything, each task has its own specialized agent. Splitting the work this way keeps the system scalable, and lets each agent be improved or replaced without touching the rest of the platform.',
  agents: [
    { name: 'Medical imaging analysis', body: 'Reads X-rays, MRI scans, and CT scans and describes what it finds.' },
    { name: 'Diagnostic support', body: 'Assembles structured findings from reports and lab results for the reviewing doctor.' },
    { name: 'Medication information', body: 'Answers questions about prescriptions and drives reminders and adherence tracking.' },
    { name: 'Pharmacy services', body: 'Locates nearby pharmacies so a prescription can actually be filled.' },
    { name: 'Appointment scheduling', body: 'Books appointments with healthcare providers from inside the platform.' },
    { name: 'Patient assistance', body: 'Answers patient questions about their own reports in plain language.' }
  ],
  solvesHeading: 'What it addresses',
  solves: [
    'Delayed access to medical information',
    'Missed and mistimed medications',
    'Reports patients cannot interpret on their own',
    'Slow access to pharmacies and appointments'
  ],
  teamHeading: 'The team',
  team: [
    'HomzDoctor was built by a three-person team collaborating remotely across Pakistan and Egypt for the eight days of the hackathon.',
    'The work divided into four areas: designing the healthcare workflow, building the multi-agent AI system, developing the backend and frontend applications, and integrating the healthcare services into a single platform.'
  ],
  contributions: [
    { title: 'Healthcare workflow design', body: 'Mapping the path from upload to doctor approval to ongoing patient support, and deciding where a human must sign off.' },
    { title: 'Multi-agent AI system', body: 'Building the specialized agents and the orchestration that routes each task to the right one.' },
    { title: 'Backend and frontend', body: 'The applications patients and doctors actually use, and the services behind them.' },
    { title: 'Service integration', body: 'Wiring medication, pharmacy, and appointment services into one coherent product.' }
  ]
};

const ar: PageContent = {
  back: 'العودة إلى الموقع',
  eyebrow: 'هاكاثون · شهادة إتمام',
  title: 'HomzDoctor',
  event: 'هاكاثون Band of Agents · lablab.ai',
  tagline:
    'منصة رعاية صحية مدعومة بالذكاء الاصطناعي بُنيت خلال ثمانية أيام مع فريق من ثلاثة أعضاء. وكلاء متخصصون يقرأون التقارير الطبية ونتائج المختبر والأشعة، وطبيب مرخّص يعتمد كل نتيجة قبل عرضها على المريض كتشخيص.',
  certHeading: 'الشهادة',
  certAlt: 'شهادة إتمام هاكاثون Band of Agents ممنوحة إلى هارون ساجد من lablab.ai',
  facts: [
    { label: 'مُنحت إلى', value: 'Haroon Sajid', ltr: true },
    { label: 'الفعالية', value: 'Band of Agents Hackathon', ltr: true },
    { label: 'الجهة المانحة', value: 'lablab.ai، جزء من NativelyAI' },
    { label: 'التاريخ', value: '12 إلى 19 يونيو 2026' },
    { label: 'بتوقيع', value: 'Paweł Czech، مؤسس NativelyAI' },
    { label: 'رقم الشهادة', value: 'CMRYQE5G000YTS601P0RHHG8H', ltr: true }
  ],
  citationLabel: 'نص الشهادة',
  citation:
    'تقديرًا للأداء المتميز والحضور وإتمام وتسليم حل قائم على AMD Developer Cloud وAntigravity وClaude Code وLangChain وHuggingFace Spaces وGemma في هاكاثون Band of Agents.',
  verify: 'التحقق على lablab.ai',
  download: 'تحميل الشهادة PDF',
  repo: 'الكود على GitHub',
  stackLabel: 'التقنيات المستخدمة',
  aboutHeading: 'عن المشروع',
  about: [
    'HomzDoctor منصة رعاية صحية مدعومة بالذكاء الاصطناعي بُنيت لمساعدة المرضى ومقدمي الرعاية الصحية طوال رحلة العلاج. الهدف ليس استبدال الأطباء، بل مساعدتهم على اتخاذ قرارات أسرع وأكثر استنارة.',
    'يرفع المرضى التقارير الطبية ونتائج المختبر وصور الأشعة والرنين المغناطيسي والأشعة المقطعية وغيرها من المستندات الصحية. تعالج المنصة هذه المعلومات وتولّد رؤى منظمة، فيراجع الطبيب الحالة في جزء من الوقت الذي تتطلبه قراءة كل مستند من البداية.',
    'بُنيت المنصة لمعالجة مشكلات صحية لا علاقة لها بالمهارة الطبية: تأخر الوصول إلى المعلومات، ونسيان الأدوية، وتقارير لا يفهمها المريض، والبحث البطيء عن صيدلية أو موعد.'
  ],
  flowHeading: 'كيف تعمل',
  flowIntro: 'أربع مراحل، يقف فيها متخصص مرخّص بين الذكاء الاصطناعي والمريض عند النقطة الأهم.',
  flow: [
    {
      step: '٠١',
      title: 'المريض يرفع مستنداته',
      body: 'التقارير الطبية ونتائج المختبر وصور الأشعة والرنين المغناطيسي والأشعة المقطعية وغيرها تُجمع في مكان واحد بدلًا من تشتتها بين العيادات والهواتف.'
    },
    {
      step: '٠٢',
      title: 'الوكلاء يحوّلون المستندات إلى رؤى منظمة',
      body: 'وكلاء ذكاء اصطناعي متخصصون يقرأون الملفات المرفوعة وينتجون نتائج مرتبة يمكن للطبيب مراجعتها بسرعة، بدلًا من جدار من النصوص والصور الخام.'
    },
    {
      step: '٠٣',
      title: 'طبيب مرخّص يتحقق من كل نتيجة',
      body: 'لا تُعرض أي نتيجة من الذكاء الاصطناعي كتشخيص أو توصية علاجية قبل أن يراجعها ويعتمدها متخصص رعاية صحية مرخّص. هذه هي الطبقة التي تحفظ سلامة المريض وتُبقي القرار الطبي بيد الطبيب.'
    },
    {
      step: '٠٤',
      title: 'المنصة تواصل دعم المريض',
      body: 'بعد الاعتماد، يسأل المريض مساعدًا ذكيًا عن تقاريره، ويتلقى تذكيرات بالأدوية، ويتابع التزامه بالوصفة، ويجد صيدليات قريبة، ويحجز مواعيد مع مقدمي الرعاية.'
    }
  ],
  agentsHeading: 'بنية متعددة الوكلاء',
  agentsIntro:
    'بدلًا من نموذج واحد يفعل كل شيء، لكل مهمة وكيل متخصص بها. هذا التقسيم يبقي النظام قابلًا للتوسع، ويتيح تحسين أي وكيل أو استبداله دون المساس ببقية المنصة.',
  agents: [
    { name: 'تحليل الصور الطبية', body: 'يقرأ صور الأشعة والرنين المغناطيسي والأشعة المقطعية ويصف ما يجده.' },
    { name: 'دعم التشخيص', body: 'يجمع نتائج منظمة من التقارير ونتائج المختبر للطبيب المراجع.' },
    { name: 'معلومات الأدوية', body: 'يجيب عن الأسئلة حول الوصفات ويشغّل التذكيرات ومتابعة الالتزام.' },
    { name: 'خدمات الصيدلة', body: 'يحدد الصيدليات القريبة حتى يمكن صرف الوصفة فعليًا.' },
    { name: 'جدولة المواعيد', body: 'يحجز المواعيد مع مقدمي الرعاية الصحية من داخل المنصة.' },
    { name: 'مساعدة المرضى', body: 'يجيب عن أسئلة المريض حول تقاريره بلغة مفهومة.' }
  ],
  solvesHeading: 'المشكلات التي تعالجها',
  solves: [
    'تأخر الوصول إلى المعلومات الطبية',
    'نسيان الأدوية أو تناولها في غير وقتها',
    'تقارير لا يستطيع المريض تفسيرها بنفسه',
    'بطء الوصول إلى الصيدليات والمواعيد'
  ],
  teamHeading: 'الفريق',
  team: [
    'بُنيت HomzDoctor بفريق من ثلاثة أعضاء تعاونوا عن بُعد بين باكستان ومصر طوال أيام الهاكاثون الثمانية.',
    'انقسم العمل إلى أربعة مجالات: تصميم مسار الرعاية الصحية، وبناء نظام الوكلاء المتعددين، وتطوير الواجهات الخلفية والأمامية، ودمج الخدمات الصحية في منصة واحدة.'
  ],
  contributions: [
    { title: 'تصميم مسار الرعاية الصحية', body: 'رسم الطريق من الرفع إلى اعتماد الطبيب إلى دعم المريض المستمر، وتحديد أين يجب أن يوقّع إنسان.' },
    { title: 'نظام الوكلاء المتعددين', body: 'بناء الوكلاء المتخصصين والتنسيق الذي يوجّه كل مهمة إلى الوكيل المناسب.' },
    { title: 'الواجهات الخلفية والأمامية', body: 'التطبيقات التي يستخدمها المرضى والأطباء فعليًا، والخدمات التي تقف خلفها.' },
    { title: 'دمج الخدمات', body: 'ربط خدمات الأدوية والصيدليات والمواعيد في منتج واحد متماسك.' }
  ]
};

function BandOfAgentsHackathon() {
  const { lang } = useLanguage();
  const c = lang === 'ar' ? ar : en;

  return (
    <div className="project-page hackathon-page">
      <div className="project-page-inner">
        <Link className="hack-back" to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
          {c.back}
        </Link>

        <span className="hack-eyebrow">{c.eyebrow}</span>
        <h1 className="project-page-title">{c.title}</h1>
        <p className="hack-event">{c.event}</p>
        <p className="project-page-tagline">{c.tagline}</p>

        <div className="project-page-stack">
          <span className="project-page-stack-label">{c.stackLabel}</span>
          {STACK.map((tech) => (
            <span className="project-page-chip" key={tech}>{tech}</span>
          ))}
        </div>

        {/* Credential panel */}
        <section className="hack-cert" aria-label={c.certHeading}>
          <a
            className="hack-cert-frame"
            href={CERTIFICATE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={certificate} alt={c.certAlt} />
          </a>

          <div className="hack-cert-side">
            <h2>{c.certHeading}</h2>

            <dl className="hack-facts">
              {c.facts.map((fact) => (
                <div className="hack-fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd dir={fact.ltr ? 'ltr' : undefined}>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <blockquote className="hack-citation">
              <span className="hack-citation-label">{c.citationLabel}</span>
              {c.citation}
            </blockquote>

            <div className="hack-cta-row">
              <a
                className="hack-cta is-primary"
                href={CERTIFICATE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.verify}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
              <a
                className="hack-cta"
                href={CERTIFICATE_PDF}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.download}
                <FontAwesomeIcon icon={faDownload} />
              </a>
              <a
                className="hack-cta"
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.repo}
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="project-page-section">
          <h2>{c.aboutHeading}</h2>
          {c.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>

        {/* Flow */}
        <section className="project-page-section">
          <h2>{c.flowHeading}</h2>
          <p>{c.flowIntro}</p>
          <ol className="hack-flow">
            {c.flow.map((stage) => (
              <li className="hack-flow-step" key={stage.title}>
                <span className="hack-flow-num">{stage.step}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Safety callout — the defining rule of the product */}
        <aside className="hack-callout">
          <FontAwesomeIcon icon={faUserDoctor} />
          <p>
            {lang === 'ar'
              ? 'كل نتيجة يولدها الذكاء الاصطناعي يجب أن يراجعها ويعتمدها طبيب مرخّص قبل أن تصل إلى المريض كتشخيص أو توصية علاجية.'
              : 'Every AI-generated finding must be reviewed and approved by a licensed healthcare professional before it reaches a patient as a diagnosis or treatment recommendation.'}
          </p>
        </aside>

        {/* Agents */}
        <section className="project-page-section">
          <h2>{c.agentsHeading}</h2>
          <p>{c.agentsIntro}</p>
          <div className="hack-grid">
            {c.agents.map((agent, i) => (
              <div className="hack-card" key={agent.name}>
                <span className="hack-card-icon">
                  <FontAwesomeIcon icon={agentIcons[i % agentIcons.length]} />
                </span>
                <h3>{agent.name}</h3>
                <p>{agent.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Problems addressed */}
        <section className="project-page-section">
          <h2>{c.solvesHeading}</h2>
          <ul className="hack-tags">
            {c.solves.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Team */}
        <section className="project-page-section">
          <h2>{c.teamHeading}</h2>
          {c.team.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <div className="hack-grid is-two">
            {c.contributions.map((item) => (
              <div className="hack-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BandOfAgentsHackathon;
