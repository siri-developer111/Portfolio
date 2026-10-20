/**
 * Personal, editable site configuration.
 * Everything Siri may want to personalise lives here — nothing about real
 * history, employers, schools or contact details has been invented.
 */

export type SocialLink = {
  label: string;
  /** Leave empty until the real profile URL is known. Empty links render as a disabled chip, never a dead link. */
  href: string;
};

export const site = {
  name: "SIRI",
  fullName: "Siri",
  roles: ["Creative Developer", "Full-Stack Developer", "AI Explorer"],
  headline: ["Building digital", "experiences", "beyond the ordinary."],
  intro:
    "I turn ambitious ideas into immersive web experiences through code, motion, and intelligent technology.",
  status: "Open to new collaborations",

  /** Replace with your real address. Used for the contact CTA and copy button. */
  email: "your.email@example.com",

  socials: [
    { label: "GitHub", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "X / Twitter", href: "" },
    { label: "Dribbble", href: "" },
  ] as SocialLink[],

  about: {
    statement:
      "Curious by nature. Driven by experimentation. I explore the intersection of design, development, and intelligent technology to create digital experiences that feel as good as they function.",
    intro:
      "I'm Siri — a developer who cares as much about how something feels as how it works. I like building at the seam where interface design, front-end engineering and new technology meet, and I treat every project as a chance to learn something I couldn't do before.",
    principles: [
      {
        title: "Craft over noise",
        body: "Fewer, better details. Every element should earn its place on the screen.",
      },
      {
        title: "Motion with meaning",
        body: "Animation is a material, not decoration. It should guide, explain, and reward.",
      },
      {
        title: "Curiosity as method",
        body: "Prototype early, question defaults, and let experiments shape the final idea.",
      },
    ],
    /**
     * A creative arc told through interests, not dates or institutions.
     * Add an optional `year` to any entry if you'd like to show one.
     */
    journey: [
      { label: "Curiosity", body: "Taking interfaces apart to understand how they're put together.", year: "" },
      { label: "Craft", body: "Turning layouts into responsive, accessible, living interfaces.", year: "" },
      { label: "Motion", body: "Learning that timing and easing are design decisions too.", year: "" },
      { label: "Intelligence", body: "Exploring how AI can make products feel more personal and human.", year: "" },
    ],
  },
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "work", label: "Selected Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type NavId = (typeof navItems)[number]["id"];
