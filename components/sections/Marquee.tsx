"use client";

import { useRef } from "react";
import { gsap, MQ, registerGsap, ScrollTrigger, useGSAP } from "@/lib/animations";

registerGsap();

const WORDS = ["Interfaces", "Motion", "Creative code", "Intelligent products", "Interaction", "Craft"];

/** A ribbon that drifts constantly and speeds up with scroll velocity. */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 400, 6);
            if (v < 0.2) return;
            gsap.fromTo(loop, { timeScale: 1 + v }, { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: true });
          },
        });
        return () => {
          st.kill();
          loop.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {WORDS.map((w, i) => (
        <span key={w + i} className="flex items-center">
          <span className={i % 2 ? "serif-accent text-[clamp(2.5rem,6vw,5.5rem)]" : "display text-[clamp(2.25rem,5.4vw,5rem)]"}>
            {w}
          </span>
          <span className="mx-[3vw] inline-block size-3 rotate-45 bg-accent" aria-hidden />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      className="relative overflow-hidden border-y border-line bg-ivory py-6 text-ink md:py-8"
      aria-label="Focus areas: interfaces, motion, creative code, intelligent products, interaction, craft"
      role="img"
    >
      <div data-track className="flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
