-- Inserção de músicas
INSERT INTO songs (title, artist, source_id) VALUES


INSERT INTO genres (name) VALUES
('Baião'),                 -- 1
('Folk Rock'),             -- 2
('Hip-Hop'),               -- 3
('MPB'),                   -- 4
('Música de Protesto'),    -- 5
('R&B'),                   -- 6
('Rock Nacional'),         -- 7
('Samba'),                 -- 8
('Sertanejo Raiz'),        -- 9
('Soul'),                  -- 10
('Tropicalismo'),          -- 11
('Rock'),                  -- 12
('Ritmos Brasileiros'),    -- 13
('Pop'),                   -- 14
('Música Contemporânea'),  -- 15
('Clássica / Erudita'),    -- 16
('World Music'),           -- 17
('Jazz'),                  -- 18
('Reggae'),                -- 19
('Forró'),                 -- 20
('Sertanejo'),             -- 21
('Axé'),                   -- 22
('Eletrônica'),            -- 23
('Música Instrumental Brasileira'), -- 24
('Gospel');                -- 25

INSERT INTO emotions (name) VALUES
('Angústia'),        -- 1
('Empoderamento'),   -- 2
('Esperança'),       -- 3
('Indignação'),      -- 4
('Ironia'),          -- 5
('Melancolia'),      -- 6
('Nostalgia'),       -- 7
('Paz'),             -- 8
('Pertencimento'),   -- 9
('Reflexão'),        -- 10
('Resistência'),     -- 11
('Revolta'),         -- 12
('Saudade'),         -- 13
('Tristeza'),        -- 14
('Urgência');        -- 15

INSERT INTO songs_genres (song_id, genre_id) VALUES
