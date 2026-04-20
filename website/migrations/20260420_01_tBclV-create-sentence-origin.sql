-- create-sentence-origin
-- depends: 20260409_01_lOSNH-create-sentence-likes

CREATE TABLE IF NOT EXISTS `sentence_origin` (
  `sentence_id` int(11) NOT NULL,
  `origin` text NOT NULL,
  PRIMARY KEY (`sentence_id`),
  CONSTRAINT `sentence_origin_fk` FOREIGN KEY (`sentence_id`) REFERENCES `sentence` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
