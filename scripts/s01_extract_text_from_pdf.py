import glob, os, re
import sys, pathlib, pymupdf

def extract_text(fname):
    with pymupdf.open(fname) as doc:  # open document
        text = '\n'.join([page.get_text() for page in doc])
    # write as a binary file to support non-ASCII characters
    return text

def clean_text(text):
    text = text.encode("utf8", 'ignore').decode("utf8", "ignore")
    text = text.replace("ã", "ă").replace("tz", "ț").replace("sh", "ș")
    text = text.replace("Ã¢", "â").replace("Ã®", "î")
    text = text.replace("ÃƒÂ¢", "â")
    text = re.sub(r'!+', '!', text)
    text = re.sub(r'^ $', '', text, flags=re.MULTILINE)
    text = re.sub('\n+', '\n', text, flags=re.MULTILINE)
    text = re.sub(r"^([A-ZÎȘȚĂ])", '\n\g<1>', text, flags=re.MULTILINE)
    text = re.sub(r"([^\n])\n([^\n])", "\g<1> \g<2>", text, flags=re.MULTILINE)
    text = re.sub(" +", " ", text)
    return text
def extract_all():
    os.makedirs("data/01_original_text", exist_ok=True)
    
    for fname in glob.glob("data/00_original_pdf/*.pdf"):
        text = extract_text(fname)
        fname = os.path.basename(fname)
        fname = os.path.splitext(fname)[0] + '.txt'

        text = clean_text(text)

        with open('data/01_original_text/' + fname, 'w') as f:
            f.write(text)

if __name__ == "__main__":
    extract_all()