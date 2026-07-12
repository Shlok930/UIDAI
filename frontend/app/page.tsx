"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Activity, Users, Database, Brain, AlertTriangle,
  BarChart3, ShieldCheck, Lightbulb, MapPin, TrendingUp,
  RefreshCw, Download, Menu, X, ChevronRight,
} from "lucide-react";

import { api, endpoints } from "@/lib/api";
import ParticleField from "@/components/ParticleField";
import HeroSection from "@/components/HeroSection";
import KpiCard from "@/components/KpiCard";
import TrendsChart from "@/components/TrendsChart";
import StateRanking from "@/components/StateRanking";
import AgeDistribution from "@/components/AgeDistribution";
import AnomalyCenter from "@/components/AnomalyCenter";
import ForecastEngine from "@/components/ForecastEngine";
import InclusionIndex from "@/components/InclusionIndex";
import PolicyAdvisor from "@/components/PolicyAdvisor";
import DistrictTable from "@/components/DistrictTable";
import BiometricAnalysis from "@/components/BiometricAnalysis";
import DemographicAnalysis from "@/components/DemographicAnalysis";
import { SkeletonCard } from "@/components/Skeleton";

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "trends", label: "Trends", icon: TrendingUp },
  { id: "states", label: "States", icon: MapPin },
  { id: "age", label: "Demographics", icon: Users },
  { id: "anomalies", label: "Anomalies", icon: AlertTriangle },
  { id: "forecast", label: "Forecast", icon: Brain },
  { id: "biometric", label: "Biometric", icon: ShieldCheck },
  { id: "demographic", label: "Demographic", icon: BarChart3 },
  { id: "inclusion", label: "Inclusion", icon: ShieldCheck },
  { id: "policy", label: "Policy AI", icon: Lightbulb },
  { id: "districts", label: "Districts", icon: Database },
];

export default function Home() {
  // ─── State ─────────────────────────────────────────────────────────────────
  const [kpis, setKpis] = useState<any>(null);
  const [states, setStates] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [trends, setTrends] = useState<any>({ monthly: [], insights: [] });
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [forecast, setForecast] = useState<any[]>([]);
  const [inclusion, setInclusion] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [ageData, setAgeData] = useState<any[]>([]);
  const [updateTypes, setUpdateTypes] = useState<any>(null);
  const [bioStates, setBioStates] = useState<any[]>([]);
  const [bioTrends, setBioTrends] = useState<any>({ monthly: [], insights: [] });
  const [bioAnomalies, setBioAnomalies] = useState<any[]>([]);
  const [bioForecast, setBioForecast] = useState<any[]>([]);
  const [demoStates, setDemoStates] = useState<any[]>([]);
  const [demoTrends, setDemoTrends] = useState<any>({ monthly: [], insights: [] });
  const [demoAnomalies, setDemoAnomalies] = useState<any[]>([]);
  const [demoForecast, setDemoForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const [navOpen, setNavOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  // ─── Load data ─────────────────────────────────────────────────────────────
  const loadData = async () => {
    setLoading(true);
    try {
      const [k, s, d, t, a, f, i, r, ag, ut, bsr, bt, ba, bf, dsr, dt, da, df] = await Promise.all([
        api<any>(endpoints.kpis),
        api<any[]>(endpoints.stateRanking),
        api<any[]>(endpoints.districtRanking),
        api<any>(endpoints.trends),
        api<any[]>(endpoints.anomalies),
        api<any[]>(endpoints.forecast),
        api<any[]>(endpoints.inclusion),
        api<any[]>(endpoints.recommendations),
        api<any[]>(endpoints.ageDistribution),
        api<any>(endpoints.updateTypes),
        api<any[]>(endpoints.bioStateRanking),
        api<any>(endpoints.bioTrends),
        api<any[]>(endpoints.bioAnomalies),
        api<any[]>(endpoints.bioForecast),
        api<any[]>(endpoints.demoStateRanking),
        api<any>(endpoints.demoTrends),
        api<any[]>(endpoints.demoAnomalies),
        api<any[]>(endpoints.demoForecast),
      ]);
      setKpis(k); setStates(s); setDistricts(d); setTrends(t);
      setAnomalies(a); setForecast(f); setInclusion(i); setRecommendations(r);
      setAgeData(ag); setUpdateTypes(ut);
      setBioStates(bsr); setBioTrends(bt); setBioAnomalies(ba); setBioForecast(bf);
      setDemoStates(dsr); setDemoTrends(dt); setDemoAnomalies(da); setDemoForecast(df);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { hour12: false }));
    } catch (e) {
      console.error("API error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // ─── Section scroll tracking ───────────────────────────────────────────────
  useEffect(() => {
    const handler = () => {
      const sections = NAV.map((n) => document.getElementById(n.id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) { setActiveSection(NAV[i].id); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  };

  // ─── KPI cards config ──────────────────────────────────────────────────────
  const kpiCards = kpis ? [
    { title: "Total Enrolments", value: kpis.total_enrolments, subtitle: `${kpis.states_covered} states · ${kpis.districts_covered} districts`, icon: Users, color: "cyan" as const, delay: 0 },
    { title: "Total Updates", value: kpis.total_updates, subtitle: `${kpis.demographic_updates.toLocaleString("en-IN")} demo + ${kpis.biometric_updates.toLocaleString("en-IN")} bio`, icon: Activity, color: "purple" as const, delay: 0.08 },
    { title: "Child Enrolments (0–5)", value: kpis.child_enrolments, suffix: "", subtitle: `${kpis.child_pct}% of total enrolments`, icon: ShieldCheck, color: "green" as const, delay: 0.16 },
    { title: "Biometric Updates", value: kpis.biometric_updates, subtitle: `${kpis.demographic_updates.toLocaleString("en-IN")} demographic updates`, icon: Brain, color: "blue" as const, delay: 0.24 },
    { title: "Youth Enrolments (5–17)", value: kpis.youth_enrolments, suffix: "", subtitle: `${kpis.youth_pct}% of total enrolments`, icon: TrendingUp, color: "amber" as const, delay: 0.32 },
    { title: "Adult Enrolments (18+)", value: kpis.adult_enrolments, suffix: "", subtitle: `${kpis.adult_pct}% of total enrolments`, icon: BarChart3, color: "cyan" as const, delay: 0.4 },
  ] : [];

  return (
    <div className="min-h-screen relative">
      <ParticleField />

      {/* Fixed sidebar nav */}
      <nav className="fixed left-0 top-0 bottom-0 z-50 hidden xl:flex flex-col w-16 bg-brand-bg/80 backdrop-blur-xl border-r border-brand-cyan/10">
        <div className="flex flex-col items-center py-6 gap-1 h-full">
          {/* Logo */}
          <div className="mb-6">
            <div className="w-8 h-8 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center">
              <span className="text-xs font-black text-brand-cyan">AI</span>
            </div>
          </div>

          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              title={label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group relative
                ${activeSection === id ? "bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan" : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"}`}
            >
              <Icon size={16} />
              <span className="absolute left-12 bg-brand-card border border-brand-cyan/20 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile top nav */}
      <div className="xl:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-brand-cyan/10 px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-black text-neon-cyan">Aadhaar InsightX</span>
        <button onClick={() => setNavOpen(!navOpen)} className="text-slate-400">
          {navOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden fixed top-12 left-0 right-0 z-40 glass border-b border-brand-cyan/10 p-4 grid grid-cols-3 gap-2"
          >
            {NAV.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => scrollTo(id)} className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs ${activeSection === id ? "bg-brand-cyan/10 text-brand-cyan" : "text-slate-400"}`}>
                <Icon size={14} />
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="xl:pl-16 pt-14 xl:pt-0">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 space-y-16">

          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="hidden xl:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full status-live" />
              <span className="text-xs text-brand-green font-semibold tracking-widest uppercase">Live Analytics</span>
              {lastUpdated && <span className="text-xs text-slate-500">Last updated {lastUpdated}</span>}
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={loadData}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-brand-cyan/20 text-xs text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-all"
              >
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-cyan text-brand-bg font-bold text-xs hover:bg-cyan-300 transition-colors shadow-cyan">
                <Download size={12} />
                Export Report
              </button>
            </div>
          </div>

          {/* HERO */}
          <section id="overview">
            {loading && !kpis ? (
              <div className="glass rounded-3xl p-8 animate-pulse h-64 skeleton" />
            ) : (
              <HeroSection kpis={kpis} />
            )}
          </section>

          {/* KPI GRID */}
          <section>
            {loading && !kpis ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array(6).fill(0).map((_, i) => <SkeletonCard key={i} rows={2} />)}</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {kpiCards.map((c) => <KpiCard key={c.title} {...c} />)}
              </div>
            )}
          </section>

          <div className="divider-glow" />

          {/* TRENDS */}
          <section id="trends">
            {loading ? <SkeletonCard rows={5} /> : <TrendsChart data={trends.monthly} insights={trends.insights} />}
          </section>

          <div className="divider-glow" />

          {/* STATES */}
          <section id="states">
            {loading ? <SkeletonCard rows={5} /> : <StateRanking states={states} />}
          </section>

          <div className="divider-glow" />

          {/* AGE & UPDATE TYPES */}
          <section id="age">
            {loading ? <SkeletonCard rows={4} /> : <AgeDistribution ageData={ageData} updateTypes={updateTypes} />}
          </section>

          <div className="divider-glow" />

          {/* ANOMALIES */}
          <section id="anomalies">
            {loading ? <SkeletonCard rows={5} /> : <AnomalyCenter anomalies={anomalies} />}
          </section>

          <div className="divider-glow" />

          {/* FORECAST */}
          <section id="forecast">
            {loading ? <SkeletonCard rows={4} /> : <ForecastEngine forecast={forecast} />}
          </section>

          <div className="divider-glow" />

          {/* INCLUSION */}
          <section id="inclusion">
            {loading ? <SkeletonCard rows={5} /> : <InclusionIndex data={inclusion} />}
          </section>

          <div className="divider-glow" />

          {/* POLICY */}
          <section id="policy">
            {loading ? <SkeletonCard rows={4} /> : <PolicyAdvisor recs={recommendations} />}
          </section>

          <div className="divider-glow" />

          {/* BIOMETRIC */}
          <section id="biometric">
            {loading ? <SkeletonCard rows={6} /> : (
              <BiometricAnalysis
                stateRanking={bioStates}
                trends={bioTrends}
                anomalies={bioAnomalies}
                forecast={bioForecast}
              />
            )}
          </section>

          <div className="divider-glow" />

          {/* DEMOGRAPHIC */}
          <section id="demographic">
            {loading ? <SkeletonCard rows={6} /> : (
              <DemographicAnalysis
                stateRanking={demoStates}
                trends={demoTrends}
                anomalies={demoAnomalies}
                forecast={demoForecast}
              />
            )}
          </section>

          <div className="divider-glow" />

          {/* DISTRICTS */}
          <section id="districts">
            {loading ? <SkeletonCard rows={6} /> : <DistrictTable districts={districts} />}
          </section>

          {/* Footer */}
          <footer className="text-center py-10 space-y-2">
            <p className="text-xs text-slate-500 tracking-widest uppercase">Aadhaar InsightX — UIDAI National Intelligence Platform</p>
            <p className="text-xs text-slate-600">
              Analysed 5.4M+ enrolment records · 49M+ demographic updates · 69M+ biometric updates · 55 states · 985 districts
            </p>
            <p className="text-[10px] text-slate-700">Built for UIDAI Data Hackathon 2025 · Powered by FastAPI + Next.js + AI</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
