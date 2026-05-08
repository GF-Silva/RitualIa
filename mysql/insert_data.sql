-- Inserção de músicas
INSERT INTO songs (title, artist, source_id) VALUES
-- Rock
('Dias de Luta, Dias de Glória', 'Charlie Brown Jr.', ''),
('Tempo Perdido', 'Legião Urbana', 'LqmRIG1plVU'),
('Por Você', 'Barão Vermelho', ''),
-- MPB
('Andar com Fé', 'Gilberto Gil', ''),
('Cálice', 'Chico Buarque & Gilberto Gil', ''),
('Oceano', 'Djavan', ''),
-- Sertanejo
('Amanhã Sei Lá', 'Marcos & Belutti', ''),
('Romaria', 'Renato Teixeira', ''),
('Evidências', 'Chitãozinho & Xororó', '');

INSERT INTO genres (name) VALUES
('MPB'),
('Sertanejo'),
('Rock');

INSERT INTO emotions (name) VALUES
('Esperança'),
('Reflexão'),
('Saudade');

INSERT INTO songs_genres (song_id, genre_id) VALUES
-- Rock
(1, 3),
(2, 3),
(3, 3),
-- MPB
(4, 1),
(5, 1),
(6, 1),
-- Sertanejo
(7, 2),
(8, 2),
(9, 2);

INSERT INTO songs_emotions (song_id, emotion_id) VALUES
-- Rock
(1, 1)
(2, 2),
(3, 3),
-- MPB
(4, 1),
(5, 2),
(6, 3),
-- Setanejo
(7, 1),
(8, 2),
(9, 3);