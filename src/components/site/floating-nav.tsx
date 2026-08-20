import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navItems } from "@/data/portfolio";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-ss.png";

export function FloatingNav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();

  useEffect(() => {
    const ids = navItems.map((i) => i.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className={cn(
          "glass w-full max-w-4xl rounded-2xl px-3 py-2 transition-shadow duration-300",
          scrolled && "shadow-[0_20px_60px_-40px_var(--shadow-color)]",
        )}
      >
        <div className="flex items-center gap-2">
          <a
            href="#home"
            className="flex items-center gap-2 rounded-lg px-2 py-1 font-mono text-sm font-semibold tracking-tight"
          >
            <img
              src={logo}
              alt="Sagar Sankhe — QA logo"
              width={28}
              height={28}
              loading="eager"
              className="size-7 rounded-md shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_18%,transparent)]"
            />
            SAGAR.QA
          </a>

          <ul className="ml-auto hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    data-umami-event="nav-link"
                    data-umami-event-name={item.label}
                    className={cn(
                      "relative inline-flex items-center rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-lg bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              data-umami-event="theme-toggle"
              data-umami-event-name={theme === "dark" ? "to-light" : "to-dark"}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {theme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.ul
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-2 grid grid-cols-2 gap-1 border-t border-border pt-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </div>
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
