from flask import Blueprint, request, abort
from app.core import database

songs_bp = Blueprint('songs', __name__, url_prefix="/songs")

@songs_bp.route('', methods=['GET'])
def get_songs():
    genre_id = request.args.get("genre_id", type=int)
    emotion_id = request.args.get("emotion_id", type=int)
    limit = request.args.get('limit', default=1, type=int)

    music = database.get_songs(genre_id, emotion_id, limit)

    if not music: abort(404, description ="Nenhuma música encontrada pra essa combinação")
    
    return music

@songs_bp.route('/genres', methods=['GET'])
def get_genres():
    limit = request.args.get('limit', type=int)
    return database.get_genres(limit)

@songs_bp.route('/emotions', methods=['GET'])
def get_emotions():
    limit = request.args.get('limit', type=int)
    return database.get_emotions(limit)