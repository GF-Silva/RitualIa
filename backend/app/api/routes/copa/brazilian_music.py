from fastapi import APIRouter

from app.core import database

router = APIRouter()

@router.get('/copa/brazilian-music', summary="Obtem as músicas brasileiras")
def get_musics_from_brasil(limit: int = 1):

    music = database.get_brazilian_musics(limit)

    return music