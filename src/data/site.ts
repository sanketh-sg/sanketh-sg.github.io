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
  'Tailwind CSS': '#06B6D4',
  Tailwind: '#06B6D4',
  Thymeleaf: '#5FB04A',
  PostgreSQL: '#4169E1',
  MongoDB: '#47A248',
  Redis: '#DC382D',
  'Upstash Redis': '#00E9A3',
  RabbitMQ: '#FF6600',
  'JPA/Hibernate': '#BCAE79',
  JPA: '#BCAE79',
  Flyway: '#CC0200',
  Docker: '#2496ED',
  'Docker Compose': '#2496ED',
  'GitHub Actions': '#2088FF',
  SonarQube: '#4E9BCD',
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
  Webex: '#07C1E4',
  'Cisco Finesse': '#049FD9',
  'Microsoft Teams Phone & Direct Routing': '#6264A7',
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
export type CaseStudy = { name: string; problem: string; built: string; owned: string; delivery: string };

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
  subline: 'Backend and Contact Center Engineer · Java/Spring Boot, Go, Python, TypeScript · 5 years at Cognizant',
  location: 'Bamberg, Germany',
  email,
  links: [
    { label: 'GitHub', href: 'https://github.com/sanketh-sg' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sanketh-gopalli/' },
    { label: 'Email', href: `mailto:${email}` },
  ],
  contactLine:
    'Open to backend, platform and fullstack roles, and to UC and contact center engineering roles. Based in Bamberg, Germany.',
};

export const about: string[] = [
  'I’m a software engineer with a foundation in enterprise communication systems, and I work where the two meet.',
  'I started in contact center and telephony engineering at Cognizant (2017 to 2022), on Genesys Cloud CX and Cisco UCCE/CUCM. Alongside supporting these platforms, including a nine-cluster environment and an 11.x to 12.x upgrade across all nine clusters, I got into development: IVR call flows, integrations around the platforms, and software in Java/Spring Boot and modern frontends. That’s where my interest in software engineering took hold.',
  'It led me to a Master’s in International Software Systems Science at Otto-Friedrich-Universität Bamberg. My thesis was on enabling capabilities in Unix-like operating systems, which sharpened my low-level systems thinking. Alongside it I built applied projects, including an AI-driven customer-support agent and a hybrid rules-plus-model classification system. I also took part in competitive coding events from HackerRank and WeMakeDevs, and got certified in cloud DevOps.',
  'Today my focus is backend and distributed systems, cloud-native engineering and observability. I’m based in Bamberg, Germany, and speak German (B1, improving).',
];

export const featured: Project = {
  name: 'prost-go: Microservices e-commerce platform',
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
    name: 'prost: Spring Boot e-commerce',
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
    name: 'Buy or Wait: AI financial decision agent',
    tagline: 'Decides whether a purchase is safe to make now, later, or in installments.',
    hard: 'The LLM never touches a number. It only extracts facts and words the explanation; every amount is deterministic Python.',
    points: [
      'Prompt-injection tests prove injected text cannot change numeric output.',
      'Cached LLM calls, so re-runs cost zero API calls.',
      '90% holdout accuracy on payment method and affordability.',
    ],
    tags: ['Python', 'Gemini', 'LLM pipelines'],
    glow: lang.python,
    repo: gh('buy-or-wait-financial-decision-agent'),
  },
  {
    name: 'Deutsch Lehrer: German verb tutor',
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
    repo: gh('message-notification-router'),
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
  period: '2017 to 2022',
  groups: [
    {
      title: 'Backend & integration',
      points: [
        'Built REST-to-SOAP middleware (Node.js) so REST-only clients could drive legacy Cisco CUCM/UCCX SOAP/AXL backends, with unified error handling, which removed recurring integration conflicts.',
        'Built a Python, OAuth-secured migration tool moving contact center configuration from on-prem Cisco UCCX to Webex Contact Center.',
        "Designed a Genesys Cloud ↔ Salesforce integration that pops the caller's record for agents and logs calls automatically, removing manual lookup and post-call data entry.",
        'Handled L2 and L3 incidents on Cisco UC and Genesys Cloud platforms, working vendor and client escalations through to resolution.',
      ],
    },
    {
      title: 'Contact center & UC platforms',
      points: [
        'Supported a cluster-by-cluster 11.x to 12.x upgrade across all nine clusters: pre-upgrade backups, testing after each phase, monitoring, and Cisco TAC cases followed through to resolution.',
        'Supported the migration of users from Jabber to Webex, starting with a pilot and moving further users across clusters in phases.',
        'Contributed as a junior engineer to a team project migrating a back-office phone system from Avaya to Microsoft Teams Phone: documented existing call handling, rebuilt call queues, auto attendants, hunt groups and holiday schedules in Teams, and helped troubleshoot post-cutover issues.',
        'Configured Genesys Cloud CX queues, skill-based routing, wrap-up codes and SIP telephony integrations.',
        'Designed inbound, outbound and in-queue IVR flows in Genesys Architect, including a self-service flow where callers reset PINs via chained REST calls.',
      ],
    },
    {
      title: 'Full-stack & delivery',
      points: [
        'Built a full-stack self-service application (Java backend, React frontend) that lets business teams schedule banner messages for contact center agents, replacing manual database updates and email requests. Users select agent teams and schedule in UTC, with input validation in the form. Taken from idea to production through lab, non-production and production with client approval.',
        'Took ownership of a Spring Boot and React web portal that gave about 12,000 agents working from home their telephony numbers, in a 40-day project with a team of more than ten people.',
        'Ran both applications as two instances behind a load balancer with rolling deployments and smoke tests.',
        'Wrote JUnit unit tests, database integration tests, API tests, Jest frontend tests and Playwright end-to-end tests, working toward an 85% coverage target.',
        'Built and owned a GitHub Actions CI/CD pipeline: build, automated tests, SonarQube static analysis, OWASP dependency check, versioned artifacts in AWS CodeArtifact, automated deployment through lab and non-production, manual approval before production.',
        'Mentored four junior engineers and ran standups and sprint planning.',
      ],
    },
  ],
};

export const caseStudies: CaseStudy[] = [
  {
    name: 'Work-from-home agent telephony portal',
    problem: 'About 12,000 agents working from home needed their telephony numbers.',
    built: 'A Spring Boot and React web portal that gave agents their telephony numbers.',
    owned: 'I took ownership of the portal, working in a team of more than ten people.',
    delivery: 'A 40-day project. Ran as two instances behind a load balancer with rolling deployments and smoke tests.',
  },
  {
    name: 'Agent banner message scheduler',
    problem: 'Business teams scheduled banner messages for contact center agents through manual database updates and email requests.',
    built: 'A full-stack self-service application (Java backend, React frontend). Users select agent teams and schedule in UTC, with input validation in the form.',
    owned: 'I built the application and took it from idea to production.',
    delivery: 'Moved through lab, non-production and production with client approval. Ran as two instances behind a load balancer with rolling deployments and smoke tests.',
  },
];

export const certifications: { name: string; period: string }[] = [
  { name: 'Oracle Cloud Infrastructure (OCI) DevOps Professional', period: '2025' },
  { name: 'Genesys Certified Associate - PureCloud', period: '2019 to 2021' },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Backend', items: ['Go', 'Java', 'Spring Boot', 'Node.js', 'Express', 'Python', 'Django REST Framework', 'REST', 'GraphQL', 'SOAP'] },
  { group: 'Frontend', items: ['TypeScript', 'React', 'Vue 3', 'Tailwind CSS', 'Thymeleaf'] },
  { group: 'Data & messaging', items: ['PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'JPA/Hibernate', 'Flyway'] },
  { group: 'Cloud & DevOps', items: ['Docker', 'GitHub Actions', 'CI/CD', 'SonarQube', 'Observability (LGTM)'] },
  { group: 'Contact center & UC', items: ['Genesys Cloud CX', 'Genesys Architect', 'Cisco UCCE/CUCM', 'Cisco Finesse', 'Webex', 'Microsoft Teams Phone & Direct Routing', 'SIP/VoIP', 'Contact Center (CCaaS)', 'Salesforce CTI'] },
  { group: 'Testing & practice', items: ['JUnit', 'Mockito', 'Saga/Outbox patterns', 'Prompt-injection testing'] },
  { group: 'AI', items: ['LLM/AI agents', 'Gemini API', 'LLM pipelines with deterministic guards', 'Claude Code'] },
];

export const education: { degree: string; school?: string; period?: string; note?: string }[] = [
  {
    degree: 'Master in International Software Systems Science',
    school: 'Otto-Friedrich-Universität Bamberg',
    period: 'Oct 2022 – Mar 2026',
    note: 'Thesis: Enabling capabilities in Unix-like operating systems.',
  },
  {
    degree: 'BSc in Computer Science Engineering',
    school: 'Acharya Institute of Technology',
    period: 'Mar 2013 – Aug 2017',
  },
];
