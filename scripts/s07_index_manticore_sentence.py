from website.database import db_connect, APP_DB
from website.index_manticore import index_manticore, create_index_table


cur = db_connect(APP_DB)
cur.execute("SELECT id, text FROM sentence")
rows = cur.fetchall()
print("ROWS: ", len(rows))
create_index_table("sentence")
index_manticore("sentence", rows)