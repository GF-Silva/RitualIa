from fastapi import APIRouter
from .routes import get_music_id, get_music_data, tst

api_router = APIRouter()

api_router.include_router(get_music_id.router)
api_router.include_router(get_music_data.router)
api_router.include_router(tst.router)