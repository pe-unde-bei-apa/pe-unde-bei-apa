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
)
from website.index_manticore import fuzzy_search
from website.services.llm_chat import chat_with_llm
from website.services.generator import generate_creative_sentence
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

    results = fuzzy_search("sentence", query)[:3]
    if not results:
        return {"suggestions": []}

    sentences = select_sentences([r["id"] for r in results])
    id_to_text = {s["id"]: s["text"] for s in sentences}

    suggestions = [
        {"id": r["id"], "text": id_to_text.get(r["id"])}
        for r in results
        if r["id"] in id_to_text
    ]
    return {"suggestions": suggestions}


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
