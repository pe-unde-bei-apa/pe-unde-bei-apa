import json
import time
import urllib.parse

import requests

from website.database import APP_DB, db_connect


def load_headers(filepath):
    print(f"Loading headers from {filepath}...")
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    headers = {}
    for h in data.get("requestHeaders", {}).get("headers", []):
        headers[h["name"]] = h["value"]
    return headers


def main():
    headers = load_headers("data/07_scrape_order/req_headers.json")

    # We use a session for connection pooling
    session = requests.Session()
    session.headers.update(headers)

    while True:
        print("Fetching next 1000 entries to scrape...")
        query = """
            SELECT scrape_id, dex_entry_id, dex_entry_desc, word_freq 
            FROM dex_scrape 
            WHERE error IS NULL 
            AND scrape_id NOT IN (SELECT scrape_id FROM dex_scrape_data)
            ORDER BY word_freq DESC 
            LIMIT 1000
        """

        with db_connect(APP_DB, dict=True) as cur:
            cur.execute(query)
            batch = cur.fetchall()

        if not batch:
            print("No more entries to scrape. Done.")
            break

        print(f"Processing batch of {len(batch)} entries...")

        for entry in batch:
            scrape_id = entry["scrape_id"]
            entry_id = entry["dex_entry_id"]
            desc = entry["dex_entry_desc"]

            # term_urlencoded is the first word (split by space and take first item)
            first_word = desc.split()[0] if desc else "word"
            term_encoded = urllib.parse.quote(first_word)

            url = f"https://dexonline.ro/intrare/{term_encoded}/{entry_id}"
            print(f"  Scraping {url} ...", end=" ", flush=True)

            try:
                response = session.get(url, timeout=10)

                if response.status_code != 200:
                    error_msg = f"ERROR: Status {response.status_code}"
                    print(error_msg)
                    with db_connect(APP_DB) as cur:
                        cur.execute(
                            "UPDATE dex_scrape SET error = %s WHERE scrape_id = %s",
                            (error_msg, scrape_id),
                        )
                    continue

                html = response.text
                if "<main" not in html:
                    error_msg = "ERROR: Readable HTML with <main> element not found"
                    print(error_msg)
                    with db_connect(APP_DB) as cur:
                        cur.execute(
                            "UPDATE dex_scrape SET error = %s WHERE scrape_id = %s",
                            (error_msg, scrape_id),
                        )
                    continue

                # Update database - insert into dex_scrape_data
                with db_connect(APP_DB) as cur:
                    cur.execute(
                        "INSERT INTO dex_scrape_data (scrape_id, dex_scraped_html) VALUES (%s, %s)",
                        (scrape_id, html),
                    )

                print("OK")

            except Exception as e:
                error_msg = f"ERROR: {str(e)}"
                print(error_msg)
                try:
                    with db_connect(APP_DB) as cur:
                        cur.execute(
                            "UPDATE dex_scrape SET error = %s WHERE scrape_id = %s",
                            (error_msg, scrape_id),
                        )
                except Exception as inner_e:
                    print(f"  CRITICAL DB ERROR: {inner_e}")

            # 16ms sleep in between each page fetch
            time.sleep(0.016)

    print("Scraping complete.")


if __name__ == "__main__":
    main()
