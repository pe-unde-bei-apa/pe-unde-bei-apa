import glob
import os
import json

all_segments = {}
for text_file in glob.glob("data/02_segments/*.txt"):
    fname_root = os.path.splitext(os.path.basename(text_file))[0]
    json_file = "data/03_corrected_json/" + fname_root + ".json"
    if not os.path.isfile(json_file):
        print("JSON NOT FOUND: ", json_file)
        continue
    with open(text_file) as f:
        text_data = f.read()
    with open(json_file) as f:
        json_data = f.read()
    all_segments[fname_root] = {"text": text_data, "json": json.loads(json_data)}


os.makedirs("data/04_corrected_text", exist_ok=True)
for fname_root, data in all_segments.items():
    out_file = "data/04_corrected_text/" + fname_root + ".txt"
    corrections = data["json"].get("Map_PosSol", {}).get("Cor", [])
    text = data["text"]
    text_idx = 0
    final_str = ""
    try:
        for c in corrections:
            left_idx = c["LeftPos"]
            right_idx = c["RightPos"]
            original_word = c["MotSolution"]["WordSt"]
            fixed_word = c["MotSolution"]["vectSolution"][0]["Left"]
            recovered_word = text[left_idx:right_idx]
            assert recovered_word == original_word, "word mismatch!!!"

            final_str += text[text_idx:left_idx]
            final_str += fixed_word
            text_idx = right_idx
        final_str += text[text_idx:]

        with open(out_file, "w") as f:
            f.write(final_str)
    except Exception as e:
        print("SKIP FILE ", out_file, "ERROR", str(e))
