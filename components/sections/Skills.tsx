"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Skills() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const group = skillGroups[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = skillGroups.length;
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden bg-stone py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-3">
              <span className="eyebrow text-accent">(04)</span>
              <span className="eyebrow text-mute">Skills & Technology</span>
            </Reveal>
            <Reveal kind="words">
              <SplitWords
                as="h2"
                id="skills-title"
                text="A toolkit for *thoughtful* digital craft."
                className="display mt-6 block text-[clamp(2.5rem,5.6vw,6rem)]"
              />
            </Reveal>
          </div>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-[0.95rem] leading-relaxed text-graphite">
              Grouped by how I use them rather than scored — choose a category to see what sits inside it.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
          {/* Category list (tabs) */}
          <div role="tablist" aria-orientation="vertical" aria-label="Skill categories" className="border-t border-ink/15 lg:col-span-6">
            {skillGroups.map((g, i) => {
              const selected = i === active;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`${baseId}-tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="group relative flex w-full items-center gap-5 border-b border-ink/15 py-5 text-left md:py-6"
                >
                  {selected && (
                    <motion.span
                      layoutId="skill-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 32 }}
                      className="absolute inset-y-0 -left-3 right-0 -z-0 bg-ivory/70"
                    />
                  )}
                  <span className={cn("eyebrow relative w-8", selected ? "text-accent" : "text-mute")}>0{i + 1}</span>
                  <span
                    className={cn(
                      "display relative text-[clamp(1.6rem,3.2vw,3rem)] tracking-[-0.035em] transition-all duration-500 ease-[var(--ease-expo)]",
                      selected ? "translate-x-2 text-ink" : "text-ink/35 group-hover:text-ink/70",
                    )}
                  >
                    {g.title}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "relative ml-auto size-2.5 rounded-full transition-all duration-500",
                      selected ? "scale-100 bg-accent" : "scale-0 bg-ink",
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${group.id}`}
            className="relative min-h-[22rem] lg:col-span-5 lg:col-start-8"
          >
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="rounded-[2px] bg-ink p-8 text-ivory md:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-white/50">
                      0{active + 1} / 0{skillGroups.length}
                    </span>
                    <span className="eyebrow text-accent">{group.items.length} tools</span>
                  </div>
                  <p className="serif-accent mt-8 text-[1.75rem] leading-[1.15] text-white md:text-[2.1rem]">{group.note}</p>
                  <ul className="mt-10 flex flex-wrap gap-2.5" aria-label={`${group.title} technologies`}>
                    {group.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 14, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.045 }}
                        whileHover={{ y: -3 }}
                        className="rounded-full border border-white/15 px-4 py-2 text-[0.95rem] text-white/85 transition-colors hover:border-accent hover:text-white"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
