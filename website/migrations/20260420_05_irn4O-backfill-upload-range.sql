-- backfill-upload-range
-- depends: 20260420_04_pEQLh-backfill-lyrics-scrape-range

INSERT INTO sentence_origin (sentence_id, origin)
SELECT id, 'upload' FROM sentence WHERE id >= 8355 AND id <= 8360
ON DUPLICATE KEY UPDATE origin = 'upload';
