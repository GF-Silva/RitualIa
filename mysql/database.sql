DROP DATABASE IF EXISTS Ritualia;
CREATE DATABASE Ritualia;
USE Ritualia;

-- Tabela de músicas
CREATE TABLE musics (
    id INT NOT NULL AUTO_INCREMENT,
    music_name VARCHAR(150) NOT NULL,
    artist VARCHAR(150) NOT NULL,
    source_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_source (source_id)
) ENGINE=InnoDB;

-- Tabela de requests
CREATE TABLE requests (
    music_id INT NOT NULL,
    access INT NOT NULL DEFAULT 0,

    PRIMARY KEY (music_id),
    FOREIGN KEY (music_id) REFERENCES musics(id)
) ENGINE=InnoDB;

CREATE TABLE music_styles (
	music_id INT NOT NULL,
	styles JSON NOT NULL DEFAULT ('[]'),

	PRIMARY KEY (music_id),
	FOREIGN KEY (music_id) REFERENCES musics(id)
) ENGINE=InnoDB;

DELIMITER //

CREATE TRIGGER after_music_insert
AFTER INSERT ON musics
FOR EACH ROW
BEGIN
    INSERT INTO requests (music_id, access) VALUES (NEW.id, 0);
    INSERT INTO music_styles (music_id, styles) VALUES (NEW.id, '[]');
END //

DELIMITER ;

-- Inserção de músicas
INSERT INTO musics (music_name, artist, source_id) VALUES
('Apesar de Você', 'Chico Buarque', 'bGAJlOwUgHY'),
('A Carne', 'Elza Soares', 'HZXSo5lKk0g'),
('Construção', 'Chico Buarque', 'wBfVsucRe1w'),
('Cálice', 'Chico Buarque e Gilberto Gil', '9y2xB90A0CY'),
('Pra Não Dizer Que Não Falei das Flores', 'Geraldo Vandré', 'KdvsXn8oVPY'),
('Que País É Este', 'Legião Urbana', 'vA-3BYOW2wo'),
('Diário de um Detento', 'Racionais MCs', 'dGFxdmuDA4A'),
('Negro Drama', 'Racionais MCs', 'u4lcUooNNLY'),
('Tempo Perdido', 'Legião Urbana', 'BW73u2yGGa8'),
('O Mundo é um Moinho', 'Cartola', 'ud9PlROstDw'),
('Tocando em Frente', 'Almir Sater', 'KxDofVDFu5k'),
('Aquarela do Brasil', 'Ary Barroso', 'mvdKz4VPPq0'),
('Tropicália', 'Caetano Veloso', '1Z1qNsm-NUk'),
('Asa Branca', 'Luiz Gonzaga', 'zIy3EwyBBI0'),
('Pais e Filhos', 'Legião Urbana', 'iApyBcSg-WA'),
('Epitáfio', 'Titãs', 'I29JUuotXG4'),
('Imagine', 'John Lennon', 'zHxobd1WLno'),
('What''s Going On', 'Marvin Gaye', 'ApthDWoPMFQ'),
('This Is America', 'Childish Gambino', 'VYOjWnS4cMY');
