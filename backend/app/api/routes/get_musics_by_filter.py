from fastapi import APIRouter

from app.core import database

router = APIRouter()

@router.get('/get-musics-by-filter', summary="Obtem todas as musicas que tenham os dados fornecidos")
def get_musics_by_filter(theme: str = None, genre: str = None, emotions: str = None, limit: int = 10):
    return database.get_musics_by_filter(theme, genre, emotions, limit)