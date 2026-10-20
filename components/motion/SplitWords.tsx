import { Fragment, type ElementType, type ReactNode } from "react";

/**
 * Renders text as masked words so GSAP can reveal them (`.mask > span`).
 * Server-safe: no client JS — the parent decides how/when to animate.
 * Words wrapped in *asterisks* are rendered in the italic serif accent.
 */
export function SplitWords({
  text,
  id,
  as: Tag = "span",
  className,
  wordClassName,
  accentClassName = "serif-accent text-accent",
}: {
  text: string;
  id?: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  accentClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map((raw, i) => {
        const accent = raw.startsWith("*") && raw.replace(/[.,?!]$/, "").endsWith("*");
        const word = raw.replace(/\*/g, "");
        const content: ReactNode = accent ? <span className={accentClassName}>{word}</span> : word;
        return (
          <Fragment key={i}>
            <span className="mask" aria-hidden>
              <span data-word className={wordClassName}>
                {content}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
