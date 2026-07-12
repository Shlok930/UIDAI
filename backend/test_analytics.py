import sys, os
sys.path.insert(0, os.path.dirname(__file__))

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get("/health"); assert r.status_code == 200

def test_kpis():
    r = client.get("/api/kpis"); assert r.status_code == 200
    d = r.json(); assert d["total_enrolments"] > 0; assert d["states_covered"] > 0

def test_state_ranking():
    r = client.get("/api/state-ranking"); assert r.status_code == 200
    d = r.json(); assert len(d) > 0; assert "state" in d[0]; assert "enrolments" in d[0]

def test_district_ranking():
    r = client.get("/api/district-ranking"); assert r.status_code == 200
    d = r.json(); assert len(d) > 0

def test_trends():
    r = client.get("/api/trends"); assert r.status_code == 200
    d = r.json(); assert "monthly" in d; assert len(d["monthly"]) > 0; assert "insights" in d

def test_anomalies():
    r = client.get("/api/anomalies"); assert r.status_code == 200
    d = r.json(); assert isinstance(d, list); assert len(d) > 0

def test_forecast():
    r = client.get("/api/forecast"); assert r.status_code == 200
    d = r.json(); assert len(d) == 6

def test_inclusion_index():
    r = client.get("/api/inclusion-index"); assert r.status_code == 200
    d = r.json(); assert len(d) > 0; assert "inclusion_score" in d[0]

def test_recommendations():
    r = client.get("/api/recommendations"); assert r.status_code == 200
    d = r.json(); assert len(d) > 0

def test_age_distribution():
    r = client.get("/api/age-distribution"); assert r.status_code == 200
    d = r.json(); assert len(d) == 3

def test_update_types():
    r = client.get("/api/update-types"); assert r.status_code == 200
    d = r.json(); assert "demographic" in d; assert "biometric" in d

def test_executive_summary():
    r = client.get("/api/executive-summary"); assert r.status_code == 200
    d = r.json(); assert "kpis" in d; assert "top_states" in d

# ── Biometric endpoints ────────────────────────────────────────────────────────

def test_bio_state_ranking():
    r = client.get("/api/biometric/state-ranking"); assert r.status_code == 200
    d = r.json(); assert len(d) > 0; assert "total" in d[0]; assert "youth" in d[0]

def test_bio_trends():
    r = client.get("/api/biometric/trends"); assert r.status_code == 200
    d = r.json(); assert "monthly" in d; assert len(d["monthly"]) > 0; assert len(d["insights"]) >= 3

def test_bio_anomalies():
    r = client.get("/api/biometric/anomalies"); assert r.status_code == 200
    d = r.json(); assert isinstance(d, list); assert len(d) > 0; assert "severity" in d[0]

def test_bio_forecast():
    r = client.get("/api/biometric/forecast"); assert r.status_code == 200
    d = r.json(); assert len(d) == 9  # 3 metrics x 3 months

# ── Demographic endpoints ──────────────────────────────────────────────────────

def test_demo_state_ranking():
    r = client.get("/api/demographic/state-ranking"); assert r.status_code == 200
    d = r.json(); assert len(d) > 0; assert "total" in d[0]; assert "adult" in d[0]

def test_demo_trends():
    r = client.get("/api/demographic/trends"); assert r.status_code == 200
    d = r.json(); assert "monthly" in d; assert len(d["monthly"]) > 0; assert len(d["insights"]) >= 3

def test_demo_anomalies():
    r = client.get("/api/demographic/anomalies"); assert r.status_code == 200
    d = r.json(); assert isinstance(d, list); assert len(d) > 0

def test_demo_forecast():
    r = client.get("/api/demographic/forecast"); assert r.status_code == 200
    d = r.json(); assert len(d) == 9  # 3 metrics x 3 months
