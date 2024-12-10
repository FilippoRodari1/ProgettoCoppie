from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Curriculum(db.Model):
    __tablename__ = 'curricula'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    experience = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())  # Data di creazione

    def __repr__(self):
        return f'<Curriculum {self.name}>'
