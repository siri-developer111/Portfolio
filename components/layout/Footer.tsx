"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { navItems, site } from "@/data/site";
import { ArrowUp } from "@/components/ui/Icons";
import { gsap, MQ, registerGsap, useGSAP } from "@/lib/animations";

registerGsap();

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Solid wordmark wipes in over its outline as the footer arrives.
        gsap.fromTo(
          q("[data-fill]"),
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 90%", end: "bottom bottom", scrub: true },
          },
        );
        gsap.fromTo(
          q("[data-letter]"),
          { yPercent: 40 },
          {
            yPercent: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 95%", end: "bottom bottom", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <footer ref={root} className="relative border-t border-white/10">
      <div className="container-x flex flex-wrap items-center justify-between gap-6 py-8">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((n) => (
              <li key={n.id}>
                <Link href={`/#${n.id}`} className="link-underline text-sm text-white/60 hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <motion.button
          type="button"
          onClick={toTop}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          className="group inline-flex items-center gap-3 text-sm text-white/70 hover:text-white"
        >
          Back to top
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-white/20 group-hover:border-accent group-hover:bg-accent">
            <ArrowUp size={16} className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-10" />
            <ArrowUp size={16} className="absolute translate-y-10 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0" />
          </span>
        </motion.button>
      </div>

      <div className="container-x relative overflow-hidden" aria-hidden>
        <div className="relative">
          <p className="display text-outline flex justify-between text-[26vw] leading-[0.78] tracking-[-0.06em] text-white/25">
            {"SIRI".split("").map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </p>
          <p
            data-fill
            className="display absolute inset-0 flex justify-between text-[26vw] leading-[0.78] tracking-[-0.06em] text-ivory"
          >
            {"SIRI".split("").map((l, i) => (
              <span key={i} data-letter className="inline-block">
                {l}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/45">
        <p>
          © {new Date().getFullYear()} {site.fullName}. Designed &amp; built with care.
        </p>
        <p className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent" />
          Concept projects are fictional explorations.
        </p>
      </div>
    </footer>
  );
}
