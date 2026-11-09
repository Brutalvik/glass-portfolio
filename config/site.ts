export type SiteConfig = typeof siteConfig;

/**
 * Canonical URL. Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain;
 * until then the Vercel production URL is used automatically.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteConfig = {
  name: "Vikram Kumar",
  title: "Vikram Kumar - Senior Full Stack Developer",
  url: siteUrl.replace(/\/$/, ""),
  description:
    "Senior Full Stack Developer in Calgary with 12+ years across React, Angular, React Native, Node.js, NestJS, Spring Boot, SQL and NoSQL, Azure and AWS.",
  navItems: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
};
