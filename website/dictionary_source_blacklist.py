SOURCE_BLACKLIST = [
    "z",  # <---- lasă asta aici că dacă comentăm tot crapă sql-u
    # astea sunt ortografice/gramatice, nu au content
    "doom2",
    "doom3",
    "do",
    "ivo3",
    "de",
    "dlr",
    "dlrlc",
    "der",
    "dor",
    "mdo",
    "dmlr",
    "dgl",
    # astea dau sintagme random, nu explică cuvântul
    "cecc",
    # astea dau opusul a ce vrem să explicăm, șterge-le de tot
    "antonime",
    # astea sunt gunoaie militare
    "gta",
    # astea sunt cu plante
    "dendrofloricol",
    "etnobotanic",
    # astea sunt cu muzica si teorie muzicala
    "dtm",
    # astea sunt cu chestii industriale
    "dps",
    # termeni lingvistici
    "dtl",
    "dflr",
    "dmg",
    "ger",
    "gaer",
    "dtlall",
    "terminologie-literara",
    "rebus",
]

SOURCE_GREAT_PLUS_3 = [
    "argou",
]
SOURCE_OKAY = [
    "nodex",
    "mda",
    "mda2",
    "dex",
    "dex09",
    "sinonime",
    "Sinonime82",
]

SOURCE_FALLBACK_MINUS_ONE = [
    # foarte vechi dar are definitii amuzante, singuru cu definiție pentru mă-ta
    "scriban",
    # astea sunt cam praf, cam lungi
    "CADE",
    "dlr-tom10",
    "dar",
    "DGS",
]


def sql_literal_list(items):
    items = [f'"{i}"' for i in items]
    items = ", ".join(items)
    return "(" + items + ")"
