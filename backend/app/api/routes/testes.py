from fastapi import APIRouter
from app.core import local_database

router = APIRouter()

@router.get('/teste')
def call_tst():
    return local_database.local_save_musics()