from flask import Flask, render_template, request, jsonify
from app.utils.database import Database

db = Database(
    "localhost",
    "root",
    "Gabriel455_300",
    "ritualia"
)

# Create an instance of the Flask class
app = Flask(__name__)

# Use the route() decorator to tell Flask what URL should trigger the function
@app.route("/")
def index():
    return render_template('index.html')

@app.route("/get-music-id", methods=['GET'])
def get_music_id():

    music_name = request.args.get("music-name")

    music_id = db.get_music_id(music_name)
        
    response = jsonify({
        'music_id': music_id
    })

    return response

@app.route("/get-music-data", methods=['GET'])
def get_music_data():
    music_data = db.get_musics()

    return jsonify(music_data)


# Optional: Run the application directly when the script is executed
if __name__ == '__main__':
    app.run(debug=True)
