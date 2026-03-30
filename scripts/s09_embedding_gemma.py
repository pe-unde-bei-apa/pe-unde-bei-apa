import os
import json
from sentence_transformers import SentenceTransformer
from website.database import db_connect, APP_DB


model_path = os.path.join(
    os.path.dirname(__file__), "..", "models", "embeddinggemma-300m"
)
model = SentenceTransformer(model_path)


cur = db_connect(APP_DB)
cur.execute("SELECT id, text FROM sentence")
text_rows = cur.fetchall()

cur.execute("SELECT id FROM sentence_vect_gemma")
vect_skip = cur.fetchall()
vect_skip = set(a[0] for a in vect_skip)

for id, text in text_rows:
    if id in vect_skip:
        continue
    print("GEMMA EMBED ", id, text[:20])
    embedding = model.encode(text).tolist()
    vector_json = json.dumps(embedding)
    cur.execute(
        "INSERT INTO sentence_vect_gemma(`id`, `vector`) VALUES (%s, vec_fromtext(%s))",
        (id, vector_json),
    )
