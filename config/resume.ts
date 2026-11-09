export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  span?: "wide" | "tall";
  skills: string[];
};

export type Company = {
  id: string;
  name: string;
  /** Short wordmark text used when no logo file is supplied */
  mark: string;
  /** Optional second line under the wordmark */
  sub?: string;
  /**
   * Optional official logo (SVG/PNG) in /public/logos, e.g. "/logos/ibm.svg".
   * Logos are rendered monochrome and adapt to light/dark glass automatically.
   */
  logo?: string;
  /** Show in the hero "places I've made an impact" strip */
  featured?: boolean;
};

export type Role = {
  id: string;
  company: string;
  companyId: string;
  title: string;
  type?: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  more?: string[];
  stack: string[];
  /** Extra resume terms used only for skill matching (not displayed) */
  keywords?: string[];
};

export type Project = {
  id: string;
  name: string;
  kind: "Web" | "Mobile" | "AI" | "Enterprise";
  status: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
  note?: string;
};

export const profile = {
  name: "Vikram Kumar",
  title: "Senior Full Stack Developer",
  location: "Calgary, Alberta, Canada",
  email: "vikautox@gmail.com",
  github: "https://github.com/Brutalvik",
  linkedin: "https://www.linkedin.com/in/vbytes/",
  resume: "/Vikram_Kumar_Resume.pdf",
  tagline:
    "I design and ship end-to-end products: polished React, Angular and React Native interfaces on top of typed Node.js, NestJS and Spring Boot services, relational and NoSQL data, and Azure / AWS platforms that hold up in production.",
  summary: [
    "Senior Full Stack Developer with 12+ years delivering complex software in Agile teams, across the Alberta Energy Regulator, the Government of Alberta, IBM (Air Canada and TD Bank), GSTS, and Inovi Technologies.",
    "My work spans the whole stack: responsive single-page applications and reusable component systems, REST and GraphQL APIs, high-volume data ingestion and T-SQL, event-driven microservices, CI/CD, and secure cloud architecture on Azure and AWS.",
    "I also evaluate and train Generative AI coding models: designing realistic engineering scenarios, writing rubrics, and reviewing model-generated code for correctness, security risks, and hallucination patterns.",
  ],
  stats: [
    { value: "12+", label: "Years shipping software" },
    { value: "35k+", label: "Concurrent users on APIs I built" },
    { value: "27k+", label: "Users on mobile-optimized UIs" },
    { value: "20%", label: "Faster reporting from API tuning" },
  ],
  clients: [
    "Alberta Energy Regulator",
    "Government of Alberta",
    "Air Canada (via IBM)",
    "TD Bank (via IBM)",
    "IBM",
    "Mercor",
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    id: "uiux",
    title: "UI / UX Engineering",
    blurb:
      "Interfaces people can actually work in: data-dense, responsive, validated as you type, and built from reusable parts.",
    span: "wide",
    skills: [
      "Responsive SPA design",
      "Reusable component libraries",
      "Design systems",
      "Ant Design",
      "Tailwind CSS",
      "Framer Motion",
      "Virtualized data grids",
      "Inline validation and error states",
      "Multi-step wizard flows",
      "Formik / Yup / Zod forms",
      "Leaflet and Mapbox GIS",
      "React Toastify and tooltips",
      "react-to-print reporting",
      "Performance (useMemo, useCallback)",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Production SPAs in React and Angular, typed end to end.",
    span: "tall",
    skills: [
      "React",
      "Angular",
      "AngularJS",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "Redux Thunk / Persist",
      "NgRx",
      "RxJS",
      "Apollo Client",
      "graphql-request",
      "Custom Hooks",
      "Vite",
      "Webpack 5 Module Federation",
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    blurb:
      "Native and mobile-first experiences from the same TypeScript skill set.",
    skills: [
      "React Native",
      "Mobile-first responsive UI",
      "Mobile-optimized AngularJS apps",
      "Shared UI across platforms",
    ],
  },
  {
    id: "backend",
    title: "Backend and APIs",
    blurb: "Typed services, clean contracts, event-driven where it counts.",
    span: "wide",
    skills: [
      "Node.js",
      "Express",
      "NestJS",
      "Java Spring Boot",
      "Python",
      "C#",
      "REST",
      "GraphQL",
      "Apollo Server",
      "AWS AppSync",
      "Prisma",
      "TypeORM",
      "Server-Sent Events",
      "Microservices",
      "Event-driven architecture",
      "Repository and DTO patterns",
    ],
  },
  {
    id: "data",
    title: "Databases",
    blurb: "Relational and NoSQL, from schema design to query plans.",
    span: "tall",
    skills: [
      "PostgreSQL",
      "MySQL",
      "T-SQL",
      "Azure SQL",
      "Amazon RDS",
      "MongoDB",
      "Cosmos DB",
      "DynamoDB",
      "DynamoDB Streams / TTL",
      "Redis",
      "Stored procedures",
      "Dynamic SQL",
      "Indexing and execution plans",
      "Bulk ingestion and staging",
    ],
  },
  {
    id: "cloud",
    title: "Cloud and DevOps",
    blurb: "Repeatable, containerized delivery on Azure and AWS.",
    span: "wide",
    skills: [
      "Azure",
      "AWS",
      "AKS",
      "Azure App Service",
      "Azure Functions",
      "Logic Apps",
      "Service Bus",
      "API Management",
      "AWS Lambda",
      "API Gateway",
      "Step Functions",
      "SQS / SNS",
      "EventBridge",
      "S3 / CloudFront",
      "Amplify",
      "Docker",
      "Kubernetes",
      "Nginx",
      "Terraform",
      "CloudFormation / SAM",
      "Azure DevOps",
      "GitHub Actions",
      "AWS CodePipeline",
    ],
  },
  {
    id: "security",
    title: "Security and Identity",
    blurb: "Auth done properly, secrets kept out of code.",
    skills: [
      "Azure AD / MSAL",
      "RBAC",
      "OAuth2",
      "OpenID Connect",
      "Amazon Cognito",
      "AWS IAM",
      "Key Vault",
      "Secrets Manager",
    ],
  },
  {
    id: "quality",
    title: "Testing and Observability",
    blurb: "Confidence before release, visibility after.",
    skills: [
      "Jest",
      "React Testing Library",
      "Supertest",
      "Cypress",
      "JUnit",
      "Mockito",
      "Application Insights",
      "Log Analytics / KQL",
      "Azure Monitor",
      "CloudWatch",
      "AWS X-Ray",
    ],
  },
  {
    id: "ai",
    title: "Generative AI",
    blurb: "Training and evaluating LLMs on real engineering work.",
    skills: [
      "LLM evaluation",
      "Rubric design",
      "Prompt engineering",
      "AI code review",
      "Hallucination analysis",
      "Security review of AI output",
      "Engineering scenario design",
      "Codebase analysis",
    ],
  },
];

export const companies: Company[] = [
  { id: "mercor", name: "Mercor", mark: "mercor", featured: true },
  {
    id: "aer",
    name: "Alberta Energy Regulator",
    mark: "AER",
    sub: "Alberta Energy Regulator",
    featured: true,
  },
  {
    id: "goa",
    name: "Government of Alberta",
    mark: "Alberta",
    sub: "Government",
    featured: true,
  },
  {
    id: "gsts",
    name: "GSTS",
    mark: "GSTS",
    sub: "Global Spatial Technology Solutions",
    featured: true,
  },
  { id: "ibm", name: "IBM", mark: "IBM", featured: true },
  {
    id: "inovi",
    name: "Inovi Technologies",
    mark: "Inovi",
    sub: "Technologies",
  },
  {
    id: "softbrij",
    name: "Softbrij IT Solutions",
    mark: "Softbrij",
    sub: "IT Solutions",
  },
];

export const companyById = (id: string) => companies.find((c) => c.id === id);

export const experience: Role[] = [
  {
    id: "mercor-swe-writer",
    company: "Mercor",
    companyId: "mercor",
    title: "Software Engineer Writer - AI",
    type: "Contract",
    period: "Oct 2026 - Present",
    location: "Calgary, Canada (Remote)",
    summary:
      "AI-assisted software engineering and code evaluation: analyzing real-world codebases, validating AI-generated solutions, and assessing code quality, correctness, and reliability.",
    highlights: [
      "Evaluate advanced AI coding models on complex TypeScript, JavaScript, React, Node.js, and backend engineering tasks.",
      "Design realistic software engineering scenarios involving application architecture, API workflows, database operations, concurrency, and edge cases.",
      "Review AI-generated code and technical assessments for correctness, maintainability, performance, and adherence to requirements.",
    ],
    more: [
      "Investigate complex application behavior using codebase analysis, automated testing, and database-level validation.",
      "Assess AI model performance, including task completion, reasoning quality, problem-solving approaches, and the level of human guidance required.",
      "Document technical findings, identify implementation risks, and provide structured feedback to improve AI-assisted software development workflows.",
    ],
    stack: [
      "TypeScript",
      "JavaScript",
      "React",
      "Node.js",
      "LLM evaluation",
      "Automated testing",
    ],
  },
  {
    id: "aer",
    companyId: "aer",
    company: "Alberta Energy Regulator",
    title: "Senior Software Developer",
    period: "Jan 2026 - Aug 2026",
    location: "Calgary, Canada",
    summary:
      "Full-stack delivery of regulatory bulk-submission and data workflows on Azure.",
    highlights: [
      "Designed enterprise data-ingestion workflows: file intake, schema-aware parsing, staging, validation, duplicate detection, and loading into SQL.",
      "Built a custom virtualized spreadsheet grid with inline validation, duplicate-row detection, and error highlighting for large datasets.",
      "Built reusable Node.js/TypeScript pipeline components that map spreadsheet headers to database parameters dynamically.",
      "Wrote and optimized T-SQL stored procedures with dynamic SQL, type conversion, and high-volume integrity rules.",
    ],
    more: [
      "Integrated MSAL with Azure AD and role-based protected routes; fixed redirect loops and token acquisition issues.",
      "Automated Azure DevOps deployments for Docker/Kubernetes services with environment overlays and Nginx routing.",
      "Added real-time progress for long-running ingestion using Server-Sent Events and production telemetry.",
      "Built shared Ant Design and Tailwind CSS components for filtering, forms, and calculation-driven UIs.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "T-SQL",
      "Azure",
      "Docker",
      "Kubernetes",
      "Ant Design",
      "Tailwind",
    ],
    keywords: [
      "Vite",
      "Key Vault",
      "stored procedures",
      "single-page applications",
      "multi-step",
      "responsive",
      "Nginx",
      "Docker",
      "Ant Design",
    ],
  },
  {
    id: "mercor-ai-training",
    companyId: "mercor",
    company: "Mercor",
    title: "Senior Software Engineer - AI Model Training",
    type: "Contract",
    period: "May 2025 - Dec 2025",
    location: "Remote",
    summary:
      "Generative AI training and evaluation across languages and domains.",
    highlights: [
      "Wrote production-quality solutions in Python, C#, Node.js, and Java as high-fidelity training data.",
      "Authored rubrics for correctness, code quality, performance, security, and reasoning that became team reference standards.",
      "Evaluated and ranked model-generated code, flagging subtle bugs, edge cases, anti-patterns, and security risks such as SQL injection.",
    ],
    more: [
      "Partnered with prompt engineers to refine prompts and constrain task formulations.",
      "Analyzed LLM failure modes and hallucination patterns to drive targeted training adjustments.",
    ],
    stack: ["Python", "C#", "Node.js", "Java", "LLMs", "Prompt engineering"],
  },
  {
    id: "goa",
    companyId: "goa",
    company: "Government of Alberta",
    title: "Senior Software Developer",
    period: "Oct 2023 - Apr 2025",
    location: "Calgary, Canada",
    summary:
      "Enterprise microservices, data processing, and workflow automation on Azure.",
    highlights: [
      "Built and operated production microservices on AKS and App Service with Node.js, NestJS, GraphQL, and TypeORM.",
      "Built event-driven integration pipelines on Azure Service Bus with dead-letter queues and JSON Schema contracts.",
      "Set up multi-stage CI/CD with Azure DevOps, Terraform, GitHub Actions, and quality gates.",
    ],
    more: [
      "Governed REST and GraphQL APIs through Azure API Management: throttling, policies, and key rotation.",
      "Implemented monitoring and alerting with Application Insights, Log Analytics, and KQL dashboards.",
      "Combined relational data with Cosmos DB and Redis in workflow automation using Azure Functions and Logic Apps.",
    ],
    stack: [
      "NestJS",
      "GraphQL",
      "TypeORM",
      "AKS",
      "Service Bus",
      "Cosmos DB",
      "Redis",
      "Terraform",
    ],
    keywords: [
      "microservices",
      "repository patterns",
      "DTO validation",
      "Azure Monitor",
      "Azure Functions",
      "Logic Apps",
      "GitHub Actions",
    ],
  },
  {
    id: "gsts",
    companyId: "gsts",
    company: "GSTS",
    title: "Senior Software Developer - Full Stack",
    period: "May 2023 - Aug 2023",
    location: "Halifax, Canada (Remote)",
    summary:
      "Maritime GIS platform modernized onto AWS serverless and Spring Boot.",
    highlights: [
      "Modernized a monolithic Express backend into event-driven services on AWS Lambda without breaking integrations.",
      "Built GIS frontends with Leaflet.js and Mapbox, streaming real-time vessel data via AppSync and GraphQL.",
      "Designed hybrid APIs across Java Spring Boot microservices and Node.js Lambdas on DynamoDB and S3.",
    ],
    more: [
      "Implemented fine-grained access with IAM and Cognito, integrating OAuth2 with Spring Security.",
      "Triggered geofence alerts through SNS consumed by Spring Boot event handlers.",
      "Tested with Jest, JUnit, Mockito, and Cypress; automated releases with CodePipeline and GitHub Actions.",
    ],
    stack: [
      "Spring Boot",
      "Node.js",
      "AWS Lambda",
      "DynamoDB",
      "Leaflet",
      "Mapbox",
      "AppSync",
    ],
    keywords: [
      "microservices",
      "Jest",
      "JUnit",
      "Mockito",
      "Cypress",
      "OAuth2",
    ],
  },
  {
    id: "ibm",
    companyId: "ibm",
    company: "IBM",
    title: "Application Developer - Full Stack",
    period: "Apr 2022 - Apr 2023",
    location: "Calgary, Canada",
    summary:
      "Lead Developer for Air Canada and Senior UI Developer for TD Bank.",
    highlights: [
      "Air Canada: led and mentored developers; modularized the React frontend with Webpack 5 Module Federation.",
      "Air Canada: architected serverless backends on Lambda, API Gateway, DynamoDB, Step Functions, and EventBridge.",
      "TD Bank: built React/TypeScript UIs with Redux Toolkit and Apollo Client against Azure GraphQL APIs.",
    ],
    more: [
      "Built forms with Formik, Yup, and Zod and metadata tooltips with Framer Motion.",
      "Improved UX and performance with useMemo, useCallback, custom Hooks, and react-to-print.",
      "Shipped through GitHub Actions, Amplify, and Azure DevOps with Jest and React Testing Library coverage gates.",
    ],
    stack: [
      "React",
      "Redux Toolkit",
      "Module Federation",
      "AWS",
      "Azure",
      "GraphQL",
      "Framer Motion",
    ],
    keywords: [
      "React Toastify",
      "Redux Thunk",
      "Redux Persist",
      "graphql-request",
      "DynamoDB TTL",
      "DynamoDB Streams",
      "Supertest",
      "CloudWatch",
      "Jest",
      "React Testing Library",
      "tooltips",
    ],
  },
  {
    id: "inovi",
    companyId: "inovi",
    company: "Inovi Technologies",
    title: "Senior Software Developer",
    period: "Sep 2015 - Jan 2020",
    location: "",
    summary: "Serverless full-stack products with Angular and React on AWS.",
    highlights: [
      "Delivered full-stack applications with React, Angular 8, TypeScript, Lambda, API Gateway, and S3.",
      "Secured the React admin portal with Cognito MFA, federated identities, Secrets Manager, and CloudFormation.",
      "Shared UI components across Angular and React apps; tuned performance with NgRx, RxJS, and Hooks.",
    ],
    more: [
      "Built event-driven microservices with Lambda, Step Functions, and SQS.",
      "Automated CI/CD with CodePipeline, CodeBuild, and CodeDeploy; traced latency with X-Ray.",
    ],
    stack: [
      "Angular",
      "React",
      "NgRx",
      "RxJS",
      "AWS Lambda",
      "Cognito",
      "CloudFormation",
    ],
    keywords: [
      "OpenID Connect",
      "OIDC",
      "Supertest",
      "CloudWatch",
      "X-Ray",
      "Secrets Manager",
      "Jest",
    ],
  },
  {
    id: "softbrij",
    companyId: "softbrij",
    company: "Softbrij IT Solutions",
    title: "Software Developer",
    period: "Sep 2011 - Sep 2015",
    location: "",
    summary: "Node.js APIs and AngularJS apps on Azure and AWS.",
    highlights: [
      "Built Node.js/Express REST APIs for an AngularJS frontend serving 35,000+ concurrent users.",
      "Improved reporting speed by 20% through API Management tuning and caching; tuned Azure SQL with indexes and execution plans.",
      "Delivered mobile-optimized AngularJS UIs for 27,000+ users on S3 behind an Elastic Load Balancer.",
    ],
    more: [
      "Integrated Azure AD token-based services with enterprise RBAC.",
      "Connected API Gateway to EC2 backends with Amazon RDS (PostgreSQL).",
    ],
    stack: [
      "Node.js",
      "Express",
      "AngularJS",
      "Azure SQL",
      "PostgreSQL",
      "AWS",
    ],
    keywords: ["CloudWatch", "single-page application", "Azure CDN"],
  },
];

export const education = [
  {
    school: "TAV College",
    credential: "Mobile Applications and Web Development",
    period: "Feb 2020 - Jan 2022",
    location: "Montreal, Canada",
  },
  {
    school: "All India Institute of Technology",
    credential: "B.Tech, Computer Science and Engineering",
    period: "Jun 2007 - May 2011",
    location: "India",
  },
];

export const projects: Project[] = [
  {
    id: "torqlab",
    name: "TorqLab Automotive",
    kind: "Web",
    status: "Live business",
    featured: true,
    tagline:
      "Booking site for my mobile oil change and brake service in Calgary.",
    summary:
      "Customers needed a fast way to request a quote without phone tag. I built the site and quote API end to end for my own business.",
    highlights: [
      "Three.js hero and service tiers built in React, TypeScript, Tailwind CSS, and Redux Toolkit.",
      "Express + TypeScript quote API with Zod validation, Helmet, rate limiting, and consent capture.",
      "Requests stored in Node's built-in SQLite with a CLI for listing quotes and blocking time slots.",
      "Deployed on Vercel with privacy-respecting analytics that strip query strings.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Three.js",
      "Tailwind CSS",
      "Express",
      "Zod",
      "SQLite",
      "Vercel",
    ],
    links: [{ label: "Code", href: "https://github.com/Brutalvik/torqlab" }],
  },
  {
    id: "cervv",
    name: "Cervv",
    kind: "Mobile",
    status: "In development",
    featured: true,
    tagline: "Cross-platform mobile app built with React Native.",
    summary:
      "A React Native app with a typed contracts package shared between the app and its backend, so API changes break the build instead of production.",
    highlights: [
      "Shared @cervv/contracts package for end-to-end TypeScript types.",
      "Theme-token design system for consistent spacing, color, and type across screens.",
      "Catalog and explore flows redesigned for clarity and touch ergonomics.",
    ],
    stack: ["React Native", "TypeScript", "Design tokens", "Shared contracts"],
    note: "Private repository",
  },
  {
    id: "persona",
    name: "Digital Legacy Chat",
    kind: "AI",
    status: "In development",
    featured: true,
    tagline:
      "AI persona simulation that preserves how a person speaks and thinks.",
    summary:
      "An MVP for text-based persona chat, built on Azure with a privacy-first design for Canadian users.",
    highlights: [
      "RAG pipeline over a person's own writing and recordings.",
      "Whisper-based speech-to-text ingestion and LLM-driven persona extraction.",
      "PIPEDA-compliant consent flows designed in from the start.",
    ],
    stack: ["LLMs", "RAG", "Whisper", "Azure", "Node.js", "TypeScript"],
    note: "Private, in active development",
  },
  {
    id: "xyvo",
    name: "Xyvo AI",
    kind: "AI",
    status: "Prototype",
    tagline: "AI-native project management platform.",
    summary:
      "Project management where the AI drafts and refines tasks, with a drag-and-drop board and Gantt view for teams.",
    highlights: [
      "Next.js App Router frontend with Redux Toolkit, Formik, and Framer Motion.",
      "Drag-and-drop Kanban, Gantt timeline, and rich-text task editing.",
      "English and French via next-intl; org-based roles for admins, PMs, and members.",
      "Designed around GPT task generation and Whisper voice-to-task input.",
    ],
    stack: [
      "Next.js",
      "React",
      "Redux Toolkit",
      "next-intl",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "OpenAI",
    ],
    links: [{ label: "Code", href: "https://github.com/Brutalvik/xyvoai" }],
  },
  {
    id: "techrepair",
    name: "Infinite Tech Repair",
    kind: "Web",
    status: "Built for a client",
    tagline: "Booking, tracking, and admin for a device repair shop.",
    summary:
      "A repair shop needed online booking and a way for customers to check repair status without calling.",
    highlights: [
      "Book-a-repair and track-a-repair flows with an admin area for the shop.",
      "Gemini-powered chat assistant for common repair questions.",
      "Fastify + PostgreSQL API packaged to run on AWS Lambda, with Nodemailer notifications.",
    ],
    stack: [
      "Next.js",
      "React",
      "Redux",
      "Gemini",
      "Fastify",
      "PostgreSQL",
      "AWS Lambda",
    ],
    links: [
      { label: "Frontend", href: "https://github.com/Brutalvik/techrepair" },
      { label: "API", href: "https://github.com/Brutalvik/tech-repair-be" },
    ],
  },
  {
    id: "tubo",
    name: "Tubo",
    kind: "Web",
    status: "Prototype",
    tagline: "Peer-to-peer car rental connecting hosts and guests.",
    summary:
      "Location-first car rental: guests search nearby cars on a map, hosts list and manage their vehicles.",
    highlights: [
      "Geospatial car search with geofire queries over Firestore behind an Express API.",
      "React + Firebase frontend with Recharts dashboards and Gemini-powered tools.",
      "Gemini API key kept server-side through a Cloud Run proxy.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Firebase",
      "Firestore",
      "Express",
      "Gemini",
      "Cloud Run",
    ],
    links: [
      { label: "Frontend", href: "https://github.com/Brutalvik/Tubo-v2" },
      { label: "API", href: "https://github.com/Brutalvik/tuboBE" },
    ],
  },
  {
    id: "tradingbot",
    name: "AI Trading Bot",
    kind: "AI",
    status: "Research project",
    tagline: "Machine-learning signals and backtesting for crypto markets.",
    summary:
      "An end-to-end pipeline from market data to model predictions to a live chart, built to test whether simple ML signals hold up.",
    highlights: [
      "OHLCV ingestion with ccxt and technical indicators with ta.",
      "XGBoost and scikit-learn models with a custom backtesting engine.",
      "Live price streamer feeding a React + TypeScript chart UI.",
    ],
    stack: [
      "Python",
      "XGBoost",
      "scikit-learn",
      "pandas",
      "ccxt",
      "React",
      "TypeScript",
    ],
    links: [
      { label: "Models", href: "https://github.com/Brutalvik/ai_tradingbot" },
      { label: "UI", href: "https://github.com/Brutalvik/ai-tradingbot-fe" },
    ],
  },
  {
    id: "eurowerken",
    name: "EuroWerken Platform",
    kind: "Web",
    status: "Prototype",
    tagline: "Customer platform and workshop ERP for my automotive business.",
    summary:
      "A customer-facing site plus an internal ERP prototype for running a European-car workshop.",
    highlights: [
      "Customer platform built with React, Tailwind CSS, and shadcn/ui.",
      "ERP prototype with role-based access across four workshop roles.",
      "Parts-tracking service design explored on GCP with Cloud Run and Pub/Sub.",
    ],
    stack: [
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "RBAC",
      "Node.js",
      "PostgreSQL",
      "GCP",
    ],
    note: "Private repository",
  },
  {
    id: "aer-bulk",
    name: "Regulatory Bulk Submission",
    kind: "Enterprise",
    status: "Production, Alberta Energy Regulator",
    tagline:
      "High-volume data submission for industry, with validation as you type.",
    summary:
      "Industry submitters upload large spreadsheets of regulatory data. The platform validates, stages, and loads them safely into SQL.",
    highlights: [
      "Custom virtualized spreadsheet grid with inline validation and duplicate-row detection.",
      "Multi-file uploads up to 2.5 GB to Azure Blob Storage, with live progress over Server-Sent Events.",
      "Admin Excel template manager and dynamic header-to-parameter mapping.",
      "MSAL / Azure AD auth with role-based routes, deployed on Kubernetes via Azure DevOps.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "T-SQL",
      "Azure Blob Storage",
      "Azure AD",
      "Kubernetes",
    ],
    note: "Internal system, no public screenshots",
  },
];
