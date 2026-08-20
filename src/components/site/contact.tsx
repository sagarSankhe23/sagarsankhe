import { useState } from "react";
import { Linkedin, Loader2, Mail, MapPin, Send, Wrench } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { person } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  message: z.string().trim().min(10, "Tell me a little more (10+ characters)").max(1000),
});

const channels = [
  { label: "Email", value: person.email, href: `mailto:${person.email}`, icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/sagarsankhe23", href: person.linkedin, icon: Linkedin },
  { label: "QA Forge", value: "qaforge.netlify.app", href: person.github, icon: Wrench },
  { label: "Location", value: person.location, href: null, icon: MapPin },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    const subject = encodeURIComponent(`Portfolio enquiry from ${parsed.data.name}`);
    const body = encodeURIComponent(`${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`);
    window.setTimeout(() => {
      setSending(false);
      window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
      toast.success("Opening your email client", {
        description: "Your message is ready to send to Sagar.",
      });
      setForm({ name: "", email: "", message: "" });
    }, 550);
  };

  return (
    <section id="contact" className="section-pad relative border-t border-border">
      <div aria-hidden className="hero-aura absolute inset-0 -z-10 opacity-60" />
      <div className="shell">
        <SectionHeading
          index="08"
          kicker="Contact"
          title="Let's talk release quality"
          description="Open to Senior / Lead QA roles in capital markets and BFSI fintech. Fastest route is email — I reply personally."
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <ul className="space-y-3">
              {channels.map((c) => {
                const inner = (
                  <span className="glass-card flex items-center gap-4 rounded-2xl p-5">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                      <c.icon className="size-4.5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="mono-label block text-muted-foreground">{c.label}</span>
                      <span className="block truncate text-sm font-medium">{c.value}</span>
                    </span>
                  </span>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer noopener"
                        data-umami-event="contact-channel"
                        data-umami-event-name={c.label}
                        className="block"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="glass-card rounded-3xl p-6 sm:p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mono-label text-muted-foreground">
                    NAME
                  </label>
                  <input
                    id="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    aria-invalid={Boolean(errors["name"])}
                    aria-describedby={errors["name"] ? "err-name" : undefined}
                    className="mt-2 min-h-11 w-full rounded-xl border border-input bg-surface/70 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary/60"
                    placeholder="Your Name"
                  />
                  {errors["name"] ? (
                    <p id="err-name" className="mt-1.5 text-xs text-destructive">
                      {errors["name"]}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mono-label text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    aria-invalid={Boolean(errors["email"])}
                    aria-describedby={errors["email"] ? "err-email" : undefined}
                    className="mt-2 min-h-11 w-full rounded-xl border border-input bg-surface/70 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary/60"
                    placeholder="Your Email"
                  />
                  {errors["email"] ? (
                    <p id="err-email" className="mt-1.5 text-xs text-destructive">
                      {errors["email"]}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="mono-label text-muted-foreground">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  aria-invalid={Boolean(errors["message"])}
                  aria-describedby={errors["message"] ? "err-message" : undefined}
                  className="mt-2 w-full resize-y rounded-xl border border-input bg-surface/70 p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary/60"
                  placeholder="What would you like to reach out about?"
                />
                {errors["message"] ? (
                  <p id="err-message" className="mt-1.5 text-xs text-destructive">
                    {errors["message"]}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={sending}
                data-umami-event="send-message"
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
              >
                {sending ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="size-4" aria-hidden />
                )}
                {sending ? "Preparing…" : "Send message"}
              </button>
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                Goes straight to {person.email}.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
