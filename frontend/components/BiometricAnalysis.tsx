"use client";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Cell, ComposedChart, Line,
} from "recharts";
import SectionHeader from "./SectionHeader";
import AnimatedCounter from "./AnimatedCounter";
import { Fingerprint, AlertTriangle, AlertCircle, Info, Zap, Brain } from "lucide-react";

interface StateRow { state: string; total: number; youth: number; adult: number }
interface TrendRow { period: string; total: number; youth: number; adult: number }
interface AnomalyRow { state: string; district: string; period: string; total: number; youth: number; adult: number; severity: string }
interface ForecastItem { period: string; metric: string; prediction: number; confidence: number }

interface Props {
  stateRanking: StateRow[];
  trends: { monthly: TrendRow[]; insights: string[] };
  anomalies: AnomalyRow[];
  forecast: ForecastItem[];
}

const SEV = {
  High: { color: "text-brand-red", bg: "bg-brand-red/10", border: "border-brand-red/30", icon: AlertTriangle },
  Medium: { color: "text-brand-amber", bg: "bg-brand-amber/10", border: "border-brand-amber/30", icon: AlertCircle },
  Low: { color: "text-brand-blue", bg: "bg-brand-blue/10", border: "border-brand-blue/30", icon: Info },
};

const COLORS = ["#00d4ff","#22c7f5","#3baee8","#5294da","#6b7bcc","#8462be","#9d49b0","#b630a2","#cf1793","#e80085"];

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 border border-brand-cyan/20 text-xs min-w-[180px]">
      <p className="text-brand-cyan font-bold mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex justify-between gap-4 mb-1">
          <span style={{ color: p.color || p.fill }}>{p.name}</span>
          <span className="text-white font-mono">{Number(p.value).toLocaleString("en-IN")}</span>
        </div>
      ))}
    </div>
  );
};

export default function BiometricAnalysis({ stateRanking, trends, anomalies, forecast }: Props) {
  const top10 = stateRanking.slice(0, 10);
  const counts = { High: anomalies.filter(a => a.severity === "High").length, Medium: anomalies.filter(a => a.severity === "Medium").length, Low: anomalies.filter(a => a.severity === "Low").length };

  const totalForecast = forecast.filter(f => f.metric === "total");
  const youthForecast = forecast.filter(f => f.metric === "youth");
  const adultForecast = forecast.filter(f => f.metric === "adult");
  const chartForecast = totalForecast.map(t => ({
    period: t.period,
    total: t.prediction,
    youth: youthForecast.find(x => x.period === t.period)?.prediction ?? 0,
    adult: adultForecast.find(x => x.period === t.period)?.prediction ?? 0,
    confidence: Math.round(t.confidence * 100),
  }));

  return (
    <div className="space-y-10">
      <SectionHeader tag="Biometric Intelligence" title="Biometric Update Deep Analysis" subtitle="State ranking, monthly trends, anomaly detection and 3-month forecast for biometric updates (5–17 & 17+)" icon={Fingerprint} color="cyan" />

      {/* ── Trends ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="lg:col-span-2 glass rounded-2xl p-5 border border-brand-cyan/10">
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Monthly Biometric Updates — Youth vs Adult</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends.monthly} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="bioCyanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bioGreenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.06)" />
                <XAxis dataKey="period" stroke="#475569" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fontSize: 11 }} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Area type="monotone" dataKey="total" stroke="#00d4ff" strokeWidth={2.5} fill="url(#bioCyanGrad)" name="Total" dot={false} activeDot={{ r: 5, fill: "#00d4ff" }} />
                <Area type="monotone" dataKey="youth" stroke="#10b981" strokeWidth={2} fill="url(#bioGreenGrad)" name="Youth (5–17)" dot={false} activeDot={{ r: 4, fill: "#10b981" }} />
                <Area type="monotone" dataKey="adult" stroke="#8b5cf6" strokeWidth={2} fill="none" name="Adult (17+)" dot={false} activeDot={{ r: 4, fill: "#8b5cf6" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-5 border border-brand-purple/15 flex flex-col gap-4">
          <p className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            AI Biometric Insights
          </p>
          {trends.insights.map((ins, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }}
              className="rounded-xl bg-brand-cyan/5 border border-brand-cyan/15 p-3 text-xs text-slate-300 leading-relaxed">
              <span className="text-brand-cyan font-bold mr-1">›</span> {ins}
            </motion.div>
          ))}
          {trends.monthly.length > 0 && (() => {
            const last = trends.monthly[trends.monthly.length - 1];
            const tot = last.total || 1;
            const yPct = Math.round(last.youth / tot * 100);
            return (
              <div className="mt-auto rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                <p className="text-xs text-slate-400 mb-2">Latest Month Split</p>
                <div className="space-y-2">
                  {[["Youth (5–17)", yPct, "#10b981"], ["Adult (17+)", 100-yPct, "#8b5cf6"]].map(([label, pct, col]) => (
                    <div key={String(label)}>
                      <div className="flex justify-between text-xs mb-1"><span style={{ color: String(col) }}>{label}</span><span className="text-white">{pct}%</span></div>
                      <div className="h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: String(col), boxShadow: `0 0 8px ${col}60` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>
      </div>

      {/* ── State Ranking ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-5 border border-brand-cyan/10">
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Top 10 States — Biometric Updates</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#475569" tick={{ fontSize: 10 }} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="state" stroke="#475569" tick={{ fontSize: 10 }} tickLine={false} width={90} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="total" name="Total" radius={[0,6,6,0]} maxBarSize={18}>
                  {top10.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl p-5 border border-brand-cyan/10">
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">State Ranked Overview</p>
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {top10.map((s, i) => {
              const pct = Math.round(s.total / top10[0].total * 100);
              return (
                <motion.div key={s.state} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500 w-5 shrink-0">{String(i+1).padStart(2,"0")}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-semibold text-white truncate">{s.state}</span>
                      <span className="text-xs font-mono text-brand-cyan ml-2 shrink-0"><AnimatedCounter end={s.total} /></span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                        className="h-1.5 rounded-full" style={{ background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[Math.min(i+2,9)]})` }} />
                    </div>
                    <div className="flex gap-3 mt-1 text-[10px] text-slate-500">
                      <span>Youth: {s.youth.toLocaleString("en-IN")}</span><span>•</span><span>Adult: {s.adult.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Anomalies ── */}
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">Biometric Anomaly Detection</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(["High","Medium","Low"] as const).map(sev => {
            const cfg = SEV[sev]; const Icon = cfg.icon;
            return (
              <motion.div key={sev} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className={`glass rounded-xl p-4 border ${cfg.border}`}>
                <div className="flex items-center gap-2 mb-1"><Icon size={16} className={cfg.color} /><span className={`text-xs font-bold ${cfg.color}`}>{sev} Risk</span></div>
                <p className={`text-2xl font-black ${cfg.color}`}>{counts[sev]}</p>
                <p className="text-xs text-slate-500 mt-0.5">anomalies</p>
              </motion.div>
            );
          })}
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[480px] overflow-y-auto pr-1">
          {anomalies.map((a, i) => {
            const cfg = SEV[a.severity as keyof typeof SEV] ?? SEV.Low; const Icon = cfg.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.02 }} className={`glass rounded-xl p-4 border ${cfg.border} relative overflow-hidden`}>
                {a.severity === "High" && (
                  <div className="absolute top-3 right-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
                    </span>
                  </div>
                )}
                <div className={`flex items-center gap-2 mb-3 ${cfg.color}`}><Icon size={14} /><span className="text-xs font-bold uppercase tracking-wider">{a.severity} Anomaly</span></div>
                <p className="text-sm font-bold text-white">{a.district}</p>
                <p className="text-xs text-slate-400">{a.state} · {a.period}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className={`rounded-lg ${cfg.bg} p-2`}><p className="text-slate-400">Total</p><p className={`font-bold ${cfg.color}`}>{a.total.toLocaleString("en-IN")}</p></div>
                  <div className={`rounded-lg ${cfg.bg} p-2`}><p className="text-slate-400">Adult</p><p className={`font-bold ${cfg.color}`}>{a.adult.toLocaleString("en-IN")}</p></div>
                </div>
                <p className="mt-3 text-[10px] text-slate-400 leading-relaxed">
                  <Zap size={9} className="inline mr-1 text-brand-amber" />
                  {a.adult > a.youth ? `Adult biometric updates dominate with ${a.adult.toLocaleString("en-IN")} — unusual ratio.` : `Youth biometric updates spiked to ${a.youth.toLocaleString("en-IN")} — statistical outlier.`}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Forecast ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="lg:col-span-2 glass rounded-2xl p-5 border border-brand-purple/15">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-slate-400 uppercase tracking-widest">Biometric 3-Month Forecast</span>
            <span className="intel-tag text-brand-amber border-brand-amber/30 bg-brand-amber/10">AI Projected</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartForecast} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="bioPurpleBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.08)" />
                <XAxis dataKey="period" stroke="#475569" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fontSize: 11 }} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Bar dataKey="total" name="Total Updates" fill="url(#bioPurpleBar)" radius={[6,6,0,0]} maxBarSize={40} />
                <Line type="monotone" dataKey="youth" name="Youth" stroke="#10b981" strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill: "#10b981", r: 5 }} />
                <Line type="monotone" dataKey="adult" name="Adult" stroke="#8b5cf6" strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill: "#8b5cf6", r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {chartForecast.map((d, i) => (
            <motion.div key={d.period} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-4 border border-brand-cyan/15 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">{d.period}</span>
                  <span className="text-xs text-brand-amber font-mono">{d.confidence}% conf.</span>
                </div>
                <p className="text-xs text-slate-400">Total</p>
                <p className="text-xl font-black text-white"><AnimatedCounter end={d.total} duration={1500} /></p>
                <div className="flex gap-4 mt-1">
                  <div><p className="text-[10px] text-slate-500">Youth</p><p className="text-sm font-bold text-brand-green"><AnimatedCounter end={d.youth} duration={1500} /></p></div>
                  <div><p className="text-[10px] text-slate-500">Adult</p><p className="text-sm font-bold text-brand-purple"><AnimatedCounter end={d.adult} duration={1500} /></p></div>
                </div>
                <div className="mt-3 h-1 rounded-full bg-white/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${d.confidence}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                    className="h-1 rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue" />
                </div>
              </div>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="rounded-xl bg-brand-cyan/5 border border-brand-cyan/20 p-3 text-xs text-slate-400">
            <Brain size={12} className="inline mr-1.5 text-brand-cyan" />
            Linear regression on 9 months of biometric data. Youth & adult modelled separately.
          </motion.div>
        </div>
      </div>
    </div>
  );
}
