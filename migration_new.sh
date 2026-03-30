#!/bin/bash
set -ex
MESSAGE="$@"
if [ -z "$MESSAGE" ]; then
   echo "empty message! please supply message argument!"
    exit 1
fi
uv run -m yoyo new --sql --message "$MESSAGE"