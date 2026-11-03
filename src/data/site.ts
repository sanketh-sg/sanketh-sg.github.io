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

// Brand colours used for the card hover glow.
const lang = {
  go: '#00ADD8',
  java: '#F89820',
  python: '#FFD43B',
  typescript: '#3178C6',
};
export type ExperienceGroup = { title: string; points: string[] };

const gh = (repo: string) => `https://github.com/sanketh-sg/${repo}`;
const email = 'sankethsg2944@gmail.com';

export const profile: {
  name: string;
  headline: string;
  subline: string;
  location: string;
  email: string;
  links: Link[];
  resumeUrl?: string;
  contactLine: string;
} = {
  name: 'Sanketh S G',
  headline: 'I build backends that hold up — and the frontends on top of them.',
  subline: 'Go · Java/Spring Boot · Python · TypeScript — 5 years at Cognizant',
  location: 'Bamberg, Germany',
  email,
  links: [
    { label: 'GitHub', href: 'https://github.com/sanketh-sg' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sanketh-gopalli/' },
    { label: 'Email', href: `mailto:${email}` },
  ],
  contactLine: 'Open to backend and full-stack roles.',
};

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
  footnote: string;
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
        'Built a self-service IVR flow with chained REST calls so users reset PINs by phone — removed a help-desk task.',
        'Owned L2/L3 production incidents and post-mortems; kept 99.7% uptime and cut average resolution time 35% by turning 30+ incidents into runbooks.',
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
  footnote: 'Also administered Genesys Cloud CX and 9 Cisco UCCE/CUCM clusters, including a phased 11.x → 12.x upgrade.',
};

export const skills: { group: string; items: string[] }[] = [
  { group: 'Backend', items: ['Go', 'Java', 'Spring Boot', 'Node.js', 'Express', 'Python', 'Django REST Framework', 'REST', 'GraphQL', 'SOAP'] },
  { group: 'Frontend', items: ['TypeScript', 'React', 'Vue 3', 'Astro', 'Tailwind CSS', 'Thymeleaf'] },
  { group: 'Data & messaging', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'RabbitMQ', 'JPA/Hibernate', 'Flyway'] },
  { group: 'Cloud & DevOps', items: ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'GitHub Actions', 'Jenkins', 'AWS (CodePipeline, CodeBuild)'] },
  { group: 'Testing & practice', items: ['JUnit', 'Mockito', 'Saga/Outbox patterns', 'Prompt-injection testing'] },
  { group: 'AI', items: ['Gemini API', 'LLM pipelines with deterministic guards', 'Claude Code'] },
];

export const education: { degree: string; school?: string }[] = [
  { degree: 'Master in International Software Systems Science', school: 'University of Bamberg' },
  { degree: 'BSc in Computer Science Engineering' },
];
