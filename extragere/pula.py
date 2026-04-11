import sys
import os
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
import re

# Ensure we can import from the root directory if run directly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from website.database import db_connect, APP_DB

# Core Client Configuration
# Base URL for the friend's hosted Ollama/AI server
client = OpenAI(base_url="http://10.200.200.1:11434", api_key="pula")

# Set the AI model name here (e.g., 'llama3' or 'gemma')
MODEL_NAME = "nume-model-tovaras"

# --- Extraction Configuration ---
# Mapping of domain keywords to their specific content containers
SITE_CONFIG = {
    "versuri.ro": {"selector": "div.textdiv"},
    "genius.com": {"selector": "div[class^='Lyrics__Container'], .lyrics"},
    "letras.mus.br": {"selector": "div.cnt-letra"},
    "azlyrics.com": {
        "selector": "div.main-page div.row div.col-xs-12 div:not([class])"
    },
    # Added forum and blog selectors
    "reddit.com": {"selector": "div[data-test-id='post-content'], .RichTextJSON-root"},
    "tpu.ro": {"selector": ".intrebare-txt, .raspuns-txt"},
    "blogspot.com": {"selector": ".post-body, .entry-content"},
    "wordpress.com": {"selector": ".entry-content, .post-content"},
    "softpedia.com": {"selector": ".post_block"},
}


# Elements to remove during generic cleaning
NOISE_ELEMENTS = [
    "script",
    "style",
    "nav",
    "footer",
    "header",
    "aside",
    "form",
    "iframe",
    "button",
]


def is_romanian(text):
    """
    Checks if a given string is likely written in Romanian.
    Looks for specific characters (ă, â, î, ș, ț) and common stopwords.
    """
    if not text:
        return False

    # 1. Romanian special characters (diacritics)
    # Note: Modern Romanian uses ș and ț (comma), though s-cedilla and t-cedilla are still common.
    romanian_chars = r"[ăâîșțȘȚĂÂÎ]"
    if re.search(romanian_chars, text):
        return True

    # 2. Heuristic check: Top 5 common Romanian words
    common_words = [r"\bși\b", r"\bestis\b", r"\bcare\b", r"\bsunt\b", r"\bpentru\b"]
    for word_regex in common_words:
        if re.search(word_regex, text, re.IGNORECASE):
            return True

    return False


def is_vanilla(text):
    """
    Heuristic check to detect dictionary entries, clinical medical articles,
    or conjugation/pluralization tables.
    """
    if not text:
        return False

    # Dictionary and Utility markers (often in tables or repeated headers)
    dictionary_markers = [
        r"Etimologie:",
        r"Sinonime:",
        r"Definiție:",
        r"DEX - Dicționarul explicativ",
        r"s\.f\.",
        r"s\.m\.",
        r"adj\.",
        r"pl\.",
        r"Conjugare",
        r"Declonare",
        r"plural:",
        r"singular:",
        r"articulat:",
    ]
    clinical_markers = [
        r"Simptome și tratament",
        r"Diagnostic:",
        r"Cauze:",
        r"Prevenție:",
        r"Sfatul medicului",
        r"Clinica",
        r"Tratarea cauzelor",
        r"Ghidul pacientului",
    ]

    matches = 0
    # Lowercase text for better case-insensitive matching if needed,
    # but some markers like 's.f.' are very specific.
    for marker in dictionary_markers + clinical_markers:
        if re.search(marker, text, re.IGNORECASE):
            matches += 1

    # If we find 3 or more markers, it's very likely a formal/clinical/dictionary source
    return matches >= 3


def get_web_content(url, min_length=500):
    """
    Highly agnostic web content extractor.
    Identifies main text blocks and filters out noise.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        content = None

        # 1. Specialized extraction based on known domains
        for domain, config in SITE_CONFIG.items():
            if domain in url:
                selector = config.get("selector")
                container = soup.select_one(selector)
                if container:
                    content = container.get_text(separator="\n", strip=True)
                    break

        # 2. Heuristic extraction for unknown sites
        if not content:
            common_selectors = [
                ".post-content",
                ".entry-content",
                ".article-body",
                "#post-message",
                ".post_message",
                "#main-content",
                "article",
            ]
            for selector in common_selectors:
                container = soup.select_one(selector)
                if container:
                    content = container.get_text(separator="\n", strip=True)
                    break

        # 3. Final Fallback: Aggressive Cleaning
        if not content:
            for element in soup(NOISE_ELEMENTS):
                element.decompose()
            content = soup.get_text(separator="\n", strip=True)

        # 4. Content Quality & Language & Length Filtering
        if content:
            if len(content) < min_length:
                print(
                    f"  Skipping URL (Content too short: {len(content)} chars): {url}"
                )
                return None
            if not is_romanian(content):
                print(f"  Skipping URL (Non-Romanian or lacks diacritics): {url}")
                return None
            if is_vanilla(content):
                print(f"  Skipping URL (Vanilla source / Dictionary / Medical): {url}")
                return None

        return content

    except Exception as e:
        print(f"Error fetching content from {url}: {e}")
        return None


def extract_injuraturi(url, content=None, keyword=None):
    """
    Uses AI to extract strictly Romanian swear words/insults from the content.
    Includes a synonym-tracing mechanism and a secondary double-check layer.
    """
    raw_text = content if content else get_web_content(url)
    if not raw_text:
        return []

    # Validation: Exact Word Match
    if keyword:
        pattern = rf"\b{re.escape(keyword)}\b"
        if not re.search(pattern, raw_text, re.IGNORECASE):
            print(f"  Skipping URL (Keyword '{keyword}' not found as full word): {url}")
            return []

    print(f"--- Extracting from: {url} ---")
    try:
        # Prompt includes "2-instance" tracing and strict Romanian constraint
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": """
            Scopul tau este sa extragi DOAR injuraturile in limba romana.
            RETINE URMATOARELE REGULI STRICTE:
            1. Extrage DOAR injuraturile (limbaj natural, vulgar, rants). Ignora orice text clinic, medical, formal sau utilitar.
            2. IGNORA orice cuvant care nu este in limba romana (ex: fuck, shit).
            3. Daca un cuvant este un sinonim nou sau argou (slang), poti sa il sugerezi DOAR daca gasesti cel putin 2 exemple/instante separate din textul sursa unde este folosit clar ca o injuratura. Daca ai mai putin de 2 instante, il ignori.
            4. Inainte de a furniza raspunsul, dublu-verifica fiecare cuvant. Daca nu esti sigur ca este o injuratura in context romanesc, IGNORA-L.
            Include in raspuns doar lista de injuraturi gasite (una pe linie).
            """,
                },
                {"role": "user", "content": f"Sursa: {url}\nText:\n{raw_text}"},
            ],
            temperature=1.0,
        )
        sentences = [
            s.strip()
            for s in response.choices[0].message.content.split("\n")
            if s.strip()
        ]

        # --- SECONDARY DOUBLE-CHECK LAYER ---
        # We verify each sentence/word with a more focused "Swear Word Check"
        verified_sentences = []
        for s in sentences:
            # We skip long prose if the AI accidentally included context
            if len(s) > 200:
                continue

            # Secondary check: Is this a Romanian swear word?
            check_response = client.chat.completions.create(
                model=MODEL_NAME,
                messages=[
                    {
                        "role": "system",
                        "content": "Raspunde doar cu 'DA' sau 'NU'. Acest text este o injuratura in limba romana? Ignora orice altceva.",
                    },
                    {"role": "user", "content": s},
                ],
                max_tokens=10,
                temperature=0.0,
            )
            is_valid = "DA" in check_response.choices[0].message.content.upper()

            if is_valid:
                verified_sentences.append(s)
            else:
                print(f"  Discarded by double-check: {s}")

        return verified_sentences

    except Exception as e:
        print(f"Error extracting injuraturi: {e}")
        return []


def save_to_db(url, sentences):
    """Saves extracted sentences to the database and maps them to the URL."""
    if not sentences:
        return

    cursor = db_connect(APP_DB)
    try:
        saved_count = 0
        for text in sentences:
            # 1. Insert into 'sentence' table (ignores if text already exists)
            sql_sentence = "INSERT IGNORE INTO sentence (text) VALUES (%s)"
            cursor.execute(sql_sentence, (text,))

            # 2. Get the ID
            sql_id = "SELECT id FROM sentence WHERE text = %s"
            cursor.execute(sql_id, (text,))
            result = cursor.fetchone()

            if result:
                sentence_id = result[0]
                # 3. Map the URL to this sentence
                # We use INSERT IGNORE to handle cases where some mappings might already exist
                sql_mapping = "INSERT IGNORE INTO url_injuraturi (url, sentence_id) VALUES (%s, %s)"
                cursor.execute(sql_mapping, (url, sentence_id))
                saved_count += 1

        if saved_count > 0:
            print(
                f"Successfully processed and saved {saved_count} sentences for: {url}"
            )
    except Exception as e:
        print(f"Database error for {url}: {e}")
        # If we failed here, the next run will try again because is_url_processed
        # might not find any results if the mapping insert failed.
    finally:
        cursor.close()


def is_url_processed(url):
    """Checks if a URL has already been processed in the database."""
    cursor = db_connect(APP_DB)
    try:
        # Check if we have any mappings for this URL
        sql = "SELECT 1 FROM url_injuraturi WHERE url = %s LIMIT 1"
        cursor.execute(sql, (url,))
        result = cursor.fetchone()
        return result is not None
    except Exception as e:
        print(f"Error checking database for URL {url}: {e}")
        return False
    finally:
        cursor.close()


def run_extraction(urls):
    """Processes a list of URLs one by one, skipping those already in the DB."""
    for url in urls:
        if is_url_processed(url):
            print(f"--- Skipping (Already in Database): {url} ---")
            continue

        sentences = extract_injuraturi(url)
        if sentences:
            save_to_db(url, sentences)
        else:
            print(f"No sentences found for: {url}")


if __name__ == "__main__":
    # File containing URLs (one per line)
    urls_file = "injuraturi_urls.txt"
    input_urls = []

    # 1. Try reading from file first
    if os.path.exists(urls_file):
        with open(urls_file, "r") as f:
            input_urls = [line.strip() for line in f if line.strip()]
        print(f"Read {len(input_urls)} URLs from {urls_file}")

    # 2. If file doesn't exist or is empty, try CLI arguments
    if not input_urls and len(sys.argv) > 1:
        input_urls = sys.argv[1:]

    # 3. Fallback to a default example list if nothing else is provided
    if not input_urls:
        input_urls = [
            "https://genius.com/Vocea-bagabontilor-atat-s-a-putut-lyrics",
        ]

    if not input_urls:
        print(
            "Please provide at least one URL in injuraturi_urls.txt or via command line."
        )
    else:
        run_extraction(input_urls)
