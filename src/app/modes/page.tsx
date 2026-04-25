import Link from "next/link";
import { ModeCard } from "@/components/mode/mode-card";
import { AppLogo } from "@/components/ui/app-logo";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { PageShell } from "@/components/ui/page-shell";
import { MODES } from "@/lib/game-data";

export default function ModeSelectionPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />

      <PageShell className="flex min-h-screen flex-col justify-center py-4">
        <header className="mx-auto mb-6 w-full max-w-3xl text-center sm:mb-8">
          <div className="mb-4 flex justify-center">
            <AppLogo size="md" withLink />
          </div>
          <Link
            href="/"
            className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:bg-white/10 sm:px-4 sm:text-xs sm:tracking-[0.2em]"
          >
            Retour à l&apos;accueil
          </Link>

          <h1 className="mt-6 text-4xl text-white sm:text-6xl">
            Choisissez votre intensité
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            Commencez en douceur, montez en intensité ou plongez directement
            dans le chaos.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          {MODES.map((mode, index) => (
            <ModeCard key={mode.id} mode={mode} index={index} />
          ))}
        </section>
      </PageShell>
    </div>
  );
}
