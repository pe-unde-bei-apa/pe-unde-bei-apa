import json
from collections import Counter, defaultdict
from website.database import APP_DB, DEXONLINE_DB, db_connect


def normalize_romanian(text):
    if not text:
        return text
    return text.replace("ş", "ș").replace("Ş", "Ș").replace("ţ", "ț").replace("Ţ", "Ț")


def fetch_all_tokens():
    tokens = []
    query = """
        SELECT sa.doc 
        FROM sentence_anal sa
        JOIN sentence_origin so ON sa.id = so.sentence_id
        WHERE so.origin = 'original_corpus'
    """
    print("Fetching sentence JSONs from original corpus...")
    with db_connect(APP_DB) as cur:
        cur.execute(query)
        for row in cur.fetchall():
            doc_json = json.loads(row[0])
            if "tokens" in doc_json:
                tokens.extend(doc_json["tokens"])
    print(f"Total tokens collected: {len(tokens)}")
    return tokens


def count_lemmas(tokens):
    print("Counting lemmas in corpus...")
    counts = Counter(
        normalize_romanian(token.get("lemma", ""))
        for token in tokens
        if token.get("lemma")
    )
    return counts


def fetch_global_lemma_freqs():
    print("Fetching global lemma frequencies...")
    freqs = defaultdict(float)
    query = "SELECT spacy_lemma, total_freq FROM words_common_lemmas"
    with db_connect(APP_DB) as cur:
        cur.execute(query)
        for row in cur.fetchall():
            lemma = normalize_romanian(row[0])
            freqs[lemma] = float(row[1])
    return freqs


def load_injuraturi(filepath):
    print(f"Loading priority terms from {filepath}...")
    injuraturi = set()
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                term = normalize_romanian(line.strip())
                if term:
                    injuraturi.add(term)
    except FileNotFoundError:
        print(f"Warning: {filepath} not found.")
    return injuraturi


def fetch_in_batches(db, table, column, values, fields):
    """Fetch data from database using IN clause in batches."""
    results = []
    batch_size = 5000
    values_list = list(values)

    with db_connect(db, dict=True) as cur:
        for i in range(0, len(values_list), batch_size):
            batch = values_list[i : i + batch_size]
            placeholders = ", ".join(["%s"] * len(batch))
            query = f"SELECT {fields} FROM {table} WHERE {column} IN ({placeholders})"
            cur.execute(query, tuple(batch))
            results.extend(cur.fetchall())
    return results


def correlate_with_dexonline(word_dicts):
    print("Correlating with DEXonline...")
    words = [d["word"].lower() for d in word_dicts]
    word_to_idx = {d["word"]: i for i, d in enumerate(word_dicts)}

    # Step 1: Lexemes and Inflected Forms
    print("  Matching Lexemes...")
    lexemes = fetch_in_batches(
        DEXONLINE_DB,
        "Lexeme",
        "formUtf8General",
        words,
        "id, formUtf8General",
    )

    print("  Matching Inflected Forms...")
    inflected = fetch_in_batches(
        DEXONLINE_DB,
        "InflectedForm",
        "formUtf8General",
        words,
        "lexemeId, formUtf8General",
    )

    # Map word -> set of lexeme IDs
    word_to_lexemes = defaultdict(set)

    for row in lexemes:
        l_id = row["id"]
        word = row["formUtf8General"]
        word_to_lexemes[word].add(l_id)

    for row in inflected:
        l_id = row["lexemeId"]
        word = row["formUtf8General"]
        word_to_lexemes[word].add(l_id)

    # Step 2: Lexemes -> Entries
    all_lex_ids = set()
    for l_ids in word_to_lexemes.values():
        all_lex_ids.update(l_ids)

    print(f"  Mapping {len(all_lex_ids)} lexemes to entries...")
    entry_lexemes = fetch_in_batches(
        DEXONLINE_DB, "EntryLexeme", "lexemeId", all_lex_ids, "lexemeId, entryId"
    )

    lex_to_entries = defaultdict(set)
    all_entry_ids = set()
    for row in entry_lexemes:
        lex_to_entries[row["lexemeId"]].add(row["entryId"])
        all_entry_ids.add(row["entryId"])

    # Step 3: Fetch Entry details
    print(f"  Fetching details for {len(all_entry_ids)} entries...")
    entries_data = fetch_in_batches(
        DEXONLINE_DB, "Entry", "id", all_entry_ids, "id, description"
    )
    entry_details = {row["id"]: row["description"] for row in entries_data}

    # Step 4: Final Merge
    print("  Merging data into results...")
    for word, lex_ids in word_to_lexemes.items():
        if word not in word_to_idx:
            continue
        idx = word_to_idx[word]
        d = word_dicts[idx]

        d["dex_lexeme_ids"] = sorted(list(lex_ids))

        # Collect entry IDs
        e_ids = set()
        for l_id in lex_ids:
            e_ids.update(lex_to_entries.get(l_id, []))
        d["dex_entry_ids"] = sorted(list(e_ids))

        # Collect entry objects
        d["dex_entries"] = [
            {"id": e_id, "description": entry_details.get(e_id, "")}
            for e_id in d["dex_entry_ids"]
        ]


def main():
    # 1. Fetch corpus and global data
    tokens = fetch_all_tokens()
    total_tokens = len(tokens)
    corpus_counts = count_lemmas(tokens)
    global_freqs = fetch_global_lemma_freqs()
    injuraturi = load_injuraturi("data/06_dictionary_files/injuraturi3.txt")

    # 2. Combine frequencies
    combined_results = defaultdict(float)
    for lemma, freq in global_freqs.items():
        combined_results[lemma] += freq

    if total_tokens > 0:
        for lemma, count in corpus_counts.items():
            corpus_freq = count / total_tokens
            combined_results[lemma] += corpus_freq

    for term in injuraturi:
        combined_results[term] += 1.0

    # 3. Create list of dicts
    print("Creating list of dicts...")
    sorted_list = sorted(combined_results.items(), key=lambda x: x[1], reverse=True)
    word_dicts = [{"word": word, "freq": freq} for word, freq in sorted_list]

    # 4. Correlate with DEXonline
    correlate_with_dexonline(word_dicts)

    # 5. Save
    output_file = "data/07_scrape_order/scrape_order.json"
    print(f"Saving to {output_file}...")
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(word_dicts, f, ensure_ascii=False, indent=2)

    print(f"Done. Processed {len(word_dicts)} unique terms.")


if __name__ == "__main__":
    main()
