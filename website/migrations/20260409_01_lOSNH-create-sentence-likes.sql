-- create-sentence-likes
-- depends: 20260404_01_create-url-injuraturi

CREATE TABLE IF NOT EXISTS `sentence_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sentence_id` int(11) NOT NULL,
  `action_type` tinyint NOT NULL COMMENT '1 for like, -1 for unlike/skip',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sentence_id` (`sentence_id`),
  CONSTRAINT `fk_sentence_likes` FOREIGN KEY (`sentence_id`) REFERENCES `sentence` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
