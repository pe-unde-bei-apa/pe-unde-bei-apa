-- change-dex-scraped-html-to-mediumtext
-- depends: 20260421_01_tObZb-create-dex-scrape

ALTER TABLE dex_scrape MODIFY COLUMN dex_scraped_html MEDIUMTEXT;
