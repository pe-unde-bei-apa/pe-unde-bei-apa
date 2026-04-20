-- backfill-sentence-origin
-- depends: 20260420_01_tBclV-create-sentence-origin

INSERT INTO sentence_origin (sentence_id, origin)
SELECT id, 'original_corpus' FROM sentence WHERE id <= 7391
ON DUPLICATE KEY UPDATE origin = 'original_corpus';
