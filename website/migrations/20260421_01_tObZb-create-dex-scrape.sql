-- create-dex-scrape
-- depends: 20260420_10_af5qV-words-common-freq-insert2

CREATE TABLE dex_scrape (
    scrape_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    dex_entry_id INT(11) UNIQUE NOT NULL,
    dex_entry_desc TEXT,
    word_freq FLOAT,
    dex_scraped_html TEXT NULL
) COLLATE='utf8mb4_romanian_ci';
