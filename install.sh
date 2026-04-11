#!/bin/bash
set -ex

uv run pre-commit install
(
    cd docker
    docker compose up -d
)

sleep 10
bash migration_reset_local_to_prod.sh
