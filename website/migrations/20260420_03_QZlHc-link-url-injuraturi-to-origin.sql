-- link-url-injuraturi-to-origin
-- depends: 20260420_02_hjEMa-backfill-sentence-origin

INSERT INTO sentence_origin (sentence_id, origin)
SELECT sentence_id, 'lyrics_scrape' FROM url_injuraturi
ON DUPLICATE KEY UPDATE origin = 'lyrics_scrape';
