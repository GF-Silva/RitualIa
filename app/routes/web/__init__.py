from flask import Blueprint

web_bp = Blueprint('web', __name__)

from app.routes.web.copa import copa_bp
from app.routes.web.themes import themes_bp

web_bp.register_blueprint(copa_bp)
web_bp.register_blueprint(themes_bp)