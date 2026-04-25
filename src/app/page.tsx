import Link from "next/link";
import { AppLogo } from "@/components/ui/app-logo";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { PageShell } from "@/components/ui/page-shell";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />

      <PageShell className="flex min-h-screen flex-col justify-center py-4">
        <section className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-950/45 p-5 text-center shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-10">
          <p className="mx-auto mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-200 sm:px-4 sm:text-xs sm:tracking-[0.24em]">
            Réservé aux adultes 18+
          </p>

          <div className="mb-4 flex justify-center">
            <AppLogo size="hero" priority />
          </div>
          <h1 className="text-5xl leading-none text-white sm:text-8xl">QXG</h1>
          <p className="mt-4 text-sm text-slate-200 sm:text-xl">
            Une expérience de soirée premium inspirée d&apos;Action ou Vérité,
            pensée pour les adultes.
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Trois modes progressifs rythment la soirée :{" "}
            <span className="font-semibold text-cyan-200">Chill</span>,{" "}
            <span className="font-semibold text-orange-200">Heat</span> et{" "}
            <span className="font-semibold text-rose-200">Wild</span>. Jouez
            avec consentement, respectez les limites et gardez une ambiance
            mutuelle.
          </p>

          <Link
            href="/modes"
            className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-rose-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:scale-[1.02] hover:brightness-110 sm:w-auto sm:px-7 sm:text-base sm:tracking-[0.16em]"
          >
            Entrer dans l&apos;expérience
          </Link>
        </section>
      </PageShell>
    </div>
  );
}
