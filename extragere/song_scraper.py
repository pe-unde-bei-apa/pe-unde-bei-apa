import requests
import sys
import os
import time
from bs4 import BeautifulSoup
from urllib.parse import unquote

# Ensure we can import from the root directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from website.database import db_connect, DEXONLINE_DB

# --- Configuration ---
WORD_COLUMN = "description" 
GENIUS_LYRICS_SEARCH_PAGES = 3 # Fetch up to ~60 lyric matches per keyword

def fetch_adult_keywords():
    """Retrieves words marked with adult=1 from DEXONLINE."""
    print(f"Fetching adult keywords from DEXONLINE...")
    cursor = db_connect(DEXONLINE_DB)
    try:
        sql = f"SELECT {WORD_COLUMN} FROM Entry WHERE adult = 1"
        cursor.execute(sql)
        words = [row[0] for row in cursor.fetchall() if row[0]]
        return words
    except Exception as e:
        print(f"Error fetching from DEXONLINE: {e}")
        return []
    finally:
        cursor.close()

def search_versuri_ro(query):
    """
    Searches for lyrics links on versuri.ro via DuckDuckGo Lite.
    Returns a list of unique song URLs.
    """
    search_url = "https://lite.duckduckgo.com/lite/"
    params = {"q": f"site:versuri.ro {query}"}
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.post(search_url, data=params, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        urls = []
        for link in soup.find_all('a', class_='result-link'):
            href = link.get('href')
            if href and "versuri.ro/versuri/" in href:
                if "uddg=" in href:
                    actual_url = unquote(href.split("uddg=")[1].split("&")[0])
                    if "versuri.ro/versuri/" in actual_url:
                        urls.append(actual_url)
                else:
                    urls.append(href)
        return list(set(urls))
    except Exception as e:
        print(f"Error searching Versuri.ro for '{query}': {e}")
        return []

def search_genius_lyrics(query, pages=GENIUS_LYRICS_SEARCH_PAGES):
    """
    Searches for lyrics links on Genius.com using their internal lyric-search API.
    Handles pagination to find deep lyric matches.
    """
    urls = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    for page in range(1, pages + 1):
        api_url = f"https://genius.com/api/search/lyric?q={query}&page={page}"
        try:
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()
            data = response.json()
            
            # The structure for lyric search hits is in response.sections[0].hits
            hits = data.get('response', {}).get('sections', [])[0].get('hits', [])
            
            if not hits:
                break # No more results
            
            for hit in hits:
                song_url = hit.get('result', {}).get('url')
                if song_url:
                    urls.append(song_url)
                    
            print(f"  Genius Page {page}: Found {len(hits)} lyric matches.")
            time.sleep(0.5) # Polite delay
            
        except Exception as e:
            print(f"Error searching Genius lyrics (page {page}) for '{query}': {e}")
            break
            
    return list(set(urls))

def save_new_urls(new_urls, filename="injuraturi_urls.txt"):
    """Saves new unique URLs to the list file."""
    existing_urls = set()
    if os.path.exists(filename):
        with open(filename, "r") as f:
            existing_urls = {line.strip() for line in f if line.strip()}
    
    added_count = 0
    with open(filename, "a") as f:
        for url in new_urls:
            if url not in existing_urls:
                f.write(url + "\n")
                # Add to memory map so we don't add the same URL from different searches in this run
                existing_urls.add(url)
                added_count += 1
    return added_count

def main():
    if len(sys.argv) > 1:
        keywords = sys.argv[1:]
    else:
        keywords = fetch_adult_keywords() or ["pula", "muie"]

    print(f"Starting Multi-Source Scraper for {len(keywords)} keywords.")
    total_added = 0
    
    for kw in keywords:
        print(f"\n--- Searching for: {kw} ---")
        
        # 1. Search Genius Lyrics
        genius_urls = search_genius_lyrics(kw)
        
        # 2. Search Versuri.ro
        versuri_urls = search_versuri_ro(kw)
        
        # Combine and Deduplicate
        all_found = list(set(genius_urls + versuri_urls))
        
        if all_found:
            added = save_new_urls(all_found)
            print(f"Found {len(all_found)} total pages ({len(genius_urls)} Genius, {len(versuri_urls)} Versuri). Added {added} new.")
            total_added += added
        else:
            print(f"No pages found for '{kw}' on any source.")
        
        # Polite delay between keywords
        time.sleep(1)
        
    print(f"\n--- Full Scraping Finished ---")
    print(f"Total new URLs added to injuraturi_urls.txt: {total_added}")

if __name__ == "__main__":
    main()
