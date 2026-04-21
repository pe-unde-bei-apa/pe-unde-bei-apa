import argparse
import re
import unicodedata
import multiprocessing
import signal
import sys
from bs4 import BeautifulSoup
from website.database import APP_DB, db_connect


def sigint_handler(sig, frame):
    print("\nCtrl-C pressed. Exiting to prevent zombies...")
    sys.exit(0)


signal.signal(signal.SIGINT, sigint_handler)


def strip_accents(s):
    return "".join(
        c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn"
    )


def get_first_word_clean(text):
    text = text.strip()
    match = re.search(r"^[^\s\(\)\[\]]+", text)
    if not match:
        return ""
    word = match.group(0)
    return strip_accents(word).lower()


def fetch_data_from_db(scrape_ids):
    if not scrape_ids:
        return []
    placeholders = ", ".join(["%s"] * len(scrape_ids))
    query = f"""
        SELECT
            s.scrape_id,
            s.dex_entry_id,
            s.dex_entry_desc,
            s.word_freq,
            d.dex_scraped_html
        FROM dex_scrape s
        JOIN dex_scrape_data d ON s.scrape_id = d.scrape_id
        WHERE s.scrape_id IN ({placeholders})
    """
    with db_connect(APP_DB, dict=True) as cur:
        cur.execute(query, tuple(scrape_ids))
        return cur.fetchall()


def extract_tab_mapping(main_el):
    mapping = {}
    tab_list = main_el.find("ul", class_="nav-tabs")
    if not tab_list:
        return mapping

    buttons = tab_list.find_all("button", attrs={"data-bs-toggle": "tab"})
    for btn in buttons:
        target = btn.get("data-bs-target")
        if target and target.startswith("#"):
            tab_id = target[1:]
            # Clone the button to avoid modifying the original soup
            import copy

            btn_clone = copy.copy(btn)
            for icon in btn_clone.find_all("span", class_="material-icons"):
                icon.decompose()
            title = btn_clone.get_text(strip=True)
            clean_name = get_first_word_clean(title)
            if clean_name:
                mapping[clean_name] = tab_id
    return mapping


def html_to_markdown(node, in_bold=False, in_italic=False):
    if node is None:
        return ""
    if isinstance(node, str):
        return node

    new_in_bold = in_bold or (node.name in ["b", "strong"])
    new_in_italic = in_italic or (node.name in ["i", "em", "abbr"])

    content = "".join(
        html_to_markdown(child, new_in_bold, new_in_italic) for child in node.children
    )

    if node.name == "abbr":
        expansion = node.get("data-bs-content", "")
        # Always wrap expansion in spaces as requested before
        content = f" {expansion} "
        if in_italic:
            return content
        else:
            return f"_{content}_"

    res = content
    if node.name in ["b", "strong"] and not in_bold:
        res = f"**{res}**"
    if node.name in ["i", "em"] and not in_italic:
        res = f"_{res}_"

    return res


def extract_definitions(main_el, tab_id):
    definitions = []
    tab_panel = main_el.find("div", id=tab_id)
    if not tab_panel:
        return definitions

    wrappers = tab_panel.find_all("div", class_="defWrapper")
    for wrapper in wrappers:
        def_span = wrapper.find("span", class_="def")
        if not def_span:
            continue

        # Convert to markdown recursively
        txt = html_to_markdown(def_span)

        # Normalize internal whitespace: collapse multiple spaces and remove leading/trailing
        txt = re.sub(r"\s+", " ", txt).strip()

        # Add newlines before numbered entries (e.g., **1**, **1.**, **9-10**)
        txt = re.sub(r"\s+(\*\*\d+(?:-\d+)?\.?\*\*)", r"\n\1", txt)

        source = None
        ref_link = wrapper.find("a", class_="ref")
        if ref_link and "href" in ref_link.attrs:
            href = ref_link["href"]
            if href.startswith("/sursa/"):
                source = href.split("/")[-1]

        definitions.append({"txt": txt, "source": source})
    return definitions


def parse(row):
    html_text = row["dex_scraped_html"]
    if not html_text:
        return []

    soup = BeautifulSoup(html_text, "html.parser")
    main_el = soup.find("main")
    if not main_el:
        # Some errors might happen if we joined empty data, but JOIN ensures d exists.
        return []

    tab_mapping = extract_tab_mapping(main_el)
    flattened = []

    for tab_name, tab_id in tab_mapping.items():
        defs = extract_definitions(main_el, tab_id)

        source_counts = {}

        for d in defs:
            src = d["source"]
            source_counts[src] = source_counts.get(src, 0) + 1

            word_freq = row["word_freq"]
            flattened.append(
                {
                    "scrape_id": row["scrape_id"],
                    "dex_entry_id": row["dex_entry_id"],
                    "dex_entry_desc": row["dex_entry_desc"],
                    "word_freq": word_freq,
                    "word_obscene": word_freq > 0.9 if word_freq is not None else False,
                    "definition_section": tab_name,
                    "source": src,
                    "source_index": source_counts[src],
                    "txt": d["txt"],
                }
            )

    return flattened


def parse_many_html(scrape_ids, pool):
    print("FETCH COUNT=", len(scrape_ids))
    rows = fetch_data_from_db(scrape_ids)
    all_data = []
    print("PARSE COUNT=", len(rows))

    results = pool.map(parse, rows)
    for res in results:
        all_data.extend(res)

    return all_data


def get_processed_scrape_ids():
    with db_connect(APP_DB) as cur:
        cur.execute("SELECT scrape_id FROM dex_definitions_markdown")
        return {row[0] for row in cur.fetchall()}


def get_scrape_ids_to_process(limit=None):
    processed_ids = get_processed_scrape_ids()

    query = """
        SELECT s.scrape_id
        FROM dex_scrape s
        JOIN dex_scrape_data d ON s.scrape_id = d.scrape_id
    """
    with db_connect(APP_DB) as cur:
        cur.execute(query)
        all_ids = [row[0] for row in cur.fetchall()]

    to_process = sorted([sid for sid in all_ids if sid not in processed_ids])

    if limit is not None:
        to_process = to_process[:limit]

    return to_process


def insert_definitions(data):
    if not data:
        return
    query = """
        INSERT IGNORE INTO dex_definitions_markdown (
            scrape_id, dex_entry_id, dex_entry_desc, word_freq, word_obscene,
            definition_section, source, source_index, txt
        ) VALUES (
            %(scrape_id)s, %(dex_entry_id)s, %(dex_entry_desc)s, %(word_freq)s, %(word_obscene)s,
            %(definition_section)s, %(source)s, %(source_index)s, %(txt)s
        )
    """
    print("INSERT  COUNT=", len(data))
    with db_connect(APP_DB) as cur:
        cur.executemany(query, data)
    print("INSERT OK")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=None, help="Max rows to parse")
    args = parser.parse_args()

    to_process = get_scrape_ids_to_process(args.limit)
    print(f"Found {len(to_process)} entries to process.")

    batch_size = 1000
    pool = multiprocessing.Pool(processes=10)
    for i in range(0, len(to_process), batch_size):
        batch_ids = to_process[i : i + batch_size]
        print(f"Processing batch {i // batch_size + 1}...")
        parsed_data = parse_many_html(batch_ids, pool)
        if parsed_data:
            insert_definitions(parsed_data)
        print(f"Inserted {len(parsed_data)} definitions for this batch.")

    pool.close()
    pool.join()


if __name__ == "__main__":
    main()
