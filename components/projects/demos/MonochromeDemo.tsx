"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  { name: "Long Wool Coat", tone: "Noir", src: "/projects/monochrome/frame-a.webp", alt: "Figure in a long black coat" },
  { name: "Campaign Edit", tone: "Camel / Ivory / Noir", src: "/projects/monochrome/cover.webp", alt: "Three coats in camel, ivory and black" },
  { name: "Ribbed Knit & Tote", tone: "Clay / Noir", src: "/projects/monochrome/frame-b.webp", alt: "Clay knit, black tote and ivory cap" },
];

const SIZES = ["XS", "S", "M", "L"];

export function MonochromeDemo() {
  const [selected, setSelected] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [bag, setBag] = useState(0);
  const item = ITEMS[selected];

  return (
    <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 text-[#1B1917] lg:grid-cols-12">
      <div className="grid grid-cols-2 gap-px bg-black/10 lg:col-span-7">
        {ITEMS.map((it, i) => (
          <button
            key={it.name}
            type="button"
            onClick={() => {
              setSelected(i);
              setSize(null);
            }}
            aria-pressed={i === selected}
            className={`group relative overflow-hidden bg-[#EFEBE4] text-left ${i === 0 ? "row-span-2 min-h-[18rem]" : "aspect-[4/3]"}`}
          >
            <Image src={it.src} alt={it.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-[#EFEBE4] px-4 py-3 text-sm transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
              {it.name}
              <span className="text-xs uppercase tracking-[0.14em] text-[#7A6E62]">View</span>
            </span>
            {i === selected && <motion.span layoutId="mono-ring" className="absolute inset-2 border border-[#1B1917]" />}
          </button>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-10 bg-[#EFEBE4] p-6 md:p-10 lg:col-span-5">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-[#7A6E62]">Monochrome — Concept store</p>
          <motion.p
            key={bag}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            className="rounded-full bg-[#1B1917] px-3 py-1 text-xs text-[#EFEBE4]"
            aria-live="polite"
          >
            Bag ({bag})
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="font-serif text-5xl italic leading-none">{item.name}</p>
            <p className="mt-3 text-sm text-[#7A6E62]">{item.tone}</p>
          </motion.div>
        </AnimatePresence>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#7A6E62]">Size</p>
          <div className="mt-3 flex gap-2" role="radiogroup" aria-label="Size">
            {SIZES.map((s) => (
              <button
                key={s}
                role="radio"
                aria-checked={size === s}
                onClick={() => setSize(s)}
                className={`size-12 border text-sm transition-colors ${size === s ? "border-[#1B1917] bg-[#1B1917] text-[#EFEBE4]" : "border-black/15 hover:border-[#1B1917]"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            disabled={!size}
            onClick={() => setBag((b) => b + 1)}
            className="mt-6 w-full bg-[#1B1917] py-4 text-sm uppercase tracking-[0.16em] text-[#EFEBE4] transition-opacity disabled:opacity-35"
          >
            {size ? `Add to bag — ${size}` : "Select a size"}
          </motion.button>
          <p className="mt-3 text-xs text-[#7A6E62]">Demo only — nothing is sold or stored.</p>
        </div>
      </div>
    </div>
  );
}
