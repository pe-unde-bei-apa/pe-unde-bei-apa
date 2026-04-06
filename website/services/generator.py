import random
import spacy
import re
import os
import rowordnet

# Load the Romanian model (it should already be installed)
# We disable components we don't need for speed
try:
    # Use a more minimal pipeline for efficiency
    # 'ner', 'textcat', and 'parser' are usually not needed for basic POS and lemmatization
    nlp = spacy.load("ro_core_news_lg", disable=["ner", "textcat", "parser"])
except Exception as e:
    print(f"Error loading spacy model in generator: {e}")
    nlp = None

# Load RoWordNet for synonyms
try:
    wn = rowordnet.RoWordNet()
except Exception as e:
    print(f"Error loading rowordnet: {e}")
    wn = None

def get_synonym(word, pos):
    """Retrieves a random synonym for a word from WordNet."""
    if not wn:
        return None
    try:
        # Map Spacy POS to WordNet POS if possible
        # RoWordNet uses 'n', 'v', 'a', 'r'
        pos_map = {"NOUN": "n", "VERB": "v", "ADJ": "a", "ADV": "r"}
        wn_pos = pos_map.get(pos)
        
        synsets = wn.synsets(word, pos=wn_pos) if wn_pos else wn.synsets(word)
        if not synsets:
            return None
        
        # Collect all unique literals from all synsets
        all_synonyms = []
        for syn_id in synsets:
            syn = wn.synset(syn_id)
            all_synonyms.extend(syn.literals)
        
        # Filter out the original word and duplicates
        clean_synonyms = list(set(s.replace("_", " ") for s in all_synonyms if s.lower() != word.lower()))
        if clean_synonyms:
            return random.choice(clean_synonyms)
    except:
        pass
    return None

def generate_creative_sentence(keywords, examples, **kwargs) -> str:
    """
    Generates a new sentence by 'remixing' existing ones with provided keywords.
    Does NOT require an LLM.
    """
    if not examples:
        return f"N-am găsit exemple pentru stil, dar uite cuvintele tale: {keywords}"

    if not nlp:
        # Fallback if spaCy is missing: just append keywords to a random example
        return f"{random.choice(examples)} (plus special pt tine: {keywords})"

    # 1. Prepare keywords and identify their POS tags
    # Split by common delimiters and filter empty strings
    kw_words = [k.strip() for k in re.split(r'[,; ]+', keywords) if k.strip()]
    if not kw_words:
        return random.choice(examples)

    # Tag each keyword to know its POS
    kw_data = []
    for k in kw_words:
        k_doc = nlp(k)
        if len(k_doc) > 0:
            kw_data.append({"text": k, "pos": k_doc[0].pos_})
        else:
            kw_data.append({"text": k, "pos": "NOUN"}) # Default fallback

    # 2. Pick a template sentence
    # We try to pick one that isn't TOO short
    long_enough_examples = [e for e in examples if len(e.split()) > 4]
    template_text = random.choice(long_enough_examples if long_enough_examples else examples)
    
    doc = nlp(template_text)
    
    # 3. Identify replacement slots grouped by POS
    # We target specific POS tags for replacement
    slots_by_pos = {}
    for token in doc:
        # We target specific POS tags for replacement
        if token.pos_ in ["NOUN", "PROPN", "ADJ", "VERB", "ADV"] and len(token.text) > 2:
            if token.pos_ not in slots_by_pos:
                slots_by_pos[token.pos_] = []
            slots_by_pos[token.pos_].append(token.i)
    
    total_slots = sum(len(s) for s in slots_by_pos.values())
    print(f"[DEBUG] Identified {total_slots} potential slots in template: {template_text}")
    
    if not total_slots:
        # Fallback: just append
        return f"{template_text} {keywords}"

    # 4. Perform replacements using ONLY synonyms (ignoring keywords for substitution)
    replacements = {}
    
    # Flatten all slots and shuffle them
    all_slots = []
    for pos in slots_by_pos:
        all_slots.extend(slots_by_pos[pos])
    random.shuffle(all_slots)

    # We'll try to replace up to 8 words with synonyms for maximum impact
    max_synonyms = 8
    num_replaced = 0
    
    for slot_idx in all_slots:
        if num_replaced >= max_synonyms:
            break
            
        token = doc[slot_idx]
        # Use lemma for better synonym lookup
        word_to_lookup = token.lemma_.lower()
        syn = get_synonym(word_to_lookup, token.pos_)
        
        # If no synonym found with POS, try without POS constraint
        if not syn:
            syn = get_synonym(word_to_lookup, None)
            
        if syn:
            replacements[slot_idx] = syn
            num_replaced += 1
            print(f"[DEBUG] Replaced '{token.text}' (lemma: {word_to_lookup}) with synonym: '{syn}'")

    print(f"[DEBUG] Performing {len(replacements)} synonym-only replacements based on lemmas.")
    
    output_parts = []
    for i, token in enumerate(doc):
        if i in replacements:
            new_word = replacements[i]
            # Try to match capitalization of the original word
            if token.text.istitle():
                new_word = new_word.capitalize()
            elif token.text.isupper():
                new_word = new_word.upper()
            output_parts.append(new_word + token.whitespace_)
        else:
            output_parts.append(token.text + token.whitespace_)
            
    result = "".join(output_parts).strip()
    return result

if __name__ == "__main__":
    test_keywords = "minge, maşină"
    test_examples = ["Vreau să cumpăr o mașină foarte mare și frumoasă."]
    print(f"Keywords: {test_keywords}")
    print(f"Example: {test_examples[0]}")
    print(f"Result: {generate_creative_sentence(test_keywords, test_examples)}")
