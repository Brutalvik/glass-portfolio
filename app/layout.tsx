import "@fontsource-variable/inter";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import { TimeBackground } from "@/components/time-background";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Senior Full Stack Developer`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d17",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="dark" lang="en">
      <head />
      <body className="min-h-screen antialiased">
        <Providers themeProps={{ attribute: "class", forcedTheme: "dark" }}>
          <TimeBackground />
          <Navbar />
          <main className="mx-auto max-w-6xl px-5 md:px-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
