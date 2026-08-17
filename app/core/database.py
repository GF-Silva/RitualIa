import mysql.connector
from mysql.connector.cursor import MySQLCursorDict
from typing import cast, Any

class Database:
    """
    Classe responsável por gerenciar a conexão com o banco de dados MySQL
    e executar operações relacionadas às músicas.
    """

    def __init__(self, **config):
        """
        Inicializa a conexão com o banco de dados e define o cursor.

        Args:
            host (str): Endereço do servidor MySQL.
            user (str): Usuário do banco de dados.
            password (str): Senha do banco de dados.
            database (str): Nome do banco de dados a ser utilizado.
        """

        # Conecta com o banco de dados MySQL usando os parâmetros fornecidos
        self.conn = mysql.connector.connect(**config)

        # Cria o cursor para executar comandos SQL
        self.cursor = cast(MySQLCursorDict, self.conn.cursor(dictionary=True))

    def get_songs_by_filter(self, genres: str | None = None, emotions: str | None = None, limit: int = 1):
        """
        Busca músicas no banco de dados aplicando filtros opcionais.

        Args:
            genres (str | None): ID do gênero para filtrar (opcional).
            emotions (str | None): ID da emoção para filtrar (opcional).
            limit (int): Quantidade máxima de músicas a retornar (default = 1).

        Returns:
            list[dict]: Lista de músicas encontradas, cada uma como tupla com os campos da tabela `songs`.

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

    def get_emotion_id(self, emotion: str) -> list[dict[str, Any]]:
        self.cursor.execute("SELECT id FROM emotions WHERE name = %s", (emotion,))
        return cast(list[dict[str, Any]], self.cursor.fetchall())

    def get_genre_id(self, genre: str) -> list[dict[str, Any]]:
        self.cursor.execute("SELECT id FROM genres WHERE name = %s", (genre,))
        return cast(list[dict[str, Any]], self.cursor.fetchall())

    def get_genres(self, limit: int | None):
        if limit:
            self.cursor.execute("SELECT * FROM genres LIMIT %s", (limit,))
            return self.cursor.fetchall()
        
        self.cursor.execute("SELECT * FROM genres")
        return self.cursor.fetchall()

    def get_emotions(self, limit: int | None):
        if limit:
            self.cursor.execute("SELECT * FROM emotions LIMIT %s", (limit,))
            return self.cursor.fetchall()

        self.cursor.execute("SELECT * FROM emotions")
        return self.cursor.fetchall()

    def get_team_data(self, name: str):
        self.cursor.execute("SELECT * FROM national_teams WHERE name = %s", (name,))
        return self.cursor.fetchall()

    def get_brazilian_songs(self, limit: int = 1):
        self.cursor.execute("SELECT * FROM brazilian_songs ORDER BY RAND() LIMIT %s", (limit,))
        return self.cursor.fetchall()