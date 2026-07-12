"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Props {
  tag: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  color?: "cyan" | "purple" | "green";
}

const colorMap = {
  cyan: { tag: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/30", line: "from-brand-cyan/60 via-brand-blue/30 to-transparent", icon: "text-brand-cyan" },
  purple: { tag: "text-brand-purple bg-brand-purple/10 border-brand-purple/30", line: "from-brand-purple/60 via-brand-purple/20 to-transparent", icon: "text-brand-purple" },
  green: { tag: "text-brand-green bg-brand-green/10 border-brand-green/30", line: "from-brand-green/60 via-brand-green/20 to-transparent", icon: "text-brand-green" },
};

export default function SectionHeader({ tag, title, subtitle, icon: Icon, color = "cyan" }: Props) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon size={18} className={c.icon} />}
        <span className={`intel-tag border ${c.tag}`}>{tag}</span>
      </div>
      <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      <div className={`mt-3 h-px bg-gradient-to-r ${c.line}`} />
    </motion.div>
  );
}
