import os
import spacy
import json
from spacy import displacy
nlp = spacy.load('ro_core_news_lg')
from website.database import APP_DB, db_connect, IntegrityError


def add_sentence(text):
    with db_connect(APP_DB) as cur:
        try:
            cur.execute(
                "INSERT INTO sentence(text) VALUES (%s)",
                (text,)
            )
        except IntegrityError:
            print("skip duplicate: ", text)
            return
        id = cur.lastrowid


        doc = nlp(text)
        data = {
            "id": id,
            "doc": json.dumps(doc.to_json(), indent=2),
            "vector": json.dumps([float(f) for f in doc.vector.tolist()]),        "viz_svg_ent":  displacy.render(doc, style='ent'),
            "viz_svg_dep": displacy.render(doc, style='dep')
        }
        cur.execute(
            """INSERT INTO sentence_anal (`id`, `doc`, `vector`, `viz_svg_ent`, `viz_svg_dep`)
            VALUES (%s, %s, vec_fromtext(%s),  %s, %s)""",
            (
                data['id'],
                data['doc'],
                data['vector'],
                data['viz_svg_ent'],
                data['viz_svg_dep'],
            )
        )
