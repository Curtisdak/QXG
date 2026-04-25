import type { GameMode } from "@/types/game";

const modeAuraClass: Record<GameMode, string> = {
  chill: "from-cyan-400/25 via-sky-500/15 to-emerald-400/25",
  heat: "from-amber-400/25 via-orange-500/15 to-rose-500/25",
  wild: "from-rose-500/25 via-red-600/15 to-fuchsia-500/25",
};

interface AmbientBackgroundProps {
  mode?: GameMode;
}

export function AmbientBackground({ mode }: AmbientBackgroundProps) {
  const aura = mode
    ? modeAuraClass[mode]
    : "from-cyan-500/25 via-rose-500/15 to-amber-400/20";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.3),_rgba(2,6,23,0.95))]" />
      <div
        className={`absolute left-1/2 top-[-16rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-r ${aura} blur-3xl`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px] opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05070d]" />
    </div>
  );
}
