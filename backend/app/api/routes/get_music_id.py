from app.core import database
from fastapi import APIRouter

router = APIRouter()

@router.get("/get-music-id")
async def get_music_id(music_name: str):

    music_id = database.get_music_id(music_name)
        
    response = {
        'music_id': music_id
    }

    return response