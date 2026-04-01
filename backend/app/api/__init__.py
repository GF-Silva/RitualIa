from fastapi import APIRouter
from .routes import get_music_data, get_music_requests, get_musics_by_style, on_music_play

from .routes import testes

api_router = APIRouter()

api_router.include_router(get_music_data.router)
api_router.include_router(testes.router)
api_router.include_router(get_musics_by_style.router)
api_router.include_router(on_music_play.router)
api_router.include_router(get_music_requests.router)