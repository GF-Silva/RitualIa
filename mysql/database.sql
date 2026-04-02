DROP DATABASE IF EXISTS Ritualia;
CREATE DATABASE Ritualia;
USE Ritualia;

-- Entidade forte
-- Constraints

-- Tabela de músicas
CREATE TABLE songs (
    id INT NOT NULL AUTO_INCREMENT,
    music_name VARCHAR(150) NOT NULL,
    artist VARCHAR(150) NOT NULL,
    source_id VARCHAR(20) NOT NULL,
    -- context
    -- played_times (requests)
    -- Status (no futuro)
    PRIMARY KEY (id),
    UNIQUE KEY unique_source (source_id)
    
    -- Relacionar com genre_id, theme_id
) ENGINE=InnoDB;

-- Tabela de requests - Remover
CREATE TABLE requests (
    music_id INT NOT NULL,
    access INT NOT NULL DEFAULT 0,

    PRIMARY KEY (music_id),
    FOREIGN KEY (music_id) REFERENCES songs(id)
) ENGINE=InnoDB;

-- Temas trabalhados
-- Context, intent
CREATE TABLE themes (
	music_id INT NOT NULL,
	name JSON NOT NULL DEFAULT ('[]'), -- mantem - tira json, coloca string

	PRIMARY KEY (music_id),
	FOREIGN KEY (music_id) REFERENCES songs(id)
) ENGINE=InnoDB;

-- generos

-- ID 1 - Genero MPB
create table genres (
	music_id INT not null,
	name JSON not null default ('[]'), -- Uma msc tem mais de um genero? Sim - Remover o json, colocar string normal
	
	primary key (music_id),
	foreign key (music_id) references songs(id)
) engine=InnoDB;

-- sentimento
create table emotions (
	music_id INT not null,
	name JSON not null default ('[]'),
	
	primary key (music_id),
	foreign key (music_id) references songs(id)
) engine=InnoDB;

DELIMITER //

CREATE TRIGGER after_music_insert
AFTER INSERT ON songs
FOR EACH ROW
BEGIN
    INSERT INTO requests (music_id, access) VALUES (NEW.id, 0);
    INSERT INTO themes (music_id, name) VALUES (NEW.id, '[]');
	insert into genres (music_id, name) values (new.id, '[]');
	insert into emotions (music_id, name) values (new.id, '[]');
END //

DELIMITER ;

-- Inserção de músicas
INSERT INTO songs (music_name, artist, source_id) VALUES
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
