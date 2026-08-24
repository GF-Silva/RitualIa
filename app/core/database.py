import mysql.connector
from mysql.connector.cursor import MySQLCursorDict
from mysql.connector import pooling
from typing import cast, Any
from enum import Enum

class QueryTypes(Enum):
    ONE="one"
    ALL="all"
    EXECUTE="execute"

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

        self.db_pool = pooling.MySQLConnectionPool(**config)

    def __get_connection(self):
        conn = self.db_pool.get_connection()
        conn.ping(reconnect=True, attempts=3, delay=1)
        return conn

    def __execute_query(self, query: str, params: list | None = None, dictionary=True, query_type: QueryTypes = QueryTypes.ALL):
        conn = self.__get_connection()

        try:
            with conn.cursor(dictionary=dictionary) as cursor:
                cursor.execute(query, (params) or ())

                match query_type:
                    case QueryTypes.ALL:
                        return cursor.fetchall()
                    case QueryTypes.ONE:
                        return cursor.fetchone()
                    case QueryTypes.EXECUTE:
                        cursor.commit()
                        return cursor.lastrowid or cursor.rowcount
                    case _:
                        raise ValueError(f"Tipo de consulta não suportado: {query_type}")

        except Exception as err:
            conn.rollback() # Cancela alterações se algo der errado
            print(f"Falha ao executar query: {err}")
            raise err
        
        finally:
            conn.close()
    
    def get_songs(self, genres: int | None = None, emotions: int | None = None, limit: int = 1):
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

        query = f"""
            SELECT songs.* FROM songs
            {joins_clause}
            WHERE {where_clause}
            ORDER BY RAND()   -- Garante aleatoriedade na seleção
            LIMIT %s
        """

        return self.__execute_query(
            query=query,
            params=params
        )

    def get_emotion_id(self, emotion: str) -> list[dict[str, Any]]:
        query = "SELECT id FROM emotions WHERE name = %s"

        return self.__execute_query(
            query=query,
            params=[emotion]
        )

    def get_genre_id(self, genre: str) -> list[dict[str, Any]]:
        query = "SELECT id FROM genres WHERE name = %s"

        return self.__execute_query(
            query=query,
            params=[genre]
        )

    def get_genres(self, limit: int | None = None):
        if limit:
            return self.__execute_query(
                query="SELECT * FROM genres LIMIT %s",
                params=[limit]
            )

        return self.__execute_query(query="SELECT * FROM genres")

    def get_emotions(self, limit: int | None = None):
        if limit:
            return self.__execute_query(
                query="SELECT * FROM emotions LIMIT %s",
                params=[limit]
            )

        return self.__execute_query(query="SELECT * FROM emotions")

    def get_teams(self, limit: int | None):
        if limit:
            return self.__execute_query(
                query="SELECT * FROM national_teams LIMIT %s",
                params=[limit]
            )

        return self.__execute_query(query="SELECT * FROM national_teams")

    def get_team_data(self, id: int):
        return self.__execute_query(
            query="SELECT * FROM national_teams WHERE id = %s",
            params=[id]
        )

    def get_brazilian_songs(self, limit: int = 1):
        return self.__execute_query(
            query="SELECT * FROM brazilian_songs ORDER BY RAND() LIMIT %s",
            params=[limit]
        )