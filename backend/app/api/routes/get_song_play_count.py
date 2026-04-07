from fastapi import APIRouter

from app.core import database

router = APIRouter()

@router.get('/get-song-play-count', summary="Retorna o número de acessos de uma música")
def get_song_play_count(song_id: int):
    return database.get_song_play_count(song_id)
