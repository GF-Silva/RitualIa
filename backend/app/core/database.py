import mysql.connector

class Database:
    """
    Classe responsável por gerenciar a conexão com o banco de dados MySQL
    e executar operações relacionadas às músicas.
    """

    def __init__(self, host: str, user: str, password: str, database: str):
        """
        Inicializa a conexão com o banco de dados e define o cursor.

        Args:
            host (str): Endereço do servidor MySQL.
            user (str): Usuário do banco de dados.
            password (str): Senha do banco de dados.
            database (str): Nome do banco de dados a ser utilizado.
        """

        # Conecta com o banco de dados MySQL usando os parâmetros fornecidos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            connection_timeout=10
        )

        # Cria o cursor para executar comandos SQL
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

        filters = []   # Lista de condições WHERE
        joins = []     # Lista de JOINs necessários
        params = []    # Parâmetros para substituição segura (%s)

        if genres:
            # Se houver filtro de gênero, adiciona a condição e o JOIN correspondente
            filters.append("songs_genres.genre_id = %s")
            joins.append("JOIN songs_genres ON songs.id = songs_genres.song_id")
            params.append(genres)

        if emotions:
            # Se houver filtro de emoção, adiciona a condição e o JOIN correspondente
            filters.append("songs_emotions.emotion_id = %s")
            joins.append("JOIN songs_emotions ON songs.id = songs_emotions.song_id")
            params.append(emotions)
        
        # Se não houver filtros, usa "1=1" para não quebrar a query
        where_clause = " AND ".join(filters) if filters else "1=1"
        joins_clause = " ".join(joins)

        # Adiciona o limite como último parâmetro
        params.append(limit)

        # Executa a query com filtros dinâmicos
        self.cursor.execute(f"""
            SELECT songs.* FROM songs
            {joins_clause}
            WHERE {where_clause}
            ORDER BY RAND()   -- Garante aleatoriedade na seleção
            LIMIT %s
        """, params)

        result = self.cursor.fetchall()

        return result

    def get_emotion_id(self, emotion: str):
        self.cursor.execute("SELECT id FROM emotions WHERE name = %s", (emotion,))

        return self.cursor.fetchall()

    def get_genre_id(self, genre: str):
        self.cursor.execute("SELECT id FROM genres WHERE name = %s", (genre,))

        return self.cursor.fetchall()
    
    def on_song_play(self, genre: str, emotion: str):
        """
        Atualiza estatísticas de reprodução de uma música.

        Args:
            song_id (int): ID da música que foi reproduzida.

        Efeito colateral:
            - Incrementa o campo `play_count` em +1 na tabela `songs`.
            - Executa commit para salvar a alteração no banco.
        """

        genre_result = self.get_genre_id(genre) if genre is not None else None
        emotion_result = self.get_emotion_id(emotion) if emotion is not None else None

        genre_id = genre_result[0][0] if genre_result else None
        emotion_id = emotion_result[0][0] if emotion_result else None

        # Atualiza o contador de reproduções da música
        print(1)
        self.cursor.execute("UPDATE genres SET play_count = play_count + 1 WHERE id = %s", (genre_id,),)
        self.cursor.execute("UPDATE emotions SET play_count = play_count + 1 WHERE id = %s", (emotion_id,),)
        self.conn.commit()

    def get_song_play_count(self, song_id: int):
        """
        Consulta informações de reprodução de uma música.

        Args:
            song_id (int): ID da música a ser consultada.

        Returns:
            list[tuple]: Retorna uma lista contendo título, artista e número de reproduções.
        """

        # Busca título, artista e contador de reproduções da música
        self.cursor.execute("SELECT title, artist, play_count FROM songs WHERE id = %s", (song_id,))
        return self.cursor.fetchall()
