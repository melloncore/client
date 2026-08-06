import type {
  Service,
  TeamMember,
  Testimonial,
  BlogPost,
  ProcessStep,
  ValueItem,
  Stat,
} from "@/types";

export const services: Service[] = [
  {
    slug: "product-engineering",
    title: "Product Engineering",
    shortDescription:
      "Full-stack web and mobile products built on frameworks that scale with you.",
    description:
      "We design and ship production-grade web and mobile applications end to end — from architecture and API design through to release and hand-off. Our engineers embed with your team or run as a standalone build pod, working in two-week cycles with a shippable increment at the end of every one.",
    icon: "code",
    deliverables: [
      "Architecture & technical discovery",
      "Frontend + backend implementation",
      "API design & third-party integrations",
      "Automated testing & CI/CD pipelines",
    ],
    color: "coral",
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    shortDescription:
      "Resilient, cost-aware infrastructure on AWS, GCP or Azure — provisioned as code.",
    description:
      "We design cloud environments that survive traffic spikes and audits alike. Every environment is provisioned as code, monitored from day one, and documented so your team can operate it without us in the room.",
    icon: "server",
    deliverables: [
      "Infrastructure-as-code (Terraform)",
      "CI/CD pipeline design",
      "Cost & performance audits",
      "Migration & disaster-recovery planning",
    ],
    color: "brand",
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    shortDescription:
      "Practical AI features and internal automations that remove repetitive work.",
    description:
      "We help you find the automations actually worth building, then ship them — from LLM-powered features inside your product to internal tools that cut hours of manual work down to minutes.",
    icon: "cpu",
    deliverables: [
      "LLM & RAG feature development",
      "Workflow & internal-tool automation",
      "Model evaluation & guardrails",
      "Data pipeline design",
    ],
    color: "teal",
  },
  {
    slug: "product-design",
    title: "Product Design",
    shortDescription:
      "Interfaces designed around how people actually use your product, not just how it looks.",
    description:
      "Our design process starts with the workflow, not the wireframe. We map how people actually use the product, then design interfaces that hold up under real use — fast to learn, forgiving of mistakes, consistent under pressure.",
    icon: "layout",
    deliverables: [
      "UX research & journey mapping",
      "Interface & design-system creation",
      "Prototyping & usability testing",
      "Accessibility audits",
    ],
    color: "coral",
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    shortDescription:
      "Dashboards and pipelines that turn scattered data into decisions your team can act on.",
    description:
      "We build the pipelines, warehouses and dashboards that turn scattered event data into something your team can actually act on — without a six-month data-platform project first.",
    icon: "bar-chart",
    deliverables: [
      "Data warehouse & pipeline setup",
      "Dashboarding & reporting",
      "Event tracking implementation",
      "Data quality & governance",
    ],
    color: "brand",
  },
  {
    slug: "technical-consulting",
    title: "Technical Consulting",
    shortDescription:
      "An outside technical read on architecture, vendor choices and team structure.",
    description:
      "Sometimes the highest-leverage thing we can do is not write code. We audit architecture, review vendor decisions, and advise on how to structure a technical team — giving you a second opinion before a costly decision.",
    icon: "compass",
    deliverables: [
      "Architecture & code audits",
      "Technology roadmap planning",
      "Vendor & build-vs-buy reviews",
      "Engineering team structure advice",
    ],
    color: "teal",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We spend the first sprint understanding your users, constraints and existing systems before proposing anything.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Architecture and interface decisions get made together, with trade-offs written down, not buried in Slack.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Two-week cycles, a working increment at the end of each, and a changelog you can actually read.",
  },
  {
    step: "04",
    title: "Operate",
    description:
      "We stay through launch, monitor what we shipped, and hand off documentation your team can run with.",
  },
];

export const values: ValueItem[] = [
  {
    title: "Show the work",
    description:
      "Every decision — architecture, vendor, timeline — gets written down with the trade-offs we considered, not just the conclusion.",
  },
  {
    title: "Ship in increments",
    description:
      "We don't disappear for a quarter and reappear with a big reveal. You see working software every two weeks.",
  },
  {
    title: "Build to hand off",
    description:
      "We document and structure systems so your team can operate them without us — that's the actual deliverable.",
  },
  {
    title: "Say the hard thing early",
    description:
      "If a timeline is unrealistic or an approach won't scale, we say so in week one, not week ten.",
  },
];

export const stats: Stat[] = [
  { value: "120+", label: "Products shipped" },
  { value: "98%", label: "Client retention" },
  { value: "14", label: "Countries served" },
  { value: "9 yrs", label: "Average team tenure" },
];

export const team: TeamMember[] = [
  {
    name: "Maren Okafor",
    role: "Co-founder & CEO",
    bio: "Previously led platform engineering at a Series C fintech. Sets the studio's technical bar.",
    initials: "MO",
  },
  {
    name: "Daniel Cho",
    role: "Co-founder & Head of Engineering",
    bio: "Built and sold a dev-tools startup before starting Nexlayer. Still reviews every architecture doc.",
    initials: "DC",
  },
  {
    name: "Priya Ramaswamy",
    role: "Head of Design",
    bio: "Ten years designing internal and customer-facing tools for logistics and healthcare products.",
    initials: "PR",
  },
  {
    name: "Tomas Varga",
    role: "Head of Cloud & DevOps",
    bio: "Ex-SRE lead. Obsessive about infrastructure that pages the right person, not everyone.",
    initials: "TV",
  },
  {
    name: "Aisha Bello",
    role: "Head of AI",
    bio: "Runs the studio's AI practice — from evaluation harnesses to production LLM features.",
    initials: "AB",
  },
  {
    name: "Lucas Ferreira",
    role: "Head of Client Delivery",
    bio: "The person who makes sure every engagement ships on the timeline we promised.",
    initials: "LF",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Nexlayer rebuilt our checkout flow in six weeks and cut cart abandonment by a third. They explained every trade-off along the way instead of just handing us a black box.",
    name: "Elena Marsh",
    role: "VP of Product",
    company: "Fielder Logistics",
  },
  {
    quote:
      "We came to them with a messy AWS setup and left with infrastructure our own team could actually operate. The documentation alone was worth the engagement.",
    name: "Robert Kim",
    role: "CTO",
    company: "Harborline",
  },
  {
    quote:
      "The AI feature they shipped for us now handles about 40% of support tickets end to end. It was live inside a month, not a year.",
    name: "Grace Adeyemi",
    role: "Head of Customer Ops",
    company: "Portside Health",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "picking-a-cloud-provider-in-2026",
    title: "Picking a cloud provider in 2026: what actually matters",
    excerpt:
      "Pricing pages don't tell you the whole story. Here's the checklist we run before recommending AWS, GCP or Azure to a client.",
    category: "Cloud",
    date: "2026-07-02",
    readTime: "7 min read",
    author: "Tomas Varga",
  },
  {
    slug: "shipping-llm-features-without-the-hype",
    title: "Shipping LLM features without the hype",
    excerpt:
      "Most AI features fail from scope, not the model. A practical framework for deciding what's worth building.",
    category: "AI",
    date: "2026-06-18",
    readTime: "9 min read",
    author: "Aisha Bello",
  },
  {
    slug: "design-systems-that-survive-contact-with-a-roadmap",
    title: "Design systems that survive contact with a roadmap",
    excerpt:
      "Most design systems rot within a year. The ones that last share three habits we look for in every audit.",
    category: "Design",
    date: "2026-05-27",
    readTime: "6 min read",
    author: "Priya Ramaswamy",
  },
  {
    slug: "the-real-cost-of-technical-debt",
    title: "The real cost of technical debt (with numbers)",
    excerpt:
      "We tracked delivery velocity across twelve client codebases before and after debt paydown sprints. Here's what changed.",
    category: "Engineering",
    date: "2026-05-04",
    readTime: "8 min read",
    author: "Daniel Cho",
  },
  {
    slug: "how-we-structure-a-two-week-sprint",
    title: "How we structure a two-week sprint",
    excerpt:
      "The exact cadence, ceremonies and artifacts we use to keep client work predictable without slowing it down.",
    category: "Process",
    date: "2026-04-21",
    readTime: "5 min read",
    author: "Lucas Ferreira",
  },
  {
    slug: "dashboards-nobody-looks-at",
    title: "Why most analytics dashboards go unused",
    excerpt:
      "A dashboard nobody opens isn't a data problem, it's a design problem. Notes from a dozen internal-tools audits.",
    category: "Data",
    date: "2026-03-30",
    readTime: "6 min read",
    author: "Maren Okafor",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
