from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)  # Abilita CORS

# Configurazione Database
DB_CONFIG = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "passwd": "",
    "database": "curriculum_db"
}

def create_db_connection():
    """Crea una connessione al database."""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        print("Connessione al Database Riuscita")
        return connection
    except Error as err:
        print(f"Errore di connessione: {err}")
        return None

@app.post("/api/cv")
def invio():
    """Gestisce la richiesta POST per l'invio dei dati del curriculum."""
    data = request.get_json()
    if not data:
        return jsonify({"message": "Dati non validi"}), 400

    name = data.get("name")
    email = data.get("email")
    experience = data.get("experience")

    if not all([name, email, experience]):
        return jsonify({"message": "Tutti i campi sono obbligatori"}), 400

    connection = create_db_connection()
    if connection is None:
        return jsonify({"message": "Errore di connessione al database"}), 500

    try:
        cursor = connection.cursor()
        query = "INSERT INTO `curricula`(`name`, `email`, `experience`) VALUES (%s, %s, %s)"
        dati = (name, email, experience)
        cursor.execute(query, dati)
        connection.commit()
        return jsonify({"message": "Curriculum inserito con successo"}), 201
    except Error as err:
        print(f"Errore durante l'inserimento: {err}")
        return jsonify({"message": "Errore durante l'inserimento"}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if connection:
            connection.close()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
