-- create-words-common-lemmas
-- depends: 20260420_08_J5Qhx-index-words-common-freq

CREATE TABLE IF NOT EXISTS `words_common_lemmas` (
  `lemma_id` int(11) NOT NULL AUTO_INCREMENT,
  `spacy_lemma` text NOT NULL,
  `total_freq` float NOT NULL,
  `most_common_pos` text NOT NULL,
  PRIMARY KEY (`lemma_id`),
  UNIQUE KEY `spacy_lemma_unique` (`spacy_lemma`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_romanian_ci;

INSERT INTO `words_common_lemmas` (spacy_lemma, total_freq, most_common_pos)
WITH LemmaFreq AS (
    SELECT spacy_lemma, SUM(freq) as total_freq
    FROM words_common_freq
    GROUP BY spacy_lemma
),
PosCounts AS (
    SELECT spacy_lemma, spacy_pos, COUNT(*) as pos_count,
           ROW_NUMBER() OVER (PARTITION BY spacy_lemma ORDER BY COUNT(*) DESC) as rn
    FROM words_common_freq
    GROUP BY spacy_lemma, spacy_pos
)
SELECT lf.spacy_lemma, lf.total_freq, pc.spacy_pos
FROM LemmaFreq lf
JOIN PosCounts pc ON lf.spacy_lemma = pc.spacy_lemma AND pc.rn = 1
ORDER BY lf.total_freq DESC
LIMIT 50000;
