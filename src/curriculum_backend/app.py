from flask import Flask, jsonify, request
from flask import Flask, jsonify, request
from insert import *
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Abilita CORS per tutte le rotta
@app.route('/api/cv', methods=['POST'])
def process_string():
    # Recupera la stringa dal corpo della richiesta form
    input_string = request.form.get('name'),
    input_email = request.form.get('email'),
    input_experience = request.form.get('experience'),

    if not input_string or not input_email or not input_experience:
        return jsonify({"error": "Dati mancanti"}), 400
    insert(input_string,input_email,input_experience)

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0',port=5000)