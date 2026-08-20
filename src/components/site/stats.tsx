import { stats } from "@/data/portfolio";
import { Counter } from "./effects";
import { Reveal, SectionHeading } from "./primitives";

export function Stats() {
  return (
    <section id="stats" className="section-pad relative">
      <div className="shell">
        <SectionHeading
          index="01"
          kicker="By the numbers"
          title="Eight years of measurable release quality"
          description="Coverage across the full order lifecycle — placement, modification, cancellation, margin and risk checks, BOD/EOD processing and multi-exchange sync."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07}>
              <div className="glass-card group relative h-full overflow-hidden rounded-2xl p-6">
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
                />
                <stat.icon className="size-5 text-primary" aria-hidden />
                <p className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mono-label mt-2 text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
