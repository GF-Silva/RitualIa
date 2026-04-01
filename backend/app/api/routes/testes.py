from fastapi import APIRouter
from app.core import database

router = APIRouter()

@router.get('/teste')
def call_tst():
    return