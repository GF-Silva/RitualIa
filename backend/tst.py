from app.core.database import Database
import mysql.connector

db = Database(
    "localhost",
    "root",
    "Gabriel455_300",
    "Ritualia"
)

# Conecta com o sql
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Gabriel455_300",
    database="Ritualia"
)

# Define o cursor
cursor = conn.cursor()

cursor.execute("SELECT * FROM musicas ORDER BY RAND() LIMIT %s", (10,))

print(cursor.fetchall())