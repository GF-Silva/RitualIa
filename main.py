from flask import Flask, render_template, request, jsonify

# Create an instance of the Flask class
app = Flask(__name__)

# TODO: Calcular a duracao correta
music_data = {
    "Cálice": {
        'artist': 'Chico Buarque',
        'music_id': '9y2xB90A0CY'
    },
    "Onde anda você": {
        'artist': 'Vinicius de Moraes & Toquinho',
        'music_id': 'Gb5sbORA62w'
    }
}

# Use the route() decorator to tell Flask what URL should trigger the function
@app.route("/")
def index():
    return render_template('index.html')


@app.route("/get-music-id", methods=['GET'])
def get_music_id():
    
    music_name = request.args.get("music-name")

    if not music_name in music_data:
        return jsonify({
            'error': 'music not found'
        }), 404
        
    response = jsonify({
        'music_id': music_data[music_name]['music_id']
    })

    return response


# Optional: Run the application directly when the script is executed
if __name__ == '__main__':
    app.run(debug=True)
