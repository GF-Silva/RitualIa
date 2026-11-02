from flask import Blueprint, render_template

themes_bp = Blueprint('themes', __name__, url_prefix='/themes')

@themes_bp.route('/')
def themes():
    return render_template('/themes/index.html')