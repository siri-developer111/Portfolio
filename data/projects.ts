/**
 * Fictional concept projects. These are self-initiated design/engineering
 * explorations — not client work, not launched products.
 */

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  summary: string;
  /** What the concept explores — used on the detail page. */
  challenge: string;
  approach: string[];
  stack: string[];
  palette: { name: string; hex: string }[];
  typography: string;
  theme: {
    bg: string;
    fg: string;
    accent: string;
    muted: string;
    dark: boolean;
  };
  cover: ProjectImage;
  frames: [ProjectImage, ProjectImage];
};

const img = (slug: string, name: "cover" | "frame-a" | "frame-b", alt: string): ProjectImage => ({
  src: `/projects/${slug}/${name}.webp`,
  alt,
  width: name === "frame-a" ? 1200 : 1600,
  height: name === "frame-a" ? 1500 : 1000,
});

export const projects: Project[] = [
  {
    slug: "aurelia",
    index: "01",
    title: "AURELIA",
    category: "Luxury Real Estate Experience",
    year: "Concept",
    tagline: "Architecture, presented like cinema.",
    summary:
      "A slow, editorial way to browse exceptional homes — long horizons, warm stone and typography that lets the architecture breathe.",
    challenge:
      "Luxury property sites often bury the architecture beneath filters and listing clutter. AURELIA explores what happens when each home is introduced like the opening scene of a film.",
    approach: [
      "Full-bleed architectural hero with a clipped reveal that echoes a camera dolly.",
      "Property cards that expand into a focused view instead of navigating away.",
      "An ivory, stone and muted-gold palette paired with a high-contrast serif.",
      "Plan drawings used as a secondary visual language for scale and detail.",
    ],
    stack: ["Next.js", "TypeScript", "GSAP", "Motion"],
    palette: [
      { name: "Ivory", hex: "#F1EBDF" },
      { name: "Stone", hex: "#CFC2AC" },
      { name: "Muted gold", hex: "#B08D57" },
      { name: "Black", hex: "#151515" },
    ],
    typography: "High-contrast serif display with a quiet grotesk for details.",
    theme: { bg: "#EEE6D8", fg: "#181614", accent: "#9C7A44", muted: "#6F6555", dark: false },
    cover: img("aurelia", "cover", "Illustrated modernist villa with cantilevered stone slabs and a reflecting pool at golden hour"),
    frames: [
      img("aurelia", "frame-a", "Stone archway framing a low sun over a still pool"),
      img("aurelia", "frame-b", "Architectural floor plan drawn in black and muted gold"),
    ],
  },
  {
    slug: "nexora",
    index: "02",
    title: "NEXORA",
    category: "AI-Powered Productivity Platform",
    year: "Concept",
    tagline: "A calmer workspace that thinks alongside you.",
    summary:
      "A fictional AI productivity platform exploring how assistive features can feel ambient and trustworthy rather than loud and magical.",
    challenge:
      "AI products tend to shout. NEXORA imagines an interface where intelligence shows up quietly — in summaries, plans and focus modes — and always explains itself.",
    approach: [
      "Dark product dashboard with a light-mode command palette for contrast.",
      "An abstract, node-based visual identity instead of literal robot imagery.",
      "Feature previews that transition with shared layout animation.",
      "Every AI suggestion is labelled and dismissible by design.",
    ],
    stack: ["Next.js", "TypeScript", "Motion", "Tailwind CSS"],
    palette: [
      { name: "Charcoal", hex: "#141418" },
      { name: "Electric lavender", hex: "#9B8CFF" },
      { name: "Cool blue", hex: "#5B8CFF" },
      { name: "Mist", hex: "#EEECF8" },
    ],
    typography: "Geometric sans with tabular numerals for data-dense views.",
    theme: { bg: "#121216", fg: "#F2F0FF", accent: "#A996FF", muted: "#8E8BA8", dark: true },
    cover: img("nexora", "cover", "Dark AI productivity dashboard with lavender charts and a glowing assistant orb"),
    frames: [
      img("nexora", "frame-a", "Abstract sphere of connected glowing nodes in lavender and blue"),
      img("nexora", "frame-b", "Light command palette floating over soft lavender gradients"),
    ],
  },
  {
    slug: "veloce",
    index: "03",
    title: "VELOCE",
    category: "Premium Automotive Digital Experience",
    year: "Concept",
    tagline: "Performance you can scroll through.",
    summary:
      "An experimental automotive landing page where scroll becomes acceleration — dark editorial chapters, silver light and a single red line.",
    challenge:
      "Car launch sites rely on video. VELOCE explores whether pure scroll choreography, typography and lighting can carry the same sense of speed — at a fraction of the weight.",
    approach: [
      "A pinned, horizontally scrolling story on desktop; native swipe on touch.",
      "Oversized typography that moves at a different speed to the imagery.",
      "Specification panels that animate between illustrative drive modes.",
      "A restrained red accent reserved for moments of emphasis.",
    ],
    stack: ["Next.js", "GSAP ScrollTrigger", "TypeScript"],
    palette: [
      { name: "Black", hex: "#070707" },
      { name: "Silver", hex: "#B9BEC4" },
      { name: "White", hex: "#F1F3F5" },
      { name: "Signal red", hex: "#E0262E" },
    ],
    typography: "Wide, tightly tracked sans with technical mono labels.",
    theme: { bg: "#080808", fg: "#F1F3F5", accent: "#FF3B44", muted: "#8A9097", dark: true },
    cover: img("veloce", "cover", "Silver sports coupe in a dark studio with a red light line"),
    frames: [
      img("veloce", "frame-a", "Close-up of a silver five-spoke wheel with a red brake caliper"),
      img("veloce", "frame-b", "Tunnel of light streaks converging to a bright vanishing point"),
    ],
  },
  {
    slug: "monochrome",
    index: "04",
    title: "MONOCHROME",
    category: "Fashion & Creative E-Commerce",
    year: "Concept",
    tagline: "A storefront edited like a magazine.",
    summary:
      "A high-end fashion store concept built on asymmetric grids, campaign-scale imagery and product details that never shout.",
    challenge:
      "Most stores treat every product the same. MONOCHROME borrows the rhythm of print editorials — big moments, quiet pauses — while keeping shopping fast.",
    approach: [
      "Asymmetric product grid with deliberately varied scale.",
      "Hover interactions that swap to an alternate view instead of zooming.",
      "Minimal product detail with size selection and a local bag demo.",
      "Warm neutrals and earthy tones from the campaign imagery.",
    ],
    stack: ["Next.js", "TypeScript", "Motion", "Tailwind CSS"],
    palette: [
      { name: "Warm white", hex: "#EFEBE4" },
      { name: "Black", hex: "#1B1917" },
      { name: "Camel", hex: "#A88762" },
      { name: "Clay", hex: "#9C6B4E" },
    ],
    typography: "Fashion serif headlines with a neutral, generous sans.",
    theme: { bg: "#EFEBE4", fg: "#1B1917", accent: "#9C6B4E", muted: "#7A6E62", dark: false },
    cover: img("monochrome", "cover", "Three minimal fashion illustrations in camel, ivory and black coats"),
    frames: [
      img("monochrome", "frame-a", "Single figure in a long black coat on a warm grey backdrop"),
      img("monochrome", "frame-b", "Flat lay of a ribbed clay knit, black tote and ivory cap"),
    ],
  },
  {
    slug: "fitform",
    index: "05",
    title: "FITFORM AI",
    category: "AI-Powered 3D Body Visualization Concept",
    year: "Concept",
    tagline: "Fit, visualised.",
    summary:
      "A conceptual interface for fitness and tailoring that imagines how body measurements could be visualised clearly and respectfully.",
    challenge:
      "Body data is personal and easy to present badly. FITFORM AI explores a technical-but-calm interface — a wireframe body, clear measurements and no judgement.",
    approach: [
      "A contour-ring body visual that suggests 3D without heavy WebGL.",
      "Measurement callouts with clear hierarchy and plain-language labels.",
      "An interactive demo where sliders reshape the illustration in real time.",
      "Graphite surfaces with teal for data and lime only for highlights.",
    ],
    stack: ["Next.js", "TypeScript", "SVG", "Motion"],
    palette: [
      { name: "Graphite", hex: "#191C1F" },
      { name: "Teal", hex: "#2EC4B6" },
      { name: "Lime", hex: "#C6F432" },
      { name: "White", hex: "#EEF1F0" },
    ],
    typography: "Technical grotesk paired with a monospace for values.",
    theme: { bg: "#15181B", fg: "#EEF1F0", accent: "#2EC4B6", muted: "#8A9499", dark: true },
    cover: img("fitform", "cover", "Wireframe body made of teal contour rings with lime measurement callouts"),
    frames: [
      img("fitform", "frame-a", "Close-up of a contour-ring torso with measurement lines and a data trace"),
      img("fitform", "frame-b", "Light dashboard with a body wireframe card, progress ring and bar chart"),
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
