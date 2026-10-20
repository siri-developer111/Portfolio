import { CtaButton } from "@/components/ui/CtaButton";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="flex min-h-[100svh] items-center bg-ivory outline-none">
      <div className="container-x">
        <p className="eyebrow text-accent">(404)</p>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,9rem)]">
          Lost in the <span className="serif-accent text-accent">details.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-graphite">This page doesn&apos;t exist — but the work does.</p>
        <div className="mt-10">
          <CtaButton href="/#work">Back to selected work</CtaButton>
        </div>
      </div>
    </main>
  );
}
