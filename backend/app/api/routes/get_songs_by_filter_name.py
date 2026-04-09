from fastapi import APIRouter, HTTPException

from app.core import database

router = APIRouter()

@router.get('/get-songs-by-filter-name', summary="Obtem todas as musicas que tenham os dados fornecidos")
def get_songs_by_filter_name(genre: str | None = None, emotion: str | None = None, limit: int = 1):
    genre_result = database.get_genre_id(genre) if genre is not None else None
    emotion_result = database.get_emotion_id(emotion) if emotion is not None else None

    genre_id = genre_result[0][0] if genre_result else None
    emotion_id = emotion_result[0][0] if emotion_result else None

    music = database.get_songs_by_filter(genres=genre_id, emotions=emotion_id, limit=limit)

    if not music:
        raise HTTPException(status_code=404, detail = "Nenhuma música encontrada pra essa combinação")
    
    return music