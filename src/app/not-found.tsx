import Link from "next/link";
import { AppLogo } from "@/components/ui/app-logo";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { PageShell } from "@/components/ui/page-shell";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <PageShell className="flex min-h-screen items-center justify-center">
        <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950/65 p-6 text-center backdrop-blur-sm sm:p-8">
          <div className="mb-4 flex justify-center">
            <AppLogo size="md" withLink />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            404
          </p>
          <h1 className="mt-3 text-4xl text-white sm:text-5xl">Mode introuvable</h1>
          <p className="mt-4 text-sm text-slate-300 sm:text-base">
            Cette route ne fait pas partie de QXG. Choisissez un mode valide
            pour continuer.
          </p>
          <Link
            href="/modes"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-rose-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:brightness-110 sm:w-auto sm:text-sm sm:tracking-[0.18em]"
          >
            Retour aux modes
          </Link>
        </section>
      </PageShell>
    </div>
  );
}
