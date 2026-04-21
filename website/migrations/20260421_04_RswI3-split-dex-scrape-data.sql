-- split-dex-scrape-data
-- depends: 20260421_03_aRf82-add-error-to-dex-scrape

CREATE TABLE dex_scrape_data (
    scrape_id INT(11) PRIMARY KEY,
    dex_scraped_html MEDIUMTEXT,
    CONSTRAINT fk_dex_scrape_data_scrape_id FOREIGN KEY (scrape_id) REFERENCES dex_scrape(scrape_id) ON DELETE CASCADE
) COLLATE='utf8mb4_romanian_ci';

INSERT INTO dex_scrape_data (scrape_id, dex_scraped_html)
SELECT scrape_id, dex_scraped_html FROM dex_scrape WHERE dex_scraped_html IS NOT NULL;

ALTER TABLE dex_scrape DROP COLUMN dex_scraped_html;

OPTIMIZE TABLE dex_scrape;
