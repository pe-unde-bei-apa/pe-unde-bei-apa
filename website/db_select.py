from website.database import db_connect, APP_DB, DEXONLINE_DB


def select_all_sentences():
    with db_connect(APP_DB, dict=True) as cur:
        cur.execute(
            """
            SELECT * FROM sentence
            INNER JOIN sentence_anal
            ON sentence.id = sentence_anal.id
            INNER JOIN sentence_audiogen
            ON sentence.id = sentence_audiogen.id
            """
        )
        rows = cur.fetchall()
        import random

        random.shuffle(rows)
        return rows


def select_sentences(ids):
    if not ids:
        return []

    with db_connect(APP_DB, dict=True) as cur:
        ss = ",".join("%s" for _i in ids)
        cur.execute(
            f"""SELECT * FROM sentence 
            INNER JOIN sentence_anal 
            ON sentence.id = sentence_anal.id 
            WHERE sentence.id IN ({ss})""",
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
            (word.lower()),
        )
        lll = cur.fetchall()
        print("DEXONLINE HIT COUNT", len(lll))
        print(lll)
        return lll


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
        "wordnet_sysnets": [],
        "dexonline_definitions": get_dexonline_definitions(word),
    }


def record_like(sentence_id, action_type):
    """
    action_type: 1 for like, -1 for unlike/skip
    """
    with db_connect(APP_DB) as cur:
        cur.execute(
            "INSERT INTO sentence_likes (sentence_id, action_type) VALUES (%s, %s)",
            (sentence_id, action_type),
        )


def get_sentence_scores():
    with db_connect(APP_DB) as cur:
        cur.execute(
            """
            SELECT sentence_id, SUM(action_type) as score 
            FROM sentence_likes 
            GROUP BY sentence_id
            """
        )
        return {row[0]: row[1] for row in cur.fetchall()}


def select_all_sentences_scored():
    scores = get_sentence_scores()
    sentences = select_all_sentences()
    for s in sentences:
        s["score"] = float(scores.get(s["id"], 0))

    # TikTok-ish logic:
    # 1. Higher scores have higher probability of appearing higher
    # 2. Add some randomness so it's not strictly deterministic
    # 3. Penalize or boost based on recent activity (optional, but keep it simple for now)

    # Simple weighted selection:
    # We'll group them and sort basically, but let's try a better approach:
    # Sort by score + some random noise
    import random

    sentences.sort(key=lambda x: x["score"] + (random.random() * 2 - 1), reverse=True)

    return sentences
