-- create-dex-definitions-markdown
-- depends: 20260421_05_MdBT0-index-error-and-not-null-html

CREATE TABLE dex_definitions_markdown (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scrape_id INT NOT NULL,
    dex_entry_id INT NOT NULL,
    dex_entry_desc TEXT NOT NULL,
    word_freq FLOAT,
    word_obscene BOOLEAN,
    definition_section VARCHAR(255),
    source VARCHAR(255),
    source_index INT,
    txt MEDIUMTEXT,
    
    INDEX idx_scrape_id (scrape_id),
    INDEX idx_dex_entry_id (dex_entry_id),
    INDEX idx_definition_section (definition_section),
    INDEX idx_source (source),
    INDEX idx_word_obscene (word_obscene),
    INDEX idx_word_freq (word_freq),
    
    UNIQUE INDEX uniq_def_source (dex_entry_id, definition_section, source, source_index),
    FULLTEXT INDEX ft_txt (txt),
    FULLTEXT INDEX ft_dex_entry_desc (dex_entry_desc)
) COLLATE = 'utf8mb4_romanian_ci';
