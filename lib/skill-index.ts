import { experience, projects, skillGroups } from "@/config/resume";

/**
 * Maps each skill to the roles and projects that mention it, so clicking a
 * skill can highlight where it was actually used.
 *
 * Most skills match on their own name. Composite or descriptive skills
 * ("Formik / Yup / Zod forms") need explicit search terms, listed here.
 */
const TERMS: Record<string, string[]> = {
  "Responsive SPA design": ["responsive", "single-page"],
  "Reusable component libraries": [
    "reusable",
    "shared components",
    "shared ui",
  ],
  "Design systems": [
    "theme-token",
    "design tokens",
    "reusable ui",
    "shared components",
  ],
  "Virtualized data grids": ["virtualized"],
  "Inline validation and error states": ["inline validation"],
  "Multi-step wizard flows": ["multi-step"],
  "Formik / Yup / Zod forms": ["formik", "yup", "zod"],
  "Leaflet and Mapbox GIS": ["leaflet", "mapbox", "geospatial"],
  "React Toastify and tooltips": ["toastify", "tooltip*"],
  "react-to-print reporting": ["react-to-print"],
  "Performance (useMemo, useCallback)": ["usememo", "usecallback"],
  "Redux Thunk / Persist": ["thunk", "redux persist"],
  "Webpack 5 Module Federation": ["module federation"],
  "Custom Hooks": ["hooks"],
  "Mobile-first responsive UI": [
    "mobile-optimized",
    "react native",
    "touch ergonomics",
  ],
  "Mobile-optimized AngularJS apps": ["mobile-optimized"],
  "Shared UI across platforms": ["across angular and react", "shared ui"],
  "Apollo Server": ["apollo server", "apollo"],
  "AWS AppSync": ["appsync"],
  "Server-Sent Events": ["server-sent"],
  Microservices: ["microservice*"],
  "Event-driven architecture": ["event-driven"],
  "Repository and DTO patterns": ["repository pattern*", "DTO"],
  "DynamoDB Streams / TTL": ["dynamodb streams", "TTL"],
  "Stored procedures": ["stored procedure*"],
  "Dynamic SQL": ["dynamic sql"],
  "Indexing and execution plans": ["indexes", "execution plans"],
  "Bulk ingestion and staging": ["ingestion", "staging", "stages"],
  "S3 / CloudFront": ["s3", "cloudfront"],
  "SQS / SNS": ["SQS", "SNS"],
  "CloudFormation / SAM": ["cloudformation", "aws sam"],
  "Azure AD / MSAL": ["azure ad", "MSAL", "entra"],
  "Log Analytics / KQL": ["log analytics", "KQL"],
  "Azure App Service": ["app service"],
  "Azure DevOps": ["azure devops"],
  "AWS CodePipeline": ["codepipeline"],
  "Java Spring Boot": ["spring boot"],
  "Amazon RDS": ["rds"],
  "Amazon Cognito": ["cognito"],
  "AWS IAM": ["IAM"],
  "AWS X-Ray": ["x-ray"],
  "Azure Monitor": ["azure monitor"],
  "Application Insights": ["application insights"],
  "LLM evaluation": ["evaluat*", "LLM", "LLMs"],
  "Rubric design": ["rubric*"],
  "Prompt engineering": ["prompt*"],
  "AI code review": ["ai-generated code", "model-generated code"],
  "Hallucination analysis": ["hallucination"],
  "Security review of AI output": ["security risks", "sql injection"],
  "Engineering scenario design": ["scenario*"],
  "Codebase analysis": ["codebase"],
  "Apollo Client": ["apollo client"],
  "OpenID Connect": ["openid connect", "OIDC"],
};

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toRegex = (term: string) => {
  // All-caps acronyms (AWS, SNS, MSAL) match case-sensitively to avoid "rest", "sns..." noise
  const caseSensitive =
    term.length <= 5 && term === term.toUpperCase() && /[A-Z]/.test(term);
  // A trailing "*" marks a stem ("evaluat*" matches evaluate, evaluation, evaluated)
  const stem = term.endsWith("*");
  const word = stem ? term.slice(0, -1) : term;
  const tail = stem ? "" : "(?![\\w#+])";

  return new RegExp(
    `(?<![\\w-])${escape(word)}${tail}`,
    caseSensitive ? "" : "i",
  );
};

const termsFor = (skill: string) =>
  (TERMS[skill] ?? [skill.replace(/\s*\(.*\)\s*/, "")]).map(toRegex);

const roleText = experience.map((r) => ({
  id: r.id,
  text: [
    r.title,
    r.summary,
    ...r.highlights,
    ...(r.more ?? []),
    ...r.stack,
    ...(r.keywords ?? []),
  ].join(" \n "),
}));

const projectText = projects.map((p) => ({
  id: p.id,
  text: [p.tagline, p.summary, ...p.highlights, ...p.stack].join(" \n "),
}));

export type SkillUsage = { roles: string[]; projects: string[] };

export const skillUsage: Record<string, SkillUsage> = Object.fromEntries(
  skillGroups
    .flatMap((g) => g.skills)
    .concat(
      experience.flatMap((r) => r.stack),
      projects.flatMap((p) => p.stack),
    )
    .map((skill) => {
      const res = termsFor(skill);
      const hit = (t: string) => res.some((re) => re.test(t));

      return [
        skill,
        {
          roles: roleText.filter((r) => hit(r.text)).map((r) => r.id),
          projects: projectText.filter((p) => hit(p.text)).map((p) => p.id),
        },
      ];
    }),
);

export const usageCount = (skill: string) => {
  const u = skillUsage[skill];

  return u ? u.roles.length + u.projects.length : 0;
};
