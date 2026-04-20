import json
from website.database import APP_DB, db_connect


def main():
    input_file = "data/07_scrape_order/scrape_order.json"
    print(f"Reading {input_file}...")
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"Found {len(data)} words. Preparing insertions...")

    # We collect insertions to perform them in batches
    insertions = []
    for item in data:
        freq = item.get("freq", 0.0)
        dex_entries = item.get("dex_entries", [])
        for entry in dex_entries:
            e_id = entry.get("id")
            e_desc = entry.get("description", "")
            if e_id is not None:
                # Format: dex_entry_id, dex_entry_desc, word_freq, dex_scraped_html
                insertions.append((e_id, e_desc, freq))

    print(f"Total potential insertions: {len(insertions)}")

    # Perform insertions in batches
    batch_size = 5000
    query = """
        INSERT IGNORE INTO dex_scrape 
        (dex_entry_id, dex_entry_desc, word_freq, dex_scraped_html) 
        VALUES (%s, %s, %s, NULL)
    """

    total_inserted = 0
    with db_connect(APP_DB) as cur:
        for i in range(0, len(insertions), batch_size):
            batch = insertions[i : i + batch_size]
            cur.executemany(query, batch)
            # executemany doesn't return total rows affected in a way that is consistent across drivers,
            # but we can assume it works.
            # Actually, to get the count of really inserted rows, we could check DB.
            total_inserted += len(batch)
            print(f"  Processed {total_inserted}/{len(insertions)}...")

    print("Done. Insertions complete.")


if __name__ == "__main__":
    main()
