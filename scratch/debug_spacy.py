import spacy
import json

nlp = spacy.load("ro_core_news_sm")
word = "mergeti"
doc = nlp(word)
print(json.dumps(doc.to_json(), indent=2))
