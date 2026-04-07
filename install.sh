#!/bin/bash
set -ex

uv run pre-commit install
uv run python -m spacy download ro_core_news_lg
