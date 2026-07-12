# Aadhaar InsightX

AI-powered Aadhaar enrolment and update analytics platform for the UIDAI Data Hackathon problem statement: **Unlocking Societal Trends in Aadhaar Enrolment and Updates**.

## What this project includes

- Premium Next.js dashboard UI
- FastAPI analytics backend
- CSV-based data ingestion
- KPI dashboard
- State and district analytics
- Trend discovery
- Anomaly detection
- Forecasting
- Inclusion Index
- AI-style policy recommendations
- Executive summary endpoint

## Folder Structure

```txt
aadhaar-insightx/
  backend/
    app/
      main.py
      analytics.py
      schemas.py
    data/
      sample_aadhaar_data.csv
    requirements.txt
    README.md
  frontend/
    app/
    components/
    lib/
    package.json
    README.md
```

## Expected CSV Columns

Your dataset should ideally contain:

```csv
state,district,year,month,gender,age_group,area_type,enrolments,updates,successful_updates
```

Example:

```csv
Madhya Pradesh,Bhopal,2024,1,Female,18-25,Urban,1200,350,320
```

If your real dataset has different column names, edit `backend/app/analytics.py` in the `load_data()` function.

## Run Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend runs at:

```txt
http://localhost:8000
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```txt
http://localhost:3000
```

## Important

This is a strong hackathon starter project. Add your real UIDAI data CSV inside:

```txt
backend/data/sample_aadhaar_data.csv
```

Then restart the backend.
