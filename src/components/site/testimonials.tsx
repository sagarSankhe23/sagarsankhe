import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/portfolio";
import { SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = testimonials[index]!;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="section-pad relative border-y border-border bg-surface-2/40"
    >
      <div className="shell">
        <SectionHeading
          index="06"
          kicker="Testimonials"
          title="What colleagues say"
          description="Recommendations from product, engineering and compliance partners across trading platform releases."
        />

        <div
          className="glass-card relative overflow-hidden rounded-3xl p-8 sm:p-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Recommendations"
        >
          <Quote className="size-8 text-primary/50" aria-hidden />

          <div className="mt-6 min-h-44 sm:min-h-36">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
                aria-live="polite"
              >
                <p className="text-lg font-medium leading-relaxed sm:text-xl">“{active.quote}”</p>
                <footer className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet font-mono text-xs font-bold text-primary-foreground"
                  >
                    {active.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{active.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{active.title}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <div className="flex gap-2" role="tablist" aria-label="Select recommendation">
              {testimonials.map((t, i) => (
                <button
                  key={t.name + i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Recommendation ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-primary" : "w-3 bg-border hover:bg-muted-foreground",
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous recommendation"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next recommendation"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
