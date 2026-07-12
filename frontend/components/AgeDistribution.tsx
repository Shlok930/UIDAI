"use client";
import { motion } from "framer-motion";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import SectionHeader from "./SectionHeader";
import { Users } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface Props {
  ageData: { age_group: string; enrolments: number; pct: number }[];
  updateTypes: { demographic: any; biometric: any };
}

const COLORS = ["#00d4ff", "#8b5cf6", "#10b981"];
const UPDATE_COLORS = ["#3b82f6", "#f59e0b"];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 border border-brand-cyan/20 text-xs">
      <p style={{ color: payload[0].payload.fill || "#00d4ff" }} className="font-bold">{payload[0].name}</p>
      <p className="text-white mt-1">{Number(payload[0].value).toLocaleString("en-IN")}</p>
    </div>
  );
};

export default function AgeDistribution({ ageData, updateTypes }: Props) {
  const updateData = [
    { name: "Demographic", value: updateTypes?.demographic?.total ?? 0 },
    { name: "Biometric", value: updateTypes?.biometric?.total ?? 0 },
  ];

  return (
    <div>
      <SectionHeader tag="Demographic Analytics" title="Age Group & Update Type Analysis" subtitle="Breakdown of enrolments by age cohort and update modalities" icon={Users} color="purple" />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Age donut */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-5 border border-brand-purple/15"
        >
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Enrolment by Age Group</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ageData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="enrolments" nameKey="age_group">
                  {ageData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="none" />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {ageData.map((d, i) => (
              <div key={d.age_group} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-slate-300">{d.age_group}</span>
                </div>
                <span className="font-bold" style={{ color: COLORS[i] }}>{d.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Update type donut */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl p-5 border border-brand-blue/15"
        >
          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Update Modality Split</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={updateData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" nameKey="name">
                  {updateData.map((_, i) => <Cell key={i} fill={UPDATE_COLORS[i]} stroke="none" />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {updateData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: UPDATE_COLORS[i] }} />
                  <span className="text-slate-300">{d.name}</span>
                </div>
                <span className="font-bold text-white font-mono">{d.value.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Age breakdown stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-5 border border-brand-green/15 flex flex-col gap-4"
        >
          <p className="text-xs text-slate-400 uppercase tracking-widest">Detailed Breakdown</p>
          {ageData.map((d, i) => (
            <div key={d.age_group} className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">{d.age_group}</span>
                <span className="text-xs font-mono" style={{ color: COLORS[i] }}>{d.pct}%</span>
              </div>
              <p className="text-xl font-black" style={{ color: COLORS[i] }}>
                <AnimatedCounter end={d.enrolments} duration={1800} />
              </p>
              <div className="mt-2 h-1 rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.pct}%` }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-1 rounded-full"
                  style={{ background: COLORS[i] }}
                />
              </div>
            </div>
          ))}

          {/* Youth in updates */}
          {updateTypes?.demographic && (
            <div className="rounded-xl bg-brand-blue/5 border border-brand-blue/20 p-3 text-xs">
              <p className="text-brand-blue font-semibold mb-1">Youth in Updates (5–17)</p>
              <p className="text-white font-mono">Demo: {updateTypes.demographic.youth?.toLocaleString("en-IN")}</p>
              <p className="text-white font-mono">Bio: {updateTypes.biometric?.youth?.toLocaleString("en-IN")}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
