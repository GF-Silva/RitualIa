from fastapi import APIRouter

from app.core import database

router = APIRouter()

@router.get('/get-music-requests')
def get_music_access(music_id: int):
    return database.get_music_requests(music_id)