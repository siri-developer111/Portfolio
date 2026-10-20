"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Desktop-only cursor: a precise dot plus a trailing ring that grows over
 * interactive elements and shows a contextual label (via `data-cursor`).
 * Never mounts on touch / coarse pointers or with reduced motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.35, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.35, ease: "power3" });

    let visible = false;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, [role='tab'], input, label, select");
      const text = labelled?.dataset.cursor || null;
      setLabel(text);
      root.dataset.cursorState = text ? "label" : interactive ? "hover" : "idle";
    };

    const leaveWindow = () => {
      visible = false;
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
    };
    const down = () => gsap.to(ring.current, { scale: 0.8, duration: 0.2 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leaveWindow);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      root.classList.remove("has-cursor");
      delete root.dataset.cursorState;
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leaveWindow);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300]">
      <div
        ref={dot}
        className="invisible fixed left-0 top-0 -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-accent opacity-0 mix-blend-normal"
      />
      <div ref={ring} className={`invisible fixed left-0 top-0 opacity-0 ${label ? "" : "mix-blend-difference"}`}>
        <div
          className={[
            "grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-[width,height,background-color,border-color] duration-500 ease-[var(--ease-expo)]",
            label
              ? "size-24 border-transparent bg-accent text-white"
              : "size-9 border border-white/80 [html[data-cursor-state=hover]_&]:size-14 [html[data-cursor-state=hover]_&]:bg-white/25",
          ].join(" ")}
        >
          {label && <span className="eyebrow text-[0.65rem] tracking-[0.2em] text-white">{label}</span>}
        </div>
      </div>
    </div>
  );
}
