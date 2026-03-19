import requests
import random

API_KEY = "9809efb51d21bca91ef442431f895a71"

url = "http://ws.audioscrobbler.com/2.0/"

def getSimilar(artist: str):
    params = {
        "method": "artist.getsimilar",
        "artist": artist,
        "api_key": API_KEY,
        "format": "json"
    }

    response = requests.get(url, params=params)

    data = response.json()
    artist = data["similarartists"]["artist"]

    escolhido = random.choice(artist)

    return escolhido["name"]

artista = input("Digite um artista: ")

print(getSimilar(artista))