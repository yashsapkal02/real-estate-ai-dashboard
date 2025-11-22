import pandas as pd
import re
from pathlib import Path
import os

# ---- MOCK SUMMARY (FREE → NO OPENAI KEY REQUIRED) ----
USE_AI = False   # keep False to avoid OpenAI errors

BASE = Path(__file__).resolve().parent
DATA_FILE = BASE / "data" / "Sample_data.xlsx"


def load_data():
    df = pd.read_excel(DATA_FILE)

    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]

    df = df.fillna(0)

    return df


# ------------------------------------
# SMART LOCALITY EXTRACTOR
# ------------------------------------
def extract_area_names_from_query(query, df):
    query_lower = query.lower()

    all_localities = df["final_location"].dropna().unique()
    all_clean = [str(a).lower().strip() for a in all_localities]

    cleaned = re.sub(r"\bvs\b|and|,", ",", query_lower)
    cleaned = cleaned.replace("compare", "").strip()

    parts = [p.strip() for p in cleaned.split(",") if p.strip()]

    found = []

    for part in parts:
        for loc in all_clean:
            if loc in part:
                original = next(a for a in all_localities if a.lower().strip() == loc)
                found.append(original)

    return list(dict.fromkeys(found))


# ------------------------------------
# FILTER
# ------------------------------------
def filter_by_locality(df, locality):
    return df[df["final_location"].str.lower().str.contains(locality.lower())]


# ------------------------------------
# CHART DATA
# ------------------------------------
def build_chart(df, column):
    if df.empty:
        return {"years": [], "values": []}

    grouped = df.groupby("year")[column].mean().reset_index()

    return {
        "years": grouped["year"].tolist(),
        "values": grouped[column].tolist(),
    }


# ------------------------------------
# MOCK SUMMARY (FREE + NO ERRORS)
# ------------------------------------
def generate_summary(df, locality):
    if df.empty:
        return f"No data found for {locality}."

    avg_price = df["flat_-_weighted_average_rate"].mean()
    avg_units = df["total_units"].mean()

    return (
        f"{locality} real-estate report: "
        f"Average property price is {avg_price:.2f} and "
        f"average demand (units sold) is {avg_units:.2f}. "
        f"This analysis is auto-generated based on past 5-year trends."
    )
