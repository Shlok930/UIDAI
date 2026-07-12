"use client";
import { motion } from "framer-motion";
import { Lightbulb, AlertCircle, CheckCircle, Info, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Rec {
  priority: string;
  region: string;
  recommendation: string;
  reason: string;
}

interface Props {
  recs: Rec[];
}

const priorityMap = {
  High: { color: "text-brand-red", bg: "bg-brand-red/8", border: "border-brand-red/25", icon: AlertCircle, badge: "bg-brand-red/15 text-brand-red border-brand-red/30" },
  Medium: { color: "text-brand-amber", bg: "bg-brand-amber/8", border: "border-brand-amber/25", icon: Info, badge: "bg-brand-amber/15 text-brand-amber border-brand-amber/30" },
  Low: { color: "text-brand-blue", bg: "bg-brand-blue/8", border: "border-brand-blue/25", icon: CheckCircle, badge: "bg-brand-blue/15 text-brand-blue border-brand-blue/30" },
};

export default function PolicyAdvisor({ recs }: Props) {
  return (
    <div>
      <SectionHeader tag="AI Policy Advisor" title="Smart Policy Recommendations" subtitle="AI-generated actionable insights for improving Aadhaar coverage and quality" icon={Lightbulb} color="purple" />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {recs.map((r, i) => {
          const cfg = priorityMap[r.priority as keyof typeof priorityMap] ?? priorityMap.Low;
          const Icon = cfg.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className={`glass rounded-2xl p-5 border ${cfg.border} relative overflow-hidden cursor-pointer group`}
            >
              {/* Background accent */}
              <div className={`absolute inset-0 ${cfg.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md border ${cfg.badge}`}>
                    <Icon size={11} />
                    <span>{r.priority} Priority</span>
                  </div>
                  <ArrowRight size={14} className={`${cfg.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>

                <p className={`text-xs font-semibold mb-1 ${cfg.color} flex items-center gap-1`}>
                  <span className="w-1 h-1 rounded-full" style={{ background: "currentColor" }} />
                  {r.region}
                </p>

                <p className="text-sm font-semibold text-white leading-snug mb-3">{r.recommendation}</p>

                <p className="text-xs text-slate-400 leading-relaxed border-t border-white/[0.06] pt-3">{r.reason}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
