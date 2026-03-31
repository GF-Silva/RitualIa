import mysql.connector

class Database:
    def __init__(self, host: str, user: str, password: str, database: str):

        # Conecta com o sql
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

        # Define o cursor
        self.cursor = self.conn.cursor()
    
    def get_musics(self, limit: int = 10):
        self.cursor.execute("SELECT * FROM musicas ORDER BY RAND() LIMIT %s", (limit,))

        return self.cursor.fetchall()