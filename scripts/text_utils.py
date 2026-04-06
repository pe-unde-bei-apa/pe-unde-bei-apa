import re
from pathlib import Path


def fix_encoding(text):
    try:
        fixed = text.encode('latin1').decode('utf-8')
        if fixed.count('�') <= text.count('�'):
            return fixed
        return text
    except:
        return text


DIACRITICS_DICT = {
    "sa": "să", "ca": "că", "fara": "fără", "in": "în",
    "din": "din", "pe": "pe", "la": "la", "cu": "cu",
    "pentru": "pentru", "dupa": "după", "cand": "când",
    "mai": "mai", "bine": "bine", "rau": "rău",
    "esti": "ești", "sunt": "sunt", "suntem": "suntem",
    "avem": "avem", "iti": "îți", "imi": "îmi",
    "ti": "ți", "ma": "mă", "te": "te",
    "bai": "băi", "ba": "bă", "fata": "fată",
    "tata": "tată", "frate": "frate",
    "cand": "când", "unde": "unde",
    "cine": "cine", "ce": "ce",
    "nu": "nu", "da": "da"
}


def apply_diacritics(text):
    def replace(match):
        word = match.group(0)
        lower = word.lower()

        if lower in DIACRITICS_DICT:
            corrected = DIACRITICS_DICT[lower]
            if word[0].isupper():
                corrected = corrected.capitalize()
            return corrected

        if lower.startswith("int"):
            return word.replace("int", "înt", 1)
        if lower.startswith("sunt"):
            return word.replace("sunt", "sunt", 1)
        if lower.startswith("rom"):
            return word.replace("rom", "rom", 1)

        return word

    return re.sub(r'\b[a-zA-Z]+\b', replace, text)


def cleanup_text(text):
    text = text.replace('ş', 'ș').replace('Ş', 'Ș')
    text = text.replace('ţ', 'ț').replace('Ţ', 'Ț')
    text = re.sub(r'([.!?])([A-ZĂÂÎȘȚ])', r'\1 \2', text)
    text = re.sub(r'([a-zăâîșț])([A-ZĂÂÎȘȚ][a-zăâîșț]{2,})', r'\1. \2', text)
    text = re.sub(r'`', '', text)
    text = re.sub(r'\.{4,}', '...', text)
    text = re.sub(r"'ti\b", "ți", text)
    text = re.sub(r'\s*-\s*', '-', text)
    text = re.sub(r'http[s]?://\S+', '', text)
    text = re.sub(r'  +', ' ', text)
    text = re.sub(r'\n\n\n+', '\n\n', text)

    return text.strip()


def process_text(text):
    text = fix_encoding(text)
    text = apply_diacritics(text)
    text = cleanup_text(text)
    return text


def process_segments(segment_dir):
    segment_dir = Path(segment_dir)

    if not segment_dir.exists():
        print(f"Directory {segment_dir} not found")
        return 0

    files = sorted(segment_dir.glob('*.txt'))
    print(f"Found {len(files)} files")

    fixed_count = 0

    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original = f.read()

            fixed = process_text(original)

            if fixed != original:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(fixed)
                fixed_count += 1
                print(f"✓ Fixed {file_path.name}")
            else:
                print(f"  {file_path.name} - no changes")

        except Exception as e:
            print(f"✗ Error {file_path.name}: {e}")

    print(f"\nDone. {fixed_count} files updated.")
    return fixed_count
