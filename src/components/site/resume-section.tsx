import { useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { person, resumeEntries } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="rounded bg-primary/25 px-0.5 text-foreground">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function ResumeSection() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resumeEntries;
    return resumeEntries
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.toLowerCase().includes(q) || group.section.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  const total = results.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <section id="resume" className="section-pad relative">
      <div className="shell">
        <SectionHeading
          index="07"
          kicker="Interactive resume"
          title="Search the whole record"
          description="Type a segment, tool or system — “SPAN”, “Postman”, “BOD” — to filter the resume live, or take the PDF."
        />

        <Reveal>
          <div className="glass-card rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search resume — RMS, IPO, Jenkins, Angel One…"
                  aria-label="Search resume content"
                  className="min-h-11 w-full rounded-xl border border-input bg-surface/70 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary/60"
                />
              </div>
              <a
                href={person.resumeSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 text-sm font-semibold text-primary transition-transform duration-300 hover:-translate-y-0.5"
              >
                <ExternalLink className="size-4" aria-hidden />
                View all formats
              </a>
            </div>

            <p className="mono-label mt-4 text-muted-foreground" aria-live="polite">
              {total} matching {total === 1 ? "line" : "lines"}
            </p>

            <div className="mt-6 space-y-7">
              {results.map((group) => (
                <div key={group.section}>
                  <h3 className="mono-label border-b border-border pb-2 text-primary">
                    {highlight(group.section, query)}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-violet"
                        />
                        <span>{highlight(item, query)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {total === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No resume lines match “{query}”. Try a broader term like “OMS” or “regression”.
                </p>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
