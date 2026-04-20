-- create-words-common-freq
-- depends: 20260420_05_irn4O-backfill-upload-range
CREATE TABLE IF NOT EXISTS `words_common_freq` (
  `word_id` int(11) NOT NULL AUTO_INCREMENT,
  `word_str` text NOT NULL,
  `freq` float NOT NULL,
  `spacy_lemma` text NOT NULL,
  `spacy_tag` text NOT NULL,
  `spacy_pos` text NOT NULL,
  `spacy_morph` text NOT NULL,
  PRIMARY KEY (`word_id`),
  UNIQUE KEY `word_str_unique` (`word_str`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
