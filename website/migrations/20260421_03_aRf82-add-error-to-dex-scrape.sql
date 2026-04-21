-- add-error-to-dex-scrape
-- depends: 20260421_02_XPNoj-change-dex-scraped-html-to-mediumtext

ALTER TABLE dex_scrape ADD COLUMN error TEXT NULL DEFAULT NULL;
