from website.add_sentence import add_sentence


def load_texts():
    lines = []
    with open("data/05_dedup/all.txt") as f:
        for line in f.readlines():
            line = line.strip()
            if len(line) < 3:
                continue
            lines.append(line)
    print("LOADED ", len(lines), " SENTENCES")
    return lines


for text in load_texts():
    add_sentence(text)
