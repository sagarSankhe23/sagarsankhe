import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  title,
  kicker,
  description,
}: {
  index: string;
  title: string;
  kicker?: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      {kicker ? (
        <p className="mono-label mb-3 flex items-center gap-3 text-primary">
          <span aria-hidden className="h-px w-8 bg-primary" />
          {kicker}
        </p>
      ) : null}
      <h2 className="flex items-baseline gap-4 text-3xl font-bold sm:text-4xl">
        <span className="font-mono text-sm font-medium text-muted-foreground">{index}</span>
        <span className="text-gradient">{title}</span>
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
