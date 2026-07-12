const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

export const endpoints = {
  kpis: "/api/kpis",
  stateRanking: "/api/state-ranking",
  districtRanking: "/api/district-ranking",
  trends: "/api/trends",
  anomalies: "/api/anomalies",
  forecast: "/api/forecast",
  inclusion: "/api/inclusion-index",
  recommendations: "/api/recommendations",
  ageDistribution: "/api/age-distribution",
  updateTypes: "/api/update-types",
  bioStateRanking: "/api/biometric/state-ranking",
  bioTrends: "/api/biometric/trends",
  bioAnomalies: "/api/biometric/anomalies",
  bioForecast: "/api/biometric/forecast",
  demoStateRanking: "/api/demographic/state-ranking",
  demoTrends: "/api/demographic/trends",
  demoAnomalies: "/api/demographic/anomalies",
  demoForecast: "/api/demographic/forecast",
};
