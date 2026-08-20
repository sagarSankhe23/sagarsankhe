import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, FileText, Mail, MapPin, ShieldCheck } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { person, typingLines } from "@/data/portfolio";
import { Particles, Parallax } from "./effects";

function TypingLine() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      setText(typingLines[0] ?? "");
      return;
    }
    const full = typingLines[index % typingLines.length] ?? "";
    const done = !deleting && text === full;
    const cleared = deleting && text === "";

    const timer = window.setTimeout(
      () => {
        if (done) {
          setDeleting(true);
          return;
        }
        if (cleared) {
          setDeleting(false);
          setIndex((i) => (i + 1) % typingLines.length);
          return;
        }
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      },
      done ? 2100 : deleting ? 22 : 45,
    );

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, reduce]);

  return (
    <p
      className="flex min-h-14 items-start font-mono text-sm text-primary sm:min-h-8 sm:text-base"
      aria-live="polite"
    >
      <span>{text}</span>
      <span
        aria-hidden
        className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-primary"
      />
    </p>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden pb-3 pt-28 sm:pb-4 sm:pt-32">
      <div aria-hidden className="hero-aura absolute inset-0 -z-10" />
      <div aria-hidden className="grid-veil absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10">
        <Particles />
      </div>

      <div className="shell grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mono-label mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-primary"
          >
            <ShieldCheck className="size-3.5" aria-hidden />
            Capital Markets · BFSI
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="text-4xl font-bold leading-[1.06] sm:text-6xl"
          >
            <span className="text-gradient">{person.name}</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-4 text-xl font-semibold sm:text-2xl"
          >
            {person.role}
            <span className="mt-1 block text-base font-medium text-muted-foreground sm:text-lg">
              {person.specialism}
            </span>
          </motion.p>

          <div className="mt-6">
            <TypingLine />
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
          >
            {person.summary}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href={person.resumeSite}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="view-resume"
              className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_18px_50px_-24px_var(--glow-color)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <FileText className="size-4" aria-hidden />
              View Resume
            </a>
            <a
              href="#contact"
              data-umami-event="contact-me"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50"
            >
              <Mail className="size-4" aria-hidden />
              Contact Me
            </a>
          </motion.div>

          <p className="mt-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden />
            {person.location} · {person.title}, {person.company}
          </p>
        </div>

        <Parallax strength={14} className="relative mx-auto w-full max-w-[300px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-card relative overflow-hidden rounded-[24px] p-2.5"
          >
            <div
              aria-hidden
              className="absolute -right-12 -top-12 size-36 rounded-full bg-violet/25 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-[18px]">
              <img
                src={portrait}
                alt="Portrait of Sagar Sankhe, Senior Quality Assurance Engineer"
                width={1024}
                height={1280}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/85 to-transparent"
              />
            </div>
            <div className="mt-2.5 rounded-xl border border-glass-border bg-background/60 p-2.5 backdrop-blur-md">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                QA sign-off · verified
              </p>
              <p className="mt-1 text-[12px] font-semibold leading-snug">
                8+ years · 5 trading platforms · 0 critical defects leaked
              </p>
            </div>
          </motion.div>
        </Parallax>
      </div>


      <div className="shell mt-6">
        <a
          href="#stats"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowDown className="size-3.5 animate-bounce" aria-hidden />
          Scroll for the numbers
        </a>
      </div>
    </section>
  );
}
