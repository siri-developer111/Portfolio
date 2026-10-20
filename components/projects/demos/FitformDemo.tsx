"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Shape = { shoulders: number; waist: number; hips: number };

const LIMITS = { min: 0.75, max: 1.25 };

/**
 * Purely visual demo: sliders reshape a contour-ring illustration.
 * No measurement, scanning or AI inference happens here.
 */
export function FitformDemo() {
  const [shape, setShape] = useState<Shape>({ shoulders: 1, waist: 1, hips: 1 });
  const id = useId();

  const W = 360;
  const H = 520;
  const cx = W / 2;

  // Interpolate ring half-widths through the torso from the three controls.
  const rings = [
    { y: 120, w: 70 * shape.shoulders },
    { y: 150, w: 66 * shape.shoulders },
    { y: 180, w: 60 * (shape.shoulders * 0.6 + shape.waist * 0.4) },
    { y: 210, w: 52 * shape.waist },
    { y: 240, w: 50 * shape.waist },
    { y: 270, w: 56 * (shape.waist * 0.4 + shape.hips * 0.6) },
    { y: 300, w: 64 * shape.hips },
    { y: 325, w: 62 * shape.hips },
  ];

  const controls: Array<{ key: keyof Shape; label: string }> = [
    { key: "shoulders", label: "Shoulders" },
    { key: "waist", label: "Waist" },
    { key: "hips", label: "Hips" },
  ];

  return (
    <div className="grid overflow-hidden rounded-[18px] border border-white/10 bg-[#1E2124] text-[#EEF1F0] lg:grid-cols-12">
      <div className="relative grid place-items-center bg-[#15181B] p-6 lg:col-span-7">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[28rem] w-auto max-w-full" role="img" aria-label="Wireframe body illustration that changes shape with the sliders">
          <defs>
            <radialGradient id={`${id}-glow`}>
              <stop offset="0" stopColor="#2EC4B6" stopOpacity="0.25" />
              <stop offset="1" stopColor="#2EC4B6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={240} r={200} fill={`url(#${id}-glow)`} />
          <ellipse cx={cx} cy={70} rx={28} ry={36} fill="none" stroke="#7FE3D8" strokeWidth={1.6} />
          {rings.map((r, i) => (
            <motion.ellipse
              key={i}
              cx={cx}
              cy={r.y}
              animate={{ rx: r.w, ry: r.w * 0.26 }}
              transition={{ duration: 0.6, ease: EASE }}
              fill="none"
              stroke="#7FE3D8"
              strokeWidth={1.5}
            />
          ))}
          {/* Legs */}
          {[-1, 1].map((s) =>
            Array.from({ length: 7 }).map((_, i) => (
              <motion.ellipse
                key={`${s}-${i}`}
                animate={{ cx: cx + s * (28 * shape.hips - i * 1.2), rx: 26 - i * 1.6 }}
                transition={{ duration: 0.6, ease: EASE }}
                cy={355 + i * 24}
                ry={7}
                fill="none"
                stroke="#7FE3D8"
                strokeOpacity={0.8}
                strokeWidth={1.3}
              />
            )),
          )}
          {/* Callouts */}
          {[
            { y: 120, w: rings[0].w, label: "Shoulders", v: shape.shoulders },
            { y: 225, w: rings[4].w, label: "Waist", v: shape.waist },
            { y: 310, w: rings[6].w, label: "Hips", v: shape.hips },
          ].map((c) => (
            <g key={c.label}>
              <motion.line
                animate={{ x1: cx - c.w - 14, x2: cx + c.w + 14 }}
                transition={{ duration: 0.6, ease: EASE }}
                y1={c.y}
                y2={c.y}
                stroke="#C6F432"
                strokeDasharray="4 5"
                strokeWidth={1.5}
              />
              <motion.circle animate={{ cx: cx + c.w + 14 }} transition={{ duration: 0.6, ease: EASE }} cy={c.y} r={3.5} fill="#C6F432" />
              <text x={W - 6} y={c.y - 8} textAnchor="end" fill="#C6F432" style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}>
                {c.label.toUpperCase()} ×{c.v.toFixed(2)}
              </text>
            </g>
          ))}
        </svg>
        <p className="absolute left-5 top-5 text-[0.7rem] uppercase tracking-[0.16em] text-white/40">Visual demo · no measurements taken</p>
      </div>

      <div className="flex flex-col justify-between gap-10 p-6 md:p-10 lg:col-span-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#8A9499]">Silhouette controls</p>
          <p className="mt-4 text-2xl leading-snug tracking-tight">
            Adjust proportions and watch the contour model respond in real time.
          </p>
        </div>

        <div className="space-y-7">
          {controls.map(({ key, label }) => (
            <div key={key}>
              <label htmlFor={`${id}-${key}`} className="flex justify-between text-xs uppercase tracking-[0.16em] text-[#8A9499]">
                {label}
                <span className="font-mono text-[#2EC4B6]">×{shape[key].toFixed(2)}</span>
              </label>
              <input
                id={`${id}-${key}`}
                type="range"
                min={LIMITS.min}
                max={LIMITS.max}
                step={0.01}
                value={shape[key]}
                onChange={(e) => setShape((s) => ({ ...s, [key]: Number(e.target.value) }))}
                className="mt-3 w-full accent-[#2EC4B6]"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setShape({ shoulders: 1, waist: 1, hips: 1 })}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition-colors hover:border-[#C6F432] hover:text-[#C6F432]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
