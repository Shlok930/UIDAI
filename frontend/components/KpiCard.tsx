"use client";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface Props {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  subtitle: string;
  icon: LucideIcon;
  trend?: number;
  color?: "cyan" | "blue" | "purple" | "green" | "amber";
  delay?: number;
}

const colorMap = {
  cyan: { icon: "text-brand-cyan", bg: "bg-brand-cyan/10", border: "border-brand-cyan/20", glow: "shadow-cyan", val: "text-brand-cyan" },
  blue: { icon: "text-brand-blue", bg: "bg-brand-blue/10", border: "border-brand-blue/20", glow: "shadow-blue", val: "text-brand-blue" },
  purple: { icon: "text-brand-purple", bg: "bg-brand-purple/10", border: "border-brand-purple/20", glow: "shadow-purple", val: "text-brand-purple" },
  green: { icon: "text-brand-green", bg: "bg-brand-green/10", border: "border-brand-green/20", glow: "shadow-green", val: "text-brand-green" },
  amber: { icon: "text-brand-amber", bg: "bg-brand-amber/10", border: "border-brand-amber/20", glow: "shadow-[0_0_30px_rgba(245,158,11,0.25)]", val: "text-brand-amber" },
};

export default function KpiCard({ title, value, suffix = "", prefix = "", decimals = 0, subtitle, icon: Icon, trend, color = "cyan", delay = 0 }: Props) {
  const c = colorMap[color];
  const TrendIcon = trend === undefined ? Minus : trend >= 0 ? TrendingUp : TrendingDown;
  const trendColor = trend === undefined ? "text-slate-500" : trend >= 0 ? "text-brand-green" : "text-brand-red";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`glass rounded-2xl p-5 border ${c.border} ${c.glow} relative overflow-hidden`}
    >
      {/* Background glow blob */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${c.bg} blur-2xl opacity-60 pointer-events-none`} />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">{title}</p>
          <h3 className={`text-3xl font-black tracking-tight ${c.val} font-display`}>
            <AnimatedCounter end={value} prefix={prefix} suffix={suffix} decimals={decimals} duration={1800} />
          </h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">{subtitle}</p>
        </div>
        <div className={`rounded-xl p-3 ${c.bg} border ${c.border}`}>
          <Icon size={22} className={c.icon} />
        </div>
      </div>

      {trend !== undefined && (
        <div className={`mt-3 flex items-center gap-1 text-xs font-semibold ${trendColor}`}>
          <TrendIcon size={12} />
          <span>{Math.abs(trend)}% vs last month</span>
        </div>
      )}

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${c.bg} via-current to-transparent opacity-50`} />
    </motion.div>
  );
}
