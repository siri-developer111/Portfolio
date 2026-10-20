import Link from "next/link";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function ExploreLink({ project, tone = "dark" }: { project: Project; tone?: "dark" | "light" }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group inline-flex items-center gap-3 border-b pb-1.5 text-[0.95rem] font-medium",
        tone === "dark" ? "border-ink/25 hover:border-ink" : "border-white/25 hover:border-white",
      )}
    >
      Explore concept
      <span className="sr-only">: {project.title}</span>
      <span className="relative grid size-7 place-items-center overflow-hidden rounded-full bg-accent text-white">
        <ArrowRight size={14} className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-7" />
        <ArrowRight size={14} className="absolute -translate-x-7 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0" />
      </span>
    </Link>
  );
}

export function ProjectNumber({ index, className }: { index: string; className?: string }) {
  return (
    <span aria-hidden className={cn("display text-outline select-none leading-none", className)}>
      {index}
    </span>
  );
}

export function ProjectMeta({
  project,
  tone = "dark",
  className,
  titleClassName,
}: {
  project: Project;
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
}) {
  const muted = tone === "dark" ? "text-mute" : "text-white/55";
  return (
    <div className={className}>
      <Reveal className="flex items-center gap-3">
        <span className="eyebrow text-accent">({project.index})</span>
        <span className={cn("eyebrow", muted)}>{project.category}</span>
      </Reveal>
      <Reveal kind="words">
        <SplitWords
          as="h3"
          text={project.title}
          className={cn("display mt-5 text-[clamp(3rem,7vw,7.5rem)]", titleClassName)}
        />
      </Reveal>
      <Reveal className="mt-6 max-w-md space-y-7">
        <p className={cn("text-[1.05rem] leading-relaxed", tone === "dark" ? "text-graphite" : "text-white/75")}>
          <span className={cn("serif-accent mr-1 text-[1.25em]", tone === "dark" ? "text-ink" : "text-white")}>
            {project.tagline}
          </span>{" "}
          {project.summary}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <ExploreLink project={project} tone={tone} />
          <span className={cn("eyebrow", muted)}>{project.stack.slice(0, 3).join(" · ")}</span>
        </div>
      </Reveal>
    </div>
  );
}
