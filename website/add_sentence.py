import spacy
import json
from spacy import displacy
from pymysql import IntegrityError
from website.database import APP_DB, db_connect

nlp = spacy.load("ro_core_news_sm")


def add_sentence(text):
    with db_connect(APP_DB) as cur:
        try:
            cur.execute("INSERT INTO sentence(text) VALUES (%s)", (text,))
            id = cur.lastrowid
        except IntegrityError:
            print("skip duplicate: ", text)
            cur.execute("SELECT id FROM sentence WHERE text = %s", (text,))
            row = cur.fetchone()
            return row[0] if row else None

        doc = nlp(text)
        vector_list = [float(f) for f in doc.vector.tolist()]
        # MariaDB sentence_anal.vector is vector(300), we must match dimensions
        if len(vector_list) < 300:
            vector_list += [0.0] * (300 - len(vector_list))
        else:
            vector_list = vector_list[:300]

        data = {
            "id": id,
            "doc": json.dumps(doc.to_json(), indent=2),
            "vector": json.dumps(vector_list),
            "viz_svg_ent": displacy.render(doc, style="ent"),
            "viz_svg_dep": displacy.render(doc, style="dep"),
        }
        cur.execute(
            """INSERT INTO sentence_anal (`id`, `doc`, `vector`, `viz_svg_ent`, `viz_svg_dep`)
            VALUES (%s, %s, vec_fromtext(%s),  %s, %s)""",
            (
                data["id"],
                data["doc"],
                data["vector"],
                data["viz_svg_ent"],
                data["viz_svg_dep"],
            ),
        )
        return id
