"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Globe2, Zap, Shield, Radio } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { useEffect, useState } from "react";

interface Props {
  kpis: any;
}

const insights = [
  "Anomaly detected in Uttar Pradesh enrolment cluster",
  "Maharashtra biometric updates surging +18% MoM",
  "Child enrolment (0–5) leads at 65% of total enrolments",
  "Forecast: 1.2M+ enrolments projected for Q1 2026",
  "985 districts actively contributing enrolment data",
  "Biometric updates outpacing demographic by 41%",
];

export default function HeroSection({ kpis }: Props) {
  const [insightIdx, setInsightIdx] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString("en-IN", { hour12: false }));
    const t1 = setInterval(() => setInsightIdx((i) => (i + 1) % insights.length), 3500);
    const t2 = setInterval(() => setTime(new Date().toLocaleTimeString("en-IN", { hour12: false })), 1000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl glass-bright border border-brand-cyan/20 mb-8">
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Top status bar */}
      <div className="relative flex items-center justify-between px-6 py-3 border-b border-brand-cyan/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full status-live" />
          <span className="text-xs font-semibold text-brand-green tracking-widest uppercase">System Operational</span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400 font-mono" suppressHydrationWarning>{time}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="intel-tag">UIDAI Hackathon 2025</span>
          <span className="intel-tag">v2.0 LIVE</span>
        </div>
      </div>

      <div className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-0">
        {/* Left column — title + stats */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield size={14} className="text-brand-cyan" />
              <span className="text-xs text-brand-cyan font-bold tracking-[0.2em] uppercase">National Identity Intelligence Platform</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none mb-2">
              <span className="text-white">Aadhaar</span>
              <br />
              <span className="text-neon-cyan">InsightX</span>
            </h1>
            <p className="text-slate-400 text-sm mt-4 max-w-sm leading-relaxed">
              AI-powered analytics over <span className="text-white font-semibold">5.4M+ enrolment records</span>, 
              119M+ updates across 55 states & 985 districts — March to December 2025.
            </p>
          </motion.div>

          {/* Live AI insight ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20 p-3 flex items-start gap-3"
          >
            <Zap size={14} className="text-brand-cyan mt-0.5 shrink-0" />
            <div className="overflow-hidden h-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={insightIdx}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-brand-cyan leading-4"
                >
                  {insights[insightIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mini stats row */}
          {kpis && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: "States", value: kpis.states_covered, icon: Globe2, color: "text-brand-cyan" },
                { label: "Districts", value: kpis.districts_covered, icon: Activity, color: "text-brand-purple" },
              ].map(({ label, value, icon: Icon, color }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 flex items-center gap-3"
                >
                  <Icon size={16} className={color} />
                  <div>
                    <p className={`text-lg font-black ${color}`}>
                      <AnimatedCounter end={value} />
                    </p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Center — India map / radar visual */}
        <div className="hidden lg:flex items-center justify-center py-8 px-4">
          <div className="relative w-56 h-56">
            {/* Radar rings */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-brand-cyan/20"
                style={{ margin: `${(i - 1) * 20}%` }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
              />
            ))}
            {/* Rotating radar sweep */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 80%, rgba(0,212,255,0.3) 100%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-brand-cyan shadow-cyan animate-ping-slow" />
            </div>
            {/* Floating data dots */}
            {[
              { top: "15%", left: "40%", label: "MH", delay: 0 },
              { top: "35%", left: "20%", label: "RJ", delay: 0.3 },
              { top: "25%", left: "65%", label: "UP", delay: 0.6 },
              { top: "60%", left: "30%", label: "TN", delay: 0.9 },
              { top: "50%", left: "60%", label: "AP", delay: 1.2 },
              { top: "75%", left: "45%", label: "KA", delay: 1.5 },
            ].map(({ top, left, label, delay }) => (
              <motion.div
                key={label}
                className="absolute"
                style={{ top, left }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, delay }}
              >
                <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-cyan" />
                <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] text-brand-cyan font-bold whitespace-nowrap">{label}</span>
              </motion.div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <Radio size={20} className="text-brand-cyan opacity-30" />
            </div>
          </div>
        </div>

        {/* Right column — big metrics */}
        {kpis && (
          <div className="p-8 lg:p-10 flex flex-col justify-center gap-5 border-t lg:border-t-0 lg:border-l border-brand-cyan/10">
            {[
              { label: "Total Enrolments", value: kpis.total_enrolments, color: "text-brand-cyan", suffix: "" },
              { label: "Total Updates", value: kpis.total_updates, color: "text-brand-purple", suffix: "" },
              { label: "Child Coverage", value: kpis.child_pct, color: "text-brand-green", suffix: "%" },
              { label: "Adult Enrolments", value: kpis.adult_enrolments, color: "text-brand-amber", suffix: "" },
            ].map(({ label, value, color, suffix }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">{label}</span>
                <span className={`text-2xl font-black ${color} font-display`}>
                  <AnimatedCounter end={value} suffix={suffix} decimals={suffix === "%" ? 1 : 0} duration={2000} />
                </span>
                <div className="mt-1.5 h-px bg-gradient-to-r from-current to-transparent opacity-20" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
