import React from 'react';
import ProjectLayout, { ProjectPageContent } from './ProjectLayout';
import image from '../assets/images/zoho-ai-workflows-thumbnail.png';
import zh1 from '../assets/images/zh1-glazing-match.jpg';
import zh2 from '../assets/images/zh2-email-digest.jpg';

const en: ProjectPageContent = {
  title: 'AI Email Automations for Zoho Mail',
  tagline:
    'Two n8n automations built for a client in the windows industry. The first one reads specification PDFs from incoming emails, pulls out the required glazing values with AI, searches the official certified product database, and emails back a ready match report. The second one sorts every email with AI and sends a clean digest every evening and a bigger one every Monday morning.',
  sections: [
    {
      heading: 'Overview',
      body:
        'This client receives building specification documents and a heavy flow of daily email, all landing in the same Zoho Mail inbox. Finding matching certified window products for a specification used to mean reading the PDF by hand, writing down the required values, and searching the product database one entry at a time. And important emails were getting buried under newsletters and notifications.\n\nTwo automations fixed this. The first one turns a specification PDF into a finished product match report, automatically, minutes after the email arrives. The second one reads every email of the day, sorts it with AI, and sends one tidy report each evening and a bigger one each week.\n\nBuilt with n8n, Zoho Mail, OpenAI, OCR, and the official WERS product database.'
    },
    {
      heading: 'Automation 1: AI Glazing Match Reports',
      body:
        'When an email arrives with a PDF attached, this automation takes over. It pulls the text out of the PDF, and if the document is a scan with no readable text, it automatically sends it through OCR instead. Nothing needs to be decided by a person.\n\nThen AI reads the document and pulls out the exact requirements: the maximum U-Value, the SHGC range, the frame type and colour, and the opening type for every window element. A backup pattern check catches the key numbers even if the AI misses something. If the document has no glazing values at all, the automation simply stops quietly.\n\nNext comes the part that used to take hours. The automation searches the official certified product database, downloads the data of the relevant manufacturers, and scores hundreds of products against the requirements. Products inside the required range come first, close matches within tolerance fill the remaining spots, and matching opening types and frames earn bonus points. The result is emailed back as a clean report: the values found in the PDF at the top, then a table of the best matching certified products with all their numbers, and the original PDF attached. If any step fails, an alert email says exactly what went wrong, so nothing fails silently.',
      image: zh1
    },
    {
      heading: 'Automation 2: Daily and Weekly Email Digest',
      body:
        'Every evening at 8, this automation collects the emails that arrived during the day through the Zoho Mail API. It first cleans the list: newsletters, no-reply senders, and automatic notifications are removed. It even checks the sent folder and skips emails that were already answered, so the report never nags about finished work.\n\nThen AI sorts every remaining email into four simple groups: needs a reply, meetings, good to know, and ignored. It also writes one or two short sentences of advice about what to handle first tomorrow. The result arrives as one clean email: a headline saying how many messages actually need attention, a small count table, the subjects grouped by category, and the suggested focus at the end.\n\nEvery Monday at 8 in the morning, a bigger weekly version does the same for the whole week, so the week starts with the full picture instead of a crowded inbox.',
      image: zh2
    },
    {
      heading: 'The Result',
      body:
        'A specification PDF now turns into a ready product match report in minutes, with no reading, no copying, and no manual database searching. The evening digest replaces hours of inbox scrolling with a two minute read, and the Monday report opens the week with a clear head.\n\nThe inbox stopped being a to-do list. The business reads two short reports and already knows what matters.'
    }
  ]
};

const ar: ProjectPageContent = {
  title: 'أتمتة البريد الذكي لـ Zoho Mail',
  tagline:
    'أتمتتان n8n بُنيتا لعميل في مجال النوافذ. الأولى تقرأ ملفات المواصفات PDF من البريد الوارد، وتستخرج قيم الزجاج المطلوبة بالذكاء الاصطناعي، وتبحث في قاعدة بيانات المنتجات المعتمدة الرسمية، وترسل تقرير مطابقة جاهزًا. والثانية تصنف كل بريد بالذكاء الاصطناعي وترسل ملخصًا نظيفًا كل مساء وتقريرًا أكبر كل صباح اثنين.',
  sections: [
    {
      heading: 'نظرة عامة',
      body:
        'يستقبل هذا العميل مستندات مواصفات البناء وتدفقًا كبيرًا من البريد اليومي، وكلها تصل إلى نفس بريد Zoho Mail. كان العثور على منتجات نوافذ معتمدة تطابق المواصفات يعني قراءة ملف PDF يدويًا، وتدوين القيم المطلوبة، والبحث في قاعدة بيانات المنتجات واحدًا واحدًا. وكانت الرسائل المهمة تُدفن تحت النشرات والإشعارات.\n\nأتمتتان حلّتا المشكلة. الأولى تحوّل ملف المواصفات إلى تقرير مطابقة منتجات جاهز، تلقائيًا، بعد دقائق من وصول البريد. والثانية تقرأ كل بريد اليوم وتصنفه بالذكاء الاصطناعي وترسل تقريرًا مرتبًا كل مساء وتقريرًا أكبر كل أسبوع.\n\nبُنيت باستخدام n8n وZoho Mail وOpenAI وتقنية OCR وقاعدة بيانات WERS الرسمية للمنتجات المعتمدة.'
    },
    {
      heading: 'الأتمتة الأولى: تقارير مطابقة الزجاج الذكية',
      body:
        'عندما يصل بريد بملف PDF مرفق، تتولى هذه الأتمتة العمل. تستخرج النص من الملف، وإذا كان المستند صورة ممسوحة بلا نص مقروء، ترسله تلقائيًا عبر تقنية OCR. لا شيء يحتاج قرارًا من إنسان.\n\nثم يقرأ الذكاء الاصطناعي المستند ويستخرج المتطلبات بدقة: الحد الأقصى لقيمة U، ونطاق SHGC، ونوع الإطار ولونه، ونوع الفتح لكل عنصر نافذة. وهناك فحص احتياطي يلتقط الأرقام المهمة حتى لو فاتها الذكاء الاصطناعي. وإذا لم يكن في المستند قيم زجاج أصلًا، تتوقف الأتمتة بهدوء.\n\nثم يأتي الجزء الذي كان يستغرق ساعات. تبحث الأتمتة في قاعدة بيانات المنتجات المعتمدة الرسمية، وتنزّل بيانات المصنّعين المطلوبين، وتقيّم مئات المنتجات مقابل المتطلبات. المنتجات داخل النطاق المطلوب تأتي أولًا، والمنتجات القريبة ضمن حد السماح تكمل الباقي، والمطابقة في نوع الفتح والإطار تكسب نقاطًا إضافية. تُرسل النتيجة كتقرير نظيف بالبريد: القيم المستخرجة من الملف في الأعلى، ثم جدول بأفضل المنتجات المعتمدة المطابقة بكل أرقامها، مع الملف الأصلي مرفقًا. وإذا فشلت أي خطوة، يصل بريد تنبيه يوضح بالضبط ما حدث، فلا شيء يفشل بصمت.',
      image: zh1
    },
    {
      heading: 'الأتمتة الثانية: ملخص البريد اليومي والأسبوعي',
      body:
        'كل مساء في الثامنة، تجمع هذه الأتمتة رسائل اليوم عبر واجهة Zoho Mail. تنظف القائمة أولًا: تُزال النشرات وعناوين no-reply والإشعارات التلقائية. بل وتفحص مجلد المرسل وتتخطى الرسائل التي تم الرد عليها بالفعل، فلا يزعج التقرير أحدًا بعمل منجز.\n\nثم يصنف الذكاء الاصطناعي كل رسالة متبقية في أربع مجموعات بسيطة: تحتاج ردًا، اجتماعات، للعلم فقط، ومتجاهلة. ويكتب أيضًا جملة أو جملتين قصيرتين عن أول ما يجب التعامل معه غدًا. تصل النتيجة كبريد واحد نظيف: عنوان يقول كم رسالة تحتاج فعلًا انتباهًا، وجدول أعداد صغير، والمواضيع مجمعة حسب الفئة، والنصيحة في النهاية.\n\nوكل اثنين في الثامنة صباحًا، تفعل نسخة أسبوعية أكبر الشيء نفسه للأسبوع كله، فيبدأ الأسبوع بالصورة الكاملة بدلًا من بريد مزدحم.',
      image: zh2
    },
    {
      heading: 'النتيجة',
      body:
        'ملف المواصفات صار يتحول إلى تقرير مطابقة منتجات جاهز في دقائق، بلا قراءة ولا نسخ ولا بحث يدوي في قاعدة البيانات. وملخص المساء استبدل ساعات من تصفح البريد بقراءة دقيقتين، وتقرير الاثنين يفتتح الأسبوع بذهن صافٍ.\n\nتوقف البريد عن أن يكون قائمة مهام. يقرأ العميل تقريرين قصيرين ويعرف ما يهم.'
    }
  ]
};

function ZohoAiWorkflows() {
  return (
    <ProjectLayout
      image={image}
      heroLabel="N8N × ZOHO · 2 AUTOMATIONS"
      heroLabelAbove
      stack={['n8n', 'Zoho Mail', 'OpenAI', 'OCR', 'WERS API', 'Zoho SMTP']}
      content={{ en, ar }}
    />
  );
}

export default ZohoAiWorkflows;
