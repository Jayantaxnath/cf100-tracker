import requests
import pandas as pd


# -------------------------------
# CONFIG
# -------------------------------
TARGET_DISTRIBUTION = {
    800: 10,
    900: 15,
    1000: 15,
    1100: 15,
    1200: 15,
    1300: 15,
    1400: 10,
    1500: 5
}


# -------------------------------
# FETCH DATA
# -------------------------------
def fetch_data():
    url = "https://codeforces.com/api/problemset.problems"
    data = requests.get(url).json()['result']
    return data['problems'], data['problemStatistics']


# -------------------------------
# BUILD DATAFRAME (SAFE MERGE)
# -------------------------------
def build_dataframe(problems, stats):
    solved_map = {
        (s['contestId'], s['index']): s['solvedCount']
        for s in stats
    }

    rows = []
    for p in problems:
        if 'rating' not in p:
            continue

        key = (p['contestId'], p['index'])

        rows.append({
            "id": f"{p['contestId']}{p['index']}",
            "name": p['name'],
            "rating": p['rating'],
            "solvedCount": solved_map.get(key, 0),
            "link": f"https://codeforces.com/problemset/problem/{p['contestId']}/{p['index']}"
        })

    return pd.DataFrame(rows)


# -------------------------------
# SELECT TOP PROBLEMS
# -------------------------------
def select_problems(df):
    df = df.sort_values(by='solvedCount', ascending=False)

    # take top 50 per rating
    top_per_rating = df.groupby('rating').head(50)

    selected_parts = []

    for rating, count in TARGET_DISTRIBUTION.items():
        subset = top_per_rating[top_per_rating['rating'] == rating].head(count)
        selected_parts.append(subset)

    final_df = pd.concat(selected_parts, ignore_index=True)

    return final_df


# -------------------------------
# SAVE CSV
# -------------------------------
def save_csv(df, filename="cf_beginner_100.csv"):
    df = df.reset_index(drop=True)
    df.insert(0, "s_no", df.index + 1)
    df.to_csv(filename, index=False)
    print(f"Saved to {filename}")

# save as JS
def save_as_js(df, filename="cf_sheet.js"):
    df = df.reset_index(drop=True)
    df.insert(0, "s_no", df.index + 1)

    # convert dataframe → CSV string
    csv_string = df.to_csv(index=False)

    # wrap inside JS const
    js_content = f"const csvData = `{csv_string}`;\n"

    with open(filename, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"Saved JS file to {filename}")

# -------------------------------
# MAIN PIPELINE
# -------------------------------
def main():
    print("Fetching data...")
    problems, stats = fetch_data()

    print("Building dataset...")
    df = build_dataframe(problems, stats)

    print("Selecting problems...")
    final_df = select_problems(df)

    print("Saving CSV...")
    save_csv(final_df)

    print("Saving JS...")
    save_as_js(final_df)

    print("\nDone ✅")
    print(final_df['rating'].value_counts().sort_index())


if __name__ == "__main__":
    main()