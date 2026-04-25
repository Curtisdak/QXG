import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChallengeDeck } from "@/components/game/challenge-deck";
import { AppLogo } from "@/components/ui/app-logo";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { PageShell } from "@/components/ui/page-shell";
import { MODES, getChallenges, getModeConfig, isMode } from "@/lib/game-data";
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME } from "@/lib/seo";

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
      description: "Le mode demande est introuvable sur QXG.",
    };
  }

  const selectedMode = getModeConfig(mode);
  const pageTitle = `Mode ${selectedMode.label} - Action ou Verite`;
  const pageDescription = `Jouez en mode ${selectedMode.label} sur QXG, jeu adulte 18+ d'action ou verite pour couple et soiree privee.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `mode ${selectedMode.label.toLowerCase()}`,
      "action ou verite adulte",
      "jeu couple",
      "soiree privee",
      "jeu 18+",
    ],
    alternates: {
      canonical: `/game/${mode}`,
    },
    openGraph: {
      title: `${SITE_NAME} | ${pageTitle}`,
      description: pageDescription,
      url: `/game/${mode}`,
      images: [
        {
          url: DEFAULT_OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: `QXG - Mode ${selectedMode.label}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} | ${pageTitle}`,
      description: pageDescription,
      images: [DEFAULT_OG_IMAGE_PATH],
    },
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

          <nav
            aria-label="Navigation principale du jeu"
            className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-3"
          >
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
          </nav>
        </header>

        <ChallengeDeck mode={selectedMode} challenges={challenges} />
      </PageShell>
    </div>
  );
}
