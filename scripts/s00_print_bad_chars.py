import sys
file = sys.argv[1]
with open(file, 'r') as f:
    str = f.read()

import string
all_chars = string.printable + string.whitespace + string.punctuation + "ăîșțâĂÎȘȚÂ"
for i, c in enumerate(str):
    if c not in all_chars:
        print("BAD CHAR: idx = ", i, f"  char = '{c}'  ord={ord(c)}")
