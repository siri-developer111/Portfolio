"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { gsap, MQ, registerGsap, useGSAP } from "@/lib/animations";

registerGsap();

export function About() {
  const root = useRef<HTMLElement>(null);
  const { about } = site;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Statement brightens word by word as it scrolls through the viewport.
        gsap.fromTo(
          q("[data-statement] [data-w]"),
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: q("[data-statement]")[0], start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
        // Arch portrait: mask opens and image settles.
        gsap.fromTo(
          q("[data-arch]"),
          { clipPath: "inset(30% 12% 0% 12% round 999px 999px 0 0)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)",
            ease: "none",
            scrollTrigger: { trigger: q("[data-arch]")[0], start: "top 90%", end: "center 55%", scrub: true },
          },
        );
        gsap.fromTo(
          q("[data-arch-img]"),
          { yPercent: -8, scale: 1.15 },
          {
            yPercent: 8,
            scale: 1.05,
            ease: "none",
            scrollTrigger: { trigger: q("[data-arch]")[0], start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        // Journey line draws across its nodes.
        gsap.fromTo(
          q("[data-journey-line]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: q("[data-journey]")[0], start: "top 80%", end: "bottom 60%", scrub: true },
          },
        );
        gsap.fromTo(
          q("[data-journey-node]"),
          { scale: 0 },
          {
            scale: 1,
            stagger: 0.2,
            ease: "back.out(2)",
            scrollTrigger: { trigger: q("[data-journey]")[0], start: "top 75%", end: "bottom 60%", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} aria-labelledby="about-title" className="relative bg-ivory py-28 md:py-44">
      <div className="container-x">
        <Reveal className="flex items-center gap-3">
          <span className="eyebrow text-accent">(03)</span>
          <h2 id="about-title" className="eyebrow text-mute">
            About
          </h2>
        </Reveal>

        <p
          data-statement
          className="display mt-8 max-w-[22ch] text-[clamp(2.1rem,4.9vw,5.4rem)] leading-[1.02] tracking-[-0.04em]"
        >
          {about.statement.split(" ").map((w, i) => {
            const accent = w.startsWith("experimentation") || w.startsWith("intelligent");
            return (
              <span key={i} data-w className={accent ? "serif-accent text-accent" : undefined}>
                {w}{" "}
              </span>
            );
          })}
        </p>

        <div className="mt-24 grid gap-16 md:mt-36 lg:grid-cols-12 lg:gap-8">
          {/* Arch portrait */}
          <figure className="lg:col-span-4">
            <div
              data-arch
              className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-t-full bg-paper lg:max-w-none"
            >
              <div data-arch-img className="absolute inset-0 will-change-transform">
                <Image
                  src="/images/siri-portrait.webp"
                  alt="Siri, smiling, photographed against a white backdrop"
                  fill
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="object-cover object-[50%_25%]"
                />
              </div>
            </div>
            <figcaption className="mx-auto mt-4 flex max-w-sm items-center justify-between lg:max-w-none">
              <span className="eyebrow text-mute">Fig. 02</span>
              <span className="serif-accent text-lg">Design × Code × AI</span>
            </figcaption>
          </figure>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="max-w-xl text-[1.2rem] leading-relaxed text-graphite md:text-[1.35rem]">{about.intro}</p>
            </Reveal>

            <Reveal as="ul" className="mt-14 border-t border-line" stagger={0.1}>
              {about.principles.map((p, i) => (
                <li
                  key={p.title}
                  className="group relative grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7 md:grid-cols-[4rem_14rem_1fr] md:items-baseline"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100"
                  />
                  <span className="eyebrow pt-1 text-accent">0{i + 1}</span>
                  <h3 className="display text-[1.6rem] tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-2">
                    {p.title}
                  </h3>
                  <p className="col-start-2 text-graphite md:col-start-3">{p.body}</p>
                </li>
              ))}
            </Reveal>

            {/* Creative journey */}
            <div data-journey className="mt-20">
              <p className="eyebrow text-mute">The arc I&apos;m on</p>
              <div className="relative mt-10">
                <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" />
                <span
                  aria-hidden
                  data-journey-line
                  className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-ink md:block"
                />
                <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
                  {about.journey.map((j, i) => (
                    <li key={j.label} className="relative flex gap-5 md:block">
                      <span
                        data-journey-node
                        aria-hidden
                        className={`relative z-10 mt-1 block size-[15px] shrink-0 rounded-full border-2 border-ivory md:mt-0 ${i === about.journey.length - 1 ? "bg-accent" : "bg-ink"}`}
                      />
                      <div className="md:mt-6">
                        <p className="display text-xl tracking-[-0.02em]">
                          {j.label}
                          {j.year ? <span className="eyebrow ml-2 text-mute">{j.year}</span> : null}
                        </p>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-graphite">{j.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
