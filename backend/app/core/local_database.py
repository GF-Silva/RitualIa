from app.core import database
import json

class LocalDatabase:
    def local_save_musics(self):
        musics = []

        database_musics = database.get_musics()

        for music in database_musics:
            print(music)
            music_data = {
                "id": music[0],
                "titulo": music[1],
                "artista": music[2],
                "source_id": music[3],
                "plataforma": music[4]
            }
            musics.append(music_data)


        with open("data/dados.json", "w", encoding="utf-8") as f:
            json.dump(musics, f, ensure_ascii=False, indent=2)