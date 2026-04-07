import random
import spacy
import re
import os

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
    from rowordnet import RoWordNet, Synset
    wn = RoWordNet()
except Exception as e:
    print(f"Error loading rowordnet: {e}")
    wn = None

def get_synonym(word, pos, context_doc=None, target_token=None):
    """
    Retrieves a synonym for a word, optionally scoring candidates 
    based on the provided context (SpaCy Doc).
    """
    if not wn:
        return None

    # Blacklist of small/function words that shouldn't be replaced with synonyms
    BLACKLIST = {"mai", "foarte", "tot", "fost", "este", "sunt", "este", "cel", "cea", "cei", "cele", "unde", "când", "cum","pula"}
    if word.lower() in BLACKLIST or len(word) < 2:
        reason = "blacklisted" if word.lower() in BLACKLIST else "too short"
        print(f"[DEBUG] Skipping word '{word}' ({pos}): {reason}")
        return None

    try:
        # Map Spacy POS to WordNet POS Enumeration
        pos_map = {
            "NOUN": Synset.Pos.NOUN, 
            "VERB": Synset.Pos.VERB, 
            "ADJ": Synset.Pos.ADJECTIVE, 
            "ADV": Synset.Pos.ADVERB
        }
        wn_pos = pos_map.get(pos)
        
        # WordNet lookup
        wn_pos_str = str(wn_pos) if wn_pos else "NONE"
        print(f"[DEBUG] querying WordNet for '{word}' with POS {wn_pos_str}")
        
        synsets = wn.synsets(word, pos=wn_pos) if wn_pos else wn.synsets(word)
        if not synsets:
            print(f"[DEBUG]   Found 0 synsets for '{word}' ({wn_pos_str})")
            return None
        
        print(f"[DEBUG]   Found {len(synsets)} synsets for '{word}'")
        
        # Collect all unique literals from all matching synsets
        candidate_literals = set()
        for syn_id in synsets:
            syn = wn.synset(syn_id)
            for lit in syn.literals:
                clean_lit = lit.replace("_", " ")
                # Advanced filters:
                # 1. No self-replacement (exact or substring to avoid "gât" -> "gât sucit")
                # 2. Skip synonyms that are just definitions (too many words)
                # 3. Skip synonyms with weird characters
                word_lower = word.lower()
                clean_lit_lower = clean_lit.lower()
                
                if (clean_lit_lower != word_lower and 
                    word_lower not in clean_lit_lower and 
                    clean_lit_lower not in word_lower and
                    len(clean_lit.split()) <= 2 and 
                    "[" not in clean_lit):
                    candidate_literals.add(clean_lit)
        
        if candidate_literals:
            print(f"[DEBUG]   Candidates for '{word}': {candidate_literals}")
        else:
            print(f"[DEBUG]   No valid candidates found for '{word}' after filtering.")
            return None
            
        # Context-aware selection if possible
        if context_doc and target_token and nlp and nlp.vocab.has_vector:
            # Use Local Context (words within a window of 5) for better accuracy
            window_size = 5
            start_idx = max(0, target_token.i - window_size)
            end_idx = min(len(context_doc), target_token.i + window_size + 1)
            
            context_tokens = [
                context_doc[i] for i in range(start_idx, end_idx) 
                if i != target_token.i and not context_doc[i].is_stop and context_doc[i].vector_norm > 0
            ]
            
            if context_tokens:
                import numpy as np
                context_vec = np.mean([t.vector for t in context_tokens], axis=0)
                context_norm = np.linalg.norm(context_vec)
                
                target_vec = target_token.vector
                target_norm = np.linalg.norm(target_vec)
                
                best_score = -1.0
                best_syn = None
                
                for cand in candidate_literals:
                    cand_doc = nlp(cand)
                    if cand_doc and cand_doc.vector_norm > 0:
                        cand_vec = cand_doc.vector
                        cand_norm = cand_doc.vector_norm
                        
                        # Cosine similarity to the context average vector
                        cos_sim_context = np.dot(cand_vec, context_vec) / (cand_norm * context_norm + 1e-9)
                        
                        # Similarity to the original token
                        cos_sim_orig = np.dot(cand_vec, target_vec) / (cand_norm * target_norm + 1e-9)
                        
                        # Adjusted weights: trust the synonym meaning more, use context for slight bias
                        score = 0.4 * cos_sim_context + 0.6 * cos_sim_orig
                        
                        # Debug: show individual candidate scores
                        print(f"[DEBUG]     Candidate '{cand}': context_sim={cos_sim_context:.3f}, meaning_sim={cos_sim_orig:.3f}, total={score:.3f}")
                        
                        if score > best_score:
                            best_score = score
                            best_syn = cand
            else:
                print(f"[DEBUG]   Could not calculate context vector for '{word}' (no surrounding tokens have vectors)")
        
        # 3. Fallback: if no semantic score could be calculated (e.g. missing vectors or low coverage), 
        # but we have literals, just pick one at random so we at least have a candidate.
        if not best_syn and candidate_literals:
            best_syn = random.choice(list(candidate_literals))
            best_score = 0.0 # Indicate it's a random/non-vetted choice
            print(f"[DEBUG] Falling back to random synonym for '{word}': '{best_syn}' (vectors unavailable or scoring failed)")

        # Minimum Threshold for Replacement Quality (only for scored synonyms)
        THRESHOLD = 0.3 
        if best_syn and (best_score >= THRESHOLD or best_score == 0.0):
            print(f"[DEBUG] Best candidate for '{word}': '{best_syn}' (score: {best_score:.3f})")
            return best_syn
        elif best_syn:
            print(f"[DEBUG] Rejected synonym '{best_syn}' for word '{word}' due to low score {best_score:.3f}")

        # Fallback: if no vectors or no synonym met threshold, just return nothing
        # (It's better to keep the original word than to use a bad synonym)
        return None
    except Exception as e:
        print(f"[DEBUG] Error in context-aware synonym: {e}")
        pass
    return None

def apply_agreement(synonym_lemma, original_token):
    """
    Improved Morphological Agreement using Suffix Mapping.
    Detects how the original word was formed from its lemma and 
    projects that change onto the synonym.
    """
    orig_text = original_token.text.lower()
    orig_lemma = original_token.lemma_.lower()
    
    # If original word is exactly its lemma (no inflection), just return synonym lemma
    if orig_text == orig_lemma:
        return synonym_lemma

    # 1. Special case: Verb Participles (very common and often irregular)
    # e.g. "înțepată" (orig_text) from "înțepa" (orig_lemma)
    if original_token.pos_ == "VERB" and original_token.morph.get("VerbForm") == ["Part"]:
        # If the synonym is currently just a lemma, try to make it a participle
        # Handle the 4 Romanian verb conjugations
        root = synonym_lemma
        if root.endswith("a"): root = root + "t"
        elif root.endswith("i"): root = root + "t"
        elif root.endswith("î"): root = root + "t"
        elif root.endswith("e"):
            # 3rd conj is tricky: "învinge" -> "învins", "face" -> "făcut"
            # We'll try to find a pattern or use "ut" as a safe fallback
            if root.endswith("nge"): root = root[:-3] + "ns"
            elif root.endswith("ce"): root = root[:-2] + "pt" # e.g. "coace" -> "copt" (rough)
            else: root = root + "ut"
        
        # Now apply gender/number from original to the newly formed participle root
        gender = original_token.morph.get("Gender")
        number = original_token.morph.get("Number")
        if gender == ["Fem"] and number == ["Sing"]:
            return root + "ă"
        elif gender == ["Fem"] and number == ["Plur"]:
            return root + "e"
        elif gender == ["Masc"] and number == ["Plur"]:
            return root + "i"
        return root

    # 2. General Suffix Mapping (for Articles, Plurals, Adjectives)
    # Find what was added/changed in the original
    # We look for common Romanian suffixes
    suffixes = [
        ("ul", "ul"), ("a", "a"), ("le", "le"), ("lor", "lor"), # Articles
        ("lor", "lor"), ("ului", "ului"), ("ei", "ei"),        # Genitive/Dative
        ("i", "i"), ("e", "e"), ("uri", "uri")                 # Plurals
    ]
    
    for morph_suff, text_suff in suffixes:
        if orig_text.endswith(text_suff):
            # We must use the SYNONYM'S gender to decide the article form (ul vs a)
            syn_doc = nlp(synonym_lemma)
            syn_gender = syn_doc[0].morph.get("Gender") if syn_doc else []
            
            # Simple heuristic for gender if SpaCy fails
            if not syn_gender:
                if synonym_lemma.endswith(("ă", "e", "ea")): syn_gender = ["Fem"]
                else: syn_gender = ["Masc"]

            if synonym_lemma.endswith("e"):
                if text_suff == "a": return synonym_lemma[:-1] + "ea"
                return synonym_lemma + text_suff
            elif synonym_lemma.endswith("ă"):
                if text_suff == "a": return synonym_lemma[:-1] + "a"
                return synonym_lemma + text_suff
            else:
                # Consonant ending (e.g. "omăt", "burdihan")
                if text_suff == "a": 
                    return synonym_lemma + "ul" if syn_gender == ["Masc"] or syn_gender == ["Neut"] else synonym_lemma + "a"
                return synonym_lemma + text_suff

    return synonym_lemma

def generate_creative_sentence(keywords, examples, **kwargs) -> str:
    """
    Generates a new sentence by 'remixing' existing ones with provided keywords.
    Does NOT require an LLM.
    """
    if not examples:
        return f"N-am găsit exemple pentru stil, dar uite cuvintele tale: {keywords}"

    if not nlp:
        # Fallback if spaCy is missing: just append keywords to a random example
        return f"{random.choice(examples)} (plus special pt tine: {keywords})"    # 1. Prepare keywords (not used for insertion anymore, only for fuzzy search in main.py)
    kw_words = [k.strip() for k in re.split(r'[,; ]+', keywords) if k.strip()]
    if not kw_words:
        return random.choice(examples) if examples else "N-am cuvinte."

    # General fallback templates to ensure variety
    GENERAL_TEMPLATES = [
        "Acolo am văzut un lucru interesant ieri.",
        "Nu se poate spune că totul este perfect aici.",
        "Vreau să plec cât mai repede în vacanță.",
        "Nimic nu se compară cu o zi liniștită la soare.",
        "Cineva a lăsat ușa deschisă la intrare.",
        "Mă gândeam să încerc ceva nou mâine dimineață.",
        "Este foarte greu să găsești un loc de parcare.",
        "Oamenii sunt mereu grăbiți în acest oraș mare.",
        "Cerul este senin și vântul bate ușor astăzi.",
        "Trebuie să fim atenți la detalii de fiecare dată.",
        "Am auzit că se va scumpi totul săptămâna viitoare.",
        "Nu uita să iei cheile când pleci de acasă.",
        "Oricine poate face asta dacă are puțină răbdare.",
        "Mâncarea de aici are un gust foarte ciudat.",
        "Uneori simt că timpul trece prea repede pe lângă noi.",
        "Aș vrea să știu unde este sursa acestui zgomot.",
        "Vino aici să îți arăt o poză foarte veche.",
        "Dacă aș fi știut, nu aș mai fi venit deloc.",
        "Fiecare moment contează atunci când ești fericit.",
        "Sper să ne întâlnim din nou în curând acolo."
    ]

    # 2. Pick a template sentence
    # We combine user-provided examples with our general reservoir for variety
    # But we prioritize examples that actually contain the keywords
    matching_examples = []
    for ex in examples:
        if any(kw.lower() in ex.lower() for kw in kw_words):
            matching_examples.append(ex)
            
    # If we have matches from the user examples, we prioritize those
    # Otherwise we use the full pool including general templates
    if matching_examples:
        available_examples = list(set(matching_examples))
    else:
        available_examples = list(set(list(examples) + GENERAL_TEMPLATES))
        
    random.shuffle(available_examples)
    
    # We try to pick one that isn't TOO short
    long_enough_examples = [e for e in available_examples if len(e.split()) > 4]
    template_text = random.choice(long_enough_examples if long_enough_examples else available_examples)
    print(f"[DEBUG] Chosen initial template: {template_text}")
    
    doc = nlp(template_text)
    
    # 3. Identify replacement slots grouped by POS
    slots_by_pos = {}
    for token in doc:
        # We target specific POS tags for replacement
        if token.pos_ in ["NOUN", "PROPN", "ADJ", "VERB", "ADV"] and len(token.text) > 2:
            if token.pos_ not in slots_by_pos:
                slots_by_pos[token.pos_] = []
            slots_by_pos[token.pos_].append(token.i)
    
    total_slots_count = sum(len(s) for s in slots_by_pos.values())
    print(f"[DEBUG] Identified {total_slots_count} potential slots in template: {template_text}")
    for pos, indices in slots_by_pos.items():
        print(f"[DEBUG]   - {pos}: {', '.join([doc[i].text for i in indices])}")
    
    # 4. Find potential replacements for variety (but don't apply them)
    replacements = {}
    
    # Flatten all slots and shuffle them
    all_slots = []
    for pos in slots_by_pos:
        all_slots.extend(slots_by_pos[pos])
    
    random.shuffle(all_slots)

    # We'll try to find synonyms for up to a few words
    max_synonyms = 5
    num_syn_found = 0
    
    for slot_idx in all_slots:
        if num_syn_found >= max_synonyms:
            break
            
        token = doc[slot_idx]
        
        # NEVER replace the keyword itself if it was in the template!
        if any(kw.lower() in token.text.lower() for kw in kw_words):
            continue
            
        # Use lemma for better synonym lookup
        word_to_lookup = token.lemma_.lower()
        syn = get_synonym(word_to_lookup, token.pos_, context_doc=doc, target_token=token)
        
        # If no synonym found with POS, try without POS constraint
        if not syn:
            syn = get_synonym(word_to_lookup, None, context_doc=doc, target_token=token)
            
        if syn:
            # Apply morphological agreement to match the original word's form
            inflected_syn = apply_agreement(syn, token)
            if inflected_syn != syn:
                print(f"[DEBUG]   Inflected '{syn}' -> '{inflected_syn}' to match original '{token.text}'")
                syn = inflected_syn
                
            replacements[slot_idx] = syn
            num_syn_found += 1

    # Log the summary of planned replacements for the user to see
    if replacements:
        summary_parts = [f"'{doc[i].text}' -> '{s}'" for i, s in replacements.items()]
        print(f"[DEBUG] PLANNED REPLACEMENTS SUMMARY: [{', '.join(summary_parts)}]")
    else:
        print("[DEBUG] No valid synonyms met the criteria for this template.")

    print(f"[DEBUG] Total potential replacements identified: {len(replacements)}")

    # Re-enable building the result with the replacements applied
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
