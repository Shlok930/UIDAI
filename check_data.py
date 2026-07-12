import pandas as pd, glob, os

groups = {
    'enrolment': sorted(glob.glob('api_data_aadhar_enrolment_*.csv')),
    'demographic': sorted(glob.glob('api_data_aadhar_demographic_*.csv')),
    'biometric': sorted(glob.glob('api_data_aadhar_biometric_*.csv')),
}

for gname, files in groups.items():
    frames = [pd.read_csv(f) for f in files]
    df = pd.concat(frames, ignore_index=True)
    df['date'] = pd.to_datetime(df['date'], dayfirst=True)
    print(f"=== {gname} ===")
    print(f"  rows: {len(df)}, cols: {list(df.columns)}")
    print(f"  date range: {df['date'].min()} -> {df['date'].max()}")
    print(f"  states: {df['state'].nunique()}, districts: {df['district'].nunique()}")
    print()
