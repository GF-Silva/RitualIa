from flask import Blueprint, render_template

copa_bp = Blueprint('copa', __name__, url_prefix='/copa')

@copa_bp.route('/')
def copa():
    return render_template('/copa/index.html')