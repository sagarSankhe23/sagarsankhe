import { motion, useReducedMotion } from "motion/react";
import { Building2, CheckCircle2, Sparkles } from "lucide-react";
import { experience } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function Timeline() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="section-pad relative border-y border-border bg-surface-2/40">
      <div className="shell">
        <SectionHeading
          index="02"
          kicker="Professional timeline"
          title="Where the releases shipped"
          description="Three broking and fintech firms, one throughline: audit-ready QA for systems that move real money."
        />

        <div className="relative">
          <div aria-hidden className="absolute left-4 top-2 hidden h-full w-px bg-border sm:block">
            <motion.div
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="h-full w-px bg-gradient-to-b from-primary via-violet to-transparent"
            />
          </div>

          <ol className="space-y-8 sm:pl-16">
            {experience.map((job, i) => (
              <li key={job.company} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-16 top-6 hidden size-9 items-center justify-center rounded-xl border border-glass-border bg-surface font-mono text-[11px] font-semibold text-primary sm:flex"
                >
                  {job.logo}
                </span>
                <Reveal delay={i * 0.08}>
                  <article className="glass-card rounded-2xl p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold sm:text-xl">{job.role}</h3>
                        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="size-4" aria-hidden />
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={
                            job.current
                              ? "mono-label rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary"
                              : "mono-label rounded-full border border-border px-3 py-1 text-muted-foreground"
                          }
                        >
                          {job.period}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="mono-label mb-3 text-muted-foreground">Responsibilities</p>
                        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                          {job.responsibilities.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mono-label mb-3 text-muted-foreground">Achievements</p>
                        <ul className="space-y-2 text-sm leading-relaxed">
                          {job.achievements.map((item) => (
                            <li key={item} className="flex gap-2">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-violet" aria-hidden />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-5">
                      <Sparkles className="size-3.5 text-muted-foreground" aria-hidden />
                      {job.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-accent px-2.5 py-1 font-mono text-[11px] text-accent-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
