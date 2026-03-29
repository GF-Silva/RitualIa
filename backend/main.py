from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.api import api_router

# Create an instance of the Flask class
app = FastAPI()

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # No futuro, coloque aqui o IP do seu front
    allow_methods=["*"],
    allow_headers=["*"],
)