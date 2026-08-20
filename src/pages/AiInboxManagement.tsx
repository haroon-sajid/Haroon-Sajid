import React from 'react';
import ProjectLayout, { ProjectPageContent } from './ProjectLayout';
import image from '../assets/images/ai-inbox-management-system.png';
import wf1 from '../assets/images/wf1-gmail-assistant.jpg';
import wf2 from '../assets/images/wf2-whatsapp-inbound.jpg';
import wf3 from '../assets/images/wf3-followup-digest.jpg';
import wf4 from '../assets/images/wf4-slack-approval-handler.jpg';

const en: ProjectPageContent = {
  title: 'AI Inbox Management System',
  tagline:
    'A smart inbox system built for a recruitment agency. Four connected n8n workflows read the email inbox, catch every WhatsApp message, follow up with quiet contacts, and send every AI draft to Slack for approval. The AI only writes drafts. A human approves every message before it goes out.',
  sections: [
    {
      heading: 'Overview',
      body:
        'This system was built for a recruitment agency that was spending hours every day reading emails, answering WhatsApp messages, and remembering who to follow up with. It joins all of that work into one automated process made of four connected n8n workflows.\n\nThe system reads new emails and removes the junk. It catches every WhatsApp message the moment it arrives. It finds contacts who have gone quiet and prepares follow up emails for them. And it sends every reply written by AI to one place in Slack, where the recruiter approves it with one click.\n\nThe most important rule: the AI only writes drafts. It never sends anything by itself. A human always presses the approve button first. The AI does the reading and the writing. The recruiter stays in control of every word.\n\nBuilt with n8n, Claude AI, Recruit CRM, Gmail, Whapi Cloud for WhatsApp, and Slack.'
    },
    {
      heading: 'Built-in Safety Rules',
      body:
        'Nothing is ever sent automatically. A human always approves first.\n\nNo message is ever lost. Every email and WhatsApp message is either processed, sent to a human to check, or reported as an error in Slack.\n\nEvery step is saved as a note on the right contact in the CRM, so there is always a record of what happened.\n\nAll errors are posted in a special Slack channel. The team always knows when something needs attention.'
    },
    {
      heading: 'Workflow 1: Gmail Assistant',
      body:
        'This workflow checks the Gmail inbox every hour. It cleans each new email and removes the noise. Newsletters, marketing emails, auto replies, and system notifications are closed quietly without bothering anyone.\n\nReal messages are matched with the CRM to see if the sender is a known contact or candidate. Then Claude AI reads the email and decides if it is from a client, a candidate, or a new lead. If the AI is confident, it writes a reply in the recruiter\'s own writing style. If the sender asks for a meeting, the reply offers a booking link backed by live calendar availability instead of proposing times that could get taken. Calendar invites are never answered; they are only logged as a note on the contact\'s record. The draft is saved in Gmail inside the same conversation, and a card is posted in Slack with three buttons: Approve, Edit, and Discard, routed to the right per-client channel.\n\nIf the AI is not sure about an email, it never guesses. That email goes to a Slack channel for a human to look at. Emails from unknown senders pass a second AI check, and genuine new enquiries are no longer just flagged. They now arrive as a ready approval card in the new-lead Slack channel, with a full AI draft that asks the right qualification questions. The system also searches the CRM by the sender\'s name and company, in case a known contact is writing from a new address, and any possible matches are shown on the card for a human to verify. They are never linked automatically. Only cold sales emails and mass marketing are filtered out. And if anything fails, the team gets an alert and the email is tried again later. No email is ever lost.',
      image: wf1
    },
    {
      heading: 'Workflow 2: WhatsApp Assistant',
      body:
        'This workflow receives every WhatsApp message the moment it arrives. It first removes things that do not need a reply, like group chats, duplicate messages, stickers, and verification codes.\n\nThen it matches the sender\'s phone number with the CRM. If the person is known, the message is saved as a note on their record, a follow up task is created so nothing is forgotten, and Claude AI writes a short reply. The message is also checked for meeting requests, so the draft can offer the booking link when one is needed. The reply goes to Slack, and the recruiter approves it with one click. If the message is only a photo, a document, or a voice note, the system logs it and tells the team instead of guessing a reply.\n\nIf the number is unknown, the AI checks whether the message is a real business message or just spam. Genuine enquiries now arrive as a ready approval card in the new-lead Slack channel, with a full AI draft that asks short qualification questions. The CRM is also searched by the sender\'s name and company, and any possible existing matches are flagged on the card for a human to verify, never linked automatically. If the AI cannot decide, the message is treated as a lead anyway, because a missed lead costs more than one extra Slack message.',
      image: wf2
    },
    {
      heading: 'Workflow 3: Daily Follow-up Digest',
      body:
        'Every morning at 8, this workflow looks in the CRM for candidates who have gone quiet. It follows sensible rules. It waits at least 3 days before following up. It stops after 3 follow ups. And it never chases people who went cold a long time ago.\n\nFor each person, Claude AI reads the recent conversation history and writes a personal follow up email about the last real topic they talked about. It never writes a boring "just checking in" message. Each email is saved as a draft in Gmail, and one daily summary is sent to the recruiter by email and Slack.\n\nSending takes two steps on purpose. The first click only opens a preview page and sends nothing. Only a second, clear button press sends the email. This means a follow up can never be sent by mistake, and never sent twice. If something fails, nothing is lost. The next morning the summary simply shows everything again.',
      image: wf3
    },
    {
      heading: 'Workflow 4: Slack Approval Handler',
      body:
        'This is the control center for all the approve buttons in Slack. It is also the only workflow in the whole system that can actually send a message.\n\nWhen the recruiter presses Approve on an email draft, the draft is sent from Gmail exactly as it is, including any edits made by hand. When they press Approve on a WhatsApp draft, the reply is sent to that chat. Pressing Edit opens a small window in Slack where the text can be changed before approving. Pressing Discard removes the draft and sends nothing.\n\nAfter every action, the Slack card is updated to show what happened and who did it, and a note is saved in the CRM. Saving an edit also updates the Gmail draft itself, so Gmail and Slack always match. Drafts from new senders who are not in the CRM yet work exactly the same way, just without the CRM note. If a draft was already sent or deleted before, the system says so clearly and never sends it twice.',
      image: wf4
    },
    {
      heading: 'The Result',
      body:
        'Clear messages from known people arrive with a ready reply and one click approval. Unclear messages go to a human. Real enquiries from new people show up with a short preview. Junk disappears quietly. And every problem raises an alert instead of losing a message.\n\nA full day of reading emails, replying on WhatsApp, and remembering follow ups now takes a few minutes of approvals. No message is lost. Everything is recorded. And a human stays in control of every word that leaves the business.'
    }
  ]
};

const ar: ProjectPageContent = {
  title: 'نظام إدارة البريد الوارد بالذكاء الاصطناعي',
  tagline:
    'نظام ذكي لإدارة البريد بُني لوكالة توظيف. أربع أتمتات n8n مترابطة تقرأ البريد الإلكتروني، وتلتقط كل رسالة واتساب، وتتابع جهات الاتصال الصامتة، وترسل كل مسودة من الذكاء الاصطناعي إلى Slack للموافقة. الذكاء الاصطناعي يكتب فقط، والإنسان يوافق على كل رسالة قبل خروجها.',
  sections: [
    {
      heading: 'نظرة عامة',
      body:
        'بُني هذا النظام لوكالة توظيف كانت تقضي ساعات كل يوم في قراءة الرسائل والرد على واتساب وتذكر من يجب متابعته. النظام يجمع كل هذا العمل في عملية آلية واحدة من أربع أتمتات n8n مترابطة.\n\nيقرأ النظام الرسائل الجديدة ويزيل غير المهم منها. ويلتقط كل رسالة واتساب فور وصولها. ويجد جهات الاتصال التي صمتت ويجهز لها رسائل متابعة. ثم يرسل كل رد كتبه الذكاء الاصطناعي إلى مكان واحد في Slack، حيث يوافق عليه المسؤول بنقرة واحدة.\n\nالقاعدة الأهم: الذكاء الاصطناعي يكتب المسودات فقط، ولا يرسل شيئًا بنفسه أبدًا. الإنسان يضغط زر الموافقة دائمًا. الذكاء الاصطناعي يقرأ ويكتب، والمسؤول يبقى متحكمًا بكل كلمة.\n\nبُني باستخدام n8n وClaude AI وRecruit CRM وGmail وWhapi Cloud لواتساب وSlack.'
    },
    {
      heading: 'قواعد أمان مدمجة',
      body:
        'لا يُرسل شيء تلقائيًا أبدًا. الإنسان يوافق أولًا في كل مرة.\n\nلا تضيع أي رسالة. كل بريد أو رسالة واتساب إما تُعالج، أو تُعرض على إنسان، أو يُبلغ عنها كخطأ في Slack.\n\nكل خطوة تُحفظ كملاحظة على جهة الاتصال الصحيحة في النظام، فيبقى دائمًا سجل لما حدث.\n\nكل الأخطاء تُنشر في قناة خاصة في Slack، فيعرف الفريق دائمًا متى يحتاج شيء إلى الانتباه.'
    },
    {
      heading: 'الأتمتة الأولى: مساعد Gmail',
      body:
        'تفحص هذه الأتمتة بريد Gmail كل ساعة. تنظف كل رسالة جديدة وتزيل الضجيج. النشرات البريدية ورسائل التسويق والردود الآلية تُغلق بهدوء دون إزعاج أحد.\n\nالرسائل الحقيقية تُطابق مع النظام لمعرفة إن كان المرسل معروفًا. ثم يقرأ Claude AI الرسالة ويحدد إن كانت من عميل أو مرشح أو فرصة جديدة. إذا كان واثقًا، يكتب ردًا بأسلوب المسؤول نفسه. وإذا طلب المرسل اجتماعًا، يقدم الرد رابط حجز مرتبطًا بالتقويم الفعلي بدلًا من اقتراح أوقات قد تُحجز. أما دعوات التقويم فلا يُرد عليها أبدًا، بل تُسجل كملاحظة على سجل جهة الاتصال فقط. تُحفظ المسودة في Gmail داخل المحادثة نفسها، وتُنشر بطاقة في Slack بثلاثة أزرار: موافقة، تعديل، تجاهل، وتُوجه إلى قناة العميل المناسبة.\n\nإذا لم يكن الذكاء الاصطناعي متأكدًا من رسالة، لا يخمن أبدًا. تذهب الرسالة إلى قناة في Slack ليقرر إنسان. رسائل المرسلين المجهولين تمر بفحص ثانٍ، والاستفسارات الجديدة الحقيقية لم تعد مجرد تنبيه: تصل الآن كبطاقة موافقة جاهزة في قناة الفرص الجديدة في Slack مع مسودة رد كاملة تتضمن أسئلة التأهيل المناسبة. كما يبحث النظام في CRM باسم المرسل وشركته، تحسبًا لأن يكون جهة اتصال معروفة تكتب من عنوان جديد، وتُعرض أي سجلات مشابهة على البطاقة ليتحقق منها إنسان، ولا تُربط تلقائيًا أبدًا. تُصفى فقط رسائل المبيعات الباردة والتسويق الجماعي. وإذا فشل شيء، يصل تنبيه للفريق وتُعاد المحاولة لاحقًا. لا يضيع بريد أبدًا.',
      image: wf1
    },
    {
      heading: 'الأتمتة الثانية: مساعد واتساب',
      body:
        'تستقبل هذه الأتمتة كل رسالة واتساب فور وصولها. تزيل أولًا ما لا يحتاج إلى رد، مثل محادثات المجموعات والرسائل المكررة والملصقات ورموز التحقق.\n\nثم تطابق رقم المرسل مع النظام. إذا كان الشخص معروفًا، تُحفظ الرسالة كملاحظة على سجله، وتُنشأ مهمة متابعة حتى لا يُنسى شيء، ويكتب Claude AI ردًا قصيرًا. وتُفحص الرسالة أيضًا بحثًا عن طلب اجتماع، حتى تقدم المسودة رابط الحجز عند الحاجة. يذهب الرد إلى Slack ويوافق عليه المسؤول بنقرة واحدة. وإذا كانت الرسالة صورة أو مستندًا أو رسالة صوتية فقط، يسجلها النظام ويخبر الفريق بدلًا من تخمين رد.\n\nإذا كان الرقم مجهولًا، يفحص الذكاء الاصطناعي هل الرسالة رسالة عمل حقيقية أم مجرد إزعاج. الاستفسارات الحقيقية تصل الآن كبطاقة موافقة جاهزة في قناة الفرص الجديدة في Slack، مع مسودة رد كاملة تتضمن أسئلة تأهيل قصيرة. كما يبحث النظام في CRM باسم المرسل وشركته، وتُعرض أي سجلات مشابهة على البطاقة ليتحقق منها إنسان، ولا تُربط تلقائيًا أبدًا. وإذا لم يستطع الذكاء الاصطناعي أن يقرر، تُعامل الرسالة كفرصة على أي حال، لأن فرصة ضائعة أغلى من رسالة إضافية في Slack.',
      image: wf2
    },
    {
      heading: 'الأتمتة الثالثة: ملخص المتابعات اليومي',
      body:
        'كل صباح في الثامنة، تبحث هذه الأتمتة في النظام عن مرشحين صمتوا. وتتبع قواعد منطقية: تنتظر 3 أيام على الأقل قبل المتابعة، وتتوقف بعد 3 متابعات، ولا تلاحق أبدًا من انقطع تواصلهم منذ زمن طويل.\n\nلكل شخص، يقرأ Claude AI المحادثات الأخيرة ويكتب رسالة متابعة شخصية عن آخر موضوع حقيقي تحدثوا عنه. لا يكتب أبدًا رسالة مملة مثل «أطمئن عليك فقط». تُحفظ كل رسالة كمسودة في Gmail، ويصل للمسؤول ملخص يومي واحد بالبريد وSlack.\n\nالإرسال يتم بخطوتين عن قصد. النقرة الأولى تفتح صفحة معاينة فقط ولا ترسل شيئًا. وفقط ضغطة زر ثانية واضحة ترسل الرسالة. هكذا لا يمكن أبدًا إرسال متابعة بالخطأ ولا مرتين. وإذا فشل شيء، لا يضيع شيء. في صباح اليوم التالي يعرض الملخص كل شيء من جديد.',
      image: wf3
    },
    {
      heading: 'الأتمتة الرابعة: معالج الموافقات في Slack',
      body:
        'هذا هو مركز التحكم لكل أزرار الموافقة في Slack. وهو أيضًا الأتمتة الوحيدة في النظام كله التي تستطيع فعلًا إرسال رسالة.\n\nعندما يضغط المسؤول موافقة على مسودة بريد، تُرسل المسودة من Gmail كما هي تمامًا، بما في ذلك أي تعديلات يدوية. وعند الموافقة على مسودة واتساب، يُرسل الرد إلى تلك المحادثة. زر التعديل يفتح نافذة صغيرة في Slack لتغيير النص قبل الموافقة. وزر التجاهل يحذف المسودة ولا يرسل شيئًا.\n\nبعد كل إجراء، تُحدّث بطاقة Slack لتظهر ما حدث ومن فعله، وتُحفظ ملاحظة في النظام. حفظ التعديل يحدّث أيضًا مسودة Gmail نفسها، فيبقى Gmail وSlack متطابقين دائمًا. ومسودات المرسلين الجدد غير الموجودين في النظام بعد تعمل بالطريقة نفسها، فقط دون ملاحظة CRM. وإذا كانت المسودة قد أُرسلت أو حُذفت من قبل، يقول النظام ذلك بوضوح ولا يرسلها مرتين أبدًا.',
      image: wf4
    },
    {
      heading: 'النتيجة',
      body:
        'الرسائل الواضحة من الأشخاص المعروفين تصل مع رد جاهز وموافقة بنقرة واحدة. الرسائل غير الواضحة تذهب لإنسان. الاستفسارات الحقيقية من أشخاص جدد تظهر مع معاينة قصيرة. البريد المزعج يختفي بهدوء. وكل مشكلة ترفع تنبيهًا بدلًا من إضاعة رسالة.\n\nيوم كامل من قراءة الرسائل والرد على واتساب وتذكر المتابعات صار يأخذ دقائق قليلة من الموافقات. لا رسالة تضيع، وكل شيء مسجل، والإنسان يبقى متحكمًا بكل كلمة تخرج من الشركة.'
    }
  ]
};

function AiInboxManagement() {
  return (
    <ProjectLayout
      image={image}
      heroLabel="N8N × CLAUDE AI · AUTOMATION"
      stack={['n8n', 'Claude AI', 'Recruit CRM', 'Gmail API', 'Whapi Cloud', 'Slack']}
      content={{ en, ar }}
    />
  );
}

export default AiInboxManagement;
