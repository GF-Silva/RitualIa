from .database import Database
from .config import DB_CONFIG

database = Database(**DB_CONFIG)