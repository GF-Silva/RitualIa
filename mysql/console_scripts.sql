update themes set name = '["ditadura"]' where music_id = 2;
update genres set name = '["rock"]' where music_id = 2;
update emotions set name = '["feliz"]' where music_id = 2;

UPDATE themes SET name = '["preconceito", "ditadura"]' WHERE music_id = 5;

SELECT songs.* FROM songs
JOIN themes ON songs.id = themes.music_id
JOIN genres ON songs.id = genres.music_id
JOIN emotions ON songs.id = emotions.music_id
WHERE JSON_CONTAINS(themes.name, '"ditadura"')
  AND JSON_CONTAINS(genres.name, '"rock"')
  AND JSON_CONTAINS(emotions.name, '"feliz"')
ORDER BY RAND()
LIMIT 10;

SELECT songs.* FROM songs
WHERE 1=1
LIMIT 10;


-- Aumenta os acessos de uma musica
UPDATE requests SET access = access + 1 WHERE music_id = 1;

-- Obtem os acessos de uma musica
SELECT * FROM requests WHERE music_id = 1;