from fastapi import APIRouter, HTTPException

from app.core import database

router = APIRouter()
debug = True
@router.get('/get-songs-by-filter-name', summary="Obtem todas as musicas que tenham os dados fornecidos")
def get_songs_by_filter_name(genre: str | None = None, emotion: str | None = None, limit: int = 1):
    if debug:
        return [
            ('Apesar de Você', 'Chico Buarque', 'bGAJlOwUgHY'),
            ('A Carne', 'Elza Soares', 'HZXSo5lKk0g'),
            ('Construção', 'Chico Buarque', 'wBfVsucRe1w'),
            ('Cálice', 'Chico Buarque e Gilberto Gil', '9y2xB90A0CY'),
            ('Pra Não Dizer Que Não Falei das Flores', 'Geraldo Vandré', 'KdvsXn8oVPY'),
            ('Que País É Este', 'Legião Urbana', 'vA-3BYOW2wo'),
            ('Diário de um Detento', 'Racionais MCs', 'dGFxdmuDA4A'),
            ('Negro Drama', 'Racionais MCs', 'u4lcUooNNLY'),
            ('Tempo Perdido', 'Legião Urbana', 'BW73u2yGGa8'),
            ('O Mundo é um Moinho', 'Cartola', 'ud9PlROstDw'),
        ]
    genre_result = database.get_genre_id(genre) if genre is not None else None
    emotion_result = database.get_emotion_id(emotion) if emotion is not None else None

    genre_id = genre_result[0][0] if genre_result else None
    emotion_id = emotion_result[0][0] if emotion_result else None

    music = database.get_songs_by_filter(genres=genre_id, emotions=emotion_id, limit=limit)

    if not music:
        raise HTTPException(status_code=404, detail = "Nenhuma música encontrada pra essa combinação")
    
    return music