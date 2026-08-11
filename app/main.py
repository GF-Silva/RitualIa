from flask import Flask, render_template, jsonify
from werkzeug.exceptions import HTTPException

from routes.songs import songs_bp
from routes.copa import copa_bp

app = Flask(__name__,
            template_folder='pages',
            static_folder='pages',
            static_url_path='/pages')

@app.errorhandler(HTTPException)
def handle_http_error(error):
    return jsonify({
        'error': f'{error.name}',
        'detail': error.description
    }), error.code

app.register_blueprint(songs_bp)
app.register_blueprint(copa_bp)

@app.route('/')
def index():
    return render_template('/home/index.html')

if __name__ == '__main__':
    app.run(debug=True)