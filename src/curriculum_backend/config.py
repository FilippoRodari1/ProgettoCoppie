class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/curriculum_db'  # Configura correttamente il database
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disabilita il tracking delle modifiche (opzionale)
