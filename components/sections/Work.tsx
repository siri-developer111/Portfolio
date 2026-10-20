import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ProjectMeta, ProjectNumber } from "@/components/projects/ProjectMeta";
import { HorizontalShowcase } from "@/components/projects/HorizontalShowcase";

const [aurelia, nexora, veloce, monochrome, fitform] = projects;

const href = (slug: string) => `/projects/${slug}`;

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-ivory">
      {/* Section header */}
      <div className="container-x grid gap-10 pb-16 pt-28 md:pt-40 lg:grid-cols-12 lg:pb-24">
        <div className="lg:col-span-8">
          <Reveal className="flex items-center gap-3">
            <span className="eyebrow text-accent">(02)</span>
            <span className="eyebrow text-mute">Selected Work — 05 concepts</span>
          </Reveal>
          <Reveal kind="words">
            <SplitWords
              as="h2"
                id="work-title"
              text="Concepts built to *explore* what the web can feel like."
              className="display mt-6 block text-[clamp(2.6rem,6.2vw,6.5rem)]"
            />
          </Reveal>
        </div>
        <Reveal className="self-end lg:col-span-3 lg:col-start-10">
          <p className="text-[0.95rem] leading-relaxed text-graphite">
            Five self-initiated concept projects — fictional brands designed and prototyped to push on typography, motion
            and interaction. They are explorations, not client work.
          </p>
        </Reveal>
      </div>

      {/* 01 — AURELIA: full-width cinematic feature */}
      <article className="container-x pb-28 md:pb-40">
        <div className="mb-8 flex items-end justify-between gap-6 border-t border-line pt-6">
          <ProjectNumber index={aurelia.index} className="text-[clamp(4rem,12vw,12rem)] text-ink/80" />
          <span className="eyebrow max-w-[12rem] text-right text-mute">{aurelia.year} / {aurelia.category}</span>
        </div>
        <ProjectMedia
          image={aurelia.cover}
          href={href(aurelia.slug)}
          label={`View ${aurelia.title} concept`}
          className="aspect-[4/3] w-full md:aspect-[16/8]"
          sizes="100vw"
          parallax={6}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <ProjectMeta project={aurelia} className="lg:col-span-7" />
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <ProjectMedia
              image={aurelia.frames[0]}
              href={href(aurelia.slug)}
              label={`View ${aurelia.title} archway detail`}
              className="aspect-[4/5] w-full"
              sizes="30vw"
              from="right"
            />
          </div>
        </div>
      </article>

      {/* 02 — NEXORA: split, image right with overlapping detail */}
      <article className="relative bg-stone py-28 md:py-40">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <ProjectNumber index={nexora.index} className="absolute -top-24 right-0 text-[clamp(5rem,12vw,12rem)] text-ink/15 lg:-top-44" />
            <ProjectMeta project={nexora} />
          </div>
          <div className="relative lg:col-span-7">
            <ProjectMedia
              image={nexora.cover}
              href={href(nexora.slug)}
              label={`View ${nexora.title} concept`}
              className="aspect-[16/10] w-full rounded-[2px] shadow-[0_40px_80px_-30px_rgba(20,10,60,0.45)]"
              from="right"
            />
            <ProjectMedia
              image={nexora.frames[0]}
              href={href(nexora.slug)}
              label={`View ${nexora.title} visual identity`}
              className="absolute -bottom-14 -left-8 hidden aspect-[4/5] w-[30%] border-[6px] border-stone md:block"
              sizes="20vw"
              parallax={12}
            />
          </div>
        </div>
      </article>

      {/* 03 — VELOCE: pinned horizontal story */}
      <HorizontalShowcase project={veloce} />

      {/* 04 — MONOCHROME: asymmetric editorial collage */}
      <article className="container-x py-28 md:py-40">
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 lg:col-span-4">
            <ProjectMedia
              image={monochrome.frames[0]}
              href={href(monochrome.slug)}
              label={`View ${monochrome.title} campaign image`}
              className="aspect-[4/5] w-full"
              sizes="(min-width: 768px) 35vw, 100vw"
            />
            <ProjectMeta project={monochrome} className="mt-12 hidden md:block" titleClassName="text-[clamp(2.5rem,4vw,4.5rem)]" />
          </div>
          <div className="relative md:col-span-7 md:pt-40 lg:col-span-8">
            <ProjectNumber index={monochrome.index} className="absolute right-0 top-0 hidden text-[9rem] text-ink/70 md:block" />
            <ProjectMedia
              image={monochrome.cover}
              href={href(monochrome.slug)}
              label={`View ${monochrome.title} concept`}
              className="aspect-[16/10] w-full"
              from="left"
            />
            <div className="mt-8 grid grid-cols-12 gap-6">
              <p className="eyebrow col-span-12 text-mute sm:col-span-5 sm:pt-4">
                Fig. 04 — Campaign / Product / Detail
              </p>
              <ProjectMedia
                image={monochrome.frames[1]}
                href={href(monochrome.slug)}
                label={`View ${monochrome.title} product flat lay`}
                className="col-span-12 aspect-[16/10] sm:col-span-7"
                sizes="35vw"
                parallax={10}
              />
            </div>
          </div>
          <ProjectMeta project={monochrome} className="mt-4 md:hidden" />
        </div>
      </article>

      {/* 05 — FITFORM AI: dark data story */}
      <article data-theme="dark" className="bg-[#15181B] py-28 text-ivory md:py-40">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <ProjectMedia
              image={fitform.cover}
              href={href(fitform.slug)}
              label={`View ${fitform.title} concept`}
              className="aspect-[16/10] w-full"
              from="left"
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {["Contour-ring body", "Measurement callouts", "Interactive demo"].map((t) => (
                <span key={t} className="eyebrow rounded-full border border-white/15 px-3 py-2 text-white/70">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative lg:col-span-4 lg:col-start-9">
            <ProjectNumber index={fitform.index} className="mb-6 block text-[clamp(5rem,10vw,10rem)] text-white/30" />
            <ProjectMeta project={fitform} tone="light" titleClassName="text-[clamp(2.75rem,5vw,5.5rem)]" />
          </div>
        </div>
      </article>
    </section>
  );
}
