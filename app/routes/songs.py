from flask import Blueprint, request, abort

from core import database

songs_bp = Blueprint('songs', __name__, url_prefix="/songs")

@songs_bp.route('/', methods=['GET'])
def get_songs():
    genre = request.args.get('genre')
    emotion = request.args.get('emotion')
    limit = request.args.get('limit', default=1, type=int)

    print(f"Recebido request com gênero: {genre}, emoção: {emotion}, limite: {limit}")

    genre_result = database.get_genre_id(genre) if genre is not None else None
    emotion_result = database.get_emotion_id(emotion) if emotion is not None else None

    if not genre_result and genre is not None:
        abort(404, description=f"Gênero '{genre}' não encontrado.")
    
    if not emotion_result and emotion is not None:
        abort(404, description=f"Emoção '{emotion}' não encontrada.")

    genre_id = genre_result[0][0] if genre_result else None
    emotion_id = emotion_result[0][0] if emotion_result else None

    music = database.get_songs_by_filter(genre_id, emotion_id, limit)

    if not music: abort(404, description ="Nenhuma música encontrada pra essa combinação")
    
    return music


# @songs_bp.route("/on-song-play" methods=['POST'])
# def on_song_play(song_id):
#     database.on_song_play(song_id)