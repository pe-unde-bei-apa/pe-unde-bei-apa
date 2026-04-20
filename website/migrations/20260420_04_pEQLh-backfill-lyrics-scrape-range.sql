-- backfill-lyrics-scrape-range
-- depends: 20260420_03_QZlHc-link-url-injuraturi-to-origin

INSERT INTO sentence_origin (sentence_id, origin)
SELECT id, 'lyrics_scrape' FROM sentence WHERE id >= 7392 AND id <= 8354
ON DUPLICATE KEY UPDATE origin = 'lyrics_scrape';
