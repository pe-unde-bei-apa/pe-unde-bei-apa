-- 
-- depends: 


CREATE TABLE IF NOT EXISTS `sentence` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'sugi pula',
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `textuniq` (`text`) USING HASH,
  KEY `text2` (`text`(768)),
  FULLTEXT KEY `text3` (`text`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


CREATE TABLE IF NOT EXISTS  `sentence_anal` (
  `id` int(11) NOT NULL,
  `doc` longtext NOT NULL,
  `vector` vector(300) DEFAULT NULL,
  `viz_svg_ent` longtext NOT NULL,
  `viz_svg_dep` longtext NOT NULL,
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `1` FOREIGN KEY (`id`) REFERENCES `sentence` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


CREATE TABLE IF NOT EXISTS  `sentence_audiogen` (
  `id` int(11) NOT NULL,
  `audio_mp3` longblob NOT NULL,
  KEY `id` (`id`),
  CONSTRAINT `1` FOREIGN KEY (`id`) REFERENCES `sentence` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- 2026-04-02 18:31:18 UTC
