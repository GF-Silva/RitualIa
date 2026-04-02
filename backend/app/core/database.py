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

    def get_musics_by_theme(self, theme: str, limit: int = 10):
        self.cursor.execute("""
            SELECT musics.* FROM musics 
            JOIN music_styles ON musics.id = music_styles.music_id
            WHERE JSON_CONTAINS(music_styles.styles, %s)
            ORDER BY RAND()
            LIMIT %s
        """, (f'"{theme}"', limit))

        return self.cursor.fetchall()
    
    def on_music_play(self, music_id: int):
        self.cursor.execute("UPDATE requests SET access = access + 1 WHERE music_id = %s", (music_id,))
        self.conn.commit()

    def get_music_requests(self, music_id: int):
        self.cursor.execute("SELECT * FROM requests WHERE music_id = %s", (music_id,))

        return self.cursor.fetchall()