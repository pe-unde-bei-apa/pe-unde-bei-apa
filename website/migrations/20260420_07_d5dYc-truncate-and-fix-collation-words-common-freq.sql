-- truncate-and-fix-collation-words-common-freq
-- depends: 20260420_06_2x9N6-create-words-common-freq

TRUNCATE TABLE `words_common_freq`;
ALTER TABLE `words_common_freq` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_romanian_ci;
