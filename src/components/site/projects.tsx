import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Target, TrendingUp, UserCog } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

export function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0]?.name ?? null);

  return (
    <section id="projects" className="section-pad relative border-y border-border bg-surface-2/40">
      <div className="shell">
        <SectionHeading
          index="04"
          kicker="Featured projects"
          title="Systems I signed off on"
          description="Each one carried regulatory weight — exchange approvals, start-of-day risk state, or client money in motion."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => {
            const isOpen = open === project.name;
            return (
              <Reveal key={project.name} delay={i * 0.07}>
                <article className="glass-card flex h-full flex-col overflow-hidden rounded-2xl">
                  <div
                    className={cn(
                      "relative h-36 overflow-hidden border-b border-glass-border",
                      project.accent === "violet"
                        ? "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--violet)_28%,transparent),transparent_70%)]"
                        : "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_70%)]",
                    )}
                  >
                    <div aria-hidden className="grid-veil absolute inset-0 opacity-70" />
                    <div className="absolute inset-0 flex flex-col justify-between p-5">
                      <span className="mono-label w-fit rounded-full border border-glass-border bg-background/45 px-2.5 py-1 backdrop-blur-md">
                        {project.status}
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-bold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.tagline}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <UserCog className="size-4 text-primary" aria-hidden />
                      {project.role}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-accent px-2.5 py-1 font-mono text-[11px] text-accent-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : project.name)}
                      aria-expanded={isOpen}
                      data-umami-event="project-detail"
                      data-umami-event-name={project.name}
                      className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                    >
                      {isOpen ? "Hide case detail" : "View case detail"}
                      <ChevronDown
                        className={cn("size-4 transition-transform", isOpen && "rotate-180")}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 space-y-4 border-t border-border pt-4 text-sm">
                            <div>
                              <p className="mono-label mb-2 text-muted-foreground">
                                Responsibilities
                              </p>
                              <ul className="space-y-1.5 text-muted-foreground">
                                {project.responsibilities.map((r) => (
                                  <li key={r} className="flex gap-2">
                                    <span
                                      aria-hidden
                                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                                    />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="rounded-xl border border-border bg-surface/60 p-4">
                              <p className="flex items-center gap-2 font-semibold">
                                <Target className="size-4 text-violet" aria-hidden />
                                Challenge
                              </p>
                              <p className="mt-1.5 text-muted-foreground">{project.challenge}</p>
                            </div>
                            <div className="rounded-xl border border-primary/25 bg-primary/8 p-4">
                              <p className="flex items-center gap-2 font-semibold">
                                <TrendingUp className="size-4 text-primary" aria-hidden />
                                Business impact
                              </p>
                              <p className="mt-1.5 text-muted-foreground">{project.impact}</p>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-umami-event="project-link"
                        data-umami-event-name={project.name}
                        className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                      >
                        {project.link.replace("https://", "")}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
