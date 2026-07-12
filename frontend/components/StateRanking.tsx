"use client";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import SectionHeader from "./SectionHeader";
import { MapPin, BarChart3 } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface Props {
  states: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 border border-brand-cyan/20 text-xs min-w-[200px]">
      <p className="text-white font-bold mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex justify-between gap-4 mb-1">
          <span style={{ color: p.fill }}>{p.name}</span>
          <span className="text-white font-mono">{Number(p.value).toLocaleString("en-IN")}</span>
        </div>
      ))}
    </div>
  );
};

export default function StateRanking({ states }: Props) {
  const top10 = states.slice(0, 10);
  const colors = ["#00d4ff", "#22c7f5", "#3baee8", "#5294da", "#6b7bcc", "#8462be", "#9d49b0", "#b630a2", "#cf1793", "#e80085"];

  return (
    <div>
      <SectionHeader tag="Geospatial Intelligence" title="State-wise Enrolment Ranking" subtitle="Top performing states by total Aadhaar enrolments" icon={BarChart3} color="cyan" />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-5 border border-brand-cyan/10"
        >
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Top 10 States by Enrolments</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#475569" tick={{ fontSize: 10 }} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="state" stroke="#475569" tick={{ fontSize: 10 }} tickLine={false} width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="enrolments" name="Enrolments" radius={[0, 6, 6, 0]} maxBarSize={18}>
                  {top10.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} fillOpacity={0.85} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* List with rank */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl p-5 border border-brand-cyan/10"
        >
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Ranked Overview</p>
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {top10.map((s, i) => {
              const maxEnr = top10[0].enrolments;
              const pct = Math.round((s.enrolments / maxEnr) * 100);
              return (
                <motion.div
                  key={s.state}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-xs font-bold text-slate-500 w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-semibold text-white truncate">{s.state}</span>
                      <span className="text-xs font-mono text-brand-cyan ml-2 shrink-0">
                        <AnimatedCounter end={s.enrolments} />
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="h-1.5 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${colors[i]}, ${colors[Math.min(i + 2, 9)]})` }}
                      />
                    </div>
                    <div className="flex gap-3 mt-1 text-[10px] text-slate-500">
                      <span>Updates: {s.total_updates.toLocaleString("en-IN")}</span>
                      <span>•</span>
                      <span>Bio: {s.bio_updates?.toLocaleString("en-IN") ?? 0}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
