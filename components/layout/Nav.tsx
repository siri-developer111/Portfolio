"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { navItems, site, type NavId } from "@/data/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<NavId>("home");
  const [onDark, setOnDark] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !open);
  });

  // Active section + whether the nav currently sits on a dark section.
  useEffect(() => {
    if (!isHome) return;
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as NavId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    const darks = Array.from(document.querySelectorAll<HTMLElement>("[data-theme='dark']"));
    if (!darks.length) {
      const raf = requestAnimationFrame(() => setOnDark(false));
      return () => cancelAnimationFrame(raf);
    }
    const state = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => state.set(e.target, e.isIntersecting));
        setOnDark(Array.from(state.values()).some(Boolean));
      },
      { rootMargin: "0px 0px -94% 0px" },
    );
    darks.forEach((d) => io.observe(d));
    return () => io.disconnect();
  }, [pathname]);

  // Lock scroll + Escape to close while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dark = onDark && !open;
  const href = (id: string) => (id === "home" ? "/#home" : `/#${id}`);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[100]"
      >
        <div
          className={cn(
            "transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled && !open
              ? dark
                ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl"
                : "border-b border-line bg-ivory/75 backdrop-blur-xl"
              : "border-b border-transparent",
          )}
        >
          <nav
            aria-label="Primary"
            className={cn(
              "container-x flex h-[4.5rem] items-center justify-between gap-6 transition-colors duration-500",
              dark || open ? "text-ivory" : "text-ink",
            )}
          >
            <Link href="/#home" onClick={() => setOpen(false)} className="group flex items-center gap-2" aria-label="SIRI — home">
              <span className="display text-[1.35rem] tracking-[-0.06em]">SIRI</span>
              <span className="size-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
            </Link>

            <ul className="relative hidden items-center gap-1 rounded-full lg:flex">
              {navItems.map((item) => {
                const isActive = isHome && active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={href(item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className="relative block rounded-full px-4 py-2 text-[0.9rem] tracking-tight"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          className={cn("absolute inset-0 rounded-full", dark ? "bg-white/10" : "bg-ink/[0.06]")}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <Magnetic className="hidden sm:inline-block" strength={0.2}>
                <Link
                  href="/#contact"
                  className={cn(
                    "group flex items-center gap-2.5 rounded-full border px-4 py-2 text-[0.85rem] transition-colors duration-500",
                    dark || open ? "border-white/20 hover:bg-white hover:text-ink" : "border-ink/15 hover:bg-ink hover:text-ivory",
                  )}
                >
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                    <span className="relative size-2 rounded-full bg-accent" />
                  </span>
                  Let&apos;s talk
                </Link>
              </Magnetic>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className={cn(
                  "relative grid size-11 place-items-center rounded-full lg:hidden",
                  dark || open ? "bg-ivory text-ink" : "bg-ink text-ivory",
                )}
              >
                <span className="sr-only">Menu</span>
                <motion.span
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute h-[1.5px] w-4 bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute h-[1.5px] w-4 bg-current"
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.25rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.6rem) 2.25rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.25rem)" }}
            transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink text-ivory lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 hairline-grid opacity-[0.07] [--color-line:#fff]" />
            <div className="container-x relative flex flex-1 flex-col justify-between pb-10 pt-28">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <li key={item.id} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.8, ease: EASE, delay: open ? 0.25 + i * 0.06 : 0 }}
                    >
                      <Link
                        href={href(item.id)}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 py-1"
                        autoFocus={i === 0}
                      >
                        <span className="eyebrow text-white/40">0{i + 1}</span>
                        <span className="display text-[clamp(2.75rem,13vw,5.5rem)] transition-colors duration-300 group-hover:text-accent">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6"
              >
                <div>
                  <p className="eyebrow text-white/40">Say hello</p>
                  <a href={`mailto:${site.email}`} className="mt-2 block text-lg">
                    {site.email}
                  </a>
                </div>
                <p className="flex items-center gap-2 text-sm text-white/60">
                  <span className="size-2 rounded-full bg-accent" />
                  {site.status}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
