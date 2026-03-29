import json

class LocalDatabase:
    def __init__(self, database):
        self.database = database
    
    def local_save_musics(self):
        musics = []

        database_musics = self.database.get_musics()

        for music in database_musics:
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
        
        return musics
