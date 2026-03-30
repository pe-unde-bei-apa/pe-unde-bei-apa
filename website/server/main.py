from flask import Flask, render_template, request
from website.db_select import (
    select_all_sentences,
    select_sentences,
    select_audio_bytes,
    get_word_data,
)
from website.index_manticore import fuzzy_search
from website.services.vector_search import vector_search_query
from website.services.llm_chat import chat_with_llm
import json

app = Flask(__name__)


@app.route("/")
def index():
    query = request.args.get("q", "")
    if query:
        results = fuzzy_search("sentence", query)
        map = {r["id"]: r["high"] for r in results}
        sentences = select_sentences([r["id"] for r in results])
        for s in sentences:
            s["high"] = map[s["id"]]
    else:
        sentences = select_all_sentences()
    return render_template("index.html", sentences=sentences, query=query)


@app.route("/reels")
def reels():
    sentences = select_all_sentences()
    return render_template("reels.html", sentences=sentences)


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
    return select_audio_bytes(id)


@app.route("/vectorsearch")
def vectorsearch():
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


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
