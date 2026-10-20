"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type Variant = "solid" | "ghost" | "light";

const styles: Record<Variant, string> = {
  solid: "bg-ink text-ivory",
  ghost: "border border-ink/20 text-ink",
  light: "bg-ivory text-ink",
};

const fill: Record<Variant, string> = {
  solid: "bg-accent",
  ghost: "bg-ink",
  light: "bg-accent",
};

const hoverText: Record<Variant, string> = {
  solid: "group-hover:text-white",
  ghost: "group-hover:text-ivory",
  light: "group-hover:text-white",
};

const MotionLink = motion.create(Link);

/** Pill CTA with a rising colour fill, rolling label and magnetic pull. */
export function CtaButton({
  href,
  children,
  variant = "solid",
  icon = true,
  className,
  cursor,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: boolean;
  className?: string;
  cursor?: string;
  "data-intro"?: boolean;
}) {
  return (
    <Magnetic className={className} strength={0.25}>
      <MotionLink
        href={href}
        whileTap={{ scale: 0.96 }}
        data-cursor={cursor}
        className={cn(
          "group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full pl-7 pr-2 text-[0.95rem] font-medium tracking-tight",
          styles[variant],
        )}
        {...rest}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 translate-y-full rounded-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0",
            fill[variant],
          )}
        />
        <span className="relative block overflow-hidden">
          <span
            className={cn(
              "block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full",
            )}
          >
            {children}
          </span>
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0",
              hoverText[variant],
            )}
          >
            {children}
          </span>
        </span>
        {icon && (
          <span
            className={cn(
              "relative grid size-10 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-45",
              variant === "ghost" ? "bg-ink text-ivory" : variant === "light" ? "bg-ink text-ivory" : "bg-ivory text-ink",
            )}
          >
            <ArrowUpRight size={16} />
          </span>
        )}
        {!icon && <span className="w-5" />}
      </MotionLink>
    </Magnetic>
  );
}
