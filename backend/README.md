# Aadhaar InsightX Backend

FastAPI backend for Aadhaar analytics.

## Start

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

- `/health`
- `/api/kpis`
- `/api/state-ranking`
- `/api/district-ranking`
- `/api/trends`
- `/api/anomalies`
- `/api/forecast`
- `/api/inclusion-index`
- `/api/recommendations`
- `/api/executive-summary`
