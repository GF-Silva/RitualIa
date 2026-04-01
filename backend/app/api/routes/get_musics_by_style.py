from fastapi import APIRouter

from app.core import database

router = APIRouter()

@router.get('/get-musics-by-style')
def get_musics_by_style(style: str, limit: int = 10):
    return database.get_musics_by_style(style, limit)