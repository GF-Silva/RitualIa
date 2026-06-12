from fastapi import APIRouter, HTTPException

from app.core import database

router = APIRouter()

@router.get('/copa/get-team-data-by-name', summary="Obtem o hino que tenham o nome fornecido")
def get_team_data_by_name(name: str):

    team_data = database.get_team_data_by_name(name)

    return team_data