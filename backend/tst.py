from app.utils.database import Database
import json

db = Database(
    "localhost",
    "root",
    "Gabriel455_300",
    "Ritualia"
)

database_musics = db.get_musics()

musics = []

for row in database_musics:
    print(row)
    music_data = {
        "id": row[0],
        "titulo": row[1],
        "artista": row[2],
        "source_id": row[3],
        "plataforma": row[4]
    }
    musics.append(music_data)


with open("data/dados.json", "w", encoding="utf-8") as f:
    json.dump(musics, f, ensure_ascii=False, indent=2)