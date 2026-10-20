export type SkillGroup = {
  id: string;
  title: string;
  /** How this group shows up in the work — framed as approach, not proficiency claims. */
  note: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    note: "Semantic, accessible interfaces with a strong component architecture underneath.",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "motion",
    title: "Motion & Interaction",
    note: "Choreographing scroll, timing and micro-interactions so motion explains rather than decorates.",
    items: ["GSAP", "ScrollTrigger", "Framer Motion", "SVG animation", "Micro-interactions"],
  },
  {
    id: "backend",
    title: "Backend Development",
    note: "Pragmatic server-side work to give interfaces real data and real behaviour.",
    items: ["Node.js", "REST APIs", "Route handlers", "Data modelling"],
  },
  {
    id: "ai",
    title: "AI & Experimentation",
    note: "Exploring how machine learning and language models can make products feel more personal.",
    items: ["Python", "AI/ML exploration", "LLM-powered prototypes", "Prompt design"],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    note: "A tidy, reviewable workflow from first commit to deployment.",
    items: ["Git", "GitHub", "Vercel", "Figma", "VS Code"],
  },
];
