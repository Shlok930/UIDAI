import pandas as pd

files = [
    'api_data_aadhar_enrolment_0_500000.csv',
    'api_data_aadhar_demographic_0_500000.csv',
    'api_data_aadhar_biometric_0_500000.csv',
]

for f in files:
    df = pd.read_csv(f, nrows=5)
    print(f"=== {f} ===")
    print("Columns:", list(df.columns))
    print(df.to_string())
    print()
