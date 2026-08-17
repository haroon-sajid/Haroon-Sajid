import React from 'react';
import ProjectLayout, { ProjectPageContent } from './ProjectLayout';
import image from '../assets/images/caregivers-monitoring-system.png';
import cg1 from '../assets/images/cg1-night-shift.jpg';
import cg2 from '../assets/images/cg2-streaks.jpg';
import cg3 from '../assets/images/cg3-daily-insights.jpg';

const en: ProjectPageContent = {
  title: 'Caregivers Monitoring System',
  tagline:
    'An n8n automation built for a home care agency that works through the night. It sends check-in messages to caregivers on shift, calls them when they do not reply, turns reliability into streaks and a live leaderboard, and gives the manager a clear AI report every day. Nobody has to stay awake watching the phones.',
  sections: [
    {
      heading: 'Overview',
      body:
        'Home care agencies have caregivers working overnight shifts in different homes. The agency needs to know one simple thing: is every caregiver awake, present, and okay. Before this system, someone had to check manually, which is slow and easy to forget.\n\nThis system does the checking automatically, using three connected n8n workflows. The first one runs the night: it sends SMS check-ins to caregivers on shift, reminds them if they do not reply, and escalates to a real phone call and a supervisor alert when needed. The second one runs the morning: it turns the night results into streaks and a live leaderboard, and sends caregivers a motivating morning message. The third one writes the daily report: AI reads the care notes from the day and emails the manager one clear summary.\n\nBuilt with n8n, SwyftOps, GoTo SMS, Twilio, OpenAI, Google Sheets, and Gmail.'
    },
    {
      heading: 'Workflow 1: Night Shift Check-ins',
      body:
        'This workflow watches the schedule and knows who is on shift each night. At the planned times, it sends each caregiver a short SMS asking them to confirm they are okay. A simple reply is all it takes, and the check-in is marked as passed.\n\nIf there is no reply, the system does not give up and does not panic. It waits a little and sends a reminder message. If there is still no answer, it escalates and places an automated voice call to the caregiver through Twilio. And if even the call gets no response, a supervisor is alerted right away, so a real person steps in only when truly needed.\n\nEvery step is written into Google Sheets: who was asked, who replied, how fast, who needed a reminder, and who needed a call. The team can also manage the caregiver list by simply sending SMS commands, without opening any dashboard. Nothing depends on someone remembering to check.',
      image: cg1
    },
    {
      heading: 'Workflow 2: Caregiver Streaks and Leaderboard',
      body:
        'Every morning at 9, this workflow reads the night scorecard and updates every caregiver\'s streak. Good nights build the streak. Missed check-ins break it. If the night data is missing for some reason, the workflow safely skips and alerts the team instead of writing wrong scores.\n\nEach caregiver then receives a short morning SMS with their current streak and a link to the leaderboard. The leaderboard itself is a live web page built straight from the data, so anyone who opens the link always sees the latest standings.\n\nThis turns reliability into something visible and even a little fun. Caregivers who always answer on time get recognized for it, and the agency can spot patterns early, like someone who has started missing check-ins week after week.',
      image: cg2
    },
    {
      heading: 'Workflow 3: Daily Care Insights',
      body:
        'Every day at 5 PM, the care system emails two PDF reports to a dedicated inbox: one with caregiver notes and one with client notes. This workflow picks up both emails, pulls the text out of the PDFs, and checks that both arrived.\n\nThen AI reads all the notes and writes one clear daily report about the care that was given: what went well, what needs attention, and anything unusual. The report is formatted as a clean email and sent to the manager right away.\n\nIf one of the PDFs is missing or cannot be read, the system does not send a half report. It sends an alert that explains exactly what is wrong, so the team can fix it and trust that every report they do receive is complete.',
      image: cg3
    },
    {
      heading: 'The Result',
      body:
        'The agency knows every night that every caregiver is present and okay, without anyone staying up to check. Problems are caught in minutes, not in the morning. Reliability is measured fairly and openly, and caregivers get daily recognition for showing up. The manager reads one clear report instead of digging through notes.\n\nA job that used to depend on memory and luck now runs by itself, every single night.'
    }
  ]
};

const ar: ProjectPageContent = {
  title: 'نظام متابعة مقدمي الرعاية',
  tagline:
    'أتمتة n8n بُنيت لوكالة رعاية منزلية تعمل طوال الليل. ترسل رسائل اطمئنان لمقدمي الرعاية أثناء مناوباتهم، وتتصل بهم إذا لم يردوا، وتحوّل الالتزام إلى سلاسل إنجاز ولوحة صدارة مباشرة، وتعطي المدير تقريرًا واضحًا بالذكاء الاصطناعي كل يوم. لا أحد يحتاج أن يبقى مستيقظًا لمراقبة الهواتف.',
  sections: [
    {
      heading: 'نظرة عامة',
      body:
        'وكالات الرعاية المنزلية لديها مقدمو رعاية يعملون في مناوبات ليلية في بيوت مختلفة. والوكالة تحتاج أن تعرف شيئًا واحدًا بسيطًا: هل كل مقدم رعاية مستيقظ وموجود وبخير. قبل هذا النظام، كان على أحدهم أن يتحقق يدويًا، وهذا بطيء ويسهل نسيانه.\n\nهذا النظام يقوم بالتحقق تلقائيًا عبر ثلاث أتمتات n8n مترابطة. الأولى تدير الليل: ترسل رسائل اطمئنان لمن هم في المناوبة، وتذكّر من لا يرد، وتصعّد إلى مكالمة هاتفية حقيقية وتنبيه للمشرف عند الحاجة. والثانية تدير الصباح: تحوّل نتائج الليل إلى سلاسل إنجاز ولوحة صدارة مباشرة، وترسل لمقدمي الرعاية رسالة صباحية محفزة. والثالثة تكتب التقرير اليومي: يقرأ الذكاء الاصطناعي ملاحظات الرعاية ويرسل للمدير ملخصًا واحدًا واضحًا.\n\nبُني باستخدام n8n وSwyftOps وGoTo SMS وTwilio وOpenAI وGoogle Sheets وGmail.'
    },
    {
      heading: 'الأتمتة الأولى: اطمئنان المناوبات الليلية',
      body:
        'تراقب هذه الأتمتة الجدول وتعرف من في المناوبة كل ليلة. في الأوقات المحددة، ترسل لكل مقدم رعاية رسالة قصيرة تطلب تأكيد أن كل شيء بخير. رد بسيط يكفي، وتُسجل النتيجة كنجاح.\n\nإذا لم يصل رد، لا يستسلم النظام ولا يبالغ. ينتظر قليلًا ثم يرسل رسالة تذكير. وإذا استمر الصمت، يصعّد ويجري مكالمة صوتية آلية عبر Twilio. وإذا لم تنجح المكالمة أيضًا، يُنبَّه المشرف فورًا، فلا يتدخل إنسان إلا عند الحاجة الحقيقية.\n\nكل خطوة تُكتب في Google Sheets: من سُئل، ومن رد، وكم استغرق، ومن احتاج تذكيرًا أو مكالمة. ويستطيع الفريق إدارة قائمة مقدمي الرعاية بمجرد إرسال أوامر عبر الرسائل النصية دون فتح أي لوحة تحكم. لا شيء يعتمد على ذاكرة أحد.',
      image: cg1
    },
    {
      heading: 'الأتمتة الثانية: سلاسل الإنجاز ولوحة الصدارة',
      body:
        'كل صباح في التاسعة، تقرأ هذه الأتمتة نتائج الليل وتحدّث سلسلة إنجاز كل مقدم رعاية. الليالي الجيدة تبني السلسلة، والردود الفائتة تكسرها. وإذا كانت بيانات الليل مفقودة لأي سبب، تتخطى الأتمتة بأمان وتنبه الفريق بدلًا من كتابة نتائج خاطئة.\n\nثم يصل كل مقدم رعاية رسالة صباحية قصيرة فيها سلسلته الحالية ورابط للوحة الصدارة. واللوحة نفسها صفحة ويب مباشرة تُبنى من البيانات لحظة فتحها، فيرى كل من يفتح الرابط أحدث الترتيب دائمًا.\n\nهكذا يصبح الالتزام شيئًا مرئيًا وممتعًا قليلًا أيضًا. من يجيب دائمًا في الوقت يحصل على التقدير، وتلاحظ الوكالة الأنماط مبكرًا، مثل شخص بدأ يفوّت الردود أسبوعًا بعد أسبوع.',
      image: cg2
    },
    {
      heading: 'الأتمتة الثالثة: تقرير الرعاية اليومي',
      body:
        'كل يوم في الخامسة مساءً، يرسل نظام الرعاية تقريرين PDF إلى بريد مخصص: واحد بملاحظات مقدمي الرعاية وآخر بملاحظات العملاء. تلتقط هذه الأتمتة الرسالتين، وتستخرج النص من الملفين، وتتأكد من وصولهما معًا.\n\nثم يقرأ الذكاء الاصطناعي كل الملاحظات ويكتب تقريرًا يوميًا واحدًا واضحًا عن الرعاية المقدمة: ما سار جيدًا، وما يحتاج انتباهًا، وأي شيء غير معتاد. يُنسق التقرير كبريد أنيق ويُرسل للمدير فورًا.\n\nوإذا كان أحد الملفين مفقودًا أو تعذرت قراءته، لا يرسل النظام نصف تقرير. بل يرسل تنبيهًا يشرح بالضبط ما المشكلة، ليصلحها الفريق ويثق أن كل تقرير يصله كامل.',
      image: cg3
    },
    {
      heading: 'النتيجة',
      body:
        'الوكالة تعرف كل ليلة أن كل مقدم رعاية موجود وبخير، دون أن يسهر أحد للتحقق. المشكلات تُكتشف في دقائق وليس في الصباح. والالتزام يُقاس بعدل وشفافية، ويحصل مقدمو الرعاية على تقدير يومي لالتزامهم. ويقرأ المدير تقريرًا واحدًا واضحًا بدلًا من التنقيب في الملاحظات.\n\nعمل كان يعتمد على الذاكرة والحظ صار يعمل وحده، كل ليلة.'
    }
  ]
};

function CaregiversMonitoring() {
  return (
    <ProjectLayout
      image={image}
      heroLabel="N8N × GOTO × TWILIO · AUTOMATION"
      stack={['n8n', 'SwyftOps', 'GoTo SMS', 'Twilio', 'OpenAI', 'Google Sheets', 'Gmail']}
      content={{ en, ar }}
    />
  );
}

export default CaregiversMonitoring;
