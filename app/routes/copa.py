from flask import Blueprint, request, abort, render_template
from core import database

copa_bp = Blueprint('copa', __name__, '/copa')

@copa_bp.route('/')
def copa():
    return render_template('/copa/index.html')

@copa_bp.route('/musics', methods=['GET'])
def get_musics():
    limit = request.args.get('limit', default=1, type=int)

    music = database.get_brazilian_musics(limit)

    if not music: abort(404)

    return music

@copa_bp.route('/teams', methods=['GET'])
def get_team_data():
    name = request.args.get('name')

    if not name:
        abort(400)

    team_data = database.get_team_data(name)

    if not team_data:
        abort(404)

    return team_data