from website.database import db_connect, APP_DB, DEXONLINE_DB
from website.index_manticore import index_manticore, create_index_table


def select_all_sentences():
    with db_connect(APP_DB, dict=True) as cur:
        cur.execute(
            "SELECT * FROM sentence INNER JOIN sentence_anal ON sentence.id = sentence_anal.id"
        )
        rows = cur.fetchall()
        return rows


def select_sentences(ids):
    if not ids:
        return []

    with db_connect(APP_DB, dict=True) as cur:
        ss = ",".join("%s" for _i in ids)
        cur.execute(
            f"SELECT * FROM sentence INNER JOIN sentence_anal ON sentence.id = sentence_anal.id WHERE sentence.id IN ({ss})",
            tuple(ids),
        )
        rows = cur.fetchall()
        return rows


def select_audio_bytes(id):
    with db_connect(APP_DB) as cur:
        cur.execute("SELECT audio_mp3 FROM sentence_audiogen WHERE id = %s", (id,))
        return cur.fetchall()[0][0]


def get_dexonline_definitions(word):
    with db_connect(DEXONLINE_DB, dict=True) as cur:
        cur.execute(
            "SELECT * FROM Definition WHERE lexicon = %s LIMIT 10",
            ( word.lower()),
        )
        l = cur.fetchall()
        print("DEXONLINE HIT COUNT", len(l))
        print(l)
        return l


def get_wordnet_synsets(word):
    import rowordnet as rwn

    wn = rwn.RoWordNet()
    synset_ids = wn.synsets(literal=word)
    results = []
    for synset_id in synset_ids:
        synset = wn.synset(synset_id)
        results.append(
            {
                "id": synset.id,
                "literals": synset.literals,
                "definition": synset.definition,
                "pos": synset.pos.value
                if hasattr(synset.pos, "value")
                else str(synset.pos),
            }
        )
    print("WORDNET HOT COUNT", len(results))
    return results


def get_word_data(word):
    return {
        "word": word,
        "lemma": word,
        # "wordnet_synsets": get_wordnet_synsets(word),
        'wordnet_sysnets': [],
        "dexonline_definitions": get_dexonline_definitions(word),
    }
