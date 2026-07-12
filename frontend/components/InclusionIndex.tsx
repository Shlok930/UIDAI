"use client";
import { motion } from "framer-motion";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import SectionHeader from "./SectionHeader";
import { ShieldCheck, Star } from "lucide-react";

interface InclusionRow {
  state: string;
  inclusion_score: number;
  child_pct: number;
  youth_pct: number;
  update_ratio: number;
  total_enrolments: number;
}

interface Props {
  data: InclusionRow[];
}

function scoreColor(score: number) {
  if (score >= 70) return "#10b981";
  if (score >= 45) return "#f59e0b";
  return "#ef4444";
}

export default function InclusionIndex({ data }: Props) {
  const top10 = data.slice(0, 10);
  const radarState = data[0];
  const radarData = radarState
    ? [
        { metric: "Child %", value: Math.min(radarState.child_pct, 100) },
        { metric: "Youth %", value: Math.min(radarState.youth_pct, 100) },
        { metric: "Updates", value: Math.min(radarState.update_ratio, 100) },
        { metric: "Score", value: radarState.inclusion_score },
      ]
    : [];

  return (
    <div>
      <SectionHeader tag="Social Inclusion" title="Aadhaar Inclusion Index" subtitle="Composite score measuring child coverage, youth reach, and update engagement per state" icon={ShieldCheck} color="green" />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bar chart top 10 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-2xl p-5 border border-brand-green/15"
        >
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Top 10 States by Inclusion Score</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.06)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#475569" tick={{ fontSize: 10 }} tickLine={false} />
                <YAxis type="category" dataKey="state" stroke="#475569" tick={{ fontSize: 10 }} tickLine={false} width={100} />
                <Tooltip
                  contentStyle={{ background: "rgba(10,15,30,0.95)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 12, fontSize: 11 }}
                  formatter={(v: any) => [`${v}`, "Score"]}
                />
                <Bar dataKey="inclusion_score" name="Inclusion Score" radius={[0, 6, 6, 0]} maxBarSize={16}>
                  {top10.map((row, i) => <Cell key={i} fill={scoreColor(row.inclusion_score)} fillOpacity={0.85} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Detailed list */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-5 border border-brand-green/15"
        >
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">State Scorecard</p>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {top10.map((row, i) => {
              const color = scoreColor(row.inclusion_score);
              return (
                <motion.div
                  key={row.state}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white truncate max-w-[130px]">{row.state}</span>
                    <span className="text-sm font-black font-mono" style={{ color }}>{row.inclusion_score}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(row.inclusion_score, 100)}%` }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.05 }}
                      className="h-1.5 rounded-full"
                      style={{ background: color }}
                    />
                  </div>
                  <div className="flex gap-3 text-[10px] text-slate-500">
                    <span>Child: {row.child_pct}%</span>
                    <span>Youth: {row.youth_pct}%</span>
                    <span>Updates: {row.update_ratio}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom 3 warning */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {data.slice(-3).map((row, i) => (
          <motion.div
            key={row.state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="glass rounded-xl p-4 border border-brand-red/25"
          >
            <div className="flex items-center gap-2 mb-2">
              <Star size={12} className="text-brand-red" />
              <span className="text-xs text-brand-red font-bold uppercase">Needs Attention</span>
            </div>
            <p className="text-sm font-bold text-white">{row.state}</p>
            <p className="text-xs text-slate-400 mt-1">Score: <span className="text-brand-red font-bold">{row.inclusion_score}</span></p>
            <div className="mt-2 text-[10px] text-slate-500 space-y-0.5">
              <p>Child coverage: {row.child_pct}%</p>
              <p>Update engagement: {row.update_ratio}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
