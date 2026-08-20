import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { skillGroups } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

function Bar({
  label,
  level,
  delay,
  active,
}: {
  label: string;
  level: number;
  delay: number;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (reduce) {
      setWidth(level);
      return;
    }
    if (!active) {
      setWidth(0);
      return;
    }
    const t = window.setTimeout(() => setWidth(level), 120 + delay * 1000);
    return () => window.clearTimeout(t);
  }, [level, delay, reduce, active]);


  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{level}%</span>
      </div>
      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-accent"
        role="progressbar"
        aria-label={label}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-violet transition-[width] duration-[1100ms] ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const [activeGroup, setActiveGroup] = useState(skillGroups[0]!.name);
  const current = skillGroups.find((g) => g.name === activeGroup) ?? skillGroups[0]!;
  const barsRef = useRef<HTMLDivElement>(null);
  const barsInView = useInView(barsRef, { margin: "-60px" });


  return (
    <section id="skills" className="section-pad relative">
      <div className="shell">
        <SectionHeading
          index="03"
          kicker="Skills"
          title="Depth where trading systems break"
          description="Grouped by discipline — pick a track to see proficiency across the tools and domains I use daily."
        />

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Reveal>
            <div
              role="tablist"
              aria-label="Skill groups"
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {skillGroups.map((group) => {
                const isActive = group.name === activeGroup;
                return (
                  <button
                    key={group.name}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveGroup(group.name)}
                    data-umami-event="skill-tab"
                    data-umami-event-name={group.name}
                    className={cn(
                      "relative inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl border px-4 text-sm font-medium transition-all duration-300 lg:w-full",
                      isActive
                        ? "border-primary/45 bg-primary/10 text-foreground"
                        : "border-border bg-surface/60 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    )}
                  >
                    <group.icon
                      className={cn("size-4", isActive ? "text-primary" : "text-muted-foreground")}
                      aria-hidden
                    />
                    {group.name}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div ref={barsRef} className="h-full">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="glass-card h-full rounded-2xl p-6 sm:p-8"
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <current.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{current.name}</h3>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {current.skills.length} tracked competencies
                  </p>
                </div>
              </div>
              <div className="space-y-5">

                {current.skills.map((skill, i) => (
                  <Bar
                    key={`${current.name}-${skill.label}`}
                    label={skill.label}
                    level={skill.level}
                    delay={i * 0.08}
                    active={barsInView}
                  />
                ))}
              </div>
            </motion.div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
