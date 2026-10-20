"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

/** Register GSAP plugins exactly once (safe to call from every component). */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: EASE.out, duration: 1 });
  registered = true;
}

export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
  smooth: "power2.inOut",
} as const;

/** Media conditions shared by every gsap.matchMedia() call. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
} as const;

/**
 * Masked word/line reveal: targets are inner spans sitting inside an
 * `overflow: hidden` wrapper (see <SplitWords />).
 */
export function maskReveal(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    { yPercent: 115, rotate: 2 },
    { yPercent: 0, rotate: 0, duration: 1.1, ease: EASE.out, stagger: 0.06, ...vars },
  );
}

/** Fade + rise, for supporting copy and small UI. */
export function riseIn(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.fromTo(
    targets,
    { y: 28, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.9, ease: EASE.soft, stagger: 0.08, ...vars },
  );
}

/** Clip-path image reveal from the bottom edge. */
export function clipReveal(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.fromTo(
    targets,
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: EASE.inOut, ...vars },
  );
}

export { gsap, ScrollTrigger, useGSAP };
