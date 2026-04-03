DROP DATABASE IF EXISTS Ritualia;
CREATE DATABASE Ritualia;
USE Ritualia;

-- Entidade forte ()
-- Constraints

-- Tabela de músicas
CREATE TABLE songs (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    artist VARCHAR(150) NOT NULL,
    source_id VARCHAR(20) NOT NULL,
    played_times INT NOT NULL DEFAULT (0),
    UNIQUE (title, artist)
    -- Status (no futuro)
) ENGINE=InnoDB;

create table genres (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	UNIQUE (name)
) engine=InnoDB;

create table emotions (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	UNIQUE (name)
) engine=InnoDB;


CREATE TABLE songs_emotions (
	song_id INT NOT NULL,
	emotion_id INT NOT NULL,

	PRIMARY KEY (song_id, emotion_id),
	FOREIGN KEY (song_id) REFERENCES songs(id),
	FOREIGN KEY (emotion_id) REFERENCES emotions(id)
) engine=InnoDB;

CREATE TABLE songs_genres (
	song_id INT NOT NULL,
	genre_id INT NOT NULL,

	PRIMARY KEY (song_id, genre_id),
	FOREIGN KEY (song_id) REFERENCES songs(id),
	FOREIGN KEY (genre_id) REFERENCES genres(id)
) engine=InnoDB;
