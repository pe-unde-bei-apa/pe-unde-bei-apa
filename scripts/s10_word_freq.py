import spacy
from website.database import APP_DB, db_connect


def normalize_romanian(text):
    if not text:
        return text
    return text.replace("ş", "ș").replace("Ş", "Ș").replace("ţ", "ț").replace("Ţ", "Ț")


def main():
    nlp = spacy.load("ro_core_news_lg")
    file_path = "data/06_dictionary_files/frequency_ro_50k.txt"

    words_data = []
    total_count = 0

    print("Reading frequency file...")
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split()
            word, count = parts[0], int(parts[1])
            word = normalize_romanian(word)
            words_data.append((word, count))
            total_count += count

    print(f"Total count: {total_count}")
    print("Processing words and inserting into database...")

    with db_connect(APP_DB) as cur:
        cur.execute("TRUNCATE TABLE `words_common_freq`")
        count_inserted = 0
        for word, count in words_data:
            freq = count / total_count
            doc = nlp(str(word))

            doc_json = doc.to_json()
            if "tokens" in doc_json and len(doc_json["tokens"]) > 0:
                token = doc_json["tokens"][0]
                spacy_lemma = normalize_romanian(token.get("lemma", ""))
                spacy_tag = token.get("tag", "")
                spacy_pos = token.get("pos", "")
                spacy_morph = token.get("morph", "")

                cur.execute(
                    """INSERT IGNORE INTO words_common_freq 
                       (word_str, freq, spacy_lemma, spacy_tag, spacy_pos, spacy_morph) 
                       VALUES (%s, %s, %s, %s, %s, %s)""",
                    (word, freq, spacy_lemma, spacy_tag, spacy_pos, spacy_morph),
                )
                count_inserted += 1
                print(word, cur.lastrowid)
                if count_inserted % 1000 == 0:
                    print(f"Processed {count_inserted} words...")


if __name__ == "__main__":
    main()
