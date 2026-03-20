from flask import Flask, render_template, request, jsonify
import requests as req

CLIENT_ID = 'fZZystuNmRezJL7O34gUK46UP1FV47Fc'

def get_links(nome: str):

    # Buscar músicas
    url = 'https://api-v2.soundcloud.com/search/tracks'
    params = {
        'q': nome,
        'client_id': CLIENT_ID,
        'limit': 5
    }

    response = req.get(url, params=params)
    data = response.json()

    if 'collection' not in data:
        print("Blank")
        return []

    tracks = []
    for track in data['collection']:
        tracks.append({
            'title': track['title'],
            'url': track['permalink_url']
        })
    
    return tracks


# Create an instance of the Flask class
app = Flask(__name__)

# Use the route() decorator to tell Flask what URL should trigger the function
@app.route("/")
def index():
    return render_template('app.html')

@app.route("/get-music", methods=['POST'])
def get_music():
    data = request.get_json()
    valor = data['valor']
    print(valor)

    links = get_links(valor)
    
    if links == []:
        return jsonify({
            "url": ''
        }), 404
    
    url = links[0]['url']

    # Debug
    print(links[0])
    print(links[0]['url'])

    resp = jsonify({
        "url": url
    }), 200

    return resp

# Optional: Run the application directly when the script is executed
if __name__ == '__main__':
    app.run(debug=True)
