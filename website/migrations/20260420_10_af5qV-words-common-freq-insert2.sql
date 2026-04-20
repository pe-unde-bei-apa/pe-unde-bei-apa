-- words_common_freq_insert2
-- depends: 20260420_09_kw5kh-create-words-common-lemmas

INSERT IGNORE INTO `words_common_lemmas` (spacy_lemma, total_freq, most_common_pos)
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

INSERT IGNORE INTO `words_common_lemmas` (spacy_lemma, total_freq, most_common_pos)
SELECT word_str, freq, spacy_pos FROM words_common_freq;