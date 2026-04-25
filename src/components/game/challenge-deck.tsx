"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Challenge, ChallengeType, ModeConfig } from "@/types/game";

interface DeckState {
  current: Challenge | null;
  selectedType: ChallengeType | null;
  seenIdsByType: Record<ChallengeType, string[]>;
  turn: number;
}

interface ChallengeDeckProps {
  mode: ModeConfig;
  challenges: Challenge[];
}

function pickRandom(items: Challenge[]): Challenge {
  return items[Math.floor(Math.random() * items.length)];
}

function getTypeLabel(type: ChallengeType): string {
  return type === "truth" ? "Vérité" : "Action";
}

export function ChallengeDeck({ mode, challenges }: ChallengeDeckProps) {
  const [deck, setDeck] = useState<DeckState>({
    current: null,
    selectedType: null,
    seenIdsByType: { truth: [], dare: [] },
    turn: 0,
  });

  const truthCount = challenges.filter(
    (challenge) => challenge.type === "truth",
  ).length;
  const dareCount = challenges.filter(
    (challenge) => challenge.type === "dare",
  ).length;

  const selectType = (type: ChallengeType) => {
    setDeck((previous) => {
      const filtered = challenges.filter((challenge) => challenge.type === type);
      if (!filtered.length) {
        return {
          ...previous,
          selectedType: type,
        };
      }

      const seenIds = previous.seenIdsByType[type];
      const remaining = filtered.filter(
        (challenge) => !seenIds.includes(challenge.id),
      );
      const pool = remaining.length ? remaining : filtered;
      const next = pickRandom(pool);

      return {
        current: next,
        selectedType: type,
        seenIdsByType: {
          ...previous.seenIdsByType,
          [type]: remaining.length ? [...seenIds, next.id] : [next.id],
        },
        turn: previous.turn + 1,
      };
    });
  };

  const selectRandomType = () => {
    const availableTypes: ChallengeType[] = [];
    if (truthCount) {
      availableTypes.push("truth");
    }
    if (dareCount) {
      availableTypes.push("dare");
    }
    if (!availableTypes.length) {
      return;
    }

    const randomType =
      availableTypes[Math.floor(Math.random() * availableTypes.length)];
    selectType(randomType);
  };

  if (!challenges.length) {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 rounded-3xl border border-white/10 bg-slate-950/70 p-8 text-center backdrop-blur">
        <h2 className="text-3xl text-white">Aucun défi chargé</h2>
        <p className="max-w-md text-sm text-slate-300">
          Ajoutez des défis dans le fichier JSON local de ce mode puis
          actualisez.
        </p>
      </section>
    );
  }

  const selectedTypeCount = deck.selectedType
    ? deck.selectedType === "truth"
      ? truthCount
      : dareCount
    : challenges.length;
  const selectedSeenCount = deck.selectedType
    ? deck.seenIdsByType[deck.selectedType].length
    : 0;
  const isTruth = deck.current?.type === "truth";

  return (
    <section className="mx-auto w-full max-w-2xl">
      <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.2em] ${mode.badgeClass}`}
        >
          Mode {mode.label}
        </span>
        <p className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 sm:text-xs sm:tracking-[0.18em]">
          {deck.selectedType
            ? `${getTypeLabel(deck.selectedType)} ${Math.min(selectedSeenCount, selectedTypeCount)} / ${selectedTypeCount}`
            : "Choisissez Vérité ou Action"}
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => selectType("truth")}
          disabled={!truthCount}
          className={`min-h-[84px] rounded-2xl border px-4 py-3 text-left transition ${
            deck.selectedType === "truth"
              ? "border-sky-300/45 bg-sky-400/15 text-sky-100"
              : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
          } disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">
            Vérité
          </p>
          <p className="mt-1 text-xs text-slate-300">{truthCount} cartes</p>
        </button>

        <button
          type="button"
          onClick={() => selectType("dare")}
          disabled={!dareCount}
          className={`min-h-[84px] rounded-2xl border px-4 py-3 text-left transition ${
            deck.selectedType === "dare"
              ? "border-pink-300/45 bg-pink-500/15 text-pink-100"
              : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
          } disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">
            Action
          </p>
          <p className="mt-1 text-xs text-slate-300">{dareCount} cartes</p>
        </button>

        <button
          type="button"
          onClick={selectRandomType}
          disabled={!truthCount && !dareCount}
          className="col-span-2 min-h-[84px] rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-1"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">
            Aleatoire
          </p>
          <p className="mt-1 text-xs text-slate-300">Verite ou Action</p>
        </button>
      </div>

      <div className="relative min-h-[340px] sm:min-h-[320px]">
        {deck.current ? (
          <AnimatePresence mode="wait">
            <motion.article
              key={`${deck.current.id}-${deck.turn}`}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.97 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute inset-0 flex flex-col rounded-3xl border bg-slate-950/65 p-5 shadow-2xl backdrop-blur-sm sm:p-8 ${mode.borderClass} ${mode.glowClass}`}
            >
              <span
                className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                  isTruth
                    ? "border-sky-300/40 bg-sky-400/15 text-sky-100"
                    : "border-pink-300/40 bg-pink-500/15 text-pink-100"
                }`}
              >
                {isTruth ? "Vérité" : "Action"}
              </span>

              <div className="mt-6 flex-1 overflow-y-auto pr-1 sm:mt-8">
                <p className="text-lg leading-relaxed text-slate-100 sm:text-[1.75rem]">
                  {deck.current.text}
                </p>
              </div>

              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 sm:mt-8 sm:text-xs sm:tracking-[0.18em]">
                Gardez un esprit joueur. Respectez les limites.
              </p>
            </motion.article>
          </AnimatePresence>
        ) : (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl border bg-slate-950/55 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-8 ${mode.borderClass}`}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Manche prête
            </p>
            <p className="mt-4 text-xl text-slate-100 sm:text-2xl">
              Choisissez Vérité ou Action pour tirer votre premier défi.
            </p>
          </div>
        )}
      </div>

      <motion.button
        type="button"
        onClick={() => deck.selectedType && selectType(deck.selectedType)}
        disabled={!deck.selectedType}
        whileTap={{ scale: 0.98 }}
        className={`mt-6 w-full rounded-full bg-gradient-to-r px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base sm:tracking-[0.14em] ${mode.buttonClass}`}
      >
        {deck.selectedType
          ? `Suivant : ${getTypeLabel(deck.selectedType)}`
          : "Choisissez un type"}
      </motion.button>
    </section>
  );
}
