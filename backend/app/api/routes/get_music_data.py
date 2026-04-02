from fastapi import APIRouter
from app.core import database

router = APIRouter()

@router.get("/get-music-data")
async def get_music_data():
    music_data = database.get_music_data()

    return music_data