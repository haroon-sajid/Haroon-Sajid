/* Every user-facing string in one place, in both languages.
   Non-translatable data (icons, tech names, links, images, dates in the
   Latin calendar) lives in the components and is joined by index. */

export type Lang = 'en' | 'ar';

const en = {
  dir: 'ltr',

  nav: {
    items: ['Home', 'About', 'Expertise', 'Projects', 'History', 'Education', 'Contact'],
    menu: 'Menu',
    langLabel: 'En',
    langSwitchTo: 'العربية'
  },

  hero: {
    name: 'Muhammad Haroon Sajid',
    role: 'Full Stack AI Engineer',
    taglineBefore: 'AI Automation & Full-Stack Engineer specializing in ',
    taglineHi1: 'intelligent workflow automation',
    taglineMid: ', ',
    taglineHi2: 'LLM-powered agents',
    taglineAfter: ', and scalable web applications. Transforming ideas into secure, production-ready systems.',
    downloadCv: 'Download CV',
    contactMe: 'Contact Me',

    /* Mobile hero only. The rotating phrases are the same three specialities
       named in the tagline above — said once as a list, once in rotation. */
    rotatePrefix: 'I engineer',
    rotate: ['LLM-powered agents', 'workflow automations', 'scalable web apps'],
    statusLabel: 'Available',
    locationShort: 'Lahore, PK',
    scrollLabel: 'Scroll'
  },

  about: {
    eyebrow: 'Get to know',
    titleMain: 'About',
    titleOutline: 'Me',
    vertical: 'ABOUT ME',
    badgeValue: '2+',
    badgeLabel: 'Years of<br/>Experience',
    badgeSub: 'IN AI & AUTOMATION',
    script: 'Turning ideas into production-ready AI systems.',
    introLead: "Hi, I'm ",
    introName: 'Muhammad Haroon Sajid',
    introRest: ', an AI Automation & Full-Stack Engineer with 2+ years of hands-on experience designing intelligent automation solutions and scalable web applications for startups and growing businesses.',
    para2: 'I specialize in building LLM-powered agents, smart workflow automations, and production-ready backends that connect AI services, databases, and everyday business tools into reliable pipelines that run themselves from start to finish.',
    doTitle: 'What I Do',
    doItems: [
      'AI Workflow Automation',
      'AI Agents & LLM Workflows',
      'Backend & API Development',
      'Full-Stack Web Apps',
      'System & API Integrations',
      'Cloud Deployment & DevOps'
    ]
  },

  statsEyebrow: 'By the Numbers',
  stats: [
    { value: '2+', label: 'Years Experience' },
    { value: '20+', label: 'Technologies' },
    { value: '20+', label: 'Projects Done' }
  ],

  expertise: {
    eyebrow: 'What I Do',
    titleMain: 'Exper',
    titleOutline: 'tise',
    intro: 'I build modern web applications, automate business processes, and bring AI into real products, from backend services through to deployment.',
    stackLabel: 'Tech Stack',
    areas: [
      {
        title: 'AI &',
        titleAlt: 'Automation',
        desc: 'I design intelligent automation workflows that connect AI services, business apps, and databases into systems that run unattended.'
      },
      {
        title: 'Backend',
        titleAlt: 'Development',
        desc: 'I build scalable backend services and REST APIs, designing database schemas, CRUD operations, and architectures that stay maintainable as they grow.'
      },
      {
        title: 'Frontend',
        titleAlt: 'Development',
        desc: 'I develop responsive interfaces and dashboards that connect cleanly to backend services and stay fast on every screen size.'
      },
      {
        title: 'Databases',
        titleAlt: '& Storage',
        desc: 'I model relational and document data, add caching where it counts, and run vector stores that power retrieval-augmented AI systems.'
      },
      {
        title: 'DevOps',
        titleAlt: '& Cloud',
        desc: 'I containerise applications, automate delivery through CI/CD pipelines, and deploy to cloud platforms using Git-based workflows.'
      },
      {
        title: 'Integrations',
        titleAlt: '& APIs',
        desc: 'I wire third-party platforms together with REST APIs and webhooks, so CRMs, spreadsheets, and communication tools behave as one system.'
      }
    ]
  },

  projects: {
    eyebrow: "What I've Built",
    titleMain: 'Selected',
    titleOutline: 'Projects',
    intro: 'AI automation platforms, LLM-powered products, and full-stack systems built for real businesses, each one solving a specific problem in production.',
    seeMore: 'See More Projects',
    seeLess: 'Show Less',
    items: [
      { title: 'Publisha.io', desc: 'Multi-tenant platform automating content and marketing campaigns, with AI-drafted posts routed through human approval before publishing.' },
      { title: 'Say-Vi: AI Avatar Videos', desc: 'Platform that turns one selfie into a reusable talking AI avatar: drafts the script with AI, renders a studio-quality vertical video, and publishes it straight to TikTok, Instagram, Facebook, YouTube and X in one tap.' },
      { title: 'Idolfluence', desc: 'AI-powered platform that turns a chosen niche and persona into finished marketing videos, then publishes them straight to TikTok on autopilot.' },
      { title: 'AI Inbox Management System', desc: 'n8n automation that runs a recruitment inbox end to end: leads are matched against Recruit CRM, AI drafts the reply, a human approves, and the system sends it.' },
      { title: 'Caregivers Monitoring System', desc: 'End-to-end n8n automation for overnight caregiver operations: scheduled SMS check-ins, voice-call escalation, streak scoring with a live leaderboard, and AI morning reports.' },
      { title: 'AI Email Digest Automation for Zoho Mail', desc: 'n8n automation on the Zoho Mail API that filters and AI-classifies every email, then delivers daily and weekly HTML digest reports via Zoho SMTP — every email sorted, prioritised and summarised automatically.' },
      { title: 'Color Form Automation System', desc: 'Four n8n workflows for a US painting company: scheduled jobs auto-email prefilled color forms, signed PDFs flow back into PaintScout and Google Drive, non-responders get reminders every 10 days, and every failure alerts instantly.' },
      { title: 'Programs of Study', desc: 'A custom component for a CMS-based platform built with Java, Handlebars, and LESS, helping students find their majors of interest.' },
      { title: 'Transfer Evaluation Matrix', desc: 'An interactive CSV table generator built with Java, Handlebars, and LESS, helping transfer students quickly identify eligible credits.' }
    ]
  },

  history: {
    eyebrow: "Where I've Worked",
    titleMain: 'Career',
    titleOutline: 'History',
    intro: 'Two years of building AI automation systems and full-stack applications, from backend services and REST APIs to LLM-powered agents running in production.',
    present: 'Present',
    jobs: [
      {
        role: 'AI Automation & Full-Stack Engineer',
        roleAlt: '',
        company: 'Builberg',
        location: 'Hybrid',
        date: 'Jun 2026 - Present',
        desc: 'Building AI automation workflows and LLM agents for client businesses, along with full-stack development and cloud deployment of production solutions.',
        points: [
          'Building AI automation workflows and LLM agents',
          'Full-stack development of client solutions',
          'Cloud deployment of production systems'
        ]
      },
      {
        role: 'Full-Stack AI Engineer',
        roleAlt: '',
        company: 'Camden Health System',
        location: 'Onsite',
        date: 'Sep 2025 - May 2026',
        desc: 'Developed full-stack CRM and business applications with Python, FastAPI, and React. Built AI chatbots and workflow automations integrating LLMs with LangChain and n8n, deployed on cloud platforms.',
        points: [
          'Built full-stack CRM apps with Python and React',
          'Created AI chatbots with LangChain and n8n',
          'Deployed solutions on cloud platforms'
        ]
      },
      {
        role: 'Backend Developer',
        roleAlt: '',
        company: 'Enigmatix',
        location: 'Onsite',
        date: 'May 2024 - Aug 2025',
        desc: 'Worked on backend services and REST APIs, with a focus on database design, CRUD operations, and third party API integrations for business applications.',
        points: [
          'Built backend services and REST APIs',
          'Designed database schemas and CRUD operations',
          'Integrated third-party APIs for businesses'
        ]
      },
      {
        role: 'Python Developer',
        roleAlt: 'Intern',
        company: 'Enigmatix',
        location: 'Onsite',
        date: 'Feb 2024 - Apr 2024',
        desc: 'Supported backend development with Python and built AI chatbot features using LangChain, RAG, vector databases, and prompt engineering.',
        points: [
          'Supported backend development with Python',
          'Built AI chatbot features using LangChain and RAG',
          'Worked with vector databases and prompt engineering'
        ]
      }
    ]
  },

  education: {
    eyebrow: 'Where I Studied',
    titleMain: 'Edu',
    titleOutline: 'cation',
    intro: 'A formal grounding in machine learning, NLP, and generative AI, alongside the self-directed project work that turned it into production experience.',
    items: [
      {
        degree: 'Bachelor of Science in Artificial Intelligence',
        school: 'The Islamia University of Bahawalpur',
        location: 'Bahawalpur, Pakistan',
        date: '2020 - 2024',
        desc: 'Specialized in ML, DL, NLP, and AI System Development. Developed JARVIS Desktop Assistant for FYP. Gained strong foundation in computer science and advanced AI concepts.'
      },
      {
        degree: 'Intermediate in Science',
        school: 'Punjab College, Bahawalpur Campus',
        location: 'Bahawalpur, Pakistan',
        date: '2018 - 2020',
        desc: 'Pre-Engineering focus with strong foundation in Mathematics and Physics.'
      }
    ]
  },

  contact: {
    eyebrow: 'Get In Touch',
    titleMain: 'Contact',
    titleOutline: 'Me',
    intro: "Got an automation, an AI product, or a full-stack build in mind? Tell me what you need and I'll get back to you shortly.",
    nameLabel: 'Your Name',
    namePlaceholder: "What's your name?",
    nameError: 'Please enter your name',
    emailLabel: 'Email / Phone',
    emailPlaceholder: 'How can I reach you?',
    emailError: 'Please enter your email or phone number',
    messageLabel: 'Message',
    messagePlaceholder: 'Send me any inquiries or questions',
    messageError: 'Please enter the message',
    send: 'Send'
  },

  welcome: {
    title: 'Welcome to my portfolio',
    highlight: '✨ Updating a few small things',
    body: 'Everything is ready for you to explore. Some small styling touches are still on the way. Your feedback means a lot to me.',
    explore: 'Take a look',
    feedback: 'Give feedback',
    close: 'Close'
  },

  chat: {
    open: 'Open chat',
    close: 'Close chat',
    title: "Haroon's Assistant",
    online: 'Online',
    intro: 'How would you like to connect?',
    aiTitle: 'Ask my AI assistant',
    aiDesc: 'Instant answers about my work and skills',
    waTitle: 'Chat on WhatsApp',
    waDesc: 'Talk to me directly',
    back: 'Back',
    welcome: "Hi! 👋 I'm Haroon's AI assistant. Ask me anything about his skills, projects, or experience.",
    placeholder: 'Type your message...',
    send: 'Send',
    errorReply: "Sorry — I couldn't reply just now. Please try again in a moment, or reach Haroon directly on WhatsApp below.",
    busyReply: "I'm handling a lot of conversations right now. Please try again in a few minutes — or reach Haroon directly on WhatsApp below.",
    demoCta: 'Open WhatsApp',
    bookCta: 'Book a meeting'
  },

  footer: {
    tagline: 'AI Automation & Full-Stack Engineer building LLM-powered agents, workflow automations, and production-ready web applications.',
    navigateTitle: 'Navigate',
    navigate: ['About', 'Expertise', 'Projects', 'History', 'Education', 'Contact'],
    contactTitle: 'Get In Touch',
    emailLabel: 'Email me',
    whatsappLabel: 'WhatsApp',
    locationLabel: 'Location',
    locationValue: 'Lahore, Pakistan · Remote-friendly',
    rights: 'All rights reserved.',
    creditBefore: 'Designed & built by ',
    creditName: 'Haroon Sajid',
    backToTop: 'Back to top'
  }
};

const ar: typeof en = {
  dir: 'rtl',

  nav: {
    items: ['الرئيسية', 'نبذة عني', 'خبراتي', 'أعمالي', 'مسيرتي', 'دراستي', 'تواصل معي'],
    menu: 'القائمة',
    langLabel: 'ع',
    langSwitchTo: 'English'
  },

  hero: {
    name: 'محمد هارون ساجد',
    role: 'مهندس ذكاء اصطناعي متكامل',
    taglineBefore: 'مهندس أتمتة وذكاء اصطناعي متخصص في ',
    taglineHi1: 'أتمتة سير العمل الذكية',
    taglineMid: '، و',
    taglineHi2: 'الوكلاء المدعومين بنماذج اللغة الكبيرة',
    taglineAfter: '، وتطبيقات الويب القابلة للتوسع. أحوّل الأفكار إلى أنظمة آمنة وجاهزة للإنتاج.',
    downloadCv: 'تحميل السيرة الذاتية',
    contactMe: 'تواصل معي',

    rotatePrefix: 'أبني',
    rotate: ['وكلاء بنماذج اللغة', 'أتمتة سير العمل', 'تطبيقات ويب قابلة للتوسّع'],
    statusLabel: 'متاح',
    locationShort: 'لاهور، باكستان',
    scrollLabel: 'مرّر'
  },

  about: {
    eyebrow: 'تعرّف عليّ',
    titleMain: 'نبذة',
    titleOutline: 'عني',
    // Decorative watermark stays Latin: writing-mode:vertical-rl stacks
    // glyphs individually, which breaks Arabic's connected letterforms.
    vertical: 'ABOUT ME',
    badgeValue: '2+',
    badgeLabel: 'سنوات من<br/>الخبرة',
    // Kept short so the badge keeps the same footprint as the English one
    badgeSub: 'ذكاء اصطناعي وأتمتة',
    script: 'أحوّل الأفكار إلى أنظمة ذكاء اصطناعي جاهزة للإنتاج.',
    introLead: 'مرحبًا، أنا ',
    introName: 'محمد هارون ساجد',
    introRest: '، مهندس أتمتة وذكاء اصطناعي متكامل بخبرة عملية تتجاوز عامين في تصميم حلول الأتمتة الذكية وتطبيقات الويب القابلة للتوسع للشركات الناشئة والنامية.',
    para2: 'أتخصص في بناء الوكلاء المدعومين بنماذج اللغة الكبيرة، وأتمتة سير العمل الذكية، والأنظمة الخلفية الجاهزة للإنتاج التي تربط خدمات الذكاء الاصطناعي وقواعد البيانات وأدوات الأعمال اليومية في مسارات موثوقة تعمل من تلقاء نفسها من البداية إلى النهاية.',
    doTitle: 'ما أقدّمه',
    doItems: [
      'أتمتة سير العمل بالذكاء الاصطناعي',
      'وكلاء الذكاء الاصطناعي ونماذج اللغة',
      'تطوير الأنظمة الخلفية وواجهات البرمجة',
      'تطبيقات ويب متكاملة',
      'تكامل الأنظمة وواجهات البرمجة',
      'النشر السحابي وعمليات التطوير'
    ]
  },

  statsEyebrow: 'بالأرقام',
  stats: [
    { value: '2+', label: 'سنوات خبرة' },
    { value: '20+', label: 'تقنية وأداة' },
    { value: '20+', label: 'مشروعًا منجزًا' }
  ],

  expertise: {
    eyebrow: 'ما أقدّمه',
    titleMain: 'خبرا',
    titleOutline: 'تي',
    intro: 'أبني تطبيقات ويب حديثة، وأتمتة عمليات الأعمال، وأدمج الذكاء الاصطناعي في منتجات حقيقية، من الخدمات الخلفية حتى النشر.',
    stackLabel: 'التقنيات',
    areas: [
      {
        title: 'الذكاء الاصطناعي',
        titleAlt: 'والأتمتة',
        desc: 'أصمم سير عمل أتمتة ذكية تربط خدمات الذكاء الاصطناعي وتطبيقات الأعمال وقواعد البيانات في أنظمة تعمل دون تدخل يدوي.'
      },
      {
        title: 'تطوير',
        titleAlt: 'الأنظمة الخلفية',
        desc: 'أبني خدمات خلفية قابلة للتوسع وواجهات برمجة REST، مع تصميم مخططات قواعد البيانات والعمليات والبنى التي تبقى قابلة للصيانة مع النمو.'
      },
      {
        title: 'تطوير',
        titleAlt: 'الواجهات الأمامية',
        desc: 'أطوّر واجهات ولوحات تحكم متجاوبة ترتبط بسلاسة بالخدمات الخلفية وتبقى سريعة على جميع أحجام الشاشات.'
      },
      {
        title: 'قواعد',
        titleAlt: 'البيانات',
        desc: 'أنمذج البيانات العلائقية والمستندية، وأضيف التخزين المؤقت عند الحاجة، وأدير قواعد البيانات المتجهية التي تدعم أنظمة الاسترجاع المعزز.'
      },
      {
        title: 'عمليات التطوير',
        titleAlt: 'والسحابة',
        desc: 'أحزم التطبيقات في حاويات، وأتمتة التسليم عبر مسارات CI/CD، وأنشر على المنصات السحابية باستخدام سير عمل قائم على Git.'
      },
      {
        title: 'التكاملات',
        titleAlt: 'وواجهات البرمجة',
        desc: 'أربط المنصات الخارجية معًا عبر واجهات REST وWebhooks، بحيث تعمل أنظمة إدارة العملاء والجداول وأدوات التواصل كنظام واحد.'
      }
    ]
  },

  projects: {
    eyebrow: 'ما بنيته',
    titleMain: 'أعمال',
    titleOutline: 'مختارة',
    intro: 'منصات أتمتة بالذكاء الاصطناعي، ومنتجات مدعومة بنماذج اللغة، وأنظمة متكاملة بُنيت لشركات حقيقية، كل منها يحل مشكلة محددة في بيئة الإنتاج.',
    seeMore: 'عرض المزيد من المشاريع',
    seeLess: 'عرض أقل',
    items: [
      { title: 'Publisha.io', desc: 'منصة متعددة المستأجرين لأتمتة المحتوى والحملات التسويقية: يكتب الذكاء الاصطناعي المسودات، ثم تُعتمد بشريًا قبل النشر.' },
      { title: 'Say-Vi: AI Avatar Videos', desc: 'منصة تحوّل صورة سيلفي واحدة إلى أفاتار ناطق قابل لإعادة الاستخدام: يكتب الذكاء الاصطناعي النص، ثم يُنتَج فيديو عمودي بجودة الاستوديو ويُنشر مباشرة على TikTok وInstagram وFacebook وYouTube وX بضغطة واحدة.' },
      { title: 'Idolfluence', desc: 'منصة تحوّل المجال والشخصية المختارة إلى فيديوهات تسويقية جاهزة بالذكاء الاصطناعي، ثم تنشرها مباشرة على TikTok بشكل تلقائي.' },
      { title: 'AI Inbox Management System', desc: 'أتمتة n8n تدير بريد التوظيف من البداية إلى النهاية: تُطابق العملاء مع Recruit CRM، ويصيغ الذكاء الاصطناعي الرد، ويوافق عليه إنسان، ثم يُرسل تلقائيًا.' },
      { title: 'Caregivers Monitoring System', desc: 'أتمتة متكاملة عبر n8n لعمليات الرعاية الليلية: رسائل تحقق مجدولة، وتصعيد بمكالمات صوتية، وتقييم أداء مع لوحة صدارة مباشرة، وتقارير صباحية بالذكاء الاصطناعي.' },
      { title: 'AI Email Digest Automation for Zoho Mail', desc: 'أتمتة n8n مبنية على واجهة Zoho Mail API تصفّي كل بريد وارد وتصنّفه بالذكاء الاصطناعي، ثم ترسل تقارير موجزة يومية وأسبوعية بصيغة HTML عبر Zoho SMTP — كل بريد مُرتّب ومُلخّص تلقائيًا.' },
      { title: 'Color Form Automation System', desc: 'أربعة workflows على n8n لشركة دهانات أمريكية: المشاريع المجدولة ترسل نماذج ألوان معبأة مسبقًا تلقائيًا، وملفات PDF الموقعة تعود إلى PaintScout وGoogle Drive، ومن لا يستجيب يُذكَّر كل 10 أيام، وكل فشل ينبّه فورًا.' },
      { title: 'Programs of Study', desc: 'مكوّن مخصص لمنصة قائمة على نظام إدارة محتوى، بُني باستخدام Java وHandlebars وLESS، يساعد الطلاب على إيجاد تخصصاتهم.' },
      { title: 'Transfer Evaluation Matrix', desc: 'مولّد جداول CSV تفاعلي بُني باستخدام Java وHandlebars وLESS، يساعد الطلاب المحوّلين على تحديد الساعات المعتمدة بسرعة.' }
    ]
  },

  history: {
    eyebrow: 'أين عملت',
    titleMain: 'مسيرتي',
    titleOutline: 'المهنية',
    intro: 'عامان من بناء أنظمة الأتمتة بالذكاء الاصطناعي والتطبيقات المتكاملة، من الخدمات الخلفية وواجهات REST إلى الوكلاء المدعومين بنماذج اللغة في بيئة الإنتاج.',
    present: 'حاليًا',
    jobs: [
      {
        role: 'مهندس أتمتة وذكاء اصطناعي متكامل',
        roleAlt: '',
        company: 'Builberg',
        location: 'عمل هجين',
        date: 'يونيو 2026 - حتى الآن',
        desc: 'بناء سير عمل الأتمتة بالذكاء الاصطناعي والوكلاء الأذكياء لعملاء الشركات، إلى جانب التطوير المتكامل والنشر السحابي للحلول الإنتاجية.',
        points: [
          'بناء سير عمل الأتمتة والوكلاء الأذكياء',
          'تطوير متكامل لحلول العملاء',
          'النشر السحابي للأنظمة الإنتاجية'
        ]
      },
      {
        role: 'مهندس ذكاء اصطناعي متكامل',
        roleAlt: '',
        company: 'Camden Health System',
        location: 'من المقر',
        date: 'سبتمبر 2025 - مايو 2026',
        desc: 'طوّرت تطبيقات إدارة علاقات العملاء والأعمال باستخدام Python وFastAPI وReact. وبنيت روبوتات محادثة وأتمتة سير عمل تدمج نماذج اللغة مع LangChain وn8n، ونشرتها على منصات سحابية.',
        points: [
          'بنيت تطبيقات CRM متكاملة بـ Python وReact',
          'أنشأت روبوتات محادثة مع LangChain وn8n',
          'نشرت الحلول على منصات سحابية'
        ]
      },
      {
        role: 'مطوّر أنظمة خلفية',
        roleAlt: '',
        company: 'Enigmatix',
        location: 'من المقر',
        date: 'مايو 2024 - أغسطس 2025',
        desc: 'عملت على الخدمات الخلفية وواجهات REST، مع التركيز على تصميم قواعد البيانات وعمليات المعالجة وتكامل واجهات البرمجة الخارجية لتطبيقات الأعمال.',
        points: [
          'بنيت خدمات خلفية وواجهات REST',
          'صممت قواعد البيانات وعمليات المعالجة',
          'دمجت واجهات برمجة خارجية للشركات'
        ]
      },
      {
        role: 'مطوّر Python',
        roleAlt: 'متدرب',
        company: 'Enigmatix',
        location: 'من المقر',
        date: 'فبراير 2024 - أبريل 2024',
        desc: 'دعمت تطوير الأنظمة الخلفية باستخدام Python وبنيت ميزات روبوتات المحادثة باستخدام LangChain وRAG وقواعد البيانات المتجهية وهندسة التوجيهات.',
        points: [
          'دعمت تطوير الأنظمة الخلفية باستخدام Python',
          'بنيت ميزات روبوتات المحادثة باستخدام LangChain وRAG',
          'عملت مع قواعد البيانات المتجهية وهندسة التوجيهات'
        ]
      }
    ]
  },

  education: {
    eyebrow: 'أين درست',
    titleMain: 'الدرا',
    titleOutline: 'سة',
    intro: 'أساس أكاديمي في تعلّم الآلة ومعالجة اللغة الطبيعية والذكاء الاصطناعي التوليدي، إلى جانب مشاريع ذاتية حوّلت هذا الأساس إلى خبرة إنتاجية.',
    items: [
      {
        degree: 'بكالوريوس العلوم في الذكاء الاصطناعي',
        school: 'جامعة الإسلامية في بهاولبور',
        location: 'بهاولبور، باكستان',
        date: '2020 - 2024',
        desc: 'تخصصت في تعلّم الآلة والتعلّم العميق ومعالجة اللغة الطبيعية وتطوير أنظمة الذكاء الاصطناعي. طوّرت مساعد JARVIS لسطح المكتب كمشروع تخرج، واكتسبت أساسًا قويًا في علوم الحاسب ومفاهيم الذكاء الاصطناعي المتقدمة.'
      },
      {
        degree: 'الشهادة الثانوية في العلوم',
        school: 'كلية البنجاب، فرع بهاولبور',
        location: 'بهاولبور، باكستان',
        date: '2018 - 2020',
        desc: 'مسار ما قبل الهندسة مع أساس قوي في الرياضيات والفيزياء.'
      }
    ]
  },

  contact: {
    eyebrow: 'تواصل معي',
    titleMain: 'تواصل',
    titleOutline: 'معي',
    intro: 'هل لديك فكرة أتمتة أو منتج ذكاء اصطناعي أو مشروع متكامل؟ أخبرني بما تحتاجه وسأعود إليك قريبًا.',
    nameLabel: 'اسمك',
    namePlaceholder: 'ما هو اسمك؟',
    nameError: 'يرجى إدخال اسمك',
    emailLabel: 'البريد / الهاتف',
    emailPlaceholder: 'كيف يمكنني الوصول إليك؟',
    emailError: 'يرجى إدخال بريدك الإلكتروني أو رقم هاتفك',
    messageLabel: 'الرسالة',
    messagePlaceholder: 'أرسل لي استفساراتك أو أسئلتك',
    messageError: 'يرجى إدخال الرسالة',
    send: 'إرسال'
  },

  welcome: {
    title: 'أهلاً بك في موقعي',
    highlight: '✨ يتم تحديث بعض اللمسات الصغيرة',
    body: 'كل شيء جاهز للاستكشاف، وبعض التحسينات البسيطة في الطريق. رأيك يهمني كثيرًا.',
    explore: 'تفضل بجولة',
    feedback: 'شاركني رأيك',
    close: 'إغلاق'
  },

  chat: {
    open: 'افتح المحادثة',
    close: 'إغلاق المحادثة',
    title: 'مساعد هارون',
    online: 'متصل',
    intro: 'كيف تودّ التواصل؟',
    aiTitle: 'اسأل مساعدي الذكي',
    aiDesc: 'إجابات فورية عن أعمالي ومهاراتي',
    waTitle: 'المحادثة عبر واتساب',
    waDesc: 'تحدث معي مباشرة',
    back: 'رجوع',
    welcome: 'أهلاً! 👋 أنا مساعد هارون الذكي. اسألني ما تشاء عن مهاراته ومشاريعه وخبراته.',
    placeholder: 'اكتب رسالتك...',
    send: 'إرسال',
    errorReply: 'عذرًا — تعذّر عليّ الرد الآن. حاول مرة أخرى بعد قليل، أو تواصل مع هارون مباشرة عبر واتساب أدناه.',
    busyReply: 'أستقبل عددًا كبيرًا من المحادثات حاليًا. حاول مرة أخرى بعد بضع دقائق — أو تواصل مع هارون مباشرة عبر واتساب أدناه.',
    demoCta: 'افتح واتساب',
    bookCta: 'احجز موعدًا'
  },

  footer: {
    tagline: 'مهندس أتمتة وذكاء اصطناعي متكامل، أبني وكلاء مدعومين بنماذج اللغة، وأتمتة سير العمل، وتطبيقات ويب جاهزة للإنتاج.',
    navigateTitle: 'تصفّح',
    navigate: ['نبذة عني', 'خبراتي', 'أعمالي', 'مسيرتي', 'دراستي', 'تواصل معي'],
    contactTitle: 'تواصل معي',
    emailLabel: 'راسلني',
    whatsappLabel: 'واتساب',
    locationLabel: 'الموقع',
    locationValue: 'لاهور، باكستان · متاح للعمل عن بُعد',
    rights: 'جميع الحقوق محفوظة.',
    creditBefore: 'صُمم وبُني بواسطة ',
    creditName: 'هارون ساجد',
    backToTop: 'إلى الأعلى'
  }
};

export const translations = { en, ar };
