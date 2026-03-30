from website.genaudio import genaudio
from website.database import db_connect, APP_DB


cur = db_connect(APP_DB)
cur.execute("SELECT id, text FROM sentence")
text_rows = cur.fetchall()

cur.execute("SELECT id FROM sentence_audiogen")
audio_skip = cur.fetchall()
audio_skip = set(a[0] for a in audio_skip)

for id, text in text_rows:
    if id in audio_skip:
        continue
    print("AUDIOGEN ", id, text[:20])
    audio_bytes = genaudio(text)
    cur.execute("INSERT INTO sentence_audiogen(id, audio_mp3) VALUES (%s, %s)",
        (id, audio_bytes)
    )