from fastapi import APIRouter, HTTPException

from app.core import database

router = APIRouter()

@router.get('/get-songs-by-filter', summary="Obtem todas as musicas que tenham os dados fornecidos")
def get_songs_by_filter_name(genre: str | None = None, emotion: str | None = None, limit: int = 1):
    print(f"Recebido request com gênero: {genre}, emoção: {emotion}, limite: {limit}")

    genre_result = database.get_genre_id(genre) if genre is not None else None
    emotion_result = database.get_emotion_id(emotion) if emotion is not None else None

    if not genre_result and genre is not None:
        print(f"Gênero '{genre}' não encontrado no banco de dados.")
        raise HTTPException(status_code=404, detail=f"Gênero '{genre}' não encontrado.")
    
    if not emotion_result and emotion is not None:
        print(f"Emoção '{emotion}' não encontrada no banco de dados.")
        raise HTTPException(status_code=404, detail=f"Emoção '{emotion}' não encontrada.")

    genre_id = genre_result[0][0] if genre_result else None
    emotion_id = emotion_result[0][0] if emotion_result else None

    music = database.get_songs_by_filter(genres=genre_id, emotions=emotion_id, limit=limit)

    if not music:
        print("Nenhuma música encontrada pra essa combinação")
        raise HTTPException(status_code=404, detail = "Nenhuma música encontrada pra essa combinação")
    
    return music