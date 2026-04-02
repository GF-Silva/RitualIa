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
    
    def get_music_data(self, limit: int = 10):
        self.cursor.execute("SELECT * FROM songs ORDER BY RAND() LIMIT %s", (limit,))

        return self.cursor.fetchall()

    def get_musics_by_filter(self, theme: str = None, genre: str = None, emotions: str = None, limit: int = 10):
        filters = []
        joins = []
        params = []

        if theme:
            filters.append("JSON_CONTAINS(themes.name, %s)")
            joins.append("JOIN themes ON songs.id = themes.music_id")
            params.append(f'"{theme}"')

        if genre:
            filters.append("JSON_CONTAINS(genres.name, %s)")
            joins.append("JOIN genres ON songs.id = genres.music_id")
            params.append(f'"{genre}"')

        if emotions:
            filters.append("JSON_CONTAINS(emotions.name, %s)")
            joins.append("JOIN emotions ON songs.id = emotions.music_id")
            params.append(f'"{emotions}"')
        
        where_clause = " AND ".join(filters) if filters else "1=1"
        joins_clause = " ".join(joins)
        params.append(limit)

        self.cursor.execute(f"""
            SELECT songs.* FROM songs
            {joins_clause}
            WHERE {where_clause}
            ORDER BY RAND()
            LIMIT %s
        """, params)

        return self.cursor.fetchall()
    
    def on_music_play(self, music_id: int):
        self.cursor.execute("UPDATE requests SET access = access + 1 WHERE music_id = %s", (music_id,))
        self.conn.commit()

    def get_music_requests(self, music_id: int):
        self.cursor.execute("SELECT * FROM requests WHERE music_id = %s", (music_id,))

        return self.cursor.fetchall()