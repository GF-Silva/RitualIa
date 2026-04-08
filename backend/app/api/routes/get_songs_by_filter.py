from fastapi import APIRouter

from app.core import database

router = APIRouter()

@router.get('/get-songs-by-filter', summary="Obtem todas as musicas que tenham os dados fornecidos")
def get_songs_by_filter(genre: str | None = None, emotions: str | None = None, limit: int = 1):
    return database.get_songs_by_filter(genre, emotions, limit)