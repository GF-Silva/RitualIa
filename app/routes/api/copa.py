from flask import Blueprint, request, abort
from app.core import database

copa_bp = Blueprint('copa', __name__, url_prefix='/copa')

@copa_bp.route('/songs', methods=['GET'])
def get_songs():
    limit = request.args.get('limit', default=1, type=int)

    music = database.get_brazilian_songs(limit)

    if not music: abort(404)

    return music

@copa_bp.route('/teams/<string:name>', methods=['GET'])
def get_team_data(name):
    if not name:
        abort(400, description="Informe um nome")
    team_data = database.get_team_data(name)

    if not team_data: abort(404)

    return team_data

# @copa_bp.route('/teams', methods=['GET'])
# def get_teams():
#     limit = request.args.get("limit", type=int)
#     return database.get_teams(limit)