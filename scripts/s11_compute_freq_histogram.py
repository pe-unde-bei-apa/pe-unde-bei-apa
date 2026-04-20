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
    print("Fetching sentence JSONs...")
    with db_connect(APP_DB) as cur:
        cur.execute(query)
        for row in cur.fetchall():
            doc_json = json.loads(row[0])
            if "tokens" in doc_json:
                tokens.extend(doc_json["tokens"])
    print(f"Total tokens collected: {len(tokens)}")
    return tokens


def count_lemmas(tokens):
    print("Counting lemmas...")
    counts = Counter(
        normalize_romanian(token.get("lemma", ""))
        for token in tokens
        if token.get("lemma")
    )
    return dict(counts.most_common())


def fetch_lemma_freqs():
    print("Fetching global lemma frequencies...")
    freqs = defaultdict(float)
    query = "SELECT spacy_lemma, total_freq FROM words_common_lemmas"
    with db_connect(APP_DB) as cur:
        cur.execute(query)
        for row in cur.fetchall():
            freqs[normalize_romanian(row[0])] = row[1]
    return freqs


def main():
    tokens = fetch_all_tokens()
    lemma_counts = count_lemmas(tokens)
    lemma_freqs = fetch_lemma_freqs()

    print("\nTop 30 Lemmas in Original Corpus:")
    print("lemma\tcount\tfreq")
    print("-" * 30)

    # Get top 30 from the counted lemmas
    top_30 = list(lemma_counts.items())[:330]

    for lemma, count in top_30:
        freq = lemma_freqs.get(lemma, 0.0)
        print(f"{lemma}\t{count}\t{freq:.6f}")


if __name__ == "__main__":
    main()
