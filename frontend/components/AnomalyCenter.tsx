"use client";
import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, Info, Zap } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Anomaly {
  state: string;
  district: string;
  period: string;
  enrolments: number;
  child: number;
  youth: number;
  adult: number;
  severity: string;
}

interface Props {
  anomalies: Anomaly[];
}

const severityConfig = {
  High: { color: "text-brand-red", bg: "bg-brand-red/10", border: "border-brand-red/30", icon: AlertTriangle, shadow: "shadow-red" },
  Medium: { color: "text-brand-amber", bg: "bg-brand-amber/10", border: "border-brand-amber/30", icon: AlertCircle, shadow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]" },
  Low: { color: "text-brand-blue", bg: "bg-brand-blue/10", border: "border-brand-blue/30", icon: Info, shadow: "shadow-blue" },
};

function anomalyReason(a: Anomaly): string {
  if (a.child > a.youth && a.child > a.adult) return `Unusual spike in child (0–5) enrolments: ${a.child.toLocaleString("en-IN")} in single period.`;
  if (a.enrolments > 50000) return `Abnormally high total enrolment: ${a.enrolments.toLocaleString("en-IN")} — statistical outlier.`;
  if (a.adult > a.youth && a.adult > a.child) return `Adult enrolments dominate with ${a.adult.toLocaleString("en-IN")} — unusual age profile.`;
  return `Isolation Forest flagged this record as a statistical outlier in multi-dimensional enrolment space.`;
}

export default function AnomalyCenter({ anomalies }: Props) {
  const counts = { High: anomalies.filter((a) => a.severity === "High").length, Medium: anomalies.filter((a) => a.severity === "Medium").length, Low: anomalies.filter((a) => a.severity === "Low").length };

  return (
    <div>
      <SectionHeader tag="Anomaly Detection" title="AI Anomaly Alert Center" subtitle="Isolation Forest ML model detected statistical outliers in enrolment patterns" icon={AlertTriangle} color="cyan" />

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {(["High", "Medium", "Low"] as const).map((sev) => {
          const cfg = severityConfig[sev];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={sev}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`glass rounded-xl p-4 border ${cfg.border} ${cfg.shadow}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className={cfg.color} />
                <span className={`text-xs font-bold ${cfg.color}`}>{sev} Risk</span>
              </div>
              <p className={`text-2xl font-black ${cfg.color}`}>{counts[sev]}</p>
              <p className="text-xs text-slate-500 mt-0.5">anomalies</p>
            </motion.div>
          );
        })}
      </div>

      {/* Alert cards grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[520px] overflow-y-auto pr-1">
        {anomalies.map((a, i) => {
          const cfg = severityConfig[a.severity as keyof typeof severityConfig] ?? severityConfig.Low;
          const Icon = cfg.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }}
              className={`glass rounded-xl p-4 border ${cfg.border} relative overflow-hidden`}
            >
              {/* Severity pulse */}
              {a.severity === "High" && (
                <div className="absolute top-3 right-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
                  </span>
                </div>
              )}

              <div className={`flex items-center gap-2 mb-3 ${cfg.color}`}>
                <Icon size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">{a.severity} Anomaly</span>
              </div>

              <p className="text-sm font-bold text-white">{a.district}</p>
              <p className="text-xs text-slate-400">{a.state} · {a.period}</p>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className={`rounded-lg ${cfg.bg} p-2`}>
                  <p className="text-slate-400">Total</p>
                  <p className={`font-bold ${cfg.color}`}>{a.enrolments.toLocaleString("en-IN")}</p>
                </div>
                <div className={`rounded-lg ${cfg.bg} p-2`}>
                  <p className="text-slate-400">Child</p>
                  <p className={`font-bold ${cfg.color}`}>{a.child.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <p className="mt-3 text-[10px] text-slate-400 leading-relaxed">
                <Zap size={9} className="inline mr-1 text-brand-amber" />
                {anomalyReason(a)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
