"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { site } from "@/data/site";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArrowDown } from "@/components/ui/Icons";
import { EASE, gsap, MQ, registerGsap, useGSAP } from "@/lib/animations";

registerGsap();

const WORDMARK = ["S", "I", "R", "I"];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: EASE.out } });

        tl.set(q("[data-intro]"), { visibility: "visible" })
          .fromTo(
            q("[data-curtain]"),
            { yPercent: 0 },
            { yPercent: -100, duration: 1, ease: EASE.inOut },
            0.15,
          )
          .fromTo(q("[data-curtain-label]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, 0.1)
          .set(q("[data-curtain]"), { display: "none" })
          .fromTo(
            q("[data-grid-line]"),
            { scaleY: 0 },
            { scaleY: 1, transformOrigin: "top", duration: 1.4, stagger: 0.035, ease: EASE.inOut },
            0.45,
          )
          .fromTo(
            q("[data-portrait]"),
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: EASE.inOut },
            0.5,
          )
          .fromTo(q("[data-portrait-img]"), { scale: 1.3 }, { scale: 1, duration: 2.2 }, 0.5)
          .fromTo(q("[data-letter]"), { yPercent: 108 }, { yPercent: 0, duration: 1.3, stagger: 0.07 }, 0.8)
          .fromTo(q("[data-line]"), { yPercent: 112, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.1 }, 0.85)
          .fromTo(q("[data-fade]"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08 }, 1.15)
          .fromTo(q("[data-cta]"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 }, 1.3);
      });

      // Scroll parallax — desktop only, after the intro.
      mm.add(MQ.desktop, () => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-portrait-img]"), { yPercent: 10, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-parallax-copy]"), { y: -90, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-wordmark]"), { yPercent: 18, ease: "none", scrollTrigger: st });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="home"
      ref={root}
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ivory pt-[4.5rem]"
    >
      {/* Intro curtain (only rendered visible when motion is allowed) */}
      <div
        aria-hidden
        data-curtain
        className="intro-curtain fixed inset-0 z-[150] bg-ink"
      >
        <div data-curtain-label className="flex h-full items-center justify-center gap-3 text-ivory">
          <span className="display text-2xl">SIRI</span>
          <span className="size-1.5 rounded-full bg-accent" />
        </div>
      </div>

      {/* Hairline grid */}
      <div aria-hidden className="container-x pointer-events-none absolute inset-0 -z-10">
        <div className="grid h-full grid-cols-4 lg:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              data-grid-line
              className={`h-full border-l border-line ${i >= 4 ? "hidden lg:block" : ""} ${i === 0 ? "border-transparent" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="container-x relative grid flex-1 grid-cols-1 gap-y-8 pt-8 lg:grid-cols-12 lg:gap-x-6 lg:pt-10">
        {/* Copy column */}
        <div data-parallax-copy className="relative z-20 flex flex-col lg:col-span-7 lg:pb-[13vw]">
          <div data-intro data-fade className="flex flex-wrap items-center gap-x-4 gap-y-2 text-mute">
            <span className="eyebrow text-ink">(Portfolio)</span>
            <span className="h-px w-8 bg-ink/30" />
            {site.roles.map((r, i) => (
              <span key={r} className="eyebrow">
                {r}
                {i < site.roles.length - 1 && <span className="ml-4 text-accent">/</span>}
              </span>
            ))}
          </div>

          <h1 className="display mt-8 text-[clamp(2.9rem,6vw,7.4rem)] text-ink lg:mt-12">
            <span className="sr-only">{site.headline.join(" ")}</span>
            <span aria-hidden className="block">
              <span data-intro className="mask block">
                <span data-line className="block">Building digital</span>
              </span>
              <span data-intro className="mask block">
                <span data-line className="block">
                  experiences <span className="serif-accent pr-[0.06em] text-accent">beyond</span>
                </span>
              </span>
              <span data-intro className="mask block">
                <span data-line className="block">
                  the ordinary<span className="text-accent">.</span>
                </span>
              </span>
            </span>
          </h1>

          <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,26rem)_1fr] lg:mt-12">
            <p data-intro data-fade className="max-w-[26rem] text-[1.075rem] leading-relaxed text-graphite">
              {site.intro}
            </p>
            <div data-intro data-fade className="flex items-start sm:justify-end lg:justify-start">
              <span className="inline-flex items-center gap-3 rounded-full border border-line bg-paper/70 py-2 pl-3 pr-4 text-sm text-graphite backdrop-blur">
                <span className="relative flex size-2.5">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500" />
                  <span className="relative size-2.5 rounded-full bg-emerald-500" />
                </span>
                {site.status}
              </span>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <div data-intro data-cta>
              <CtaButton href="/#work">Explore selected work</CtaButton>
            </div>
            <div data-intro data-cta>
              <CtaButton href="/#contact" variant="ghost">
                Start a conversation
              </CtaButton>
            </div>
          </div>

          <Link
            href="/#work"
            data-intro
            data-fade
            className="mt-12 hidden w-fit items-center gap-4 text-mute lg:flex"
            aria-label="Scroll to selected work"
          >
            <span className="relative h-12 w-px overflow-hidden bg-ink/10">
              <span className="scroll-line absolute inset-0 bg-ink" />
            </span>
            <span className="eyebrow">Scroll to explore</span>
          </Link>
        </div>

        {/* Portrait column */}
        <div className="relative lg:col-span-5 lg:col-start-8">
          <figure
            data-intro
            data-portrait
            className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden bg-paper lg:max-w-none lg:aspect-auto lg:h-[min(76svh,52rem)]"
          >
            <div data-portrait-img className="absolute inset-[-6%_0_-6%_0] will-change-transform">
              <Image
                src="/images/siri-portrait.webp"
                alt="Portrait of Siri in a white shirt, smiling softly"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[52%_18%]"
              />
            </div>
            {/* Crop marks */}
            {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-b border-l", "right-3 bottom-3 border-b border-r"].map((c) => (
              <span key={c} aria-hidden className={`absolute size-4 border-ink/40 ${c}`} />
            ))}
            <figcaption className="absolute right-5 top-5 flex flex-col items-end gap-1 text-right">
              <span className="eyebrow text-ink/70">Fig. 01</span>
              <span className="serif-accent text-lg text-ink">Siri</span>
            </figcaption>
            <span
              aria-hidden
              className="eyebrow absolute bottom-20 left-5 hidden origin-bottom-left -rotate-90 text-ink/50 lg:block"
            >
              Code — Motion — Intelligence
            </span>
          </figure>

          {/* Rotating badge / scroll indicator */}
          <Link
            href="/#work"
            data-intro
            data-fade
            aria-label="Scroll to selected work"
            className="group absolute -right-4 top-[56%] z-30 hidden size-28 place-items-center rounded-full bg-ink text-ivory lg:grid"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
              <defs>
                <path id="badge-circle" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
              </defs>
              <text className="fill-current" style={{ fontSize: 8.4, letterSpacing: "0.22em", fontFamily: "var(--font-mono)" }}>
                <textPath href="#badge-circle">SCROLL • SELECTED WORK • EXPLORE •</textPath>
              </text>
            </svg>
            <ArrowDown size={20} className="transition-transform duration-500 group-hover:translate-y-1 text-accent" />
          </Link>
        </div>
      </div>

      {/* Giant wordmark — overlaps the base of the portrait */}
      <div
        data-wordmark
        aria-hidden
        className="pointer-events-none relative z-10 -mt-[22vw] select-none pb-[1.5vw] sm:-mt-[18vw] lg:-mt-[12.5vw]"
      >
        <div className="container-x">
          <div
            data-intro
            className="display flex justify-between text-[clamp(7rem,30vw,30rem)] leading-[0.74] tracking-[-0.06em] text-ink lg:text-[19.5vw]"
          >
            {WORDMARK.map((l, i) => (
              <span key={i} className="mask">
                <span data-letter className="block">
                  {l}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
