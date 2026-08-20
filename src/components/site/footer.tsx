import { ArrowUp, Linkedin, Mail } from "lucide-react";
import { person } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="shell flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {person.name} · {person.location}
        </p>
        <div className="flex items-center gap-2">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <Linkedin className="size-4" aria-hidden />
          </a>
          <a
            href={`mailto:${person.email}`}
            aria-label="Send an email"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <Mail className="size-4" aria-hidden />
          </a>
          <a
            href="#home"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
