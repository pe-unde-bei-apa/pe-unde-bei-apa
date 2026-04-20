-- index-words-common-freq
-- depends: 20260420_07_d5dYc-truncate-and-fix-collation-words-common-freq

ALTER TABLE `words_common_freq` ADD INDEX `spacy_lemma_idx` (`spacy_lemma`(255));
ALTER TABLE `words_common_freq` ADD INDEX `spacy_pos_idx` (`spacy_pos`(50));
