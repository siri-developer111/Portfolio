"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import { ExploreLink } from "@/components/projects/ProjectMeta";
import { gsap, MQ, registerGsap, useGSAP } from "@/lib/animations";

registerGsap();

const NOTES = [
  { k: "Chapter 01", v: "Scroll becomes acceleration — the page is the test track." },
  { k: "Chapter 02", v: "No hero video. Light, type and timing carry the speed." },
  { k: "Chapter 03", v: "Red is rationed: it only appears where attention should go." },
];

/**
 * Pinned horizontal story (desktop + motion allowed). On touch devices and
 * with reduced motion it degrades to a native, snap-scrolling carousel.
 */
export function HorizontalShowcase({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const track = q("[data-track]")[0] as HTMLElement | undefined;
      if (!track) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        track.classList.add("is-pinned");
        track.scrollLeft = 0;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q("[data-pin]")[0],
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        tl.to(track, { x: () => -distance() }, 0)
          .to(q("[data-bg-word]"), { x: () => -distance() * 0.35 }, 0)
          .fromTo(q("[data-progress]"), { scaleX: 0 }, { scaleX: 1 }, 0)
          .fromTo(q("[data-drift]"), { xPercent: 8 }, { xPercent: -8 }, 0);

        return () => {
          track.classList.remove("is-pinned");
          gsap.set(track, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const href = `/projects/${project.slug}`;

  return (
    <section
      ref={root}
      data-theme="dark"
      aria-labelledby={`${project.slug}-title`}
      className="relative bg-[#080808] text-ivory"
    >
      <div data-pin className="relative overflow-hidden py-20 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0">
        <span
          data-bg-word
          aria-hidden
          className="display text-outline pointer-events-none absolute left-[4vw] hidden lg:block top-1/2 -translate-y-1/2 whitespace-nowrap text-[34vw] text-white/[0.06]"
        >
          {project.title}
        </span>

        <div className="container-x relative mb-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-accent">({project.index})</span>
            <span className="eyebrow text-white/55">{project.category}</span>
          </div>
          <span className="eyebrow text-white/55 lg:hidden">Swipe →</span>
          <div className="hidden w-56 items-center gap-4 lg:flex">
            <span className="eyebrow text-white/55">Drive</span>
            <span className="relative h-px flex-1 bg-white/15">
              <span data-progress className="absolute inset-0 origin-left bg-accent" />
            </span>
          </div>
        </div>

        <div
          data-track
          className="h-track no-scrollbar relative flex items-stretch gap-5 px-[clamp(1.25rem,4vw,3.5rem)] lg:gap-8"
          tabIndex={0}
          aria-label={`${project.title} story — scroll horizontally`}
        >
          {/* Intro panel */}
          <div className="flex w-[82vw] shrink-0 flex-col justify-between gap-10 sm:w-[60vw] lg:w-[34vw]">
            <h3 id={`${project.slug}-title`} className="display text-[clamp(3.5rem,9vw,9rem)]">
              {project.title}
            </h3>
            <div className="space-y-6">
              <p className="max-w-sm text-[1.05rem] leading-relaxed text-white/70">
                <span className="serif-accent mr-1 text-[1.25em] text-white">{project.tagline}</span> {project.summary}
              </p>
              <ExploreLink project={project} tone="light" />
            </div>
          </div>

          {/* Cover */}
          <Link
            href={href}
            data-cursor="View"
            aria-label={`View ${project.title} concept`}
            className="group relative block aspect-[16/10] w-[85vw] shrink-0 overflow-hidden sm:w-[70vw] lg:aspect-auto lg:h-[62svh] lg:w-[62vw]"
          >
            <div data-drift className="absolute inset-[-2%_-10%] will-change-transform">
              <Image src={project.cover.src} alt={project.cover.alt} fill sizes="(min-width:1024px) 62vw, 85vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-105" />
            </div>
            <span className="eyebrow absolute bottom-5 left-5 text-white/70">Fig. 03.1 — Studio</span>
          </Link>

          {/* Detail + notes */}
          <div className="flex w-[85vw] shrink-0 gap-6 sm:w-[70vw] lg:h-[62svh] lg:w-[52vw]">
            <Link
              href={href}
              data-cursor="View"
              aria-label={`View ${project.title} wheel detail`}
              className="group relative hidden aspect-[4/5] h-full shrink-0 overflow-hidden sm:block"
            >
              <Image src={project.frames[0].src} alt={project.frames[0].alt} fill sizes="30vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-105" />
            </Link>
            <ol className="flex flex-1 flex-col justify-end divide-y divide-white/10 border-y border-white/10">
              {NOTES.map((n) => (
                <li key={n.k} className="py-5">
                  <p className="eyebrow text-accent">{n.k}</p>
                  <p className="mt-2 text-lg leading-snug text-white/85">{n.v}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Finale */}
          <Link
            href={href}
            data-cursor="Drive"
            aria-label={`Open the ${project.title} concept`}
            className="group relative block aspect-[16/10] w-[85vw] shrink-0 overflow-hidden sm:w-[70vw] lg:aspect-auto lg:h-[62svh] lg:w-[58vw]"
          >
            <Image src={project.frames[1].src} alt={project.frames[1].alt} fill sizes="(min-width:1024px) 58vw, 85vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-105" />
            <span className="absolute inset-0 flex items-end p-6 lg:p-10">
              <span className="display text-[clamp(2.5rem,6vw,6rem)] leading-[0.9]">
                Feel the <span className="serif-accent text-accent">line.</span>
              </span>
            </span>
          </Link>
          <span aria-hidden className="w-px shrink-0" />
        </div>
      </div>
    </section>
  );
}
