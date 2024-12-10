from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config
from services import generate_pdf  # Assicurati che generate_pdf sia un modulo valido
from models import db, Curriculum  # Assicurati che Curriculum e db siano definiti correttamente

app = Flask(__name__)
app.config.from_object(Config)

# Inizializza il DB
db.init_app(app)

# Abilita CORS
CORS(app)

@app.route('/api/cv', methods=['POST'])
def create_cv():
    try:
        data = request.json
        if not data or 'name' not in data or 'email' not in data or 'experience' not in data:
            return jsonify({'error': 'Invalid data'}), 400

        new_cv = Curriculum(name=data['name'], email=data['email'], experience=data['experience'])
        db.session.add(new_cv)
        db.session.commit()

        # Genera il PDF
        pdf_path = generate_pdf(data)  # Assicurati che generate_pdf ritorni un percorso valido
        return send_file(pdf_path, as_attachment=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/cv', methods=['GET'])
def get_all_cvs():
    try:
        curricula = Curriculum.query.all()
        return jsonify([{
            "id": cv.id,
            "name": cv.name,
            "email": cv.email,
            "experience": cv.experience,
            "created_at": cv.created_at
        } for cv in curricula])

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Crea tutte le tabelle nel database
    app.run(debug=True, port=5000)  # Avvia l'app sulla porta 5000
