UPDATE music_styles SET styles = '["MPB"]' WHERE music_id = 2;

SELECT * FROM musics
JOIN musics_styles ON musics.id = music_styles.music_id
WHERE JSON_CONTAINS(music_styles.styles, '"MPB"')
LIMIT 10;


SELECT musics.* FROM musics
JOIN music_styles ON musics.id = music_styles.music_id
WHERE JSON_CONTAINS(music_styles.styles, '"MPB"')
ORDER BY RAND()
LIMIT 10;

SELECT musics.* FROM musics JOIN music_styles ON musics.id = music_styles.music_id WHERE JSON_CONTAINS(music_styles.styles, '"MPB"') ORDER BY RAND() LIMIT 10;


SELECT * FROM musics
JOIN music_styles ON musics.id = music_styles.music_id
WHERE JSON_CONTAINS(music_styles.styles, '"MPB"')
LIMIT 10;

UPDATE requests SET access = access + 1 WHERE music_id = 1;

SELECT * FROM requests WHERE music_id = 3;
