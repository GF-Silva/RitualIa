from fastapi import APIRouter
from app.core import database, music_cache

router = APIRouter()

@router.get('/teste')
def call_tst():

    musics = []

    database_musics = database.get_musics(15)

    for music in database_musics:
        music_data = {
            "id": music[0],
            "titulo": music[1],
            "artista": music[2],
            "source_id": music[3],
            "plataforma": music[4]
        }

        musics.append(music_data)

    music_cache.add(musics)

    return music_cache