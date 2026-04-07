from .database import search_connect


def create_index_table(table):
    with search_connect() as cur:
        cur.execute(
            f"CREATE TABLE IF NOT EXISTS `{table}` (id, `text` text) min_infix_len='2'"
        )


def index_manticore(table, rows):
    with search_connect() as cur:
        cur.executemany(f"INSERT INTO `{table}` (id, text) VALUES (%s, %s)", rows)


def create_vector_table(table, dims):
    sql = f"create table `{table}` ( id, `text` text, `vector` float_vector knn_type='hnsw' knn_dims='{dims}' hnsw_similarity='l2' );"
    with search_connect() as cur:
        cur.execute(sql)


def fuzzy_search(table, text):
    sql = f"select id, highlight() as high from `{table}` where match(%s) LIMIT 20 option fuzzy=1, distance=2, layouts='fr,us';"

    with search_connect() as cur:
        cur.execute(sql, (text,))
        return cur.fetchall()
