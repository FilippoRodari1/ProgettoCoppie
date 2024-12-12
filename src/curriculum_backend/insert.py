import mysql.connector # type: ignore

# Funzione per inserire una password nel database
def insert(stringa,mail,exp):
    conn = mysql.connector.connect(
        host="localhost",    
        user="root",         
        password="",        
        database="curriculum_db"   
    )
    cursor = conn.cursor()
    
    #query
    insert_query = "INSERT INTO curriculum_db (name, email, experience) VALUES (%s,%s,%s)"
    cursor.execute(insert_query, (stringa,mail,exp))

    #commit
    conn.commit()
    cursor.close()
    conn.close()