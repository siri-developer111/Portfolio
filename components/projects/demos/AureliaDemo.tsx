"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fictional listings for the concept — illustrative only. */
const HOMES = [
  { name: "Casa Horizonte", place: "Coastal residence", rooms: "5 bedrooms", area: "620 m²", src: "/projects/aurelia/cover.webp", alt: "Villa with reflecting pool at golden hour" },
  { name: "The Arch House", place: "Hillside retreat", rooms: "4 bedrooms", area: "480 m²", src: "/projects/aurelia/frame-a.webp", alt: "Stone archway framing a low sun" },
  { name: "Atelier Plan", place: "Courtyard home", rooms: "3 bedrooms", area: "350 m²", src: "/projects/aurelia/frame-b.webp", alt: "Floor plan drawing in black and gold" },
];

export function AureliaDemo() {
  const [active, setActive] = useState(0);
  const home = HOMES[active];

  return (
    <div className="grid overflow-hidden border border-black/10 bg-[#F6F1E8] md:grid-cols-12">
      <div className="relative aspect-[4/3] md:col-span-8 md:aspect-auto md:min-h-[34rem]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={home.src}
            initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
            className="absolute inset-0"
          >
            <Image src={home.src} alt={home.alt} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-0 left-0 bg-[#F6F1E8] px-6 py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={home.name}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="eyebrow text-[#9C7A44]">{home.place}</p>
              <p className="mt-1 font-serif text-3xl italic text-[#181614]">{home.name}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ul className="divide-y divide-black/10 md:col-span-4" aria-label="Featured residences">
        {HOMES.map((h, i) => {
          const selected = i === active;
          return (
            <li key={h.name}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={selected}
                className="group relative flex w-full items-center gap-4 p-5 text-left text-[#181614]"
              >
                {selected && (
                  <motion.span layoutId="aurelia-active" className="absolute inset-0 bg-[#EAE0CF]" transition={{ duration: 0.6, ease: EASE }} />
                )}
                <span className="relative size-16 shrink-0 overflow-hidden">
                  <Image src={h.src} alt="" fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span className="relative">
                  <span className="block font-serif text-xl italic">{h.name}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-[#6F6555]">
                    {h.rooms} · {h.area}
                  </span>
                </span>
                <span className="relative ml-auto text-[#9C7A44] transition-transform duration-500 group-hover:translate-x-1">→</span>
              </button>
            </li>
          );
        })}
        <li className="p-5 text-xs leading-relaxed text-[#6F6555]">Fictional residences shown for interface demonstration only.</li>
      </ul>
    </div>
  );
}
