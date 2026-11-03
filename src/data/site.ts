// All portfolio copy lives here. Components only render it.

export type Link = { label: string; href: string };

export type Project = {
  name: string;
  tagline: string;
  hard: string;
  points: string[];
  tags: string[];
  /** Hover glow, in the core language's brand colour (hex). */
  glow: string;
  repo?: string;
  live?: string;
  note?: string;
};

export type MoreProject = Pick<Project, 'name' | 'tagline' | 'tags' | 'repo'>;

// Brand colours for the hover glow on cards and skill chips.
const brand: Record<string, string> = {
  Go: '#00ADD8',
  Java: '#F89820',
  Python: '#FFD43B',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  HTML: '#E34F26',
  'Spring Boot': '#6DB33F',
  'Spring Boot 3.5': '#6DB33F',
  'Spring Security': '#6DB33F',
  'Node.js': '#5FA04E',
  'Django REST Framework': '#44B78B',
  GraphQL: '#E10098',
  React: '#61DAFB',
  'Vue 3': '#42B883',
  Astro: '#FF5D01',
  'Tailwind CSS': '#06B6D4',
  Tailwind: '#06B6D4',
  Thymeleaf: '#5FB04A',
  PostgreSQL: '#4169E1',
  MySQL: '#4479A1',
  MongoDB: '#47A248',
  Redis: '#DC382D',
  'Upstash Redis': '#00E9A3',
  RabbitMQ: '#FF6600',
  'JPA/Hibernate': '#BCAE79',
  JPA: '#BCAE79',
  Flyway: '#CC0200',
  Docker: '#2496ED',
  'Docker Compose': '#2496ED',
  Kubernetes: '#326CE5',
  Terraform: '#844FBA',
  Ansible: '#EE0000',
  'GitHub Actions': '#2088FF',
  Jenkins: '#D24939',
  'AWS (CodePipeline, CodeBuild)': '#FF9900',
  JUnit: '#25A162',
  Mockito: '#78A641',
  Gemini: '#8E75FF',
  'Gemini API': '#8E75FF',
  'Claude Code': '#D97757',
  'Observability (LGTM)': '#F46800',
  'Genesys Cloud CX': '#FF4F1F',
  'Genesys Architect': '#FF4F1F',
  'Cisco UCCE/CUCM': '#049FD9',
  'Salesforce CTI': '#00A1E0',
};
const neutral = '#A8A29E'; // stone-400, for skills without a brand colour

export const glowFor = (name: string): string => brand[name] ?? neutral;

const lang = {
  go: brand.Go,
  java: brand.Java,
  python: brand.Python,
  typescript: brand.TypeScript,
};
export type ExperienceGroup = { title: string; points: string[] };

const gh = (repo: string) => `https://github.com/sanketh-sg/${repo}`;
const email = 'sankethsg2944@gmail.com';

export const profile: {
  name: string;
  subline: string;
  location: string;
  email: string;
  links: Link[];
  resumeUrl?: string;
  contactLine: string;
} = {
  name: 'Sanketh S G',
  subline: 'Go · Java/Spring Boot · Python · TypeScript — 5 years at Cognizant',
  location: 'Bamberg, Germany',
  email,
  links: [
    { label: 'GitHub', href: 'https://github.com/sanketh-sg' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sanketh-gopalli/' },
    { label: 'Email', href: `mailto:${email}` },
  ],
  contactLine:
    'Open to full-stack, backend and platform roles — and to contact center, UC and CCaaS engineering.',
};

export const about: string[] = [
  'I’m a software engineer with a foundation in enterprise communication systems, and I work where the two meet.',
  'I started in contact-center and telephony engineering at Cognizant (2017–2022), on Genesys Cloud CX and Cisco UCCE/CUCM. Alongside running these platforms — including a 9-cluster environment and an 11.x → 12.x upgrade across all nine — I got into development: IVR call flows, integrations around the platforms, and software in Java/Spring Boot and modern frontends. That’s where my interest in software engineering took hold.',
  'It led me to a Master’s in International Software Systems Science at Otto-Friedrich-Universität Bamberg. My thesis was on enabling capabilities in Unix-like operating systems, which sharpened my low-level systems thinking. Alongside it I built applied projects — an AI-driven customer-support agent and a hybrid rules-plus-model classification system — took part in competitive coding events, and got certified in cloud DevOps.',
  'Today my focus is backend and distributed systems, cloud-native engineering and observability. I’m based in Bamberg, Germany, and speak German (B1, improving).',
];

export const featured: Project = {
  name: 'prost-go — Microservices e-commerce platform',
  tagline: 'Five Go services behind a GraphQL gateway, talking over RabbitMQ.',
  hard: 'Distributed checkout without a distributed transaction: saga orchestration with compensating actions that release reserved stock when a step fails.',
  points: [
    'Five components: Users, Products, Cart, Orders and a GraphQL gateway.',
    'Database-per-service across four PostgreSQL schemas.',
    'Transactional Outbox so database writes and events commit together.',
    'Dead-letter queues, retries and idempotency keys for failed messages.',
    'JWT authentication in a dedicated Users service.',
  ],
  tags: ['Go', 'GraphQL', 'RabbitMQ', 'PostgreSQL', 'Redis', 'Docker Compose', 'Vue 3'],
  glow: lang.go,
  repo: gh('prost-go'),
  note: 'Vue frontend in progress.',
};

export const projects: Project[] = [
  {
    name: 'prost — Spring Boot e-commerce',
    tagline: 'A server-rendered beverage shop with real checkout rules.',
    hard: 'No overselling under concurrent checkout: pessimistic write locks before stock validation, and atomic order placement.',
    points: [
      'Role- and privilege-based Spring Security with BCrypt and HSTS.',
      'Order-ownership checks so users only ever see their own orders.',
      '11 test classes covering auth, checkout edge cases and sessions.',
    ],
    tags: ['Spring Boot 3.5', 'Spring Security', 'JPA', 'PostgreSQL', 'Flyway', 'Thymeleaf', 'Tailwind'],
    glow: lang.java,
    repo: gh('prost'),
  },
  {
    name: 'Buy or Wait — AI financial decision agent',
    tagline: 'Decides whether a purchase is safe to make now, later, or in installments.',
    hard: 'The LLM never touches a number. It only extracts facts and words the explanation; every amount is deterministic Python.',
    points: [
      'Prompt-injection tests prove injected text cannot change numeric output.',
      'Cached LLM calls — re-runs cost zero API calls.',
      '90% holdout accuracy on payment method and affordability.',
    ],
    tags: ['Python', 'Gemini', 'LLM pipelines'],
    glow: lang.python,
    repo: gh('buy-or-wait-financial-decision-agent'),
  },
  {
    name: 'Deutsch Lehrer — German verb tutor',
    tagline: 'Learn 1,000 German verbs across three tenses, on phone or laptop.',
    hard: 'Zero hallucinated conjugations: forms come from a dictionary, the model only writes example sentences.',
    points: [
      'Spaced repetition that schedules what you are weakest at.',
      'Three practice modes, including conversation with inline corrections.',
      'AI provider behind one interface, so models can be swapped.',
    ],
    tags: ['TypeScript', 'Next.js', 'React', 'Gemini', 'Upstash Redis'],
    glow: lang.typescript,
    repo: gh('deutsch-lehrer'),
    live: 'https://deutsch-lehrer-kqw3.vercel.app',
  },
];

export const moreProjects: MoreProject[] = [
  {
    name: 'cap-ramp',
    tagline: 'Enterprise IT service-request and asset-management platform.',
    tags: ['Vue'],
    repo: gh('cap-ramp'),
  },
  {
    name: 'Multimodal message router',
    tagline: 'Rules + LLM routing for text, image and voice, with cached embeddings as evidence (HackerRank Orchestrate, Aug 2026).',
    tags: ['TypeScript', 'Node.js', 'Gemini'],
  },
  {
    name: "Rucksack'd",
    tagline: 'Node/Express/MongoDB shop with sessions and BCrypt.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    repo: gh('Rucksackd-E-Shop'),
  },
  {
    name: 'xv6-cheri',
    tagline: 'Ported the xv6 kernel to CHERI-RISC-V capability hardware.',
    tags: ['C', 'RISC-V', 'QEMU'],
    repo: gh('xv6-cheri'),
  },
];

export const experience: {
  company: string;
  period: string;
  groups: ExperienceGroup[];
} = {
  company: 'Cognizant Technology Solutions',
  period: '2017 – 2022',
  groups: [
    {
      title: 'Backend & integration',
      points: [
        'Built REST-to-SOAP middleware (Node.js) so REST-only clients could drive legacy Cisco CUCM/UCCX SOAP/AXL backends, with unified error handling — removed recurring integration conflicts.',
        'Built a Python, OAuth-secured migration tool moving contact-center configuration from on-prem Cisco UCCX to Webex Contact Center — a multi-hour manual process now runs in minutes.',
        "Designed a Genesys Cloud ↔ Salesforce integration that pops the caller's record for agents and logs calls automatically, removing manual lookup and post-call data entry.",
        'Owned L2/L3 production incidents and post-mortems; cut average resolution time 35% by turning 30+ incidents into runbooks.',
      ],
    },
    {
      title: 'Contact center & UC platforms',
      points: [
        'Administered enterprise voice infrastructure across 9 Cisco UCCE/CUCM clusters — dial plans, extension mobility and routing for thousands of daily interactions.',
        'Ran a phased CUCM 11.x → 12.x upgrade across all 9 clusters with Cisco TAC, holding 99.7% uptime through the transition.',
        'Configured Genesys Cloud CX queues, skill-based routing, wrap-up codes and SIP telephony integrations across two multi-year client engagements.',
        'Designed inbound, outbound and in-queue IVR flows in Genesys Architect, including a self-service flow where callers reset PINs via chained REST calls.',
      ],
    },
    {
      title: 'Full-stack & delivery',
      points: [
        'Delivered a Spring Boot + PostgreSQL application with a React frontend end to end in three months, saving ~2 staff-hours every time the task runs.',
        'Raised test coverage to 85% with JUnit and Mockito and introduced mandatory code review.',
        'Built CI/CD pipelines (Jenkins, GitHub Actions) that cut release cycles from 2 days to 6 hours.',
        'Mentored 4 junior engineers; ran standups and sprint planning.',
      ],
    },
  ],
};

export const skills: { group: string; items: string[] }[] = [
  { group: 'Backend', items: ['Go', 'Java', 'Spring Boot', 'Node.js', 'Express', 'Python', 'Django REST Framework', 'REST', 'GraphQL', 'SOAP'] },
  { group: 'Frontend', items: ['TypeScript', 'React', 'Vue 3', 'Astro', 'Tailwind CSS', 'Thymeleaf'] },
  { group: 'Data & messaging', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'RabbitMQ', 'JPA/Hibernate', 'Flyway'] },
  { group: 'Cloud & DevOps', items: ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'GitHub Actions', 'Jenkins', 'AWS (CodePipeline, CodeBuild)', 'Observability (LGTM)'] },
  { group: 'Contact center & UC', items: ['Genesys Cloud CX', 'Genesys Architect', 'Cisco UCCE/CUCM', 'SIP/VoIP', 'Contact Center (CCaaS)', 'Salesforce CTI'] },
  { group: 'Testing & practice', items: ['JUnit', 'Mockito', 'Saga/Outbox patterns', 'Prompt-injection testing'] },
  { group: 'AI', items: ['LLM/AI agents', 'Gemini API', 'LLM pipelines with deterministic guards', 'Claude Code'] },
];

export const education: { degree: string; school?: string; note?: string }[] = [
  {
    degree: 'Master in International Software Systems Science',
    school: 'Otto-Friedrich-Universität Bamberg',
    note: 'Thesis: Enabling capabilities in Unix-like operating systems.',
  },
  { degree: 'BSc in Computer Science Engineering' },
];
