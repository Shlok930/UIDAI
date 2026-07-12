"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { MapPin } from "lucide-react";

interface District {
  state: string;
  district: string;
  enrolments: number;
  child: number;
  youth: number;
  adult: number;
}

interface Props {
  districts: District[];
}

type SortKey = "enrolments" | "child" | "youth" | "adult";

export default function DistrictTable({ districts }: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("enrolments");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = districts
    .filter((d) => !search || d.district.toLowerCase().includes(search.toLowerCase()) || d.state.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortDir === "desc" ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey])
    .slice(0, 50);

  const toggle = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => sortKey === k
    ? sortDir === "desc" ? <ChevronDown size={12} className="text-brand-cyan" /> : <ChevronUp size={12} className="text-brand-cyan" />
    : <ChevronDown size={12} className="text-slate-600" />;

  return (
    <div>
      <SectionHeader tag="District Intelligence" title="District Decision Center" subtitle="Top 50 districts ranked by enrolment volume — searchable & sortable" icon={MapPin} color="cyan" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-brand-cyan/10 overflow-hidden"
      >
        {/* Search bar */}
        <div className="p-4 border-b border-brand-cyan/10 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search district or state…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.04] border border-brand-cyan/15 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan/40 transition-colors"
            />
          </div>
          <span className="text-xs text-slate-500">{filtered.length} results</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-brand-card">
              <tr className="border-b border-brand-cyan/10">
                <th className="text-left px-4 py-3 text-slate-400 font-semibold tracking-widest uppercase text-[10px]">#</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold tracking-widest uppercase text-[10px]">District</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold tracking-widest uppercase text-[10px]">State</th>
                {(["enrolments", "child", "youth", "adult"] as SortKey[]).map((k) => (
                  <th key={k} className="text-right px-4 py-3 text-slate-400 font-semibold tracking-widest uppercase text-[10px] cursor-pointer hover:text-brand-cyan transition-colors" onClick={() => toggle(k)}>
                    <span className="flex items-center justify-end gap-1">{k} <SortIcon k={k} /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <motion.tr
                  key={`${d.district}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                  className="border-b border-white/[0.04] hover:bg-brand-cyan/[0.03] transition-colors group"
                >
                  <td className="px-4 py-3 text-slate-600 font-mono">{String(i + 1).padStart(2, "0")}</td>
                  <td className="px-4 py-3 text-white font-semibold group-hover:text-brand-cyan transition-colors">{d.district}</td>
                  <td className="px-4 py-3 text-slate-400">{d.state}</td>
                  <td className="px-4 py-3 text-right font-mono text-brand-cyan font-bold">{d.enrolments.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-right font-mono text-brand-green">{d.child.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-right font-mono text-brand-purple">{d.youth.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-right font-mono text-brand-amber">{d.adult.toLocaleString("en-IN")}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
