export type GameMode = "chill" | "heat" | "wild";

export type ChallengeType = "truth" | "dare";

export interface Challenge {
  id: string;
  type: ChallengeType;
  text: string;
  mode: GameMode;
}

export interface ModeConfig {
  id: GameMode;
  label: string;
  tone: string;
  description: string;
  gradientClass: string;
  borderClass: string;
  glowClass: string;
  badgeClass: string;
  buttonClass: string;
}
