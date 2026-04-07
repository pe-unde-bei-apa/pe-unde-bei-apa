import pymysql

DEXONLINE_DB = "dexonline"
APP_DB = "pe_unde_bei_apa"


# @functools.lru_cache(maxsize=4)
def db_connect(db, dict=False):
    connection = pymysql.connect(
        host="127.0.0.1",
        user="root",
        password="pula",
        database=db,
        cursorclass=pymysql.cursors.DictCursor if dict else pymysql.cursors.Cursor,
        autocommit=True,
    )
    connection.ping()
    return connection.cursor()


def search_connect():
    return pymysql.connect(
        host="127.0.0.1",
        port=19306,
        user="root",
        password="pula",
        database="manticore",
        autocommit=True,
        cursorclass=pymysql.cursors.DictCursor,
    ).cursor()
