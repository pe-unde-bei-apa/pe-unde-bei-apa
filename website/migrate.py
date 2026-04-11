from yoyo import read_migrations
from yoyo import get_backend

backend = get_backend("mysql://root:pula@127.0.0.1/pe_unde_bei_apa")
migrations = read_migrations("website/migrations")

with backend.lock():
    backend.apply_migrations(backend.to_apply(migrations))
