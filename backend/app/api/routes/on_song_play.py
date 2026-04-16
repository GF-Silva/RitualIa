from fastapi import APIRouter

from app.core import database

router = APIRouter()

@router.get("/on-song-play", summary="Processa ações ao iniciar uma musica")
def on_song_play(genre: str, emotion: str):
    database.on_song_play(genre, emotion)
    print(1)
