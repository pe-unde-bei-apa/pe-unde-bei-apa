-- create-sentence-vect-gemma
-- depends: 20260402_01_k6Tns

CREATE TABLE IF NOT EXISTS `sentence_vect_gemma` (
  `id` int(11) NOT NULL,
  `vector` vector(768) NOT NULL,
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `fk_sentence_vect_gemma` FOREIGN KEY (`id`) REFERENCES `sentence` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

