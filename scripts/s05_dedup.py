import glob
import string

present = set()
lines = []


def reduce(line: str):
    line = line.lower()
    characters = string.ascii_letters + string.digits
    return "".join(a for a in line if a in characters)


for file in glob.glob("data/04_corrected_text/*.txt"):
    with open(file) as f:
        for line in f.readlines():
            line = line.strip()
            if not line or len(line) < 4:
                continue
            reduced_line = reduce(line)
            if reduced_line in present:
                continue
            lines.append(line)
            present.add(reduced_line)


with open("data/05_dedup/all.txt", "w") as f:
    f.write("\n\n".join(lines))
