from fastapi import APIRouter

from app.core import database

router = APIRouter()

@router.get("/on-music-play")
def on_music_play(music_id: int):
    database.on_music_play(music_id)