import json
from collections import Counter, defaultdict
from website.database import APP_DB, db_connect
import matplotlib.pyplot as plt


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
    total_term_count = len(tokens)
    lemma_counts = count_lemmas(tokens)
    lemma_freqs = fetch_lemma_freqs()

    print("\nAll Lemmas in Original Corpus:")
    print("lemma\tsentence_freq\tglobal_ro_freq")
    print("-" * 45)

    for lemma, count in lemma_counts.items():
        sentence_freq = count / total_term_count
        global_ro_freq = lemma_freqs.get(lemma, 0.0)
        print(f"{lemma}\t{sentence_freq:.6f}\t{global_ro_freq:.6f}")

    # Prepare data for plotting
    s_freqs = []
    g_freqs = []
    MIN_FREQ = 1e-7
    for lemma, count in lemma_counts.items():
        s_freq = max(count / total_term_count, MIN_FREQ)
        g_freq = max(lemma_freqs.get(lemma, 0.0), MIN_FREQ)
        s_freqs.append(s_freq)
        g_freqs.append(g_freq)

    if s_freqs:
        import numpy as np

        plt.figure(figsize=(10, 8))
        # Flip: x=global, y=sentence
        plt.scatter(g_freqs, s_freqs, alpha=0.5, s=15, label="All Lemmas")

        # Linear regression on log-log scale (y=sentence, x=global)
        log_g = np.log10(g_freqs)
        log_s = np.log10(s_freqs)
        m, b = np.polyfit(log_g, log_s, 1)

        # Regression line points
        g_range = np.linspace(min(g_freqs), max(g_freqs), 100)
        s_fit = 10 ** (m * np.log10(g_range) + b)

        plt.plot(
            g_range,
            s_fit,
            "r--",
            label=f"Linear Fit (log-log): slope={m:.2f}",
        )

        # x=y line (Identity)
        lim_min = min(min(s_freqs), min(g_freqs))
        lim_max = max(max(s_freqs), max(g_freqs))
        plt.plot([lim_min, lim_max], [lim_min, lim_max], "g--", label="y=x (Identity)")

        plt.xscale("log")
        plt.yscale("log")
        plt.xlabel("Global RO Frequency (Common Lemmas)")
        plt.ylabel("Sentence Frequency (Original Corpus)")
        plt.title("Lemma Frequency Comparison: Global RO vs. Original Corpus")
        plt.legend()
        plt.grid(True, which="both", ls="-", alpha=0.2)
        plt.savefig("freq_comparison.png")
        print(f"\nPlot saved to freq_comparison.png ({len(s_freqs)} points plotted)")


if __name__ == "__main__":
    main()
