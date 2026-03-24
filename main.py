from flask import Flask, render_template, request, jsonify

# Create an instance of the Flask class
app = Flask(__name__)

music_videos = {
    "Cálice": {
        'artist': 'Chico Buarque',
        'id': '9y2xB90A0CY',
        'duration': '6000'
    }
}

# Use the route() decorator to tell Flask what URL should trigger the function
@app.route("/")
def index():
    return render_template('index.html')

@app.route("/get_video", methods=['POST'])
def get_video():
    # Process the POST request and return the video data
    data = request.get_json()
    video_name = data.get('video_name')

    if video_name in music_videos:
        video_id = music_videos[video_name]['id']
        return jsonify({'video_id': video_id})
    else:
        return jsonify({ 'error': 'Video not found' }), 404

# Optional: Run the application directly when the script is executed
if __name__ == '__main__':
    app.run(debug=True)
