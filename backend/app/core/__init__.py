from .database import Database
from .local_database import LocalDatabase
from .music_cache import MusicCache
from .config import DB_CONFIG

database = Database(**DB_CONFIG)
local_database = LocalDatabase(database)
music_cache = MusicCache()