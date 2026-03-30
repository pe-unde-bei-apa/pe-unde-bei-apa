import glob
import os
import tempfile
import subprocess
import json


import requests

def make_headers():
    hs =  [
        {
            "name": "Accept",
            # "value": "*/*"
            "value": "application/json"
        },
        # {
            # "name": "Accept-Encoding",
            # "value": "gzip, deflate, br, zstd"
        # },
        {
            "name": "Accept-Language",
            "value": "en-US,en;q=0.9"
        },
        {
            "name": "Connection",
            "value": "keep-alive"
        },
        {
            "name": "Content-Type",
            "value": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        {
            "name": "Host",
            "value": "www.scribens.com"
        },
        {
            "name": "Origin",
            "value": "https://www.scribens.com"
        },
        {
            "name": "Priority",
            "value": "u=4"
        },
        {
            "name": "Referer",
            "value": "https://www.scribens.com/ro/"
        },
        {
            "name": "Sec-Fetch-Dest",
            "value": "empty"
        },
        {
            "name": "Sec-Fetch-Mode",
            "value": "cors"
        },
        {
            "name": "Sec-Fetch-Site",
            "value": "same-origin"
        },
        {
            "name": "TE",
            "value": "trailers"
        },
        {
            "name": "User-Agent",
            "value": "Mozilla/5.0 (X11; Linux x86_64; rv:148.0) Gecko/20100101 Firefox/148.0"
        }
    ]
    return {
        i["name"]: i["value"]
        for i in hs
    }

def make_checksum_num(text):
    with tempfile.NamedTemporaryFile() as f:
        fname = f.name
        f.write(text.encode("utf-8"))
        f.flush()
        args = ["node", "scribens/checksum.js", fname]
        print("CALL ", repr(args))
        res_txt = subprocess.check_output(args)
    return res_txt.strip()



def make_params(text):
    text = text.replace("\n", "<br>")
    text = "<p>" + text + "</p>"
    return {

        "FunctionName":	"GetSolutionsByPos",
        "plugin":	"Website_desktop",
        "texteHTML":	text,
        "optionsCor":	"Genre_Je:0|Genre_Tu:0|Genre_Nous:0|Genre_Vous:0|Genre_On:0|RefOrth:0|UsBr:-1|ShowUPSol:1",
        "optionsStyle":	"RepMin:3|GapRep:3|AllWords:0|FamilyWords:0|MinPhLg:30|MinPhCt:5|Ttr:250|Tts:150",
        "firstRequest":	"true",
        "cntRequest30":	"0",
        "langId":	"ro",
        "nbc":	make_checksum_num(text),
        "Uid":	"3JaRO7PX",
    }


prev_errors = [
    "data/03_corrected_json/0041.json",
    "data/03_corrected_json/0029.json",
]


for text_path in glob.glob("data/02_segments/*.txt"):
    with open(text_path) as f:
        text_data = f.read()
    
    text_file = os.path.basename(text_path)
    os.makedirs("data/03_corrected_json", exist_ok=True)
    json_out = "data/03_corrected_json/" + os.path.splitext(text_file)[0] + ".json"
    if not json_out in prev_errors:
        continue
    with open(json_out, 'wb') as f:
        request_headers = make_headers()
        request_params = make_params(text_data)
        request_url = "https://www.scribens.com/Scribens/TextSolution_Servlet"
        print()
        print("SENDING REQUEST FOR FILE ", text_path)
        print("FILE LENGTH: ", len(text_data))
        resp = requests.post(url=request_url, data=request_params, headers=request_headers)
        print("GOT STATUS CODE = ", resp.status_code)
        resp.raise_for_status()
        # resp_json = resp.json()
        f.write(resp.content)
        # json.dump(resp_json, f)

    