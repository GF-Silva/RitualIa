from flask import Blueprint

api_bp = Blueprint('api', __name__)

from app.routes.api.copa import copa_bp

api_bp.register_blueprint(copa_bp)