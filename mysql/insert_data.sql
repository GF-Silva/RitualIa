-- Inserção de músicas
INSERT INTO songs (title, artist, source_id) VALUES
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

INSERT INTO genres (name) VALUES
('Baião'),
('Folk Rock'),
('Hip-Hop'),
('MPB'),
('Música de Protesto'),
('R&B'),
('Rap'),
('Rock Nacional'),
('Samba'),
('Sertanejo Raiz'),
('Soul'),
('Tropicalismo');

INSERT INTO emotions (name) VALUES
('Angústia'),
('Empoderamento'),
('Esperança'),
('Indignação'),
('Ironia'),
('Melancolia'),
('Nostalgia'),
('Paz'),
('Pertencimento'),
('Reflexão'),
('Resistência'),
('Revolta'),
('Saudade'),
('Tristeza'),
('Urgência');

-- song_genres (use os IDs da sua tabela de songs e themes)
INSERT INTO songs_genres (song_id, genre_id) VALUES
-- Apesar de Você (1)
(1, 4),  -- MPB
(1, 9),  -- Samba
(1, 5),  -- Música de Protesto
-- A Carne (2)
(2, 4),  -- MPB
(2, 9),  -- Samba
(2, 5),  -- Música de Protesto
-- Construção (3)
(3, 4),  -- MPB
(3, 9),  -- Samba
(3, 5),  -- Música de Protesto
-- Cálice (4)
(4, 4),  -- MPB
(4, 9),  -- Samba
(4, 5),  -- Música de Protesto
-- Pra Não Dizer que Não Falei das Flores (5)
(5, 4),  -- MPB
(5, 5),  -- Música de Protesto
-- Que País É Este (6)
(6, 8),  -- Rock Nacional
(6, 5),  -- Música de Protesto
-- Diário de um Detento (7)
(7, 7),  -- Rap
(7, 3),  -- Hip-Hop
-- Negro Drama (8)
(8, 7),  -- Rap
(8, 3),  -- Hip-Hop
-- Tempo Perdido (9)
(9, 8),  -- Rock Nacional
(9, 2),  -- Folk Rock
-- O Mundo é um Moinho (10)
(10, 9), -- Samba
(10, 4), -- MPB
-- Tocando em Frente (11)
(11, 4), -- MPB
(11, 2), -- Sertanejo Raiz
-- Aquarela do Brasil (12)
(12, 9), -- Samba
(12, 4), -- MPB
-- Tropicália (13)
(13, 12), -- Tropicalismo
(13, 4),  -- MPB
-- Asa Branca (14)
(14, 1), -- Baião
-- Pais e Filhos (15)
(15, 8), -- Rock Nacional
(15, 6), -- Folk Rock
-- Epitáfio (16)
(16, 8), -- Rock Nacional
-- Imagine (17)
(17, 6), -- Folk Rock
-- What's Going On (18)
(18, 6), -- R&B
(18, 11), -- Soul
-- This Is America (19)
(19, 7), -- Rap
(19, 3); -- Hip-Hop

-- song_emotions
INSERT INTO songs_emotions (song_id, emotion_id) VALUES
-- Apesar de Você (1)
(1, 11), -- Resistência
(1, 7),  -- Nostalgia
(1, 5), -- Ironia
-- A Carne (2)
(2, 4),  -- Indignação
(2, 12), -- Revolta
(2, 3),  -- Esperança
-- Construção (3)
(3, 8),  -- Angústia
(3, 11), -- Resistência
(3, 14), -- Tristeza
-- Cálice (4)
(4, 8),  -- Angústia
(4, 11), -- Resistência
(4, 4),  -- Indignação
-- Pra Não Dizer que Não Falei das Flores (5)
(5, 11), -- Resistência
(5, 3),  -- Esperança
(5, 15), -- Urgência
-- Que País É Este (6)
(6, 4),  -- Indignação
(6, 12), -- Revolta
(6, 5),  -- Ironia
-- Diário de um Detento (7)
(7, 4),  -- Indignação
(7, 8),  -- Angústia
(7, 14), -- Tristeza
(7, 12), -- Revolta
-- Negro Drama (8)
(8, 4),  -- Indignação
(8, 12), -- Revolta
(8, 2),  -- Empoderamento
(8, 11), -- Resistência
-- Tempo Perdido (9)
(9, 6),  -- Melancolia
(9, 10), -- Reflexão
(9, 14), -- Tristeza
-- O Mundo é um Moinho (10)
(10, 13), -- Saudade
(10, 6),  -- Melancolia
(10, 14), -- Tristeza
-- Tocando em Frente (11)
(11, 3),  -- Esperança
(11, 10), -- Reflexão
(11, 9),  -- Pertencimento
-- Aquarela do Brasil (12)
(12, 9),  -- Pertencimento
(12, 3),  -- Esperança
(12, 7),  -- Nostalgia
-- Tropicália (13)
(13, 7),  -- Nostalgia
(13, 10), -- Reflexão
(13, 5),  -- Ironia
-- Asa Branca (14)
(14, 13), -- Saudade
(14, 9),  -- Pertencimento
(14, 6),  -- Melancolia
-- Pais e Filhos (15)
(15, 8),  -- Angústia
(15, 15), -- Urgência
(15, 14), -- Tristeza
(15, 6),  -- Melancolia
-- Epitáfio (16)
(16, 10), -- Reflexão
(16, 6),  -- Melancolia
(16, 14), -- Tristeza
-- Imagine (17)
(17, 3),  -- Esperança
(17, 12), -- Paz
(17, 10), -- Reflexão
-- What's Going On (18)
(18, 3),  -- Esperança
(18, 12), -- Paz
(18, 4),  -- Indignação
(18, 15), -- Urgência
-- This Is America (19)
(19, 4),  -- Indignação
(19, 12), -- Revolta
(19, 2),  -- Empoderamento
(19, 5);  -- Ironia
