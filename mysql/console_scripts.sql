UPDATE themes SET name = '["triste", "ocioso"]' WHERE music_id = 5;

SELECT songs.* FROM songs
JOIN themes ON songs.id = themes.music_id
WHERE JSON_CONTAINS(themes.name, '"triste"')
ORDER BY RAND()
LIMIT 10;

UPDATE requests SET access = access + 1 WHERE music_id = 1;

SELECT * FROM requests WHERE music_id = 1;
