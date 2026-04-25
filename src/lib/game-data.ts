import chillRaw from "@/data/challenges/chill.json";
import heatRaw from "@/data/challenges/heat.json";
import wildRaw from "@/data/challenges/wild.json";
import type { Challenge, GameMode, ModeConfig } from "@/types/game";

interface RawChallenge {
  id: number | string;
  type: string;
  text: string;
  mode: string;
}

function normalizeChallenges(raw: RawChallenge[], mode: GameMode): Challenge[] {
  return raw
    .filter((item) => typeof item.text === "string" && item.text.trim().length > 0)
    .map((item) => ({
      id: String(item.id),
      type: item.type === "dare" ? "dare" : "truth",
      text: item.text.trim(),
      mode,
    }));
}

const challengeByMode: Record<GameMode, Challenge[]> = {
  chill: normalizeChallenges(chillRaw as RawChallenge[], "chill"),
  heat: normalizeChallenges(heatRaw as RawChallenge[], "heat"),
  wild: normalizeChallenges(wildRaw as RawChallenge[], "wild"),
};

const MODE_CONFIG: Record<GameMode, ModeConfig> = {
  chill: {
    id: "chill",
    label: "Chill",
    tone: "Tension légère, énergie fluide.",
    description:
      "Des défis légers et joueurs pour briser la glace sans dépasser votre zone de confort.",
    gradientClass: "from-cyan-400/25 via-sky-400/10 to-emerald-400/25",
    borderClass: "border-cyan-300/25",
    glowClass: "shadow-[0_0_60px_rgba(34,211,238,0.18)]",
    badgeClass: "border-cyan-300/40 bg-cyan-400/15 text-cyan-100",
    buttonClass: "from-cyan-500 to-emerald-500",
  },
  heat: {
    id: "heat",
    label: "Heat",
    tone: "Défis plus audacieux, intensité plus marquée.",
    description:
      "Montez en puissance avec des actions et vérités affirmées qui révèlent la vraie alchimie.",
    gradientClass: "from-amber-300/25 via-orange-400/15 to-rose-500/25",
    borderClass: "border-orange-300/25",
    glowClass: "shadow-[0_0_60px_rgba(251,146,60,0.18)]",
    badgeClass: "border-orange-300/40 bg-orange-400/15 text-orange-100",
    buttonClass: "from-orange-500 to-rose-500",
  },
  wild: {
    id: "wild",
    label: "Wild",
    tone: "Prises de risque, dynamique imprévisible.",
    description:
      "Des défis à fort enjeu pour les joueurs prêts à embrasser le chaos avec assurance.",
    gradientClass: "from-rose-500/25 via-red-500/15 to-fuchsia-500/25",
    borderClass: "border-rose-300/25",
    glowClass: "shadow-[0_0_60px_rgba(244,63,94,0.2)]",
    badgeClass: "border-rose-300/40 bg-rose-400/15 text-rose-100",
    buttonClass: "from-rose-500 to-fuchsia-500",
  },
};

export const MODES = Object.values(MODE_CONFIG);

export function isMode(value: string): value is GameMode {
  return value === "chill" || value === "heat" || value === "wild";
}

export function getModeConfig(mode: GameMode): ModeConfig {
  return MODE_CONFIG[mode];
}

export function getChallenges(mode: GameMode): Challenge[] {
  return challengeByMode[mode];
}
