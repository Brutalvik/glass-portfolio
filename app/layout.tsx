import "@fontsource-variable/inter";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { Navbar } from "@/components/navbar";
import { TimeBackground } from "@/components/time-background";
import { TimeControl } from "@/components/time-control";
import { sceneBootScript } from "@/config/background-map";
import { experience, profile } from "@/config/resume";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: profile.linkedin }],
  keywords: [
    "Senior Full Stack Developer",
    "Calgary",
    "React",
    "React Native",
    "Angular",
    "Node.js",
    "NestJS",
    "Spring Boot",
    "Azure",
    "AWS",
    "UI/UX",
  ],
  openGraph: {
    type: "profile",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: siteConfig.title },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d17",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: siteConfig.url,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  sameAs: [profile.linkedin, profile.github],
  worksFor: { "@type": "Organization", name: experience[0].company },
  knowsAbout: [
    "React",
    "React Native",
    "Angular",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Spring Boot",
    "SQL",
    "Azure",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning data-theme="dark" lang="en">
      <head>
        {/* Sets theme + preloads the right background before first paint */}
        {}
        <script dangerouslySetInnerHTML={{ __html: sceneBootScript }} />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body className="min-h-screen antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers>
          <TimeBackground />
          <Navbar />
          <main
            className="mx-auto max-w-6xl px-5 md:px-8"
            id="main"
            tabIndex={-1}
          >
            {children}
          </main>
          <TimeControl />
        </Providers>
      </body>
    </html>
  );
}
