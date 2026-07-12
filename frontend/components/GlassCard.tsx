"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  glow?: "cyan" | "purple" | "green" | "red" | "none";
  animate?: boolean;
  delay?: number;
}

const glowMap = {
  cyan: "border-glow-cyan",
  purple: "border-glow-purple",
  green: "border-glow-green",
  red: "border-glow-red",
  none: "",
};

export default function GlassCard({ children, className = "", glow = "none", animate = true, delay = 0 }: Props) {
  const content = (
    <div className={`glass rounded-2xl card-hover ${glowMap[glow]} ${className}`}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass rounded-2xl card-hover ${glowMap[glow]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
