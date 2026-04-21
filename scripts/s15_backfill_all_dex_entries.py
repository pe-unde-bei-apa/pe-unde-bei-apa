from website.database import APP_DB, DEXONLINE_DB, db_connect


def main():
    print("Fetching all entries from DEXonline...")
    # Step 1: Fetch all entries from dexonline.Entry
    with db_connect(DEXONLINE_DB, dict=True) as cur:
        cur.execute("SELECT id, description FROM Entry")
        entries = cur.fetchall()

    print(f"Found {len(entries)} entries. Preparing backfill...")

    # Step 2: Prepare data for insertion
    # Format: dex_entry_id, dex_entry_desc, word_freq
    # We use freq=0 as requested
    insert_data = []
    for row in entries:
        insert_data.append((row["id"], row["description"], 0.0))

    print(f"Total potential backfills: {len(insert_data)}")

    # Step 3: INSERT IGNORE in batches
    batch_size = 5000
    query = """
        INSERT IGNORE INTO dex_scrape 
        (dex_entry_id, dex_entry_desc, word_freq, dex_scraped_html) 
        VALUES (%s, %s, %s, NULL)
    """

    total_processed = 0
    with db_connect(APP_DB) as cur:
        for i in range(0, len(insert_data), batch_size):
            batch = insert_data[i : i + batch_size]
            cur.executemany(query, batch)
            total_processed += len(batch)
            print(f"  Processed {total_processed}/{len(insert_data)}...")

    print("Backfill initialization script finished.")


if __name__ == "__main__":
    main()
