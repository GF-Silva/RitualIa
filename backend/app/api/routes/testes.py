from fastapi import APIRouter
from app.core import database

router = APIRouter()

@router.get('/teste', summary="Rota para testes")
def call_tst():
    return