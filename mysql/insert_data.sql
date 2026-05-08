-- Inserção de músicas
INSERT INTO songs (title, artist, source_id, explication_source) VALUES
-- Rock 
('Dias de Luta, Dias de Glória', 'Charlie Brown Jr.', '6eEOegzrwJg', 'Dias_de_luta_dias_de_gloria_zmfji7'), 
('Tempo Perdido', 'Legião Urbana', 'LqmRIG1plVU', 'tempo_perdido_zqc8pw'), 
('Por Você', 'Barão Vermelho', 'JhwJ7_h0i-M', 'Por_voce_aplmbg'), 
-- MPB 
('Andar com Fé', 'Gilberto Gil', 'kyy4SqIw-EY', 'Andar_com_fé_lduoix'),
('Cálice', 'Chico Buarque & Gilberto Gil', '9y2xB90A0CY', 'Calice_vyxyls'), 
('Oceano', 'Djavan', 'P-lxOj0XpEE', 'Oceano_g6rnzn '), 
-- Sertanejo 
('Amanhã Sei Lá', 'Marcos & Belutti', 'tu5bpM3CcUw', 'Amanha_sei_lá_t3i80f'),
('Romaria', 'Renato Teixeira', 'OYCS6SJtHvI', 'Romaria_v19kxx '), 
('Evidências', 'Chitãozinho & Xororó', 'ePjtnSPFWK8', 'evidencias_pqjro3 '); 

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
(1, 1),
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