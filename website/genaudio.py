import tempfile
import subprocess

def genaudio(text):
    word_count = len(text.split(' '))
    seconds = word_count/2.5 + 1
    token_count1 = 1+int(seconds * 11)
    token_count2 = len(text)

    token_count = int((token_count1 + token_count2)/2)

    token_count = int(token_count * 0.75)

    with tempfile.NamedTemporaryFile(suffix='.mp3') as f:
        file_name = f.name
        subprocess.check_call(
            [
                "bash",
                "genaudio.sh",
                text,
                file_name,
                str(token_count)
            ]
        )
        f.seek(0)
        return f.read()