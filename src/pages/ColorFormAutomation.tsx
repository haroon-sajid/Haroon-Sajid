import React from 'react';
import ProjectLayout, { ProjectPageContent } from './ProjectLayout';
import image from '../assets/images/funky-painting-thumbnail.png';
import fp1 from '../assets/images/fp1-color-form-send.jpg';
import fp2 from '../assets/images/fp2-submission-intake.jpg';
import fp3 from '../assets/images/fp3-reminder-loop.jpg';
import fp4 from '../assets/images/fp4-error-alert.jpg';

const en: ProjectPageContent = {
  title: 'Color Form Automation System',
  tagline:
    'Four connected n8n workflows built for a US painting company around PaintScout, their estimating and production platform. The moment a job is scheduled, the customer automatically receives their color selection form, signed submissions flow straight back onto the deal, quiet customers get a friendly reminder every 10 days, and any failure sends an instant alert. Deal stages are never moved automatically — a human verifies every submission by phone before the job advances.',
  sections: [
    {
      heading: 'Overview',
      body:
        'Every time a painting job reached the schedule, someone at the office had to remember to send the customer their color selection form, chase the ones who never answered, save the signed PDF in the right places, and line up the verification call. At 40-50 jobs a month and growing, that busy work was eating hours and things were slipping through.\n\nThis system takes all of it over. It is made up of four connected n8n workflows running in the client’s own n8n account, working together with the PaintScout API, Gmail, and Google Drive. The system has no separate database: all of its memory lives as small tags on the deal itself in PaintScout, so the whole team can see exactly where any job stands just by opening the deal.\n\nThe most important rule of the entire build: the system never decides on its own that a job is ready. Every submission is verified by the office on a real phone call before the job moves forward, and the stage is moved by hand. Automation does the busy work; people keep the judgment calls.'
    },
    {
      heading: 'Workflow 1: Color Form Send',
      body:
        'A PaintScout webhook fires the moment a deal is moved into the scheduled stage. The workflow reads the deal, works out from the estimate type which of the three forms fits the job — interior, exterior, or cabinet — and builds a personal link with the job number, PO number, customer name, and address already filled in. The email goes out from the company’s own Gmail, so all the customer does is pick colors, sign, and press send.\n\nDouble sends are impossible by design. Before any email leaves, the deal is checked for an existing colors-sent or colors-received tag; if one is there, the run stops and records a skip. The team can move deals in and out of the stage without ever worrying about a customer being emailed twice. Every send ends with a paper trail: a note on the deal recording exactly what was sent, to whom, and the link used — and the tag stamp is deliberately the very last step, so a failure earlier never leaves anything half recorded.',
      image: fp1
    },
    {
      heading: 'Workflow 2: Submission Intake',
      body:
        'When the customer presses send, the form delivers everything in one package — their selections, a drawn signature, and a signed PDF generated right on their device. The workflow confirms the submission to the customer instantly, then does all the saving work in the background, so a submitted form can never be lost even if something breaks after they press send.\n\nThe signed PDF is stored twice: once in a Google Drive folder as the permanent archive, and once attached to the deal’s Files in PaintScout where the crew will look for it. The customer’s selections are rewritten as a clean, readable note on the deal — color matches, stain choices, paid extras, and anything changed against the estimate flagged for verification — so nobody has to open the PDF just to see what was chosen. The deal is stamped colors-received, which stops all reminders instantly, and a verification task is created in PaintScout for the CSR, with the customer’s phone number and full selections right inside it, so her call takes one click to start.',
      image: fp2
    },
    {
      heading: 'Workflow 3: Ten-Day Reminder Loop',
      body:
        'Every morning at 9, this workflow sweeps the scheduled deals and finds the ones where a form was sent but nothing has come back. If 10 or more days have passed since the last send, the customer gets a friendly reminder with the same personal link. The wording rotates between three different messages, so repeat reminders never read like a robot copy-paste.\n\nThe reminder clock lives in the colors-sent date tag, and it only resets after a successful send — so a morning where something failed heals itself the next day. Reminders stop automatically the moment the customer submits or the deal leaves the scheduled stage, and a safety cap of 12 reminders makes sure no one is nagged forever. Customers are processed one at a time, so a problem with one can never block the reminders for everyone else.',
      image: fp3
    },
    {
      heading: 'Workflow 4: Error Alert',
      body:
        'The watchdog for the other three. It does nothing at all until something fails — then it wakes up, builds a plain-language report of which workflow failed, at which step, and why, and emails it immediately with a link straight to the failed run in n8n. Every step in the system is safe to retry from the execution log, so recovery is calm and simple: open the run, fix the cause, retry from the failed step. Nothing in this system can fail silently.',
      image: fp4
    },
    {
      heading: 'The Result',
      body:
        'Sending forms, chasing customers, filing signed PDFs, and setting up verification calls all stopped being memory tasks. A scheduled job now emails its own color form within moments, submissions land in Google Drive and on the deal by themselves, and the only human step left is the one that should stay human: the verification call.\n\nThe whole system runs inside the client’s own accounts, with no black boxes — every setting lives in one config block at the top of each workflow, and the team can see the status of any job just by reading its tags in PaintScout.'
    }
  ]
};

const ar: ProjectPageContent = {
  title: 'نظام أتمتة نماذج اختيار الألوان',
  tagline:
    'أربعة workflows مترابطة على n8n بُنيت لشركة دهانات أمريكية حول PaintScout، منصتهم للتقديرات والإنتاج. لحظة جدولة أي مشروع، يستلم العميل نموذج اختيار الألوان تلقائيًا، وتعود النماذج الموقعة مباشرة إلى الصفقة، ويستلم العملاء الصامتون تذكيرًا ودّيًا كل 10 أيام، وأي فشل يرسل تنبيهًا فوريًا. مراحل الصفقات لا تتحرك تلقائيًا أبدًا — إنسان يتحقق من كل نموذج هاتفيًا قبل أن يتقدم المشروع.',
  sections: [
    {
      heading: 'نظرة عامة',
      body:
        'في كل مرة يصل فيها مشروع دهان إلى الجدولة، كان على أحد في المكتب أن يتذكر إرسال نموذج اختيار الألوان للعميل، وملاحقة من لم يجب، وحفظ ملف PDF الموقع في الأماكن الصحيحة، وترتيب مكالمة التحقق. مع 40-50 مشروعًا شهريًا وفي تزايد، كانت هذه الأعمال تستهلك الساعات وتفلت منها التفاصيل.\n\nهذا النظام يتولى كل ذلك. يتكون من أربعة workflows مترابطة على n8n تعمل داخل حساب العميل نفسه، بالتكامل مع واجهة PaintScout وGmail وGoogle Drive. لا توجد قاعدة بيانات منفصلة: ذاكرة النظام كلها تعيش كوسوم صغيرة على الصفقة نفسها في PaintScout، فيرى الفريق حالة أي مشروع بمجرد فتح الصفقة.\n\nالقاعدة الأهم في البناء كله: النظام لا يقرر من تلقاء نفسه أن المشروع جاهز. كل نموذج يُتحقق منه هاتفيًا قبل أن يتقدم المشروع، والمرحلة تُنقل يدويًا. الأتمتة تتولى الأعمال الروتينية، والقرارات تبقى للبشر.'
    },
    {
      heading: 'الـ Workflow الأول: إرسال نموذج الألوان',
      body:
        'يُطلق webhook من PaintScout لحظة نقل الصفقة إلى مرحلة الجدولة. يقرأ الـ workflow الصفقة، ويحدد من نوع التقدير أي النماذج الثلاثة يناسب المشروع — داخلي أو خارجي أو خزائن — ويبني رابطًا شخصيًا معبأً مسبقًا برقم المشروع ورقم PO واسم العميل وعنوانه. يُرسل البريد من Gmail الشركة نفسها، فكل ما يفعله العميل هو اختيار الألوان والتوقيع والإرسال.\n\nالإرسال المزدوج مستحيل بالتصميم. قبل خروج أي بريد، تُفحص الصفقة بحثًا عن وسم colors-sent أو colors-received موجود؛ إن وُجد، يتوقف التشغيل ويسجل التخطي. يستطيع الفريق نقل الصفقات من المرحلة وإليها دون قلق من مراسلة عميل مرتين. وكل إرسال ينتهي بأثر موثق: ملاحظة على الصفقة تسجل ما أُرسل بالضبط ولمن وبأي رابط — وختم الوسم هو الخطوة الأخيرة عمدًا، فأي فشل مبكر لا يترك شيئًا نصف مسجل.',
      image: fp1
    },
    {
      heading: 'الـ Workflow الثاني: استقبال النماذج',
      body:
        'عندما يضغط العميل إرسال، يسلّم النموذج كل شيء في حزمة واحدة — اختياراته، والتوقيع المرسوم، وملف PDF موقع يُنشأ على جهازه مباشرة. يؤكد الـ workflow الاستلام للعميل فورًا، ثم ينجز كل أعمال الحفظ في الخلفية، فلا يمكن أن يضيع نموذج مُرسل حتى لو تعطل شيء بعد الضغط على إرسال.\n\nيُحفظ ملف PDF الموقع مرتين: مرة في مجلد Google Drive كأرشيف دائم، ومرة مرفقًا بملفات الصفقة في PaintScout حيث يبحث عنه الفريق. وتُعاد كتابة اختيارات العميل كملاحظة نظيفة مقروءة على الصفقة — مطابقات الألوان، وخيارات الصبغة، والإضافات المدفوعة، وأي تغيير عن التقدير يُعلَّم للتحقق — فلا يحتاج أحد لفتح الـ PDF لمعرفة ما اختير. تُختم الصفقة بوسم colors-received فتتوقف كل التذكيرات فورًا، وتُنشأ مهمة تحقق في PaintScout لموظفة خدمة العملاء، وبداخلها رقم هاتف العميل واختياراته كاملة، فتبدأ مكالمتها بنقرة واحدة.',
      image: fp2
    },
    {
      heading: 'الـ Workflow الثالث: حلقة التذكير كل 10 أيام',
      body:
        'كل صباح في التاسعة، يمسح هذا الـ workflow الصفقات المجدولة ويجد التي أُرسل لها نموذج ولم يعد شيء. إذا مرت 10 أيام أو أكثر منذ آخر إرسال، يستلم العميل تذكيرًا ودّيًا بنفس الرابط الشخصي. تتناوب الصياغة بين ثلاث رسائل مختلفة، فلا تبدو التذكيرات المتكررة نسخًا آليًا.\n\nساعة التذكير تعيش في وسم colors-sent المؤرخ، ولا تُعاد إلا بعد إرسال ناجح — فأي صباح فشل فيه شيء يصحح نفسه في اليوم التالي. تتوقف التذكيرات تلقائيًا لحظة إرسال العميل نموذجه أو خروج الصفقة من مرحلة الجدولة، وحد أمان من 12 تذكيرًا يضمن ألا يُزعج أحد للأبد. يُعالج العملاء واحدًا واحدًا، فمشكلة عند أحدهم لا توقف تذكيرات البقية أبدًا.',
      image: fp3
    },
    {
      heading: 'الـ Workflow الرابع: تنبيه الأخطاء',
      body:
        'حارس الثلاثة الآخرين. لا يفعل شيئًا حتى يفشل شيء — عندها يستيقظ، ويبني تقريرًا بلغة واضحة عن أي workflow فشل وعند أي خطوة ولماذا، ويرسله بالبريد فورًا مع رابط مباشر إلى التشغيل الفاشل في n8n. كل خطوة في النظام آمنة لإعادة المحاولة من سجل التنفيذ، فالتعافي هادئ وبسيط: افتح التشغيل، أصلح السبب، أعد المحاولة من الخطوة الفاشلة. لا شيء في هذا النظام يفشل بصمت.',
      image: fp4
    },
    {
      heading: 'النتيجة',
      body:
        'إرسال النماذج وملاحقة العملاء وأرشفة ملفات PDF الموقعة وترتيب مكالمات التحقق — كلها توقفت عن كونها مهام تعتمد على الذاكرة. المشروع المجدول يرسل نموذج ألوانه بنفسه خلال لحظات، والنماذج تصل إلى Google Drive والصفقة تلقائيًا، والخطوة البشرية الوحيدة المتبقية هي التي يجب أن تبقى بشرية: مكالمة التحقق.\n\nالنظام كله يعمل داخل حسابات العميل نفسه، بلا صناديق سوداء — كل إعداد يعيش في كتلة تهيئة واحدة أعلى كل workflow، ويرى الفريق حالة أي مشروع بمجرد قراءة وسومه في PaintScout.'
    }
  ]
};

function ColorFormAutomation() {
  return (
    <ProjectLayout
      image={image}
      heroLabel="N8N × PAINTSCOUT · 4 WORKFLOWS"
      stack={['n8n', 'PaintScout API', 'Gmail', 'Google Drive', 'Webhooks']}
      content={{ en, ar }}
    />
  );
}

export default ColorFormAutomation;
