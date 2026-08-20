from flask import Flask, render_template, jsonify, send_from_directory
from pathlib import Path
from werkzeug.exceptions import HTTPException

from app.routes.api import api_bp
from app.routes.web import web_bp

app = Flask(__name__,
            template_folder='app/pages',
            static_folder='app/pages',
            static_url_path='/app/pages')

STORAGE_ROOT = Path(__file__).resolve().parent / "storage"

@app.route("/storage/<path:filename>")
def storage(filename):
    return send_from_directory(STORAGE_ROOT, filename)

@app.errorhandler(HTTPException)
def handle_http_error(error):
    return jsonify({
        'error': f'{error.name}',
        'detail': error.description
    }), error.code

app.register_blueprint(api_bp, url_prefix='/api')
app.register_blueprint(web_bp)

@app.route('/')
def index():
    return render_template('home/index.html')

if __name__ == '__main__':
    app.run(debug=True)