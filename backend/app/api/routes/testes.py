from fastapi import APIRouter

router = APIRouter()

@router.get('/teste')
def call_tst():
    return