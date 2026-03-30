#!/bin/bash
set -ex

cd /home/p/VIDOEGAME/moss-sound-effect/MOSS-TTS

time ../.venv/bin/python  -m moss_tts_delay.llama_cpp --config configs/llama_cpp/cpu-only.yaml --language ro \
  --text "$1" --output "$2" --tokens $3 --lang ro --reference ../trump-ref-ro.mp3
