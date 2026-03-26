CREATE DATABASE IF NOT EXISTS Ritualia;

USE Ritualia;

CREATE TABLE musicas (	
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    artista VARCHAR(150) NOT NULL,
    source_id VARCHAR(20) NOT NULL,
    plataforma VARCHAR(20) DEFAULT 'youtube',
    
    PRIMARY KEY (id)
);

INSERT INTO musicas (id, titulo, artista, source_id, plataforma) VALUES
(1, 'Apesar de Você', 'Chico Buarque', 'bGAJlOwUgHY', 'youtube'),
(2, 'A Carne', 'Elza Soares', 'HZXSo5lKk0g', 'youtube'),
(3, 'Construção', 'Chico Buarque', 'wBfVsucRe1w', 'youtube'),
(4, 'Cálice', 'Chico Buarque e Gilberto Gil', '9y2xB90A0CY', 'youtube'),
(5, 'Pra Não Dizer Que Não Falei das Flores', 'Geraldo Vandré', 'KdvsXn8oVPY', 'youtube'),
(6, 'Que País É Este', 'Legião Urbana', 'vA-3BYOW2wo', 'youtube'),
(7, 'Diário de um Detento', 'Racionais MCs', 'dGFxdmuDA4A', 'youtube'),
(8, 'Negro Drama', 'Racionais MCs', 'u4lcUooNNLY', 'youtube'),
(9, 'Tempo Perdido', 'Legião Urbana', 'BW73u2yGGa8', 'youtube'),
(10, 'O Mundo é um Moinho', 'Cartola', 'ud9PlROstDw', 'youtube'),
(11, 'Tocando em Frente', 'Almir Sater', 'KxDofVDFu5k', 'youtube'),
(12, 'Aquarela do Brasil', 'Ary Barroso', 'mvdKz4VPPq0', 'youtube'),
(13, 'Tropicália', 'Caetano Veloso', '1Z1qNsm-NUk', 'youtube'),
(14, 'Asa Branca', 'Luiz Gonzaga', 'zIy3EwyBBI0', 'youtube'),
(15, 'Pais e Filhos', 'Legião Urbana', 'iApyBcSg-WA', 'youtube'),
(16, 'Epitáfio', 'Titãs', 'I29JUuotXG4', 'youtube'),
(17, 'Imagine', 'John Lennon', 'zHxobd1WLno', 'youtube'),
(18, 'What''s Going On', 'Marvin Gaye', 'ApthDWoPMFQ', 'youtube'),
(19, 'This Is America', 'Childish Gambino', 'VYOjWnS4cMY', 'youtube');