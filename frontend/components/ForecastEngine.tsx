"use client";
import { motion } from "framer-motion";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";
import SectionHeader from "./SectionHeader";
import { Brain, TrendingUp, ArrowRight } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface ForecastItem {
  period: string;
  metric: string;
  prediction: number;
  confidence: number;
}

interface Props {
  forecast: ForecastItem[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 border border-brand-purple/30 text-xs">
      <p className="text-brand-purple font-bold mb-2">{label} <span className="text-brand-amber">[FORECAST]</span></p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between gap-4 mb-1">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="text-white font-mono">{Number(p.value).toLocaleString("en-IN")}</span>
        </div>
      ))}
    </div>
  );
};

export default function ForecastEngine({ forecast }: Props) {
  const enrForecast = forecast.filter((f) => f.metric === "enrolments");
  const updForecast = forecast.filter((f) => f.metric === "updates");

  const chartData = enrForecast.map((e) => {
    const u = updForecast.find((x) => x.period === e.period);
    return { period: e.period, enrolments: e.prediction, updates: u?.prediction ?? 0, confidence: Math.round(e.confidence * 100) };
  });

  return (
    <div>
      <SectionHeader tag="Predictive Analytics" title="3-Month Demand Forecast" subtitle="Linear regression model projecting enrolment and update volumes for Q1 2026" icon={Brain} color="purple" />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 glass rounded-2xl p-5 border border-brand-purple/15"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-slate-400 uppercase tracking-widest">Forecasted Volumes</span>
            <span className="intel-tag text-brand-amber border-brand-amber/30 bg-brand-amber/10">AI Projected</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="purpleBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
                <XAxis dataKey="period" stroke="#475569" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fontSize: 11 }} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Bar dataKey="enrolments" name="Forecasted Enrolments" fill="url(#purpleBar)" radius={[6, 6, 0, 0]} maxBarSize={40} />
                <Line type="monotone" dataKey="updates" name="Forecasted Updates" stroke="#00d4ff" strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill: "#00d4ff", r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Forecast cards */}
        <div className="flex flex-col gap-4">
          {chartData.map((d, i) => (
            <motion.div
              key={d.period}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-4 border border-brand-purple/15 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-brand-purple uppercase tracking-widest">{d.period}</span>
                  <span className="text-xs text-brand-amber font-mono">{d.confidence}% confidence</span>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-slate-400">Enrolments</p>
                  <p className="text-xl font-black text-white">
                    <AnimatedCounter end={d.enrolments} duration={1500} />
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Updates</p>
                  <p className="text-lg font-bold text-brand-cyan">
                    <AnimatedCounter end={d.updates} duration={1500} />
                  </p>
                </div>
                {/* Confidence bar */}
                <div className="mt-3 h-1 rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.confidence}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                    className="h-1 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan"
                  />
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="rounded-xl bg-brand-purple/5 border border-brand-purple/20 p-3 text-xs text-slate-400"
          >
            <Brain size={12} className="inline mr-1.5 text-brand-purple" />
            Linear regression trained on 10 months of national aggregated data. Confidence based on R² score.
          </motion.div>
        </div>
      </div>
    </div>
  );
}
