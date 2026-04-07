import requests
import sys
import os
import time
from bs4 import BeautifulSoup
from urllib.parse import unquote

# Ensure we can import from the root directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from website.database import db_connect, DEXONLINE_DB
from extragere.pula import (
    get_web_content,
    extract_injuraturi,
    save_to_db,
    is_url_processed,
)

import random
import re

# --- Configuration ---
WORD_COLUMN = "description"
RESULTS_PER_KEYWORD = 8
SEARCH_CONTEXT = "romania"
# Minimized negative filters to avoid 403 Forbidden
NEGATIVE_CONTEXT = "-dexonline -sanatate"
POSITIVE_CONTEXT = "forum blog"

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/119.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/118.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/119.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
]

BLACKLISTED_DOMAINS = [
    "dexonline.ro",
    "dexonline.net",
    "dictionarroman.ro",
    "wiktionary.org",
    "reverso.net",
    "dozadesanatate.ro",
    "sfatulmedicului.ro",
    "reginamaria.ro",
    "medlife.ro",
    "somaclinic.ro",
    "mdrl.ro",
    "carezone.ro",
    "dex.md",
    "wordreference.com",
    "cooljugator.com",
    "pluralul.ro",
    "dictionar.ro",
    "bab.la",
    "glosbe.com",
    "qdictionar.com",
    "archeus.ro",
    "plural.ro",
]


def clean_keyword(kw):
    """
    Removes grammatical markers like '(s.f.)', '(vb.)', etc.
    """
    cleaned = re.sub(r"\(.*?\)", "", kw)
    return cleaned.strip()


def fetch_adult_keywords():
    """Retrieves words marked with adult=1 from DEXONLINE."""
    print("Fetching adult keywords from DEXONLINE...")
    cursor = db_connect(DEXONLINE_DB)
    try:
        sql = f"SELECT {WORD_COLUMN} FROM Entry WHERE adult = 1"
        cursor.execute(sql)
        words = [row[0] for row in cursor.fetchall() if row[0]]
        return words
    except Exception as e:
        print(f"Error fetching keywords: {e}")
        return []
    finally:
        cursor.close()


def search_global(query, limit=RESULTS_PER_KEYWORD):
    """
    Searches DuckDuckGo Lite for Romanian results.
    Includes exponential back-off retry and User-Agent rotation.
    """
    search_url = "https://lite.duckduckgo.com/lite/"
    full_query = f'"{query}" {SEARCH_CONTEXT} {NEGATIVE_CONTEXT} {POSITIVE_CONTEXT}'
    params = {"q": full_query}

    max_retries = 3
    for attempt in range(max_retries):
        headers = {"User-Agent": random.choice(USER_AGENTS)}
        try:
            # Increased timeout to 30s as per the error logs showing read timeouts
            response = requests.post(
                search_url, data=params, headers=headers, timeout=30
            )

            if response.status_code == 403:
                print(
                    f"  Warning: 403 Forbidden on attempt {attempt + 1}. Cooldown triggering..."
                )
                return "COOLDOWN"

            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")

            urls = []
            for link in soup.find_all("a", class_="result-link"):
                href = link.get("href")
                if href:
                    if "uddg=" in href:
                        actual_url = unquote(href.split("uddg=")[1].split("&")[0])
                        urls.append(actual_url)
                    else:
                        urls.append(href)

                if len(urls) >= limit:
                    break

            return list(set(urls))

        except (requests.exceptions.RequestException, requests.exceptions.Timeout) as e:
            wait_time = (2**attempt) * 10  # 10s, 20s, 40s
            print(
                f"  Search error (Attempt {attempt + 1}/{max_retries}): {e}. Retrying in {wait_time}s..."
            )
            time.sleep(wait_time)

    print(f"  Failed to get results for '{query}' after {max_retries} attempts.")
    return []


def main():
    if len(sys.argv) > 1:
        keywords = sys.argv[1:]
    else:
        keywords = fetch_adult_keywords()

    # Shuffle to ensure domain variety throughout the long run
    random.shuffle(keywords)

    print(f"Starting Refined Batch Orchestrator for {len(keywords)} keywords.")

    for raw_kw in keywords:
        kw = clean_keyword(raw_kw)
        if not kw:
            continue

        print(f"\n--- Processing Keyword: {kw} (Original: {raw_kw}) ---")
        found_urls = search_global(kw)

        if found_urls == "COOLDOWN":
            print("  Rate limit hit. Waiting 60 seconds...")
            time.sleep(60)
            continue

        if not found_urls:
            print(f"  No results found for '{kw}'.")
            continue

        print(f"  Found {len(found_urls)} potential URLs. Starting validation...")

        for url in found_urls:
            # 1. Skip if domain is blacklisted (medical/dictionary)
            if any(domain in url for domain in BLACKLISTED_DOMAINS):
                print(f"  Skipping (Blacklisted Domain): {url}")
                continue

            # 2. Skip if already processed in DB
            if is_url_processed(url):
                print(f"  Skipping (Already in DB): {url}")
                continue

            # 3. Fetch content with length & language filter
            content = get_web_content(url)
            if not content:
                continue

            # 3. Extract with AI (includes keyword-in-text validation)
            sentences = extract_injuraturi(url, content, keyword=kw)

            # 4. Save to DB
            if sentences:
                save_to_db(url, sentences)
            else:
                print(f"  No strictly verified sentences for: {url}")

            # Randomized delay between URLs (human-like behavior)
            time.sleep(random.uniform(2, 5))

        # Randomized delay between keywords
        delay = random.uniform(5, 12)
        print(f"--- Waiting {delay:.1f}s before next keyword ---")
        time.sleep(delay)

    print("\n--- Orchestration Finished ---")


if __name__ == "__main__":
    main()
