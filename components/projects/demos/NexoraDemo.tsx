"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Sparkle } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  {
    id: "summarize",
    label: "Summarize",
    prompt: "Summarize this week's project notes",
    lines: ["Design review moved to Thursday", "Two open questions on onboarding copy", "Prototype feedback is mostly about navigation"],
  },
  {
    id: "plan",
    label: "Plan",
    prompt: "Turn these notes into a plan for tomorrow",
    lines: ["09:30 — Resolve onboarding copy questions", "11:00 — Update navigation prototype", "15:00 — Prepare Thursday review deck"],
  },
  {
    id: "focus",
    label: "Focus",
    prompt: "Start a 50-minute focus session",
    lines: ["Notifications paused", "Only the navigation prototype is open", "A gentle nudge will arrive at minute 45"],
  },
];

export function NexoraDemo() {
  const [active, setActive] = useState(FEATURES[0].id);
  const feature = FEATURES.find((f) => f.id === active)!;

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#17171C] p-4 text-[#F2F0FF] md:p-8">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[#7B61FF]/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 size-72 rounded-full bg-[#3D6BFF]/30 blur-3xl" />

      <div className="relative flex flex-wrap gap-2" role="tablist" aria-label="Assistant features">
        {FEATURES.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={f.id === active}
            onClick={() => setActive(f.id)}
            className="relative rounded-full px-5 py-2.5 text-sm"
          >
            {f.id === active && (
              <motion.span
                layoutId="nexora-tab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#A996FF] to-[#5B8CFF]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className={`relative ${f.id === active ? "text-[#0F0F13]" : "text-white/70"}`}>{f.label}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-6 grid gap-4 md:grid-cols-[1.2fr_1fr]" role="tabpanel">
        <motion.div layout className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">You</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={feature.prompt}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-2 text-xl"
            >
              {feature.prompt}
            </motion.p>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#A996FF]">
            <Sparkle size={14} /> Suggested by Nexora · simulated
          </div>
          <AnimatePresence mode="wait">
            <motion.ul key={feature.id} className="mt-4 space-y-3">
              {feature.lines.map((l, i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.12 }}
                  className="flex items-start gap-3 rounded-xl bg-white/[0.05] px-4 py-3 text-white/85"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#A996FF]" />
                  {l}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </motion.div>

        <div className="relative grid place-items-center overflow-hidden rounded-2xl border border-white/10 bg-[#0F0F13] p-8">
          <div className="relative grid size-48 place-items-center">
            {[0, 1, 2, 3].map((r) => (
              <motion.span
                key={`${feature.id}-${r}`}
                className="absolute rounded-full border border-[#A996FF]/40"
                initial={{ width: 40, height: 40, opacity: 0.9 }}
                animate={{ width: 190, height: 190, opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity, delay: r * 0.6, ease: "easeOut" }}
              />
            ))}
            <motion.span
              key={feature.id}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="size-16 rounded-full bg-gradient-to-br from-[#C9BEFF] via-[#A996FF] to-[#5B8CFF] shadow-[0_0_60px_rgba(155,140,255,0.7)]"
            />
          </div>
          <p className="absolute bottom-5 text-xs uppercase tracking-[0.16em] text-white/40">Ambient assistant state</p>
        </div>
      </div>
    </div>
  );
}
