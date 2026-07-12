"use client";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Area, AreaChart, ReferenceLine,
} from "recharts";
import SectionHeader from "./SectionHeader";
import { TrendingUp } from "lucide-react";

interface Props {
  data: { period: string; enrolments: number; demo_updates: number; bio_updates: number; total_updates: number }[];
  insights: string[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 border border-brand-cyan/20 text-xs min-w-[180px]">
      <p className="text-brand-cyan font-bold mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex justify-between gap-4 mb-1">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="text-white font-mono">{Number(p.value).toLocaleString("en-IN")}</span>
        </div>
      ))}
    </div>
  );
};

export default function TrendsChart({ data, insights }: Props) {
  return (
    <div>
      <SectionHeader tag="Temporal Analytics" title="National Monthly Trends" subtitle="Enrolment and update activity across all states — March to December 2025" icon={TrendingUp} color="cyan" />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 glass rounded-2xl p-5 border border-brand-cyan/10"
        >
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Monthly Enrolments vs Updates</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.06)" />
                <XAxis dataKey="period" stroke="#475569" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fontSize: 11 }} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Area type="monotone" dataKey="enrolments" stroke="#00d4ff" strokeWidth={2.5} fill="url(#cyanGrad)" name="Enrolments" dot={false} activeDot={{ r: 5, fill: "#00d4ff" }} />
                <Area type="monotone" dataKey="total_updates" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#purpleGrad)" name="Total Updates" dot={false} activeDot={{ r: 5, fill: "#8b5cf6" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Insights panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-5 border border-brand-purple/15 flex flex-col gap-4"
        >
          <p className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
            AI Trend Insights
          </p>
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="rounded-xl bg-brand-purple/5 border border-brand-purple/15 p-3 text-xs text-slate-300 leading-relaxed"
            >
              <span className="text-brand-purple font-bold mr-1">›</span> {insight}
            </motion.div>
          ))}

          {/* Bio vs Demo split */}
          {data.length > 0 && (
            <div className="mt-auto rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
              <p className="text-xs text-slate-400 mb-2">Update Type Split (Latest)</p>
              {(() => {
                const last = data[data.length - 1];
                const total = last?.total_updates || 1;
                const bioPct = Math.round((last?.bio_updates / total) * 100) || 0;
                const demoPct = 100 - bioPct;
                return (
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="text-brand-cyan">Biometric</span><span className="text-white">{bioPct}%</span></div>
                      <div className="h-1.5 rounded-full bg-white/10"><div className="progress-glow h-1.5" style={{ width: `${bioPct}%` }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="text-brand-purple">Demographic</span><span className="text-white">{demoPct}%</span></div>
                      <div className="h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue" style={{ width: `${demoPct}%` }} /></div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
