import os
import glob

MAX_REQ = 4500
file_counter = 0
current_segment = ""
segments = []
for text_path in glob.glob("data/01_original_text/*.txt"):
    with open(text_path) as f:
        for line in f.readlines():
            line = line.strip()
            if len(line) <= 1:
                continue
            if len(current_segment) + 3 + len(line) < MAX_REQ:
                current_segment += line + "\n\n"
                continue
            else:
                segments.append(current_segment)
                current_segment = line
segments.append(current_segment)

os.makedirs("data/02_segments", exist_ok=True)
for i, segment in enumerate(segments):
    filename = 'data/02_segments/' + f'{i:04}' + ".txt"
    with open(filename, 'w') as f:
        f.write(segment)
            
    