/**
 * Long-form case studies, rendered at /projects/<slug>.
 * Each links back to a card in `projects` (config/resume.ts) by the same id.
 */

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type FlowNode = { title: string; detail: string };

export type CaseStudy = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  role: string;
  timeline: string;
  team: string;
  stack: string[];
  links?: { label: string; href: string }[];
  problem: string[];
  myRole: string[];
  design: { title: string; body: string }[];
  engineering: { title: string; body: string }[];
  results: { value: string; label: string }[];
  resultNotes: string[];
  shots?: Shot[];
  /** Architecture / flow diagram, used when screenshots can't be shared */
  flow?: { title: string; nodes: FlowNode[]; note?: string };
  confidentiality?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "torqlab",
    name: "TorqLab Automotive",
    eyebrow: "Case study - Web - My business",
    tagline:
      "A booking site that turns a driveway oil change into a quick online request.",
    summary:
      "TorqLab is my mobile oil change and brake service in Calgary. I designed and built the site and its quote API end to end, so customers can see prices, build an estimate, and request a time without phone tag.",
    role: "Founder, product designer, full-stack developer",
    timeline: "2026",
    team: "Solo",
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Three.js",
      "Tailwind CSS",
      "Express",
      "Zod",
      "SQLite",
      "Luxon",
      "Vercel",
    ],
    links: [
      { label: "View code", href: "https://github.com/Brutalvik/torqlab" },
    ],
    problem: [
      "Mobile auto service lives or dies on trust and convenience. Customers want to know what it costs and when someone can come, before they ever pick up the phone.",
      "As a small business I also needed quote intake that I own: no monthly form or CRM fees, and no customer data sitting in a third-party tool.",
    ],
    myRole: [
      "Everything: brand direction, information architecture, UI design, frontend, API, data storage, deployment, and the service terms.",
      "I treated it like a client project with a real launch: legal review of the copy, accessibility, analytics that respect privacy, and an operations workflow for handling requests.",
    ],
    design: [
      {
        title: "Premium, not pushy",
        body: "A dark, glassy interface with one accent color keeps the focus on the car and the prices. An interactive 3D car viewer with paint options makes the page feel like a showroom rather than a flyer.",
      },
      {
        title: "Prices up front",
        body: "Three clear service tiers with what is included, a highlighted most-popular option, and a note that the exact price is confirmed before work begins.",
      },
      {
        title: "An estimate that builds itself",
        body: "Customers pick a service, vehicle type, model and neighbourhood, and a live starting estimate updates beside the form. The appointment picker only offers valid Calgary-time slots.",
      },
    ],
    engineering: [
      {
        title: "Typed end to end",
        body: "React, TypeScript and Redux Toolkit on the frontend; an Express + TypeScript API with Zod schemas shared between client and server so validation rules never drift.",
      },
      {
        title: "Safe by default",
        body: "Helmet security headers, rate limiting, explicit consent capture, and a strict 2,000-character limit on notes. There is no public endpoint that can read customer requests.",
      },
      {
        title: "Zero-dependency storage",
        body: "Requests are stored with Node's built-in SQLite. A small CLI lists quotes and blocks or opens time slots, so day-to-day operations need no admin UI.",
      },
      {
        title: "Privacy-respecting analytics",
        body: "Vercel Web Analytics with query strings and hash fragments stripped, and no form values or custom events sent.",
      },
    ],
    results: [
      { value: "3", label: "Service tiers with prices up front" },
      { value: "Instant", label: "Starting estimate as the form is filled" },
      { value: "$0", label: "Monthly SaaS cost for quote intake" },
    ],
    resultNotes: [
      "Customers get a starting estimate and a reference number instantly, and I get a complete request with vehicle, location and preferred time.",
      "The site doubles as the brand: the same visual language carries through to quotes and follow-ups.",
    ],
    shots: [
      {
        src: "/case-studies/torqlab/hero.webp",
        alt: "TorqLab home page with a 3D car viewer",
        caption:
          "Home: the driveway experience, with an interactive 3D car viewer.",
        width: 1440,
        height: 900,
      },
      {
        src: "/case-studies/torqlab/services.webp",
        alt: "Three oil change service tiers with prices",
        caption: "Service tiers with prices and inclusions up front.",
        width: 1360,
        height: 520,
      },
      {
        src: "/case-studies/torqlab/quote.webp",
        alt: "Quote request form with appointment picker",
        caption:
          "Quote request with consent, validation and a Calgary-time appointment picker.",
        width: 1360,
        height: 610,
      },
    ],
  },
  {
    slug: "cervv",
    name: "Cervv",
    eyebrow: "Case study - Mobile - React Native",
    tagline:
      "Keeping a growing React Native app consistent and type-safe as it evolves.",
    summary:
      "Cervv is a cross-platform mobile app in active development. My focus has been the foundations that let it grow without getting messy: shared API contracts, a theme-token design system, and a clearer explore experience.",
    role: "React Native developer",
    timeline: "2026 - present",
    team: "Small product team",
    stack: [
      "React Native",
      "TypeScript",
      "Shared contracts package",
      "Design tokens",
    ],
    problem: [
      "Mobile apps drift. Screens pick up one-off colors and spacing, and API changes quietly break assumptions in the app until a user finds the bug.",
      "Cervv needed a way to keep the UI consistent and catch contract changes at build time, without slowing feature work.",
    ],
    myRole: [
      "Cleaned up and redesigned the Explore screen around theme tokens.",
      "Tightened TypeScript types against the shared @cervv/contracts package so app and backend agree on shapes like CatalogCategory.",
    ],
    design: [
      {
        title: "Tokens, not one-offs",
        body: "Color, spacing and type come from theme tokens, so every screen inherits the same rhythm and a visual change is a one-line edit.",
      },
      {
        title: "Explore, simplified",
        body: "The catalog and explore flow was reorganized for scanning and touch: clearer categories, larger targets, and fewer competing elements.",
      },
    ],
    engineering: [
      {
        title: "One source of truth for data shapes",
        body: "A shared contracts package defines the types both the backend and the app use. If the API changes, the app fails to compile instead of failing in production.",
      },
      {
        title: "Type debt paid down",
        body: "Replaced loose types and casts in the explore flow with the contract types, which removed a class of runtime null and shape errors.",
      },
    ],
    results: [
      { value: "Shared", label: "Contract types for app and API" },
      { value: "Tokens", label: "For color, spacing and type" },
      { value: "Build-time", label: "When contract drift is caught" },
    ],
    resultNotes: [
      "The Explore screen now follows the token system and the shared contract types, making future screens faster to build consistently.",
    ],
    flow: {
      title: "How the pieces fit",
      nodes: [
        { title: "Backend API", detail: "Serves catalog and user data" },
        {
          title: "@cervv/contracts",
          detail: "Shared TypeScript types, e.g. CatalogCategory",
        },
        {
          title: "React Native app",
          detail: "Screens typed against the contracts",
        },
        {
          title: "Theme tokens",
          detail: "Color, spacing and type for every component",
        },
      ],
      note: "Diagram. The codebase is private, so screens are not shown here.",
    },
    confidentiality:
      "Private codebase. Happy to walk through it in an interview.",
  },
  {
    slug: "aer-bulk-submission",
    name: "Regulatory Bulk Submission",
    eyebrow: "Case study - Enterprise - Alberta Energy Regulator",
    tagline:
      "Validating and loading large regulatory spreadsheets, with errors shown as you type.",
    summary:
      "At the Alberta Energy Regulator I built full-stack bulk submission workflows: a React grid where submitters fix data before it is sent, and a Node.js + T-SQL pipeline that validates, de-duplicates and loads it into SQL on Azure.",
    role: "Senior Software Developer, full stack",
    timeline: "Jan 2026 - Aug 2026",
    team: "Agile product team",
    stack: [
      "React",
      "TypeScript",
      "Ant Design",
      "Tailwind CSS",
      "Node.js",
      "T-SQL",
      "Azure Blob Storage",
      "Azure Key Vault",
      "Azure AD / MSAL",
      "Docker",
      "Kubernetes",
      "Azure DevOps",
      "Nginx",
    ],
    problem: [
      "Industry submits regulatory data in bulk spreadsheets that can be very large and vary by submission type.",
      "Every row has to be validated, checked for duplicates and loaded safely, and submitters need to see and fix problems themselves rather than waiting on a rejection.",
    ],
    myRole: [
      "Designed and delivered the ingestion workflow from file intake to SQL load, and the React interfaces submitters and administrators use.",
      "Owned deployment reliability: container builds, Kubernetes overlays, secrets, routing and authentication across dev, test and production.",
    ],
    design: [
      {
        title: "Fix it in the grid",
        body: "A custom virtualized spreadsheet grid handles large datasets smoothly and validates inline: errors are highlighted on the cell, duplicate rows are flagged, and feedback is immediate.",
      },
      {
        title: "Multi-step, never lost",
        body: "Submission is broken into clear steps with progress, so a long upload or validation run never leaves the user guessing.",
      },
      {
        title: "Built from shared parts",
        body: "Reusable Ant Design and Tailwind components for filters, forms and calculation-driven screens keep every workflow consistent.",
      },
    ],
    engineering: [
      {
        title: "Schema-aware ingestion",
        body: "Reusable Node.js/TypeScript pipeline components map spreadsheet headers to database parameters dynamically, replacing hard-coded transformation logic per submission type.",
      },
      {
        title: "Validation where the data lives",
        body: "T-SQL stored procedures with dynamic SQL, type conversion and uniqueness checks validate staged data before it is loaded.",
      },
      {
        title: "Large files, live progress",
        body: "Multi-file uploads up to 2.5 GB go to Azure Blob Storage. Server-Sent Events stream progress for long-running ingestion back to the UI.",
      },
      {
        title: "Secure, repeatable delivery",
        body: "MSAL with Azure AD and role-based routes; secrets resolved from Key Vault per environment; Docker images deployed to Kubernetes through Azure DevOps with Nginx routing.",
      },
    ],
    results: [
      { value: "2.5 GB", label: "Multi-file uploads supported" },
      { value: "Inline", label: "Validation and duplicate detection" },
      { value: "3", label: "Environments with isolated secrets" },
    ],
    resultNotes: [
      "Dynamic header mapping reduced hard-coded transformation logic and improved data accuracy across submission types.",
      "Fixed authentication redirect loops, token acquisition and session-storage conflicts, and closed CI/CD gaps in deployment overlays and Key Vault configuration.",
      "Live progress made long-running ingestion observable for both users and the team.",
    ],
    flow: {
      title: "Submission pipeline",
      nodes: [
        {
          title: "Upload",
          detail: "Multi-file, up to 2.5 GB, in the React app",
        },
        { title: "Blob Storage", detail: "Files persisted on Azure" },
        {
          title: "Parse and map",
          detail: "Node.js maps headers to DB parameters",
        },
        {
          title: "Staging + T-SQL",
          detail: "Type checks, uniqueness, integrity rules",
        },
        { title: "Load", detail: "Validated rows written to SQL" },
      ],
      note: "Diagram. This is an internal government system, so production screens are not shown.",
    },
    confidentiality:
      "Internal Alberta Energy Regulator system. No production data or screens are shown.",
  },
];

export const caseStudyBySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
