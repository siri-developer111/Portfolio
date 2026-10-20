"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, maskReveal, MQ, registerGsap, useGSAP } from "@/lib/animations";

registerGsap();

type RevealKind = "rise" | "words";

/**
 * Scroll-triggered entrance for a block.
 * - "rise": direct children fade and rise in sequence.
 * - "words": any `[data-word]` spans (from <SplitWords/>) slide up out of their masks.
 * Content is fully visible by default; animation only applies with motion allowed.
 */
export function Reveal({
  children,
  as: Tag = "div",
  kind = "rise",
  className,
  start = "top 85%",
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  kind?: RevealKind;
  className?: string;
  start?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        if (kind === "words") {
          maskReveal(el.querySelectorAll("[data-word]"), {
            stagger: stagger * 0.6,
            delay,
            scrollTrigger: { trigger: el, start, once: true },
          });
        } else {
          gsap.fromTo(
            el.children,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              stagger,
              delay,
              scrollTrigger: { trigger: el, start, once: true },
            },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
