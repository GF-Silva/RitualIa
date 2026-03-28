import mysql.connector

class Database:
    def __init__(self, host, user, password, database):

        # Conecta com o sql
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

        # Define o cursor
        self.cursor = self.conn.cursor()
    
    def get_musics(self):
        self.cursor.execute("SELECT * FROM musicas")

        return self.cursor.fetchall()

    def get_music_id(self, music_name):
        self.cursor.execute(f"SELECT * FROM musicas WHERE titulo=%s", (music_name,))

        return self.cursor.fetchall()[0][3]