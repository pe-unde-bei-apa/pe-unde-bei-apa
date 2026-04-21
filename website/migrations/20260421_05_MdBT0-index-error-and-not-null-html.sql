-- index-error-and-not-null-html
-- depends: 20260421_04_RswI3-split-dex-scrape-data

CREATE INDEX idx_dex_scrape_error ON dex_scrape(error(255));

ALTER TABLE dex_scrape_data MODIFY COLUMN dex_scraped_html MEDIUMTEXT NOT NULL;
