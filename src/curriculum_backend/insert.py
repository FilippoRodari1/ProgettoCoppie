import mysql.connector # type: ignore

# Funzione per inserire una password nel database
def insert(stringa,mail,exp):
    conn = mysql.connector.connect(
        host="localhost",    # o l'indirizzo del tuo database
        user="root",         # il tuo username del DB
        password="",         # la tua password
        database="curriculum_db"   # il nome del tuo database
    )
    cursor = conn.cursor()
    # Esegui la query INSERT utilizzando i parametri legati
    insert_query = "INSERT INTO curriculum_db (name, email, experience) VALUES (%s,%s,%s)"
    cursor.execute(insert_query, (stringa,mail,exp))

    # Commit per salvare le modifiche
    conn.commit()
    cursor.close()
    conn.close()