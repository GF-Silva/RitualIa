import requests
import os
from dotenv import load_dotenv
import time
from tts import generate_audios
import json

load_dotenv()

def request_yt_musics(q: str, max_results = 20):
    """
    q -> Query de busca
    """

    url = "https://www.googleapis.com/youtube/v3/search"

    params = {
        "part": "snippet",
        "q": q,
        "type": "video",
        "key": os.getenv("YT_API_KEY"),
        "maxResults": max_results
    }

    return requests.get(url, params=params)

def select_yt_music(req):
    musics = req.json()
    
    for i, video in enumerate(musics['items']):
        print(f"\033[1m{i} - {video['snippet']['title']} \033[0m")               # title
        print("SourceId:", video["id"]["videoId"])                                       # source id
        print(f'URL - https://www.youtube.com/watch?v={video['id']['videoId']}')  # URL
        print(f'Autor: {video['snippet']['channelTitle']}\n')

    index = input("Index do video escolhido (Default = 0): ")
    choosen_index = int(index) if index.strip() != '' else 0

    print(" \n Escolhido: ")
    print(f"\033[1m {musics['items'][choosen_index]['snippet']['title']} \033[0m")

    return musics['items'][choosen_index]

with open("musics.json", 'r', encoding='utf-8') as f:
    file_data: list = json.load(f)

print("Total de musicas:", len(file_data))
print("Comecando leitura...")

songs = []
for music in file_data:
    name, author = music['name'], music['author']

    print(f"\033[1m{name} of {author} \033[0m")

    time.sleep(0.2)
    
    yt_req = request_yt_musics(f"{name} of {author}")

    if (yt_req.status_code != 200):
        print("Erro buscando no yt")
        break

    yt_music = select_yt_music(yt_req)
    sourceId = yt_music["id"]["videoId"]

    # generate_audios()

    songs += [(
        name,
        author,
        sourceId
    )]

    response = input('Continuar (Y/n): ')

    if response.lower().strip() == 'n':
        break

print(songs)