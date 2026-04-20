import json
from collections import Counter, defaultdict
from website.database import APP_DB, db_connect


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


def main():
    # 1. Fetch data
    tokens = fetch_all_tokens()
    total_tokens = len(tokens)
    corpus_counts = count_lemmas(tokens)
    global_freqs = fetch_global_lemma_freqs()
    injuraturi = load_injuraturi("data/06_dictionary_files/injuraturi3.txt")

    # 2. Combine frequencies
    # We use a single dictionary to hold all unique terms encountered
    combined_results = defaultdict(float)

    # All terms from global freqs
    for lemma, freq in global_freqs.items():
        combined_results[lemma] += freq

    # All terms from corpus counts
    if total_tokens > 0:
        for lemma, count in corpus_counts.items():
            corpus_freq = count / total_tokens
            combined_results[lemma] += corpus_freq

    # All terms from injuraturi
    for term in injuraturi:
        combined_results[term] += 1.0

    # 3. Sort and save
    print("Sorting results...")
    # Convert to list of pairs and sort descending by freq
    sorted_list = sorted(combined_results.items(), key=lambda x: x[1], reverse=True)

    output_file = "data/07_scrape_order/scrape_order.json"
    print(f"Saving to {output_file}...")
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(sorted_list, f, ensure_ascii=False, indent=2)

    print(f"Done. Processed {len(sorted_list)} unique terms.")


if __name__ == "__main__":
    main()
