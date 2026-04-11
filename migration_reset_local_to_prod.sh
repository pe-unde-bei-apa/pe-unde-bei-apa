#!/bin/bash
set -ex

if ! (docker exec mysql bash -c "mariadb-show -uroot -ppula dexonline 2>&1 >/dev/null" ); then
    printf "\n\n  >>>  DOWNLOADING DEXONLINE PLZ WAIT 10min .... \n\n"
    time docker exec mysql bash -c "mariadb-dump -uroot -ppula -h 10.200.200.1 -P 3306 --add-drop-database --databases dexonline > /db_dumps/dexonline.sql"
    time docker exec mysql bash -c "cat /db_dumps/dexonline.sql | mariadb -uroot -ppula"

else
    printf "\n\n  >>>  DEXONLINE IS ALREADY DOWNLOADED\n\n"
fi

printf "\n\n  >>>  DOWNLOADING PE_UNDE_BEI_APA PLZ WAIT 10sec .... \n\n"
time docker exec mysql bash -c "mariadb-dump -uroot -ppula -h 10.200.200.1 -P 3306 --add-drop-database --databases pe_unde_bei_apa > /db_dumps/pe_unde_bei_apa.sql"
printf "\n\n  >>>  INSTALLING PE_UNDE_BEI_APA PLZ WAIT 10sec .... \n\n"
time docker exec mysql bash -c "cat /db_dumps/pe_unde_bei_apa.sql | mariadb -uroot -ppula"


printf "\n\n  >>>    SQL RESET LOCAL DONE !!! \n\n"