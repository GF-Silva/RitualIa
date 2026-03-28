from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.utils.database import Database

db = Database(
    "localhost",
    "root",
    "Gabriel455_300",
    "Ritualia"
)

# Create an instance of the Flask class
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # No futuro, coloque aqui o IP do seu front
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-music-id")
async def get_music_id(music_name: str):

    music_id = db.get_music_id(music_name)
        
    response = {
        'music_id': music_id
    }

    return response

@app.get("/get-music-data")
async def get_music_data():
    music_data = db.get_musics()

    return music_data
