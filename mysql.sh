#!/bin/bash
set -ex
docker exec -it mysql mariadb -uroot -ppula "$@"