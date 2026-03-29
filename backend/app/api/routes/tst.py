from fastapi import APIRouter
from app.core import local_database

router = APIRouter()

@router.get('/tst')
def call_tst():
    local_database.local_save_musics()