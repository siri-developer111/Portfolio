"use client";

import { AureliaDemo } from "./AureliaDemo";
import { NexoraDemo } from "./NexoraDemo";
import { VeloceDemo } from "./VeloceDemo";
import { MonochromeDemo } from "./MonochromeDemo";
import { FitformDemo } from "./FitformDemo";

const demos: Record<string, () => React.ReactElement> = {
  aurelia: AureliaDemo,
  nexora: NexoraDemo,
  veloce: VeloceDemo,
  monochrome: MonochromeDemo,
  fitform: FitformDemo,
};

export function ProjectDemo({ slug }: { slug: string }) {
  const Demo = demos[slug];
  return Demo ? <Demo /> : null;
}
