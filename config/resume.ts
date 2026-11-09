export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  span?: "wide" | "tall";
  skills: string[];
};

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  more?: string[];
  stack: string[];
};

export const profile = {
  name: "Vikram Kumar",
  title: "Senior Full Stack Developer",
  location: "Calgary, Alberta, Canada",
  email: "vikautox@gmail.com",
  github: "https://github.com/Brutalvik",
  resume: "/Vikram_Kumar_Resume.pdf",
  tagline:
    "I design and ship end-to-end products: polished React, Angular and React Native interfaces on top of typed Node.js, NestJS and Spring Boot services, relational and NoSQL data, and Azure / AWS platforms that hold up in production.",
  summary: [
    "Senior Full Stack Developer with 12+ years delivering complex software in Agile teams, across the Alberta Energy Regulator, the Government of Alberta, IBM (Air Canada and TD Bank), GSTS, and Inovi Technologies.",
    "My work spans the whole stack: responsive single-page applications and reusable component systems, REST and GraphQL APIs, high-volume data ingestion and T-SQL, event-driven microservices, CI/CD, and secure cloud architecture on Azure and AWS.",
    "I also train and evaluate Generative AI models: writing rubrics, designing prompts, and reviewing model-generated code for correctness, security risks, and hallucination patterns.",
  ],
  stats: [
    { value: "12+", label: "Years shipping software" },
    { value: "7", label: "Organizations" },
    { value: "2", label: "Clouds: Azure and AWS" },
    { value: "35k+", label: "Concurrent users served" },
  ],
  clients: [
    "Alberta Energy Regulator",
    "Government of Alberta",
    "Air Canada",
    "TD Bank",
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
    blurb: "Native and mobile-first experiences from the same TypeScript skill set.",
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
    ],
  },
];

export const experience: Role[] = [
  {
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
    stack: ["React", "TypeScript", "Node.js", "T-SQL", "Azure", "Docker", "Kubernetes", "Ant Design", "Tailwind"],
  },
  {
    company: "Mercor",
    title: "Senior Software Engineer - AI Model Training",
    period: "May 2025 - Dec 2025",
    location: "Remote",
    summary: "Generative AI training and evaluation across languages and domains.",
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
    company: "Government of Alberta",
    title: "Senior Software Developer",
    period: "Oct 2023 - Apr 2025",
    location: "Calgary, Canada",
    summary: "Enterprise microservices, data processing, and workflow automation on Azure.",
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
    stack: ["NestJS", "GraphQL", "TypeORM", "AKS", "Service Bus", "Cosmos DB", "Redis", "Terraform"],
  },
  {
    company: "GSTS",
    title: "Senior Software Developer - Full Stack",
    period: "May 2023 - Aug 2023",
    location: "Halifax, Canada (Remote)",
    summary: "Maritime GIS platform modernized onto AWS serverless and Spring Boot.",
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
    stack: ["Spring Boot", "Node.js", "AWS Lambda", "DynamoDB", "Leaflet", "Mapbox", "AppSync"],
  },
  {
    company: "IBM",
    title: "Application Developer - Full Stack",
    period: "Apr 2022 - Apr 2023",
    location: "Calgary, Canada",
    summary: "Lead Developer for Air Canada and Senior UI Developer for TD Bank.",
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
    stack: ["React", "Redux Toolkit", "Module Federation", "AWS", "Azure", "GraphQL", "Framer Motion"],
  },
  {
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
    stack: ["Angular", "React", "NgRx", "RxJS", "AWS Lambda", "Cognito", "CloudFormation"],
  },
  {
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
    stack: ["Node.js", "Express", "AngularJS", "Azure SQL", "PostgreSQL", "AWS"],
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
