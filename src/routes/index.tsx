import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { FloatingNav } from "@/components/site/floating-nav";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Timeline } from "@/components/site/timeline";
import { Skills } from "@/components/site/skills";
import { Projects } from "@/components/site/projects";
import { Credentials } from "@/components/site/credentials";
import { Testimonials } from "@/components/site/testimonials";
import { ResumeSection } from "@/components/site/resume-section";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { MouseGlow } from "@/components/site/effects";

const TITLE = "Sagar Sankhe — Senior QA Engineer, Capital Markets";
const DESCRIPTION =
  "Senior Quality Assurance Engineer with 8+ years in capital markets and BFSI fintech. OMS, RMS and multi-exchange trading platform QA. 25+ releases, zero critical defects.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sagar Sankhe",
          jobTitle: "Senior Quality Assurance Engineer",
          worksFor: { "@type": "Organization", name: "JM Financial Services Limited" },
          email: "mailto:sagarsankhe23@gmail.com",
          sameAs: ["https://linkedin.com/in/sagarsankhe23"],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mumbai",
            addressCountry: "IN",
          },
          knowsAbout: [
            "Quality Assurance",
            "Trading Platform Testing",
            "OMS",
            "RMS",
            "BFSI",
            "Capital Markets",
            "ISTQB",
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <MouseGlow />
      <FloatingNav />
      <main id="main">
        <Hero />
        <Stats />
        <Timeline />
        <Skills />
        <Projects />
        <Credentials />
        <Testimonials />
        {/* Interactive resume temporarily hidden — keep code for later */}
        {false ? <ResumeSection /> : null}
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
