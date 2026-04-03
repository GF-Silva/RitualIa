from fastapi import APIRouter
from .routes import get_song_played_count, get_songs_by_filter, on_song_play

from .routes import testes

api_router = APIRouter()

api_router.include_router(testes.router)
api_router.include_router(get_songs_by_filter.router)
api_router.include_router(on_song_play.router)
api_router.include_router(get_song_played_count.router)