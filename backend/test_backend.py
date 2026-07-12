import sys, os
os.chdir(os.path.dirname(__file__))
sys.path.insert(0, ".")

from app.analytics import (
    kpis, state_ranking, district_ranking, trends,
    anomalies, forecast, inclusion_index, recommendations,
    age_distribution, update_type_distribution, executive_summary
)

k = kpis()
print(f"KPIs OK - enrolments: {k['total_enrolments']:,}")

sr = state_ranking()
print(f"State ranking OK - {len(sr)} states")

dr = district_ranking()
print(f"District ranking OK - {len(dr)} districts")

t = trends()
print(f"Trends OK - {len(t['monthly'])} months")

ag = age_distribution()
print(f"Age dist OK - {ag}")

ut = update_type_distribution()
print(f"Update types OK - demo:{ut['demographic']['total']:,} bio:{ut['biometric']['total']:,}")

ii = inclusion_index()
print(f"Inclusion OK - {len(ii)} states")

r = recommendations()
print(f"Recs OK - {len(r)} recs")

a = anomalies()
print(f"Anomalies OK - {len(a)} flagged")

f = forecast()
print(f"Forecast OK - {len(f)} predictions")

print("\nALL ANALYTICS PASSED!")
