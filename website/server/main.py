from flask import url_for
from flask import redirect
from flask import Flask, render_template, request
from website.db_select import (
    select_all_sentences,
    select_sentences,
    select_audio_bytes,
    get_word_data,
    record_like,
    select_all_sentences_scored,
    select_dex_definitions_list,
    select_dex_entry_definitions,
    select_dictionary_definitions,
)
import markdown
from website.index_manticore import fuzzy_search
from website.services.llm_chat import chat_with_llm
from website.services.generator import generate_creative_sentence
from website.services.vector_search import vector_search_query
from website.add_sentence import add_sentence
from website.database import db_connect, APP_DB
import json

app = Flask(__name__)


@app.route("/")
def index():
    return redirect(url_for("reels"))


@app.route("/all_sentences")
def all_sentences():
    query = request.args.get("q", "")
    if query:
        results = fuzzy_search("sentence", query)
        map = {r["id"]: r["high"] for r in results}
        sentences = select_sentences([r["id"] for r in results])
        for s in sentences:
            s["high"] = map[s["id"]]
    else:
        sentences = select_all_sentences()
    return render_template("all_sentences.html", sentences=sentences, query=query)


@app.route("/generate", methods=["GET", "POST"])
def generate():
    keywords = ""
    output = ""
    examples = []
    if request.method == "POST":
        keywords = request.form.get("keywords", "")
        if keywords:
            # 1. Get style examples from Manticore
            search_results = fuzzy_search("sentence", keywords)
            if not search_results:
                # Fallback to some random sentences if no fuzzy match
                sentences_data = select_all_sentences()
                import random

                examples = [
                    s["text"]
                    for s in random.sample(sentences_data, min(len(sentences_data), 5))
                ]
            else:
                ids = [r["id"] for r in search_results[:20]]
                sentences_data = select_sentences(ids)
                examples = [s["text"] for s in sentences_data]

            # 2. Generate
            try:
                output = generate_creative_sentence(keywords, examples)
            except Exception as e:
                output = f"Error: {str(e)}"

    return render_template("generate.html", keywords=keywords, output=output)


@app.route("/reels")
def reels():
    sentences = select_all_sentences_scored()
    return render_template("reels.html", sentences=sentences)


@app.route("/like/<int:id>", methods=["POST"])
def like(id):
    record_like(id, 1)
    return {"status": "ok"}


@app.route("/unlike/<int:id>", methods=["POST"])
def unlike(id):
    record_like(id, -1)
    return {"status": "ok"}


@app.route("/sentence/<id>")
def sentence(id):
    sentences = select_sentences([id])
    if sentences:
        doc_json = json.loads(sentences[0]["doc"])
        words_data = []
        for token in doc_json.get("tokens", []):
            # word = text[token['start']:token['end']]
            lemma = token.get("lemma", "")
            words_data.append(get_word_data(lemma))
        return render_template(
            "sentence.html", sentences=sentences, words_data=words_data
        )
    return render_template("sentence.html", sentences=[], words_data=[])


@app.route("/audio/<id>")
def get_audio(id):
    import io
    from flask import send_file

    audio_bytes = select_audio_bytes(id)
    return send_file(io.BytesIO(audio_bytes), mimetype="audio/mpeg")


@app.route("/vectorsearch")
def vectorsearch():
    from website.services.vector_search import vector_search_query

    query = request.args.get("q", "")
    model = request.args.get("model", "spacy")
    if query:
        results = vector_search_query(query, model=model)
    else:
        results = []
    return render_template(
        "vectorsearch.html", results=results, query=query, model=model
    )


@app.route("/chat", methods=["GET", "POST"])
def chat():
    prompt = ""
    output = ""
    if request.method == "POST":
        prompt = request.form.get("prompt", "")
        if prompt:
            try:
                output = chat_with_llm(prompt)
            except Exception as e:
                output = f"Error: {str(e)}"
    return render_template("chat.html", prompt=prompt, output=output)


@app.route("/api/suggest")
def api_suggest():
    query = request.args.get("q", "")
    if not query:
        return {"suggestions": []}

    # Switch to vector search for better semantic matching
    results = vector_search_query(query, model="spacy", top_k=3)
    if not results:
        return {"suggestions": []}

    suggestions = [{"id": r["id"], "text": r["text"]} for r in results]
    return {"suggestions": suggestions}


@app.route("/api/upload_sentence", methods=["POST"])
def api_upload_sentence():
    text = request.form.get("text")
    audio_file = request.files.get("audio")

    if not text or not audio_file:
        return {"error": "Missing text or audio"}, 400

    # 1. Add sentence and get ID
    new_id = add_sentence(text, origin="upload")
    if not new_id:
        return {"error": "Failed to create or find sentence ID"}, 500

    # 2. Save audio blob (REPLACE to handle existing entries)
    audio_bytes = audio_file.read()
    with db_connect(APP_DB) as cur:
        cur.execute(
            "REPLACE INTO sentence_audiogen (id, audio_mp3) VALUES (%s, %s)",
            (new_id, audio_bytes),
        )

    return {"id": new_id, "text": text}


@app.route("/dex/")
def dex_list():
    page = request.args.get("page", 1, type=int)
    limit = 1000
    rows = select_dex_definitions_list(page=page, limit=limit)

    grouped_entries = {}
    for row in rows:
        eid = row["dex_entry_id"]
        if eid not in grouped_entries:
            grouped_entries[eid] = {
                "dex_entry_id": eid,
                "dex_entry_desc": row["dex_entry_desc"],
                "word_freq": row["word_freq"],
                "definition_count": 0,
                "sources": set(),
            }
        grouped_entries[eid]["definition_count"] += 1
        if row["source"]:
            grouped_entries[eid]["sources"].add(row["source"])

    entries = []
    for data in grouped_entries.values():
        data["dictionaries"] = ", ".join(sorted(list(data["sources"])))
        entries.append(data)

    has_next = len(rows) == limit
    return render_template(
        "dex_list.html", entries=entries, page=page, has_next=has_next
    )


@app.route("/dex/<int:dex_entry_id>")
def dex_entry(dex_entry_id):
    definitions = select_dex_entry_definitions(dex_entry_id)
    if not definitions:
        return "Entry not found or not yet parsed", 404

    for d in definitions:
        if d.get("txt"):
            d["html"] = markdown.markdown(d["txt"])

    entry_desc = definitions[0]["dex_entry_desc"]
    return render_template(
        "dex_entry.html",
        definitions=definitions,
        entry_desc=entry_desc,
        dex_entry_id=dex_entry_id,
    )


@app.route("/dexdictionary/<source_name>")
def dex_dictionary(source_name):
    definitions = select_dictionary_definitions(source_name, limit=100)
    if not definitions:
        return "Dictionary not found or empty", 404

    for d in definitions:
        if d.get("txt"):
            d["html"] = markdown.markdown(d["txt"])

    return render_template(
        "dex_dictionary_preview.html", definitions=definitions, source_name=source_name
    )


if __name__ == "__main__":
    import sys
    import os

    if sys.platform == "win32":
        # Gunicorn does not support Windows due to 'fcntl'
        app.run(host="0.0.0.0", port=5000, debug=os.getenv("DEBUG", "1") == "1")
    else:
        from gunicorn.app.base import BaseApplication

        class StandaloneApplication(BaseApplication):
            def __init__(self, app, options=None):
                self.options = options or {}
                self.application = app
                super().__init__()

            def load_config(self):
                config = {
                    key: value
                    for key, value in self.options.items()
                    if key in self.cfg.settings and value is not None
                }
                for key, value in config.items():
                    self.cfg.set(key.lower(), value)

            def load(self):
                return self.application

        options = {
            "bind": "0.0.0.0:5000",
            "workers": 1,
        }
        StandaloneApplication(app, options).run()
