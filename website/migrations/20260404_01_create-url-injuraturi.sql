-- create-url-injuraturi
-- depends: 20260402_02_BJ9hN-create-sentence-vect-gemma

CREATE TABLE IF NOT EXISTS `url_injuraturi` (
  `url` VARCHAR(768) NOT NULL,
  `sentence_id` INT(11) NOT NULL,
  PRIMARY KEY (`url`),
  CONSTRAINT `fk_url_injuraturi_sentence` FOREIGN KEY (`sentence_id`) REFERENCES `sentence` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
