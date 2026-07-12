from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from app.analytics import (
    kpis, state_ranking, district_ranking, trends,
    anomalies, forecast, inclusion_index, recommendations,
    executive_summary, age_distribution, update_type_distribution,
    top_pincodes, state_monthly_trend,
    biometric_state_ranking, biometric_trends, biometric_anomalies, biometric_forecast,
    demographic_state_ranking, demographic_trends, demographic_anomalies, demographic_forecast,
)

app = FastAPI(title="Aadhaar InsightX API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "Aadhaar InsightX API v2"}

@app.get("/api/kpis")
def get_kpis(state: str | None = None, district: str | None = None, year: int | None = None):
    return kpis({"state": state, "district": district, "year": year})

@app.get("/api/state-ranking")
def get_state_ranking():
    return state_ranking()

@app.get("/api/district-ranking")
def get_district_ranking(state: str | None = Query(default=None)):
    return district_ranking(state)

@app.get("/api/trends")
def get_trends():
    return trends()

@app.get("/api/anomalies")
def get_anomalies():
    return anomalies()

@app.get("/api/forecast")
def get_forecast():
    return forecast()

@app.get("/api/inclusion-index")
def get_inclusion_index():
    return inclusion_index()

@app.get("/api/recommendations")
def get_recommendations():
    return recommendations()

@app.get("/api/age-distribution")
def get_age_distribution():
    return age_distribution()

@app.get("/api/update-types")
def get_update_types():
    return update_type_distribution()

@app.get("/api/top-pincodes")
def get_top_pincodes(state: str | None = Query(default=None), top_n: int = 10):
    return top_pincodes(state, top_n)

@app.get("/api/state-trend")
def get_state_trend(state: str = Query(...)):
    return state_monthly_trend(state)

@app.get("/api/executive-summary")
def get_executive_summary():
    return executive_summary()

@app.get("/api/biometric/state-ranking")
def get_bio_state_ranking():
    return biometric_state_ranking()

@app.get("/api/biometric/trends")
def get_bio_trends():
    return biometric_trends()

@app.get("/api/biometric/anomalies")
def get_bio_anomalies():
    return biometric_anomalies()

@app.get("/api/biometric/forecast")
def get_bio_forecast():
    return biometric_forecast()

@app.get("/api/demographic/state-ranking")
def get_demo_state_ranking():
    return demographic_state_ranking()

@app.get("/api/demographic/trends")
def get_demo_trends():
    return demographic_trends()

@app.get("/api/demographic/anomalies")
def get_demo_anomalies():
    return demographic_anomalies()

@app.get("/api/demographic/forecast")
def get_demo_forecast():
    return demographic_forecast()
