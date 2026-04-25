"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8 ${className}`}
    >
      {children}
    </motion.main>
  );
}
