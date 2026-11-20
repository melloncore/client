export const locales = ["en", "es", "fr", "ar", "pt", "de", "zh"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

// Text direction per locale: set <html dir={dir(locale)} lang={locale}>
export const rtlLocales: readonly Locale[] = ["ar"];
export const dir = (l: Locale): "ltr" | "rtl" => (rtlLocales.includes(l) ? "rtl" : "ltr");

// Names for a language switcher (each shown in its own language)
export const localeNames: Record<Locale, string> = {
  en: "English", es: "Español", fr: "Français", ar: "العربية", pt: "Português", de: "Deutsch", zh: "简体中文",
};

type L<T> = Record<Locale, T>;

export interface Mock { title: string; kpis: [string, string][]; rows: [string, string][]; bars: number[] }

export type CategoryId = "software" | "hardware";
export type GroupId = "platforms" | "engineering" | "devices" | "network" | "infrastructure";

export interface Group { id: GroupId; label: L<string> }
export interface Category { id: CategoryId; label: L<string>; intro: L<string>; groups: Group[] }

export interface Product {
  slug: string; category: CategoryId; group: GroupId; hex: string; partner: boolean;
  flagship?: boolean;               // flagship products have their own detail page
  name: L<string>; short: L<string>;
  tagline?: L<string>; blurb?: L<string>; features?: L<string[]>; mock?: Mock; // flagship only
}

// Display order = array order. Categories -> groups -> products.
export const categories: Category[] = [
  {
    id: "software",
    label: { en: "Software", es: "Software", fr: "Logiciels", ar: "البرمجيات", pt: "Software", de: "Software", zh: "软件" },
    intro: {
      en: "Business platforms and custom engineering, built and run by one team.",
      es: "Plataformas de negocio e ingeniería a medida, creadas y operadas por un solo equipo.",
      fr: "Plateformes métier et ingénierie sur mesure, conçues et exploitées par une seule équipe.",
      ar: "منصات أعمال وهندسة مخصصة، يبنيها ويشغّلها فريق واحد.",
      pt: "Plataformas de negócio e engenharia sob medida, criadas e operadas por uma única equipe.",
      de: "Business-Plattformen und individuelle Entwicklung – von einem Team gebaut und betrieben.",
      zh: "业务平台与定制开发，由同一团队构建并运营。",
    },
    groups: [
      { id: "platforms", label: { en: "Business platforms", es: "Plataformas de negocio", fr: "Plateformes métier", ar: "منصات الأعمال", pt: "Plataformas de negócio", de: "Business-Plattformen", zh: "业务平台" } },
      { id: "engineering", label: { en: "Build & automate", es: "Desarrollo y automatización", fr: "Développement et automatisation", ar: "البناء والأتمتة", pt: "Desenvolvimento e automação", de: "Entwickeln & Automatisieren", zh: "开发与自动化" } },
    ],
  },
  {
    id: "hardware",
    label: { en: "Hardware", es: "Hardware", fr: "Matériel", ar: "الأجهزة", pt: "Hardware", de: "Hardware", zh: "硬件" },
    intro: {
      en: "Everything your team needs to work, connect and stay secure.",
      es: "Todo lo que tu equipo necesita para trabajar, conectarse y estar protegido.",
      fr: "Tout ce dont votre équipe a besoin pour travailler, se connecter et rester protégée.",
      ar: "كل ما يحتاجه فريقك للعمل والاتصال والبقاء محميًا.",
      pt: "Tudo o que sua equipe precisa para trabalhar, se conectar e se manter protegida.",
      de: "Alles, was Ihr Team zum Arbeiten, Vernetzen und Absichern braucht.",
      zh: "团队工作、联网与保障安全所需的一切。",
    },
    groups: [
      { id: "devices", label: { en: "Computing & devices", es: "Equipos y dispositivos", fr: "Informatique et appareils", ar: "الحوسبة والأجهزة", pt: "Computação e dispositivos", de: "Computer & Geräte", zh: "计算设备" } },
      { id: "network", label: { en: "Network & security", es: "Redes y seguridad", fr: "Réseau et sécurité", ar: "الشبكات والأمان", pt: "Rede e segurança", de: "Netzwerk & Sicherheit", zh: "网络与安全" } },
      { id: "infrastructure", label: { en: "Servers & infrastructure", es: "Servidores e infraestructura", fr: "Serveurs et infrastructure", ar: "الخوادم والبنية التحتية", pt: "Servidores e infraestrutura", de: "Server & Infrastruktur", zh: "服务器与基础设施" } },
    ],
  },
];

export const products: Product[] = [
  // ───────────── SOFTWARE · Business platforms ─────────────
  {
    slug: "crm", category: "software", group: "platforms", hex: "#ff6a3d", partner: false, flagship: true,
    name: { en: "CRM", es: "CRM", fr: "CRM", ar: "CRM", pt: "CRM", de: "CRM", zh: "CRM" },
    tagline: {
      en: "Sales that stay ahead.",
      es: "Ventas que van un paso adelante.",
      fr: "Des ventes toujours en avance.",
      ar: "مبيعات تسبق الجميع بخطوة.",
      pt: "Vendas sempre um passo à frente.",
      de: "Vertrieb, der immer einen Schritt voraus ist.",
      zh: "始终领先一步的销售。",
    },
    blurb: {
      en: "Mellon Strata Core Intelligence agents run the follow-up. AI is included in the license, with no add-on modules and no usage fees.",
      es: "Los agentes de Mellon Strata Core Intelligence se ocupan del seguimiento. La IA está incluida en la licencia, sin módulos extra ni costos por uso.",
      fr: "Les agents Mellon Strata Core Intelligence assurent le suivi. L'IA est incluse dans la licence, sans modules supplémentaires ni frais d'utilisation.",
      ar: "يتولى وكلاء Mellon Strata Core Intelligence المتابعة. الذكاء الاصطناعي مشمول في الترخيص، دون وحدات إضافية ودون رسوم استخدام.",
      pt: "Os agentes da Mellon Strata Core Intelligence cuidam do acompanhamento. A IA está incluída na licença, sem módulos extras nem taxas de uso.",
      de: "Die Agenten von Mellon Strata Core Intelligence übernehmen das Follow-up. KI ist in der Lizenz enthalten – ohne Zusatzmodule und ohne Nutzungsgebühren.",
      zh: "Mellon Strata Core Intelligence 智能体负责跟进。AI 已包含在许可中，无需附加模块，也无使用费。",
    },
    short: {
      en: "Sales, with AI included in the license",
      es: "Ventas, con IA incluida en la licencia",
      fr: "Ventes, avec l'IA incluse dans la licence",
      ar: "المبيعات، مع الذكاء الاصطناعي ضمن الترخيص",
      pt: "Vendas, com IA incluída na licença",
      de: "Vertrieb, mit KI in der Lizenz enthalten",
      zh: "销售，许可已包含 AI",
    },
    features: {
      en: ["AI copilot", "Automations", "Pipeline & forecast", "Lead scoring", "AI proposals", "Integrations"],
      es: ["Copiloto de IA", "Automatizaciones", "Pipeline y pronóstico", "Calificación de leads", "Propuestas con IA", "Integraciones"],
      fr: ["Copilote IA", "Automatisations", "Pipeline et prévisions", "Scoring des leads", "Propositions par IA", "Intégrations"],
      ar: ["مساعد ذكاء اصطناعي", "الأتمتة", "خط المبيعات والتوقعات", "تقييم العملاء المحتملين", "عروض بالذكاء الاصطناعي", "التكاملات"],
      pt: ["Copiloto de IA", "Automações", "Pipeline e previsão", "Pontuação de leads", "Propostas com IA", "Integrações"],
      de: ["KI-Copilot", "Automatisierungen", "Pipeline & Prognose", "Lead-Scoring", "KI-Angebote", "Integrationen"],
      zh: ["AI 副驾驶", "自动化", "销售管道与预测", "线索评分", "AI 方案书", "集成"],
    },
    mock: { title: "Opportunity pipeline", kpis: [["Proposal", "$113k"], ["Negotiation", "$61k"], ["Won", "$32k"]], rows: [["Northwind renewal", "$58k"], ["Acme expansion", "$44k"], ["Globex pilot", "$22k"], ["Initech upgrade", "$14k"]], bars: [3, 5, 4, 7, 6, 9] },
  },
  {
    slug: "erp", category: "software", group: "platforms", hex: "#ffb020", partner: true, flagship: true,
    name: { en: "ERP", es: "ERP", fr: "ERP", ar: "ERP", pt: "ERP", de: "ERP", zh: "ERP" },
    tagline: {
      en: "Cloud ERP with local e-invoicing built in.",
      es: "ERP en la nube con facturación electrónica local.",
      fr: "ERP cloud avec facturation électronique locale intégrée.",
      ar: "نظام ERP سحابي مع الفوترة الإلكترونية المحلية مدمجة.",
      pt: "ERP na nuvem com nota fiscal eletrônica local integrada.",
      de: "Cloud-ERP mit integrierter lokaler E-Rechnung.",
      zh: "内置本地电子发票的云 ERP。",
    },
    blurb: {
      en: "Accounting, purchasing, inventory and manufacturing working from the same data.",
      es: "Contabilidad, compras, stock y producción trabajando sobre los mismos datos.",
      fr: "Comptabilité, achats, stocks et production, sur les mêmes données.",
      ar: "المحاسبة والمشتريات والمخزون والتصنيع، تعمل جميعها على البيانات نفسها.",
      pt: "Contabilidade, compras, estoque e produção trabalhando sobre os mesmos dados.",
      de: "Buchhaltung, Einkauf, Lager und Fertigung arbeiten auf denselben Daten.",
      zh: "会计、采购、库存和生产，基于同一份数据协同运作。",
    },
    short: {
      en: "Cloud ERP with e-invoicing",
      es: "ERP en la nube con facturación electrónica",
      fr: "ERP cloud avec facturation électronique",
      ar: "ERP سحابي مع الفوترة الإلكترونية",
      pt: "ERP na nuvem com faturamento eletrônico",
      de: "Cloud-ERP mit E-Rechnung",
      zh: "支持电子发票的云 ERP",
    },
    features: {
      en: ["Finance & accounting", "Invoicing", "Purchasing", "Inventory", "Manufacturing", "Capex", "Promotions"],
      es: ["Finanzas y contabilidad", "Facturación", "Compras", "Inventario", "Producción", "Activos fijos", "Promociones"],
      fr: ["Finance et comptabilité", "Facturation", "Achats", "Stocks", "Production", "Immobilisations", "Promotions"],
      ar: ["المالية والمحاسبة", "الفوترة", "المشتريات", "المخزون", "التصنيع", "الأصول الرأسمالية", "العروض الترويجية"],
      pt: ["Finanças e contabilidade", "Faturamento", "Compras", "Estoque", "Produção", "Ativo imobilizado", "Promoções"],
      de: ["Finanzen & Buchhaltung", "Fakturierung", "Einkauf", "Lager", "Fertigung", "Anlagen", "Aktionen"],
      zh: ["财务与会计", "开票", "采购", "库存", "生产制造", "固定资产", "促销"],
    },
    mock: { title: "Supplier invoices", kpis: [["Open", "$12.4k"], ["Due soon", "$3.1k"], ["Paid", "$88k"]], rows: [["Delta Logistics", "$4.2k"], ["Orion Packaging", "$2.8k"], ["Baltic Metals", "$3.3k"], ["Nimbus Cloud", "$2.1k"]], bars: [5, 3, 7, 4, 9, 6] },
  },
  {
    slug: "hr", category: "software", group: "platforms", hex: "#4f7bff", partner: true, flagship: true,
    name: { en: "HR", es: "RR. HH.", fr: "RH", ar: "الموارد البشرية", pt: "RH", de: "HR", zh: "人力资源" },
    tagline: {
      en: "Payroll and people management, on one platform.",
      es: "Nómina y gestión de personas, en una plataforma.",
      fr: "Paie et gestion des personnes, sur une seule plateforme.",
      ar: "الرواتب وإدارة الأفراد، على منصة واحدة.",
      pt: "Folha de pagamento e gestão de pessoas, em uma só plataforma.",
      de: "Lohnabrechnung und Personalmanagement auf einer Plattform.",
      zh: "薪酬与人员管理，一个平台。",
    },
    blurb: {
      en: "Records, time tracking, recruiting and payroll, with AI support for HR teams.",
      es: "Legajos, asistencia, selección y nómina, con soporte de IA para equipos de RR. HH.",
      fr: "Dossiers du personnel, gestion des temps, recrutement et paie, avec un support IA pour les équipes RH.",
      ar: "ملفات الموظفين والحضور والتوظيف والرواتب، مع دعم الذكاء الاصطناعي لفرق الموارد البشرية.",
      pt: "Cadastros, controle de ponto, recrutamento e folha de pagamento, com apoio de IA para equipes de RH.",
      de: "Personalakten, Zeiterfassung, Recruiting und Lohnabrechnung – mit KI-Unterstützung für HR-Teams.",
      zh: "员工档案、考勤、招聘与薪酬，并为人力资源团队提供 AI 支持。",
    },
    short: {
      en: "Payroll and people management",
      es: "Nómina y gestión de personas",
      fr: "Paie et gestion des personnes",
      ar: "الرواتب وإدارة الأفراد",
      pt: "Folha de pagamento e gestão de pessoas",
      de: "Lohnabrechnung und Personalmanagement",
      zh: "薪酬与人员管理",
    },
    features: {
      en: ["Workforce records", "People admin", "Time & attendance", "Recruiting", "Engagement", "Payroll processing"],
      es: ["Legajos", "Administración de personal", "Asistencia", "Selección", "Clima laboral", "Liquidación de sueldos"],
      fr: ["Dossiers du personnel", "Administration du personnel", "Temps et présence", "Recrutement", "Engagement", "Traitement de la paie"],
      ar: ["ملفات القوى العاملة", "شؤون الموظفين", "الحضور والانصراف", "التوظيف", "مشاركة الموظفين", "معالجة الرواتب"],
      pt: ["Cadastro de colaboradores", "Administração de pessoal", "Ponto e frequência", "Recrutamento", "Clima organizacional", "Processamento da folha"],
      de: ["Personalakten", "Personaladministration", "Zeit & Anwesenheit", "Recruiting", "Mitarbeiterengagement", "Lohnabrechnung"],
      zh: ["员工档案", "人事管理", "考勤管理", "招聘", "员工敬业度", "薪资处理"],
    },
    mock: { title: "Payroll run · September 2026", kpis: [["Employees", "1,248"], ["Gross", "$2.84M"], ["Net", "$2.21M"]], rows: [["Contracts validated", "100%"], ["Overtime reviewed", "98%"], ["Deductions", "94%"], ["Bank file", "Ready"]], bars: [6, 6, 7, 7, 8, 8] },
  },

  // ───────────── SOFTWARE · Build & automate ─────────────
  {
    slug: "web-development", category: "software", group: "engineering", hex: "#8b5cf6", partner: false,
    name: { en: "Web Development", es: "Desarrollo web", fr: "Développement web", ar: "تطوير الويب", pt: "Desenvolvimento web", de: "Webentwicklung", zh: "网站开发" },
    short: {
      en: "Custom websites and web applications built for your business",
      es: "Sitios y aplicaciones web a medida para tu negocio",
      fr: "Sites et applications web sur mesure pour votre entreprise",
      ar: "مواقع وتطبيقات ويب مخصصة لأعمالك",
      pt: "Sites e aplicações web sob medida para o seu negócio",
      de: "Maßgeschneiderte Websites und Webanwendungen für Ihr Unternehmen",
      zh: "为您的业务量身定制的网站与 Web 应用",
    },
  },
  {
    slug: "mobile-apps", category: "software", group: "engineering", hex: "#8b5cf6", partner: false,
    name: { en: "Mobile App Development", es: "Desarrollo de apps móviles", fr: "Développement d'applications mobiles", ar: "تطوير تطبيقات الجوال", pt: "Desenvolvimento de apps mobile", de: "Mobile-App-Entwicklung", zh: "移动应用开发" },
    short: {
      en: "Custom mobile apps built for your business",
      es: "Apps móviles a medida para tu negocio",
      fr: "Applications mobiles sur mesure pour votre entreprise",
      ar: "تطبيقات جوال مخصصة لأعمالك",
      pt: "Apps mobile sob medida para o seu negócio",
      de: "Maßgeschneiderte Mobile-Apps für Ihr Unternehmen",
      zh: "为您的业务量身定制的移动应用",
    },
  },
  {
    slug: "ai-automation", category: "software", group: "engineering", hex: "#8b5cf6", partner: false,
    name: { en: "AI Training & Automation", es: "Entrenamiento y automatización de IA", fr: "Entraînement et automatisation IA", ar: "تدريب نماذج الذكاء الاصطناعي وأتمتتها", pt: "Treinamento e automação de IA", de: "KI-Training & Automatisierung", zh: "AI 训练与自动化" },
    short: {
      en: "Train, deploy and automate AI models on your own data",
      es: "Entrena, despliega y automatiza modelos de IA con tus propios datos",
      fr: "Entraînez, déployez et automatisez des modèles d'IA sur vos propres données",
      ar: "درّب نماذج الذكاء الاصطناعي وانشرها وأتمتها على بياناتك الخاصة",
      pt: "Treine, implante e automatize modelos de IA com seus próprios dados",
      de: "KI-Modelle mit Ihren eigenen Daten trainieren, bereitstellen und automatisieren",
      zh: "基于您自己的数据训练、部署并自动化 AI 模型",
    },
  },
  {
    slug: "camunda", category: "software", group: "engineering", hex: "#8b5cf6", partner: false,
    name: { en: "Process Automation with Camunda", es: "Procesos de negocio con Camunda", fr: "Processus métier avec Camunda", ar: "عمليات الأعمال باستخدام Camunda", pt: "Processos de negócio com Camunda", de: "Geschäftsprozesse mit Camunda", zh: "基于 Camunda 的业务流程" },
    short: {
      en: "Design, model and run business processes on Camunda",
      es: "Diseña, modela y ejecuta procesos de negocio en Camunda",
      fr: "Concevez, modélisez et exécutez vos processus métier sur Camunda",
      ar: "صمّم عمليات الأعمال وانمذجها وشغّلها على Camunda",
      pt: "Projete, modele e execute processos de negócio no Camunda",
      de: "Geschäftsprozesse mit Camunda entwerfen, modellieren und ausführen",
      zh: "在 Camunda 上设计、建模并运行业务流程",
    },
  },
  {
    slug: "devops", category: "software", group: "engineering", hex: "#8b5cf6", partner: false,
    name: { en: "DevOps Services", es: "Servicios DevOps", fr: "Services DevOps", ar: "خدمات DevOps", pt: "Serviços de DevOps", de: "DevOps-Services", zh: "DevOps 服务" },
    short: {
      en: "CI/CD, cloud infrastructure and monitoring for reliable releases",
      es: "CI/CD, infraestructura en la nube y monitoreo para lanzamientos confiables",
      fr: "CI/CD, infrastructure cloud et supervision pour des livraisons fiables",
      ar: "التكامل والنشر المستمر والبنية السحابية والمراقبة لإصدارات موثوقة",
      pt: "CI/CD, infraestrutura em nuvem e monitoramento para entregas confiáveis",
      de: "CI/CD, Cloud-Infrastruktur und Monitoring für zuverlässige Releases",
      zh: "CI/CD、云基础设施与监控，保障稳定发布",
    },
  },

  // ───────────── HARDWARE · Computing & devices ─────────────
  {
    slug: "laptops-desktops", category: "hardware", group: "devices", hex: "#06b6d4", partner: false,
    name: { en: "Laptops & Desktops", es: "Laptops y computadoras de escritorio", fr: "Ordinateurs portables et de bureau", ar: "أجهزة الكمبيوتر المحمولة والمكتبية", pt: "Notebooks e desktops", de: "Laptops & Desktop-PCs", zh: "笔记本与台式电脑" },
    short: {
      en: "Business-grade laptops and desktops for every team",
      es: "Laptops y equipos de escritorio empresariales para cada equipo",
      fr: "Ordinateurs portables et de bureau professionnels pour chaque équipe",
      ar: "أجهزة محمولة ومكتبية للأعمال لكل فريق",
      pt: "Notebooks e desktops corporativos para cada equipe",
      de: "Business-Laptops und -Desktops für jedes Team",
      zh: "面向每个团队的商用笔记本与台式机",
    },
  },
  {
    slug: "workstations", category: "hardware", group: "devices", hex: "#06b6d4", partner: false,
    name: { en: "Workstations", es: "Estaciones de trabajo", fr: "Stations de travail", ar: "محطات العمل", pt: "Workstations", de: "Workstations", zh: "工作站" },
    short: {
      en: "High-performance workstations for engineering, design and data work",
      es: "Estaciones de trabajo de alto rendimiento para ingeniería, diseño y datos",
      fr: "Stations de travail haute performance pour l'ingénierie, le design et les données",
      ar: "محطات عمل عالية الأداء للهندسة والتصميم والبيانات",
      pt: "Workstations de alto desempenho para engenharia, design e dados",
      de: "Leistungsstarke Workstations für Entwicklung, Design und Datenarbeit",
      zh: "面向工程、设计与数据工作的高性能工作站",
    },
  },
  {
    slug: "tablets-phones", category: "hardware", group: "devices", hex: "#06b6d4", partner: false,
    name: { en: "Tablets & Business Phones", es: "Tablets y teléfonos empresariales", fr: "Tablettes et téléphones professionnels", ar: "الأجهزة اللوحية وهواتف الأعمال", pt: "Tablets e celulares corporativos", de: "Tablets & Business-Smartphones", zh: "平板与商务手机" },
    short: {
      en: "Tablets and phones for field teams, sales and management",
      es: "Tablets y teléfonos para equipos de campo, ventas y gerencia",
      fr: "Tablettes et téléphones pour les équipes terrain, commerciales et la direction",
      ar: "أجهزة لوحية وهواتف لفرق الميدان والمبيعات والإدارة",
      pt: "Tablets e celulares para equipes de campo, vendas e gestão",
      de: "Tablets und Smartphones für Außendienst, Vertrieb und Management",
      zh: "面向外勤、销售与管理团队的平板和手机",
    },
  },
  {
    slug: "peripherals-printers", category: "hardware", group: "devices", hex: "#06b6d4", partner: false,
    name: { en: "Peripherals & Printers", es: "Periféricos e impresoras", fr: "Périphériques et imprimantes", ar: "الملحقات والطابعات", pt: "Periféricos e impressoras", de: "Peripherie & Drucker", zh: "外设与打印机" },
    short: {
      en: "Keyboards, mice, headsets, webcams, scanners and business printers",
      es: "Teclados, ratones, auriculares, webcams, escáneres e impresoras empresariales",
      fr: "Claviers, souris, casques, webcams, scanners et imprimantes professionnelles",
      ar: "لوحات المفاتيح والفأرات وسماعات الرأس وكاميرات الويب والماسحات وطابعات الأعمال",
      pt: "Teclados, mouses, headsets, webcams, scanners e impressoras corporativas",
      de: "Tastaturen, Mäuse, Headsets, Webcams, Scanner und Business-Drucker",
      zh: "键盘、鼠标、耳机、网络摄像头、扫描仪与商用打印机",
    },
  },

  // ───────────── HARDWARE · Network & security ─────────────
  {
    slug: "networking", category: "hardware", group: "network", hex: "#14b8a6", partner: false,
    name: { en: "Routers, Switches & Access Points", es: "Routers, switches y puntos de acceso", fr: "Routeurs, commutateurs et points d'accès", ar: "أجهزة التوجيه والمبدّلات ونقاط الوصول", pt: "Roteadores, switches e access points", de: "Router, Switches & Access Points", zh: "路由器、交换机与无线接入点" },
    short: {
      en: "The wired and wireless backbone for your office",
      es: "La base cableada e inalámbrica de tu oficina",
      fr: "L'ossature filaire et sans fil de votre bureau",
      ar: "العمود الفقري السلكي واللاسلكي لمكتبك",
      pt: "A base cabeada e sem fio do seu escritório",
      de: "Das kabelgebundene und drahtlose Rückgrat Ihres Büros",
      zh: "办公室的有线与无线网络骨干",
    },
  },
  {
    slug: "security-cabling", category: "hardware", group: "network", hex: "#14b8a6", partner: false,
    name: { en: "Security Appliances & Structured Cabling", es: "Equipos de seguridad y cableado estructurado", fr: "Équipements de sécurité et câblage structuré", ar: "أجهزة الأمان والكابلات المهيكلة", pt: "Appliances de segurança e cabeamento estruturado", de: "Security-Appliances & strukturierte Verkabelung", zh: "安全设备与结构化布线" },
    short: {
      en: "Security appliances, patch panels and structured Ethernet cabling",
      es: "Equipos de seguridad, paneles de parcheo y cableado Ethernet estructurado",
      fr: "Équipements de sécurité, panneaux de brassage et câblage Ethernet structuré",
      ar: "أجهزة الأمان ولوحات التوصيل وكابلات الإيثرنت المهيكلة",
      pt: "Appliances de segurança, patch panels e cabeamento Ethernet estruturado",
      de: "Security-Appliances, Patchpanels und strukturierte Ethernet-Verkabelung",
      zh: "安全设备、配线架与结构化以太网布线",
    },
  },
  {
    slug: "surveillance", category: "hardware", group: "network", hex: "#14b8a6", partner: false,
    name: { en: "CCTV & Surveillance", es: "CCTV y videovigilancia", fr: "Vidéosurveillance", ar: "كاميرات المراقبة", pt: "CFTV e videovigilância", de: "CCTV & Videoüberwachung", zh: "监控与安防摄像" },
    short: {
      en: "Cameras, CCTV and surveillance gadgets to protect your premises",
      es: "Cámaras, CCTV y dispositivos de vigilancia para proteger tus instalaciones",
      fr: "Caméras, CCTV et dispositifs de surveillance pour protéger vos locaux",
      ar: "كاميرات ودوائر تلفزيونية مغلقة وأجهزة مراقبة لحماية منشآتك",
      pt: "Câmeras, CFTV e dispositivos de vigilância para proteger suas instalações",
      de: "Kameras, CCTV und Überwachungstechnik zum Schutz Ihrer Räumlichkeiten",
      zh: "摄像头、CCTV 与监控设备，保护您的场所",
    },
  },

  // ───────────── HARDWARE · Servers & infrastructure ─────────────
  {
    slug: "servers", category: "hardware", group: "infrastructure", hex: "#64748b", partner: false,
    name: { en: "Server Machines", es: "Servidores", fr: "Serveurs", ar: "الخوادم", pt: "Servidores", de: "Server", zh: "服务器" },
    short: {
      en: "On-site servers for file sharing, local applications and databases",
      es: "Servidores locales para compartir archivos, aplicaciones locales y bases de datos",
      fr: "Serveurs sur site pour le partage de fichiers, les applications locales et les bases de données",
      ar: "خوادم محلية لمشاركة الملفات والتطبيقات المحلية وقواعد البيانات",
      pt: "Servidores locais para compartilhamento de arquivos, aplicações locais e bancos de dados",
      de: "Lokale Server für Dateifreigabe, lokale Anwendungen und Datenbanken",
      zh: "用于文件共享、本地应用与数据库的本地服务器",
    },
  },
  {
    slug: "storage", category: "hardware", group: "infrastructure", hex: "#64748b", partner: false,
    name: { en: "External Drives & SSDs", es: "Discos externos y SSD", fr: "Disques externes et SSD", ar: "الأقراص الخارجية وأقراص SSD", pt: "HDs externos e SSDs", de: "Externe Laufwerke & SSDs", zh: "外置硬盘与固态硬盘" },
    short: {
      en: "Fast, reliable storage for backups and everyday data",
      es: "Almacenamiento rápido y confiable para copias de seguridad y datos diarios",
      fr: "Stockage rapide et fiable pour les sauvegardes et les données courantes",
      ar: "تخزين سريع وموثوق للنسخ الاحتياطي والبيانات اليومية",
      pt: "Armazenamento rápido e confiável para backups e dados do dia a dia",
      de: "Schneller, zuverlässiger Speicher für Backups und Alltagsdaten",
      zh: "为备份与日常数据提供快速可靠的存储",
    },
  },
  {
    slug: "ups", category: "hardware", group: "infrastructure", hex: "#64748b", partner: false,
    name: { en: "UPS & Power Protection", es: "UPS y protección eléctrica", fr: "Onduleurs et protection électrique", ar: "أجهزة UPS وحماية الطاقة", pt: "Nobreaks e proteção de energia", de: "USV & Stromschutz", zh: "UPS 与电源保护" },
    short: {
      en: "Backup power that keeps servers and networks running through outages",
      es: "Respaldo eléctrico que mantiene servidores y redes operando durante cortes",
      fr: "Alimentation de secours pour maintenir serveurs et réseaux en service pendant les coupures",
      ar: "طاقة احتياطية تُبقي الخوادم والشبكات تعمل أثناء انقطاع الكهرباء",
      pt: "Energia de backup que mantém servidores e redes funcionando durante quedas",
      de: "Notstrom, der Server und Netzwerke bei Ausfällen am Laufen hält",
      zh: "停电时保持服务器与网络持续运行的备用电源",
    },
  },
];

// Helpers for rendering the catalog
export const productsByCategory = (c: CategoryId) => products.filter((p) => p.category === c);
export const productsByGroup = (g: GroupId) => products.filter((p) => p.group === g);
export const flagshipProducts = products.filter((p) => p.flagship);

export const offices = [
  { city: "Lagos", country: "Nigeria", tz: "Africa/Lagos", lat: 6.5, lon: 3.4 },
  { city: "London", country: "United Kingdom", tz: "Europe/London", lat: 51.5, lon: -0.1 },
  { city: "New York", country: "United States", tz: "America/New_York", lat: 40.7, lon: -74 },
  { city: "Dubai", country: "UAE", tz: "Asia/Dubai", lat: 25.2, lon: 55.3 },
];

const en = {
  brand: "Mellon Strata Core",
  nav: { products: "Products", intelligence: "Intelligence", service: "Services", blog: "Blog", contact: "Contact" },
  side: ["Start", "Products", "Intelligence", "Principle", "Numbers", "World", "Portfolio", "Contact"],
  demo: "Get in touch",
  menu: "Menu",
  hero: {
    eyebrow: "IT consulting & solutions",
    title: "Technology for the toughest business problems.",
    text: "Mellon Strata Core is an IT company providing consulting and solutions geared to solving some of the most challenging business problems, across software and hardware.",
    explore: "Explore what we do", scroll: "Explore", meta: "Since 2006 · 500+ clients · 4 countries",
  },
  about: {
    eyebrow: "About Mellon Strata Core", title: "IT consulting and solutions for challenging business problems.",
    text: "Mellon Strata Core is an Information Technology (IT) company providing consulting and solutions geared to solving some of the most challenging business problems.",
    peopleTitle: "Our people", peopleText: "Relationship managers, engineers, programmers and project managers with the highest professional qualifications and significant local and international exposure.",
    industriesTitle: "Industry expertise", industriesText: "We combine a broad range of expertise with specialized knowledge of the key industries.",
    industries: ["Financial services", "Oil and gas", "Telecommunications", "Manufacturing", "Services", "Education", "Healthcare", "Government", "NGOs"],
    foot: "We have extensive experience modeling the impact of technical disruption on business.",
  },
  reveal: { a: "One intelligence.", b: "In every process." },
  products: { eyebrow: "Mellon Strata Core products", h1: "A solution for every line of business.", h2: "With its modules, connected to the same intelligence.", go: "Go to {name}", partner: "Powered by a partner" },
  intel: {
    eyebrow: "Mellon Strata Core intelligence · two planes",
    title: ["One layer of intelligence.", "Built into every", "Mellon Strata Core product."],
    p1Tag: "Available", p1Title: "Process intelligence", p1Text: "AI works inside every workflow: it automates tasks, anticipates outcomes and proposes the next step.",
    p2Tag: "Across every process", p2Title: "Operations intelligence", p2Text: "Mellon Strata Core Intelligence works across every process in every product: it creates, analyzes, suggests and executes for you.",
    chips: ["Assisted configuration", "Assisted support", "Assisted operations management", "Assisted content generation", "Assisted analytics"],
    foot: "Less time on configuration and support.",
  },
  principle: { eyebrow: "Our principle", a: "AI proposes.", b: "People decide." },
  numbers: { eyebrow: "Mellon Strata Core in numbers", values: ["2006", "500+", "4"], captions: ["Delivering IT consulting and solutions since 2006", "500+ clients over our history", "Offices in 4 countries"] },
  world: { eyebrow: "Global presence", a: "Four countries.", b: "One standard." },
  portfolio: {
    h1: "One complete portfolio.", h2: "Our own products and software powered by a partner.",
    own: "Mellon Strata Core products", partner: "Powered by a partner",
    service: "As a service", run: "We run the software.",
    steps: ["License with AI included", "Operations as a service", "Continuous evolution"],
    foot: "Less time maintaining systems, more time to grow the business.",
  },
  contact: {
    title: "Let's talk.", sub: "Let's talk results.", text: "We'll show you the impact on your own processes.", see: "See products",
    formTitle: "Let's talk about your operations", formText: "Tell us about your current setup, and we'll get back to you with something concrete, not a brochure.",
    first: "First name", last: "Last name", email: "Email", company: "Company", job: "Job title", phone: "Phone", message: "Message",
    send: "Send message", sending: "Sending…", sent: "Thanks. We'll be in touch shortly.", error: "Something went wrong. Please check the fields and try again.",
  },
  rights: "All rights reserved.",
};

const es: typeof en = {
  brand: "Mellon Strata Core",
  nav: { products: "Productos", intelligence: "Inteligencia", service: "Servicios", blog: "Blog", contact: "Contacto" },
  side: ["Inicio", "Productos", "Inteligencia", "Principio", "Números", "Mundo", "Portafolio", "Contacto"],
  demo: "Contactanos",
  menu: "Menú",
  hero: {
    eyebrow: "Consultoría y soluciones de TI",
    title: "Tecnología para los problemas de negocio más difíciles.",
    text: "Mellon Strata Core es una empresa de TI que ofrece consultoría y soluciones orientadas a resolver algunos de los problemas de negocio más complejos, en software y hardware.",
    explore: "Ver lo que hacemos", scroll: "Explorar", meta: "Desde 2006 · 500+ clientes · 4 países",
  },
  about: {
    eyebrow: "Sobre Mellon Strata Core", title: "Consultoría y soluciones de TI para problemas de negocio complejos.",
    text: "Mellon Strata Core es una empresa de Tecnologías de la Información (TI) que ofrece consultoría y soluciones orientadas a resolver algunos de los problemas de negocio más complejos.",
    peopleTitle: "Nuestro equipo", peopleText: "Gerentes de relación, ingenieros, programadores y gerentes de proyecto con la más alta calificación profesional y una amplia experiencia local e internacional.",
    industriesTitle: "Experiencia sectorial", industriesText: "Combinamos una amplia gama de conocimientos con experiencia especializada en los principales sectores.",
    industries: ["Servicios financieros", "Petróleo y gas", "Telecomunicaciones", "Manufactura", "Servicios", "Educación", "Salud", "Gobierno", "ONG"],
    foot: "Tenemos amplia experiencia en modelar el impacto de la disrupción tecnológica en los negocios.",
  },
  reveal: { a: "Una inteligencia.", b: "En cada proceso." },
  products: { eyebrow: "Productos Mellon Strata Core", h1: "Una solución para cada línea de negocio.", h2: "Con sus módulos, conectados a la misma inteligencia.", go: "Ir a {name}", partner: "Con tecnología de un socio" },
  intel: {
    eyebrow: "Inteligencia Mellon Strata Core · dos planos",
    title: ["Una capa de inteligencia.", "Integrada en cada", "producto Mellon Strata Core."],
    p1Tag: "Disponible", p1Title: "Inteligencia de procesos", p1Text: "La IA trabaja dentro de cada flujo: automatiza tareas, anticipa resultados y propone el siguiente paso.",
    p2Tag: "En cada proceso", p2Title: "Inteligencia de operaciones", p2Text: "Mellon Strata Core Intelligence funciona en cada proceso de cada producto: crea, analiza, sugiere y ejecuta por vos.",
    chips: ["Configuración asistida", "Soporte asistido", "Gestión de operaciones asistida", "Generación de contenido asistida", "Analítica asistida"],
    foot: "Menos tiempo en configuración y soporte.",
  },
  principle: { eyebrow: "Nuestro principio", a: "La IA propone.", b: "Las personas deciden." },
  numbers: { eyebrow: "Mellon Strata Core en números", values: ["2006", "500+", "4"], captions: ["Ofreciendo consultoría y soluciones de TI desde 2006", "Más de 500 clientes en nuestra historia", "Oficinas en 4 países"] },
  world: { eyebrow: "Presencia global", a: "Cuatro países.", b: "Un solo estándar." },
  portfolio: {
    h1: "Un portafolio completo.", h2: "Nuestros productos y software con tecnología de un socio.",
    own: "Productos Mellon Strata Core", partner: "Con tecnología de un socio",
    service: "Como servicio", run: "Nosotros operamos el software.",
    steps: ["Licencia con IA incluida", "Operación como servicio", "Evolución continua"],
    foot: "Menos tiempo manteniendo sistemas, más tiempo para hacer crecer el negocio.",
  },
  contact: {
    title: "Hablemos.", sub: "Hablemos de resultados.", text: "Te mostramos el impacto en tus propios procesos.", see: "Ver productos",
    formTitle: "Hablemos de tu operación", formText: "Contanos cómo trabajás hoy y te respondemos con algo concreto, no con un folleto.",
    first: "Nombre", last: "Apellido", email: "Email", company: "Empresa", job: "Cargo", phone: "Teléfono", message: "Mensaje",
    send: "Enviar mensaje", sending: "Enviando…", sent: "Gracias. Te contactaremos pronto.", error: "Algo salió mal. Revisá los campos e intentá de nuevo.",
  },
  rights: "Todos los derechos reservados.",
};

const fr: typeof en = {
  brand: "Mellon Strata Core",
  nav: { products: "Produits", intelligence: "Intelligence", service: "Services", blog: "Blog", contact: "Contact" },
  side: ["Accueil", "Produits", "Intelligence", "Principe", "Chiffres", "Monde", "Portefeuille", "Contact"],
  demo: "Nous contacter",
  menu: "Menu",
  hero: {
    eyebrow: "Conseil et solutions IT",
    title: "La technologie au service des défis les plus complexes.",
    text: "Mellon Strata Core est une entreprise informatique qui propose conseil et solutions pour résoudre certains des problèmes métier les plus complexes, en logiciels comme en matériel.",
    explore: "Découvrir nos activités", scroll: "Explorer", meta: "Depuis 2006 · 500+ clients · 4 pays",
  },
  about: {
    eyebrow: "À propos de Mellon Strata Core", title: "Conseil et solutions IT pour des problèmes métier complexes.",
    text: "Mellon Strata Core est une entreprise de technologies de l'information (IT) qui propose conseil et solutions pour résoudre certains des problèmes métier les plus complexes.",
    peopleTitle: "Nos équipes", peopleText: "Gestionnaires de la relation client, ingénieurs, développeurs et chefs de projet, dotés des plus hautes qualifications professionnelles et d'une solide expérience locale et internationale.",
    industriesTitle: "Expertise sectorielle", industriesText: "Nous associons un large éventail de compétences à une connaissance approfondie des principaux secteurs.",
    industries: ["Services financiers", "Pétrole et gaz", "Télécommunications", "Industrie manufacturière", "Services", "Éducation", "Santé", "Administration publique", "ONG"],
    foot: "Nous avons une grande expérience de la modélisation de l'impact des ruptures technologiques sur les entreprises.",
  },
  reveal: { a: "Une intelligence.", b: "Dans chaque processus." },
  products: { eyebrow: "Produits Mellon Strata Core", h1: "Une solution pour chaque métier.", h2: "Avec leurs modules, connectés à la même intelligence.", go: "Aller à {name}", partner: "Propulsé par un partenaire" },
  intel: {
    eyebrow: "Intelligence Mellon Strata Core · deux plans",
    title: ["Une couche d'intelligence.", "Intégrée à chaque", "produit Mellon Strata Core."],
    p1Tag: "Disponible", p1Title: "Intelligence des processus", p1Text: "L'IA travaille au cœur de chaque flux : elle automatise les tâches, anticipe les résultats et propose la prochaine étape.",
    p2Tag: "Sur chaque processus", p2Title: "Intelligence des opérations", p2Text: "Mellon Strata Core Intelligence agit sur chaque processus de chaque produit : elle crée, analyse, suggère et exécute pour vous.",
    chips: ["Configuration assistée", "Support assisté", "Gestion des opérations assistée", "Génération de contenu assistée", "Analytique assistée"],
    foot: "Moins de temps sur la configuration et le support.",
  },
  principle: { eyebrow: "Notre principe", a: "L'IA propose.", b: "Les personnes décident." },
  numbers: { eyebrow: "Mellon Strata Core en chiffres", values: ["2006", "500+", "4"], captions: ["Conseil et solutions IT depuis 2006", "Plus de 500 clients au fil de notre histoire", "Des bureaux dans 4 pays"] },
  world: { eyebrow: "Présence mondiale", a: "Quatre pays.", b: "Un seul standard." },
  portfolio: {
    h1: "Un portefeuille complet.", h2: "Nos propres produits et des logiciels propulsés par un partenaire.",
    own: "Produits Mellon Strata Core", partner: "Propulsé par un partenaire",
    service: "En tant que service", run: "Nous exploitons le logiciel.",
    steps: ["Licence avec IA incluse", "Exploitation en tant que service", "Évolution continue"],
    foot: "Moins de temps à maintenir les systèmes, plus de temps pour développer l'entreprise.",
  },
  contact: {
    title: "Parlons-en.", sub: "Parlons résultats.", text: "Nous vous montrons l'impact sur vos propres processus.", see: "Voir les produits",
    formTitle: "Parlons de votre activité", formText: "Dites-nous comment vous travaillez aujourd'hui, et nous reviendrons vers vous avec du concret, pas une brochure.",
    first: "Prénom", last: "Nom", email: "E-mail", company: "Entreprise", job: "Poste", phone: "Téléphone", message: "Message",
    send: "Envoyer le message", sending: "Envoi en cours…", sent: "Merci. Nous vous contacterons très vite.", error: "Une erreur s'est produite. Vérifiez les champs et réessayez.",
  },
  rights: "Tous droits réservés.",
};

const ar: typeof en = {
  brand: "Mellon Strata Core",
  nav: { products: "المنتجات", intelligence: "الذكاء", service: "الخدمات", blog: "المدونة", contact: "اتصل بنا" },
  side: ["البداية", "المنتجات", "الذكاء", "المبدأ", "الأرقام", "العالم", "المحفظة", "اتصل بنا"],
  demo: "تواصل معنا",
  menu: "القائمة",
  hero: {
    eyebrow: "استشارات وحلول تقنية المعلومات",
    title: "التقنية لأصعب تحديات الأعمال.",
    text: "Mellon Strata Core شركة تقنية معلومات تقدّم الاستشارات والحلول الموجّهة لحل بعض أصعب مشكلات الأعمال، في البرمجيات والأجهزة.",
    explore: "اكتشف ما نقدّمه", scroll: "استكشف", meta: "منذ 2006 · أكثر من 500 عميل · 4 دول",
  },
  about: {
    eyebrow: "عن Mellon Strata Core", title: "استشارات وحلول تقنية معلومات لتحديات الأعمال الصعبة.",
    text: "Mellon Strata Core شركة تقنية معلومات تقدّم الاستشارات والحلول الموجّهة لحل بعض أصعب مشكلات الأعمال.",
    peopleTitle: "فريقنا", peopleText: "مديرو علاقات ومهندسون ومبرمجون ومديرو مشاريع يتمتعون بأعلى المؤهلات المهنية وبخبرة محلية ودولية واسعة.",
    industriesTitle: "خبرة قطاعية", industriesText: "نجمع بين نطاق واسع من الخبرات ومعرفة متخصصة بالقطاعات الرئيسية.",
    industries: ["الخدمات المالية", "النفط والغاز", "الاتصالات", "التصنيع", "الخدمات", "التعليم", "الرعاية الصحية", "الحكومة", "المنظمات غير الحكومية"],
    foot: "لدينا خبرة واسعة في نمذجة أثر الاضطراب التقني على الأعمال.",
  },
  reveal: { a: "ذكاء واحد.", b: "في كل عملية." },
  products: { eyebrow: "منتجات Mellon Strata Core", h1: "حل لكل قطاع من قطاعات الأعمال.", h2: "بوحداتها، متصلة بالذكاء نفسه.", go: "انتقل إلى {name}", partner: "بدعم من شريك" },
  intel: {
    eyebrow: "ذكاء Mellon Strata Core · مستويان",
    title: ["طبقة واحدة من الذكاء.", "مدمجة في كل", "منتج من Mellon Strata Core."],
    p1Tag: "متاح", p1Title: "ذكاء العمليات", p1Text: "يعمل الذكاء الاصطناعي داخل كل سير عمل: يؤتمت المهام ويتوقع النتائج ويقترح الخطوة التالية.",
    p2Tag: "في كل عملية", p2Title: "ذكاء التشغيل", p2Text: "يعمل Mellon Strata Core Intelligence في كل عملية داخل كل منتج: ينشئ ويحلل ويقترح وينفذ نيابةً عنك.",
    chips: ["إعداد مدعوم بالذكاء الاصطناعي", "دعم فني مدعوم", "إدارة عمليات مدعومة", "إنشاء محتوى مدعوم", "تحليلات مدعومة"],
    foot: "وقت أقل في الإعداد والدعم.",
  },
  principle: { eyebrow: "مبدؤنا", a: "الذكاء الاصطناعي يقترح.", b: "والناس يقررون." },
  numbers: { eyebrow: "Mellon Strata Core بالأرقام", values: ["2006", "500+", "4"], captions: ["نقدّم استشارات وحلول تقنية المعلومات منذ عام 2006", "أكثر من 500 عميل عبر تاريخنا", "مكاتب في 4 دول"] },
  world: { eyebrow: "حضور عالمي", a: "أربع دول.", b: "معيار واحد." },
  portfolio: {
    h1: "محفظة متكاملة.", h2: "منتجاتنا الخاصة وبرمجيات بدعم من شريك.",
    own: "منتجات Mellon Strata Core", partner: "بدعم من شريك",
    service: "كخدمة", run: "نحن نشغّل البرنامج.",
    steps: ["ترخيص يشمل الذكاء الاصطناعي", "التشغيل كخدمة", "تطور مستمر"],
    foot: "وقت أقل في صيانة الأنظمة، ووقت أكثر لتنمية الأعمال.",
  },
  contact: {
    title: "لنتحدث.", sub: "لنتحدث عن النتائج.", text: "سنريك الأثر على عملياتك الخاصة.", see: "عرض المنتجات",
    formTitle: "لنتحدث عن عملياتك", formText: "أخبرنا عن وضعك الحالي، وسنعود إليك بشيء ملموس، لا بكتيّب.",
    first: "الاسم الأول", last: "اسم العائلة", email: "البريد الإلكتروني", company: "الشركة", job: "المسمى الوظيفي", phone: "الهاتف", message: "الرسالة",
    send: "إرسال الرسالة", sending: "جارٍ الإرسال…", sent: "شكرًا لك. سنتواصل معك قريبًا.", error: "حدث خطأ ما. يرجى التحقق من الحقول والمحاولة مرة أخرى.",
  },
  rights: "جميع الحقوق محفوظة.",
};

const pt: typeof en = {
  brand: "Mellon Strata Core",
  nav: { products: "Produtos", intelligence: "Inteligência", service: "Serviços", blog: "Blog", contact: "Contato" },
  side: ["Início", "Produtos", "Inteligência", "Princípio", "Números", "Mundo", "Portfólio", "Contato"],
  demo: "Fale conosco",
  menu: "Menu",
  hero: {
    eyebrow: "Consultoria e soluções de TI",
    title: "Tecnologia para os problemas de negócio mais difíceis.",
    text: "A Mellon Strata Core é uma empresa de TI que oferece consultoria e soluções voltadas a resolver alguns dos problemas de negócio mais desafiadores, em software e hardware.",
    explore: "Conheça o que fazemos", scroll: "Explorar", meta: "Desde 2006 · 500+ clientes · 4 países",
  },
  about: {
    eyebrow: "Sobre a Mellon Strata Core", title: "Consultoria e soluções de TI para problemas de negócio desafiadores.",
    text: "A Mellon Strata Core é uma empresa de Tecnologia da Informação (TI) que oferece consultoria e soluções voltadas a resolver alguns dos problemas de negócio mais desafiadores.",
    peopleTitle: "Nossa equipe", peopleText: "Gerentes de relacionamento, engenheiros, programadores e gerentes de projeto com as mais altas qualificações profissionais e ampla vivência local e internacional.",
    industriesTitle: "Experiência setorial", industriesText: "Combinamos uma ampla gama de conhecimentos com experiência especializada nos principais setores.",
    industries: ["Serviços financeiros", "Petróleo e gás", "Telecomunicações", "Manufatura", "Serviços", "Educação", "Saúde", "Governo", "ONGs"],
    foot: "Temos vasta experiência em modelar o impacto da disrupção tecnológica nos negócios.",
  },
  reveal: { a: "Uma inteligência.", b: "Em cada processo." },
  products: { eyebrow: "Produtos Mellon Strata Core", h1: "Uma solução para cada linha de negócio.", h2: "Com seus módulos, conectados à mesma inteligência.", go: "Ir para {name}", partner: "Com tecnologia de um parceiro" },
  intel: {
    eyebrow: "Inteligência Mellon Strata Core · dois planos",
    title: ["Uma camada de inteligência.", "Integrada a cada", "produto Mellon Strata Core."],
    p1Tag: "Disponível", p1Title: "Inteligência de processos", p1Text: "A IA trabalha dentro de cada fluxo: automatiza tarefas, antecipa resultados e propõe o próximo passo.",
    p2Tag: "Em cada processo", p2Title: "Inteligência de operações", p2Text: "A Mellon Strata Core Intelligence atua em cada processo de cada produto: cria, analisa, sugere e executa por você.",
    chips: ["Configuração assistida", "Suporte assistido", "Gestão de operações assistida", "Geração de conteúdo assistida", "Análises assistidas"],
    foot: "Menos tempo em configuração e suporte.",
  },
  principle: { eyebrow: "Nosso princípio", a: "A IA propõe.", b: "As pessoas decidem." },
  numbers: { eyebrow: "A Mellon Strata Core em números", values: ["2006", "500+", "4"], captions: ["Oferecendo consultoria e soluções de TI desde 2006", "Mais de 500 clientes ao longo da nossa história", "Escritórios em 4 países"] },
  world: { eyebrow: "Presença global", a: "Quatro países.", b: "Um só padrão." },
  portfolio: {
    h1: "Um portfólio completo.", h2: "Nossos produtos e software com tecnologia de um parceiro.",
    own: "Produtos Mellon Strata Core", partner: "Com tecnologia de um parceiro",
    service: "Como serviço", run: "Nós operamos o software.",
    steps: ["Licença com IA incluída", "Operação como serviço", "Evolução contínua"],
    foot: "Menos tempo mantendo sistemas, mais tempo para fazer o negócio crescer.",
  },
  contact: {
    title: "Vamos conversar.", sub: "Vamos falar de resultados.", text: "Mostramos o impacto nos seus próprios processos.", see: "Ver produtos",
    formTitle: "Vamos falar sobre a sua operação", formText: "Conte como você trabalha hoje e responderemos com algo concreto, não com um folheto.",
    first: "Nome", last: "Sobrenome", email: "E-mail", company: "Empresa", job: "Cargo", phone: "Telefone", message: "Mensagem",
    send: "Enviar mensagem", sending: "Enviando…", sent: "Obrigado. Entraremos em contato em breve.", error: "Algo deu errado. Verifique os campos e tente novamente.",
  },
  rights: "Todos os direitos reservados.",
};

const de: typeof en = {
  brand: "Mellon Strata Core",
  nav: { products: "Produkte", intelligence: "Intelligenz", service: "Leistungen", blog: "Blog", contact: "Kontakt" },
  side: ["Start", "Produkte", "Intelligenz", "Prinzip", "Zahlen", "Welt", "Portfolio", "Kontakt"],
  demo: "Kontakt aufnehmen",
  menu: "Menü",
  hero: {
    eyebrow: "IT-Beratung & Lösungen",
    title: "Technologie für die schwierigsten Geschäftsprobleme.",
    text: "Mellon Strata Core ist ein IT-Unternehmen, das Beratung und Lösungen für einige der anspruchsvollsten Geschäftsprobleme bietet – bei Software und Hardware.",
    explore: "Unser Angebot entdecken", scroll: "Entdecken", meta: "Seit 2006 · 500+ Kunden · 4 Länder",
  },
  about: {
    eyebrow: "Über Mellon Strata Core", title: "IT-Beratung und Lösungen für anspruchsvolle Geschäftsprobleme.",
    text: "Mellon Strata Core ist ein Unternehmen der Informationstechnologie (IT), das Beratung und Lösungen für einige der anspruchsvollsten Geschäftsprobleme bietet.",
    peopleTitle: "Unser Team", peopleText: "Relationship Manager, Ingenieure, Programmierer und Projektmanager mit höchsten fachlichen Qualifikationen und umfangreicher lokaler wie internationaler Erfahrung.",
    industriesTitle: "Branchenexpertise", industriesText: "Wir verbinden breites Fachwissen mit spezialisierter Kenntnis der wichtigsten Branchen.",
    industries: ["Finanzdienstleistungen", "Öl und Gas", "Telekommunikation", "Fertigung", "Dienstleistungen", "Bildung", "Gesundheitswesen", "Öffentliche Hand", "NGOs"],
    foot: "Wir verfügen über umfangreiche Erfahrung darin, die Auswirkungen technologischer Umbrüche auf Unternehmen zu modellieren.",
  },
  reveal: { a: "Eine Intelligenz.", b: "In jedem Prozess." },
  products: { eyebrow: "Mellon Strata Core-Produkte", h1: "Eine Lösung für jeden Geschäftsbereich.", h2: "Mit ihren Modulen, verbunden mit derselben Intelligenz.", go: "Zu {name}", partner: "Mit Technologie eines Partners" },
  intel: {
    eyebrow: "Mellon Strata Core Intelligence · zwei Ebenen",
    title: ["Eine Intelligenzschicht.", "Integriert in jedes", "Mellon Strata Core-Produkt."],
    p1Tag: "Verfügbar", p1Title: "Prozessintelligenz", p1Text: "KI arbeitet in jedem Workflow: Sie automatisiert Aufgaben, sieht Ergebnisse voraus und schlägt den nächsten Schritt vor.",
    p2Tag: "In jedem Prozess", p2Title: "Betriebsintelligenz", p2Text: "Mellon Strata Core Intelligence wirkt in jedem Prozess jedes Produkts: Sie erstellt, analysiert, schlägt vor und führt für Sie aus.",
    chips: ["Assistierte Konfiguration", "Assistierter Support", "Assistiertes Betriebsmanagement", "Assistierte Inhaltserstellung", "Assistierte Analytik"],
    foot: "Weniger Zeit für Konfiguration und Support.",
  },
  principle: { eyebrow: "Unser Prinzip", a: "KI schlägt vor.", b: "Menschen entscheiden." },
  numbers: { eyebrow: "Mellon Strata Core in Zahlen", values: ["2006", "500+", "4"], captions: ["IT-Beratung und Lösungen seit 2006", "Über 500 Kunden in unserer Geschichte", "Standorte in 4 Ländern"] },
  world: { eyebrow: "Globale Präsenz", a: "Vier Länder.", b: "Ein Standard." },
  portfolio: {
    h1: "Ein vollständiges Portfolio.", h2: "Unsere eigenen Produkte und Software mit Technologie eines Partners.",
    own: "Mellon Strata Core-Produkte", partner: "Mit Technologie eines Partners",
    service: "Als Service", run: "Wir betreiben die Software.",
    steps: ["Lizenz mit KI inklusive", "Betrieb als Service", "Kontinuierliche Weiterentwicklung"],
    foot: "Weniger Zeit für die Wartung von Systemen, mehr Zeit für das Wachstum des Unternehmens.",
  },
  contact: {
    title: "Sprechen wir.", sub: "Sprechen wir über Ergebnisse.", text: "Wir zeigen Ihnen die Wirkung auf Ihre eigenen Prozesse.", see: "Produkte ansehen",
    formTitle: "Sprechen wir über Ihren Betrieb", formText: "Erzählen Sie uns, wie Sie heute arbeiten – wir melden uns mit etwas Konkretem, nicht mit einer Broschüre.",
    first: "Vorname", last: "Nachname", email: "E-Mail", company: "Unternehmen", job: "Position", phone: "Telefon", message: "Nachricht",
    send: "Nachricht senden", sending: "Wird gesendet…", sent: "Danke. Wir melden uns in Kürze.", error: "Etwas ist schiefgelaufen. Bitte prüfen Sie die Felder und versuchen Sie es erneut.",
  },
  rights: "Alle Rechte vorbehalten.",
};

const zh: typeof en = {
  brand: "Mellon Strata Core",
  nav: { products: "产品", intelligence: "智能", service: "服务", blog: "博客", contact: "联系我们" },
  side: ["首页", "产品", "智能", "原则", "数据", "全球", "产品组合", "联系我们"],
  demo: "立即咨询",
  menu: "菜单",
  hero: {
    eyebrow: "IT 咨询与解决方案",
    title: "用技术攻克最棘手的业务难题。",
    text: "Mellon Strata Core 是一家信息技术（IT）公司，提供咨询与解决方案，致力于解决一些最具挑战性的业务难题，涵盖软件与硬件。",
    explore: "了解我们的业务", scroll: "探索", meta: "始于 2006 · 500+ 客户 · 4 个国家",
  },
  about: {
    eyebrow: "关于 Mellon Strata Core", title: "为复杂业务难题提供 IT 咨询与解决方案。",
    text: "Mellon Strata Core 是一家信息技术（IT）公司，提供咨询与解决方案，致力于解决一些最具挑战性的业务难题。",
    peopleTitle: "我们的团队", peopleText: "客户关系经理、工程师、程序员和项目经理，具备最高水准的专业资质，以及丰富的本地与国际经验。",
    industriesTitle: "行业专长", industriesText: "我们将广泛的专业能力与对重点行业的专业认知相结合。",
    industries: ["金融服务", "石油与天然气", "电信", "制造业", "服务业", "教育", "医疗健康", "政府", "非政府组织"],
    foot: "我们在建模技术颠覆对企业的影响方面拥有丰富经验。",
  },
  reveal: { a: "一种智能。", b: "覆盖每个流程。" },
  products: { eyebrow: "Mellon Strata Core 产品", h1: "为每条业务线提供解决方案。", h2: "各模块相互连接，共享同一套智能。", go: "前往 {name}", partner: "由合作伙伴提供技术" },
  intel: {
    eyebrow: "Mellon Strata Core 智能 · 两个层面",
    title: ["一层智能。", "内置于每款", "Mellon Strata Core 产品。"],
    p1Tag: "已上线", p1Title: "流程智能", p1Text: "AI 在每个工作流中运行：自动化任务、预判结果，并提出下一步建议。",
    p2Tag: "覆盖每个流程", p2Title: "运营智能", p2Text: "Mellon Strata Core Intelligence 覆盖每款产品的每个流程：为您创建、分析、建议并执行。",
    chips: ["辅助配置", "辅助支持", "辅助运营管理", "辅助内容生成", "辅助分析"],
    foot: "减少配置与支持所花的时间。",
  },
  principle: { eyebrow: "我们的原则", a: "AI 提出建议。", b: "由人来决定。" },
  numbers: { eyebrow: "数说 Mellon Strata Core", values: ["2006", "500+", "4"], captions: ["自 2006 年起提供 IT 咨询与解决方案", "历史上服务 500 多家客户", "在 4 个国家设有办公室"] },
  world: { eyebrow: "全球布局", a: "四个国家。", b: "一个标准。" },
  portfolio: {
    h1: "完整的产品组合。", h2: "我们自有的产品，以及由合作伙伴提供技术的软件。",
    own: "Mellon Strata Core 产品", partner: "由合作伙伴提供技术",
    service: "即服务", run: "我们负责运行软件。",
    steps: ["许可已含 AI", "运营即服务", "持续演进"],
    foot: "少花时间维护系统，多花时间发展业务。",
  },
  contact: {
    title: "聊一聊。", sub: "聊聊成果。", text: "我们将展示它对您自身流程的影响。", see: "查看产品",
    formTitle: "聊聊您的业务运营", formText: "告诉我们您目前的工作方式，我们会给您切实的方案，而不是一本宣传册。",
    first: "名", last: "姓", email: "邮箱", company: "公司", job: "职位", phone: "电话", message: "留言",
    send: "发送留言", sending: "发送中…", sent: "谢谢。我们会尽快与您联系。", error: "出错了。请检查各字段后重试。",
  },
  rights: "版权所有。",
};

export const dict: Record<Locale, typeof en> = { en, es, fr, ar, pt, de, zh };