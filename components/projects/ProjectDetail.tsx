"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ArrowUpRight } from "@/components/ui/Icons";
import { ProjectDemo } from "@/components/projects/demos";

const EASE = [0.16, 1, 0.3, 1] as const;

const inView = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.9, ease: EASE },
} as const;

export function ProjectDetail({ project, next }: { project: Project; next: Project }) {
  const { theme } = project;
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "end start"] });
  const coverY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const vars = {
    "--p-bg": theme.bg,
    "--p-fg": theme.fg,
    "--p-accent": theme.accent,
    "--p-muted": theme.muted,
  } as CSSProperties;

  const border = theme.dark ? "border-white/10" : "border-black/10";

  return (
    <main id="main" tabIndex={-1} style={vars} className="bg-[var(--p-bg)] text-[var(--p-fg)] outline-none">
      {/* Hero */}
      <section data-theme={theme.dark ? "dark" : undefined} className="relative overflow-hidden pt-[4.5rem]">
        <div className="container-x pb-14 pt-10 md:pt-16">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-[var(--p-muted)] hover:text-[var(--p-fg)]">
              <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1" />
              All work
            </Link>
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="eyebrow text-[var(--p-accent)]">({project.index})</span>
            <span className="eyebrow text-[var(--p-muted)]">{project.category}</span>
          </div>

          <h1
            className={`display mt-6 flex flex-wrap gap-x-[0.18em] leading-[0.82] ${
              project.title.replace(" ", "").length > 7 ? "text-[clamp(3rem,11.5vw,11.5rem)]" : "text-[clamp(3.6rem,15vw,15rem)]"
            }`}
            aria-label={project.title}
          >
            {project.title.split(" ").map((word, w) => (
              <span key={w} className="whitespace-nowrap" aria-hidden>
                {word.split("").map((ch, i) => (
                  <span key={i} className="mask">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.1, ease: EASE, delay: 0.15 + (w * 6 + i) * 0.045 }}
                    >
                      {ch}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            className={`mt-12 grid gap-8 border-t ${border} pt-8 md:grid-cols-12`}
          >
            <p className="serif-accent text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.1] md:col-span-6">{project.tagline}</p>
            <dl className="grid grid-cols-2 gap-6 text-sm md:col-span-5 md:col-start-8">
              {[
                ["Type", "Self-initiated concept"],
                ["Status", "Design & prototype"],
                ["Focus", project.category],
                ["Stack", project.stack.join(", ")],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow text-[var(--p-muted)]">{k}</dt>
                  <dd className="mt-2 leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <motion.div
          ref={coverRef}
          initial={{ clipPath: "inset(18% 6% 0% 6%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.4, ease: [0.87, 0, 0.13, 1], delay: 0.35 }}
          className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/8]"
        >
          <motion.div style={{ y: coverY }} className="absolute inset-[-7%_0]">
            <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      </section>

      {/* Overview */}
      <section className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-36" aria-labelledby="overview-title">
        <motion.div {...inView} className="md:col-span-4">
          <p className="eyebrow text-[var(--p-accent)]">Overview</p>
          <h2 id="overview-title" className="display mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
            The question behind the concept
          </h2>
        </motion.div>
        <div className="md:col-span-7 md:col-start-6">
          <motion.p {...inView} className="text-[1.25rem] leading-relaxed md:text-[1.4rem]">
            {project.challenge}
          </motion.p>
          <ol className={`mt-12 border-t ${border}`}>
            {project.approach.map((a, i) => (
              <motion.li
                key={a}
                {...inView}
                transition={{ ...inView.transition, delay: i * 0.06 }}
                className={`grid grid-cols-[3rem_1fr] gap-4 border-b ${border} py-5`}
              >
                <span className="eyebrow pt-1 text-[var(--p-accent)]">0{i + 1}</span>
                <span className="leading-relaxed opacity-85">{a}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Interactive demo */}
      <section className="container-x pb-24 md:pb-36" aria-labelledby="demo-title">
        <motion.div {...inView} className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[var(--p-accent)]">Interactive concept demo</p>
            <h2 id="demo-title" className="display mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
              Try the interaction
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[var(--p-muted)]">
            A front-end prototype with illustrative content. No real data, accounts or backend are involved.
          </p>
        </motion.div>
        <motion.div {...inView}>
          <ProjectDemo slug={project.slug} />
        </motion.div>
      </section>

      {/* Frames */}
      <section className="container-x grid gap-6 pb-24 md:grid-cols-12 md:gap-8 md:pb-36" aria-label="Concept frames">
        {[project.frames[0], project.frames[1]].map((f, i) => (
          <motion.figure
            key={f.src}
            {...inView}
            transition={{ ...inView.transition, delay: i * 0.1 }}
            className={i === 0 ? "md:col-span-5" : "md:col-span-7 md:mt-40"}
          >
            <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/5]" : "aspect-[16/10]"}`}>
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] hover:scale-105"
              />
            </div>
            <figcaption className="eyebrow mt-4 text-[var(--p-muted)]">
              Fig. {project.index}.{i + 2} — {f.alt}
            </figcaption>
          </motion.figure>
        ))}
      </section>

      {/* Design system */}
      <section className={`border-t ${border}`} aria-labelledby="system-title">
        <div className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <motion.div {...inView} className="md:col-span-4">
            <p className="eyebrow text-[var(--p-accent)]">Design language</p>
            <h2 id="system-title" className="display mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
              Palette &amp; type
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed opacity-80">{project.typography}</p>
          </motion.div>
          <ul className="grid grid-cols-2 gap-4 md:col-span-7 md:col-start-6 md:grid-cols-4">
            {project.palette.map((c, i) => (
              <motion.li key={c.hex} {...inView} transition={{ ...inView.transition, delay: i * 0.07 }}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`aspect-[3/4] rounded-[2px] border ${border}`}
                  style={{ background: c.hex }}
                />
                <p className="mt-3 text-sm">{c.name}</p>
                <p className="eyebrow mt-1 text-[var(--p-muted)]">{c.hex}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next project + footer */}
      <section data-theme="dark" className="bg-ink text-ivory" aria-label="Next project">
        <Link href={`/projects/${next.slug}`} className="group relative block overflow-hidden" data-cursor="Next">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-40 group-focus-visible:opacity-40">
            <Image src={next.cover.src} alt="" fill sizes="100vw" className="scale-110 object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-100" />
          </div>
          <div className="container-x relative flex flex-wrap items-end justify-between gap-6 py-24 md:py-36">
            <div>
              <p className="eyebrow text-white/50">Next concept — ({next.index})</p>
              <p className="display mt-6 text-[clamp(3.4rem,11vw,11rem)] leading-[0.85] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4">
                {next.title}
              </p>
              <p className="mt-4 text-white/60">{next.category}</p>
            </div>
            <span className="grid size-20 place-items-center rounded-full bg-accent text-white transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-45 md:size-28">
              <ArrowUpRight size={28} />
            </span>
          </div>
        </Link>
        <Footer />
      </section>
    </main>
  );
}
