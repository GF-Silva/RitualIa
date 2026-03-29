

class MusicCache:
    def __init__(self):
        self.cache = []
    
    def add(self, data):
        self.cache.append(data)

        return True
    
    def remove(self, data):
        self.cache.remove(data)
    
    def clear(self):
        self.cache.clear()
    
    def create_music_cache(self, database):
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

        self.add(musics)