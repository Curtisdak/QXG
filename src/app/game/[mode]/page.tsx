import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChallengeDeck } from "@/components/game/challenge-deck";
import { AppLogo } from "@/components/ui/app-logo";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { PageShell } from "@/components/ui/page-shell";
import { MODES, getChallenges, getModeConfig, isMode } from "@/lib/game-data";

type GamePageProps = {
  params: Promise<{ mode: string }>;
};

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { mode } = await params;
  if (!isMode(mode)) {
    return {
      title: "Mode introuvable",
    };
  }

  const selectedMode = getModeConfig(mode);
  return {
    title: `Mode ${selectedMode.label}`,
    description: `Mode ${selectedMode.label} dans QXG : ${selectedMode.description}`,
  };
}

export function generateStaticParams() {
  return MODES.map((mode) => ({
    mode: mode.id,
  }));
}

export default async function GamePage({ params }: GamePageProps) {
  const { mode } = await params;

  if (!isMode(mode)) {
    notFound();
  }

  const selectedMode = getModeConfig(mode);
  const challenges = getChallenges(mode);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground mode={mode} />

      <PageShell className="flex min-h-screen flex-col gap-6 pt-6 sm:gap-8 sm:pt-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <AppLogo size="sm" withLink />
            <div>
            <h1 className="text-4xl text-white sm:text-6xl">
              {selectedMode.label}
            </h1>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              {selectedMode.tone}
            </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-3">
            <Link
              href="/modes"
              className="text-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:bg-white/10 sm:px-4 sm:text-xs sm:tracking-[0.18em]"
            >
              Changer de mode
            </Link>
            <Link
              href="/"
              className="text-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:bg-white/10 sm:px-4 sm:text-xs sm:tracking-[0.18em]"
            >
              Accueil
            </Link>
          </div>
        </header>

        <ChallengeDeck mode={selectedMode} challenges={challenges} />
      </PageShell>
    </div>
  );
}
