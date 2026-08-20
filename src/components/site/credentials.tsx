import { ExternalLink } from "lucide-react";
import { awards, certifications, person } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function Credentials() {
  return (
    <section id="credentials" className="section-pad relative">
      <div className="shell">
        <SectionHeading
          index="05"
          kicker="Certifications & recognition"
          title="Credentials on the record"
          description="ISTQB-certified, currently completing the CT-AI specialism, and recognised repeatedly for release quality."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 0.06}>
              <article className="glass-card flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <cert.icon className="size-5" aria-hidden />
                  </span>
                  <span className="mono-label rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                    {cert.status}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold leading-snug">{cert.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cert.issuer} · {cert.date}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <Reveal className="mb-8">
            <h3 className="flex items-baseline gap-4 text-2xl font-bold">
              <span className="font-mono text-sm font-medium text-muted-foreground">05.1</span>
              <span className="accent-gradient">Awards & Achievements</span>
            </h3>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((award, i) => (
              <Reveal key={award.name} delay={i * 0.06}>
                <article className="glass-card group relative h-full overflow-hidden rounded-2xl p-6">
                  <div
                    aria-hidden
                    className="absolute -bottom-10 -right-10 size-28 rounded-full bg-violet/20 blur-2xl transition-transform duration-500 group-hover:scale-125"
                  />
                  <award.icon className="size-5 text-violet" aria-hidden />
                  <h4 className="mt-5 text-base font-semibold leading-snug">{award.name}</h4>
                  <p className="mono-label mt-1.5 text-muted-foreground">
                    {award.org} · {award.date}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{award.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            data-umami-event="verify-credentials-linkedin"
            className="mt-10 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Verify credentials on LinkedIn
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
