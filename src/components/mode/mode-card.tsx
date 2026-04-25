"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ModeConfig } from "@/types/game";

interface ModeCardProps {
  mode: ModeConfig;
  index: number;
}

export function ModeCard({ mode, index }: ModeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link
        href={`/game/${mode.id}`}
        className={`group relative block h-full overflow-hidden rounded-3xl border bg-slate-950/50 p-5 backdrop-blur-sm transition duration-300 sm:p-6 ${mode.borderClass} ${mode.glowClass}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${mode.gradientClass} opacity-70 transition-opacity duration-300 group-hover:opacity-90`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.02)_45%,rgba(0,0,0,0.2)_100%)]" />

        <div className="relative flex h-full flex-col">
          <span
            className={`mb-5 inline-flex w-fit rounded-full border px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.65rem] sm:tracking-[0.2em] ${mode.badgeClass}`}
          >
            {mode.tone}
          </span>

          <h3 className="text-3xl text-white sm:text-5xl">{mode.label}</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-200/90">
            {mode.description}
          </p>

          <span
            className={`mt-6 inline-flex w-fit rounded-full bg-gradient-to-r px-4 py-2 text-xs font-semibold text-white transition duration-300 group-hover:brightness-110 sm:mt-8 sm:px-5 sm:text-sm ${mode.buttonClass}`}
          >
            Lancer {mode.label}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
