from fastapi import APIRouter
from app.core import database

router = APIRouter()

@router.get("/get-music-data", summary="Obtem todas as musicas salvas, com um limite")
async def get_music_data(limit: int = 10):
    music_data = database.get_music_data(limit)

    return music_data