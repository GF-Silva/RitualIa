from .database import Database
from .local_database import LocalDatabase
from .config import DB_CONFIG

database = Database(**DB_CONFIG)
local_database = LocalDatabase()