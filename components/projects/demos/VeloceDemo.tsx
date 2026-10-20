"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Relative, illustrative character of each drive mode — not real vehicle data. */
const MODES = {
  Comfort: { response: 0.35, firmness: 0.3, sound: 0.25, tone: "Quiet, softened, long-distance calm." },
  Sport: { response: 0.7, firmness: 0.65, sound: 0.6, tone: "Sharper inputs and a tighter body." },
  Track: { response: 1, firmness: 0.95, sound: 0.9, tone: "Everything turned toward the line." },
} as const;

type Mode = keyof typeof MODES;

export function VeloceDemo() {
  const [mode, setMode] = useState<Mode>("Sport");
  const m = MODES[mode];

  return (
    <div className="grid overflow-hidden border border-white/10 bg-[#0B0B0B] text-[#F1F3F5] lg:grid-cols-12">
      <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: 1 + m.response * 0.08, x: `${-m.response * 2}%` }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <Image src="/projects/veloce/cover.webp" alt="Silver coupe in a dark studio" fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
        </motion.div>
        <motion.span
          className="absolute bottom-[38%] left-0 h-[3px] bg-[#FF3B44] shadow-[0_0_20px_#FF3B44]"
          animate={{ width: `${m.response * 100}%` }}
          transition={{ duration: 1, ease: EASE }}
        />
      </div>

      <div className="flex flex-col justify-between gap-10 p-6 md:p-10 lg:col-span-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#8A9097]">Drive mode</p>
          <div className="mt-4 grid grid-cols-3 gap-1 rounded-full border border-white/10 p-1" role="radiogroup" aria-label="Drive mode">
            {(Object.keys(MODES) as Mode[]).map((k) => (
              <button
                key={k}
                role="radio"
                aria-checked={k === mode}
                onClick={() => setMode(k)}
                className="relative rounded-full py-2.5 text-sm"
              >
                {k === mode && (
                  <motion.span layoutId="veloce-mode" className="absolute inset-0 rounded-full bg-[#F1F3F5]" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <span className={`relative ${k === mode ? "text-black" : "text-white/70"}`}>{k}</span>
              </button>
            ))}
          </div>
          <motion.p key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-2xl tracking-tight">
            {m.tone}
          </motion.p>
        </div>

        <dl className="space-y-6">
          {([
            ["Throttle response", m.response],
            ["Chassis firmness", m.firmness],
            ["Exhaust character", m.sound],
          ] as const).map(([label, v]) => (
            <div key={label}>
              <dt className="flex justify-between text-xs uppercase tracking-[0.16em] text-[#8A9097]">
                {label}
                <span className="sr-only">relative level {Math.round(v * 10)} of 10</span>
              </dt>
              <dd className="mt-3 grid grid-cols-10 gap-1" aria-hidden>
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="h-2 rounded-full"
                    animate={{ backgroundColor: i < Math.round(v * 10) ? (i >= 8 ? "#FF3B44" : "#F1F3F5") : "rgba(255,255,255,0.1)" }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                  />
                ))}
              </dd>
            </div>
          ))}
          <p className="text-xs text-[#8A9097]">Relative, illustrative levels for the concept — not vehicle specifications.</p>
        </dl>
      </div>
    </div>
  );
}
