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

const gh = (repo: string) => `https://github.com/sanketh-sg/${repo}`;
const email = 'sankethsg2944@gmail.com';

export const profile: {
  name: string;
  subline: string[];
  location: string;
  email: string;
  links: Link[];
  resumeUrl?: string;
  contactLine: string;
} = {
  name: 'Sanketh S G',
  subline: [
    'Backend and Contact Center Engineer · Java/Spring Boot, Go, Python, TypeScript',
    '5 years at Cognizant',
    'Currently living in Bamberg, Germany',
  ],
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
  'I started in contact-center and telephony engineering at Cognizant (2017-2022), working on Genesys Cloud CX and Cisco UCCE/CUCM. I ran these platforms, including a 9-cluster environment and its 11.x to 12.x upgrade, supported a phased user migration from Jabber to Webex, and contributed to a team project moving a back-office phone system from Avaya to Microsoft Teams Phone, where I rebuilt call handling such as call queues and auto attendants and helped troubleshoot issues after cutover. Alongside the operations work, I built business-critical software around these platforms. I took a self-service application from idea to production that let business teams change what agents see on their desktops, and I took ownership of a portal that enabled about 12,000 agents to work from home. That’s where my interest in software engineering took hold, and I wanted to go deeper than the job allowed.',
  'That growing interest in software led me to a Master’s in International Software Systems Science at Otto-Friedrich-Universität Bamberg. My thesis was on memory safety at the operating-system level, which sharpened my low-level systems thinking. Alongside it I built applied projects, including an AI-driven customer-support agent and a hybrid rules-plus-model classification system, and took part in competitive coding events. I’m also certified in cloud DevOps.',
  'I follow my curiosity, and my interests have evolved with the work. Today I’m focused on backend and distributed systems, cloud-native engineering, and observability. I also enjoy the real-time communications side, with years of hands-on experience in contact center, UC, and CCaaS platforms. I’m looking for fullstack, backend, platform, or CCaaS engineering roles. Based in Bamberg, Germany (German B1, improving).',
  'Core skills: Java · Spring Boot · Go · TypeScript · REST APIs · CI/CD & Cloud-native · Observability (LGTM) · SIP/VoIP · Genesys Cloud CX · Cisco UCCE/CUCM · Microsoft Teams Phone · Direct Routing · Contact Center (CCaaS) · LLM/AI Agents',
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
    name: 'Full-stack coursework (University of Helsinki)',
    tagline: 'React, Node, Express, MongoDB and GraphQL, including a phonebook application deployed on Render, with tests and linting.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'GraphQL'],
    repo: gh('fullstack-uni-helsinki'),
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
  role: string;
  period: string;
  groups: ExperienceGroup[];
} = {
  company: 'Cognizant Technology Solutions',
  role: 'Senior Developer · Bengaluru, India',
  period: 'Nov 2017 to Sep 2022',
  groups: [
    {
      title: 'Applications & delivery',
      points: [
        'Built a full-stack self-service application (Java backend, React frontend) that lets business teams schedule banner messages for contact center agents on their Finesse desktops, replacing manual database updates and email requests. Users search and select agent teams, schedule in UTC, and get input validation in the form; banners appear and disappear automatically.',
        'Took the banner application from idea to production: pitched it to my manager, agreed requirements with the client, delivered it in two-week agile sprints with Jira through lab, non-production and production with client approval, and trained the requesting teams.',
        'Took ownership of a Spring Boot and React web portal that gave about 12,000 agents working from home their telephony numbers, in a 40-day project with a team of more than ten people. It exposes three REST endpoints and ships as one deployable jar.',
        'Ran both applications as two instances behind a load balancer, with rolling deployments, smoke tests after each release, and monitoring of availability and request errors.',
        'Built and owned a GitHub Actions CI/CD pipeline: build, automated tests, SonarQube static analysis, OWASP dependency check, versioned artifacts in AWS CodeArtifact, automated deployment through lab and non-production, manual approval before production.',
        'Wrote JUnit unit tests, database integration tests, API tests, Jest frontend tests and Playwright end-to-end tests, working toward an 85% coverage target.',
        'Mentored four junior engineers and ran standups and sprint planning.',
      ],
    },
    {
      title: 'Genesys Cloud CX & integrations',
      points: [
        'Configured and administered Genesys Cloud CX queues, skills-based routing, wrap-up codes and SIP telephony integrations for enterprise clients in a hybrid contact center.',
        'Designed inbound, outbound and in-queue IVR flows in Genesys Architect, connecting routing logic to business requirements and REST-based services.',
        'Built a Genesys Cloud CX to Salesforce screen-pop and call-logging integration through Architect flows, so agents no longer searched for accounts or entered call data by hand.',
        'Built REST-to-SOAP middleware (Node.js, and also as a Django REST Framework layer) connecting Cisco UCCX REST APIs with CUCM SOAP and AXL services, so routine telephony administration needed less manual work.',
      ],
    },
    {
      title: 'Cisco & Microsoft UC platforms',
      points: [
        'Administered a nine-cluster Cisco UCCE and CUCM environment for a 24/7 contact center operation.',
        'Supported a cluster-by-cluster 11.x to 12.x upgrade across all nine clusters: pre-upgrade backups, testing after each phase, monitoring, and Cisco TAC cases followed through to resolution.',
        'Handled L2 and L3 incidents on Cisco UC and Genesys Cloud platforms, working vendor and client escalations through to resolution.',
        'Administered Oracle session border controllers (call-blocking rules and call routing for new office builds), set up and troubleshot SIP trunks for office deployments, and wrote IVR call flows on Cisco UCCX.',
        'Supported the migration of users from Jabber to Webex alongside a senior engineer, starting with a pilot and moving further users across clusters in phases: provisioned users and service profiles and gave post-deployment support.',
        'Contributed as a junior engineer to a team project migrating a back-office phone system from Avaya to Microsoft Teams Phone: documented existing call handling, rebuilt call queues, auto attendants, hunt groups and holiday schedules in Teams, and helped troubleshoot post-cutover issues with Microsoft engineers.',
      ],
    },
  ],
};

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
