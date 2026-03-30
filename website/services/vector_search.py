import os
import json
import spacy
from sentence_transformers import SentenceTransformer
from website.database import APP_DB, db_connect

nlp = spacy.load("ro_core_news_lg")

gemma_model_path = os.path.join(
    os.path.dirname(__file__), "..", "..", "models", "embeddinggemma-300m"
)
gemma_model = SentenceTransformer(gemma_model_path, device='cpu')


def edit_distance_search(query_text, top_k=50):
    with db_connect(APP_DB, dict=True) as cur:
        cur.execute("SELECT id, text FROM sentence")
        rows = cur.fetchall()

    results = []
    for row in rows:
        distance = levenshtein_distance(query_text.lower(), row["text"].lower())
        results.append({"id": row["id"], "text": row["text"], "distance": distance})

    results.sort(key=lambda x: x["distance"])
    return results[:top_k]


def levenshtein_distance(s1, s2):
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)

    if len(s2) == 0:
        return len(s1)

    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row

    return previous_row[-1]


def vector_search_query(query_text, model="spacy", top_k=50):
    if model == "editdistance":
        return edit_distance_search(query_text, top_k)

    if model == "gemma":
        query_vector = gemma_model.encode(query_text).tolist()
        table = "sentence_vect_gemma"
    else:
        doc = nlp(query_text)
        query_vector = doc.vector.tolist()
        table = "sentence_anal"

    vector_json = json.dumps(query_vector)

    with db_connect(APP_DB, dict=True) as cur:
        cur.execute(
            f"""
            SELECT s.id, s.text, VEC_DISTANCE_EUCLIDEAN(sv.vector, vec_fromtext(%s)) as distance
            FROM {table} sv
            JOIN sentence s ON s.id = sv.id
            WHERE sv.vector IS NOT NULL
            ORDER BY distance ASC
            LIMIT %s
        """,
            (vector_json, top_k),
        )
        results = cur.fetchall()

    return results
