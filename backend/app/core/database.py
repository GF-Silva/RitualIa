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

    def get_songs_by_filter(self, genres: str | None = None, emotions: str | None = None, limit: int = 1):
        """
        Busca músicas no banco de dados aplicando filtros opcionais.
    
        Args:
            genres (str | None): ID do gênero para filtrar (opcional).
            emotions (str | None): ID da emoção para filtrar (opcional).
            limit (int): Quantidade máxima de músicas a retornar (default = 1).
    
        Returns:
            list[tuple]: Lista de músicas encontradas, cada uma como tupla com os campos da tabela `songs`.
    
        Observação:
            - Se nenhum filtro for passado, retorna músicas aleatórias.
            - Usa ORDER BY RAND() para garantir aleatoriedade.
        """
        
        filters = []
        joins = []
        params = []

        if genres:
            filters.append("songs_genres.genre_id = %s")
            joins.append("JOIN songs_genres ON songs.id = songs_genres.song_id")
            params.append(genres)

        if emotions:
            filters.append("songs_emotions.emotion_id = %s")
            joins.append("JOIN songs_emotions ON songs.id = songs_emotions.song_id")
            params.append(emotions)
        
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
    
    def on_song_play(self, song_id: int):
        """
        Atualiza estatísticas de reprodução de uma música.
    
        Args:
            song_id (int): ID da música que foi reproduzida.
    
        Efeito colateral:
            - Incrementa o campo `played_times` em +1 na tabela `songs`.
            - Executa commit para salvar a alteração no banco.
        """
        
        self.cursor.execute("UPDATE songs SET play_count = played_times + 1 WHERE id = %s", (song_id,))
        self.conn.commit()

    def get_song_play_count(self, song_id: int):
        self.cursor.execute("SELECT title, artist, play_count FROM songs WHERE id = %s", (song_id,))

        return self.cursor.fetchall()
