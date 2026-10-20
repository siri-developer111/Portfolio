"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { ProjectImage } from "@/data/projects";
import { EASE, gsap, MQ, registerGsap, useGSAP } from "@/lib/animations";
import { cn } from "@/lib/utils";

registerGsap();

/**
 * Project image with a clip-path reveal on scroll, an inner parallax drift
 * and a slow hover zoom. Links to the project route.
 */
export function ProjectMedia({
  image,
  href,
  label,
  className,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  parallax = 8,
  from = "bottom",
}: {
  image: ProjectImage;
  href: string;
  label: string;
  className?: string;
  sizes?: string;
  parallax?: number;
  from?: "bottom" | "left" | "right";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelector("[data-media-inner]");
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const start =
          from === "left" ? "inset(0% 100% 0% 0%)" : from === "right" ? "inset(0% 0% 0% 100%)" : "inset(100% 0% 0% 0%)";
        gsap.fromTo(
          el,
          { clipPath: start },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: EASE.inOut,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
        gsap.fromTo(
          inner,
          { yPercent: -parallax, scale: 1.12 },
          {
            yPercent: parallax,
            scale: 1.12,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Link
      ref={ref}
      href={href}
      data-cursor="View"
      aria-label={label}
      className={cn("group block overflow-hidden bg-ink/5", className?.includes("absolute") ? "" : "relative", className)}
    >
      <div data-media-inner className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.06]">
          <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
        </div>
      </div>
      <span
        aria-hidden
        className="absolute bottom-4 right-4 grid size-12 translate-y-3 place-items-center rounded-full bg-ivory text-ink opacity-0 transition-all duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </Link>
  );
}
