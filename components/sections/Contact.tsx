"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { site } from "@/data/site";
import { CtaButton } from "@/components/ui/CtaButton";
import { SplitWords } from "@/components/motion/SplitWords";
import { Check, Copy } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { EASE, gsap, maskReveal, MQ, registerGsap, useGSAP } from "@/lib/animations";

registerGsap();

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // The dark panel expands from an inset card to full bleed.
        gsap.fromTo(
          q("[data-panel]"),
          { clipPath: "inset(6% 4% 0% 4% round 2.5rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0rem)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 95%", end: "top 25%", scrub: true },
          },
        );
        maskReveal(q("[data-word]"), {
          stagger: 0.05,
          scrollTrigger: { trigger: q("[data-headline]")[0], start: "top 80%", once: true },
        });
        gsap.fromTo(
          q("[data-orb]"),
          { scale: 0.6, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: EASE.soft,
            scrollTrigger: { trigger: root.current, start: "top 60%", end: "center center", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" ref={root} aria-labelledby="contact-title" className="relative bg-ivory">
      <div data-panel data-theme="dark" className="relative overflow-hidden bg-ink text-ivory">
        <div
          data-orb
          aria-hidden
          className="pointer-events-none absolute -right-[20vw] -top-[20vw] size-[60vw] rounded-full bg-[radial-gradient(circle,rgba(255,63,108,0.35),transparent_65%)]"
        />
        <div className="container-x relative pb-16 pt-32 md:pt-44">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-accent">(06)</span>
            <span className="eyebrow text-white/50">Contact</span>
          </div>

          <div data-headline>
            <SplitWords
              as="h2"
              id="contact-title"
              text="Have an idea worth *building?*"
              className="display mt-8 block max-w-[14ch] text-[clamp(3.4rem,10vw,11.5rem)] leading-[0.88]"
            />
          </div>

          <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="max-w-md text-[1.15rem] leading-relaxed text-white/70">
                Let&apos;s turn your next ambitious idea into something extraordinary.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <CtaButton href={`mailto:${site.email}`} variant="light" cursor="Write">
                  Start a project
                </CtaButton>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow text-white/50">Email</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-white/15 pb-6">
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline break-all text-[clamp(1.4rem,3vw,2.6rem)] tracking-[-0.03em]"
                >
                  {site.email}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white hover:text-ink"
                  aria-live="polite"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "done" : "copy"}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="inline-flex items-center gap-2"
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      {copied ? "Copied" : "Copy email"}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>

              <p className="eyebrow mt-10 text-white/50">Elsewhere</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-4">
                {site.socials.map((s) =>
                  s.href ? (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between border-b border-white/15 py-3 text-white/85 hover:text-white"
                      >
                        {s.label}
                        <span className="text-accent transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                      </a>
                    </li>
                  ) : (
                    <li key={s.label}>
                      <span
                        aria-disabled="true"
                        title="Profile link not added yet"
                        className="flex items-center justify-between border-b border-white/10 py-3 text-white/35"
                      >
                        {s.label}
                        <span className="eyebrow text-[0.6rem]">Soon</span>
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
}
