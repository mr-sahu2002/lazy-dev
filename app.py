import os
from flask import Flask, request,jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from pydantic import ValidationError
from search import youtube_link,book_link
from chat import get_answer 
from rag import main        

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'documents/'  # Ensure this folder exists
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Using a simple class to mock Pydantic's BaseModel for validation
class ProductRequest:
    def __init__(self, question: str, context: str, pdf: str):
        self.question = question
        self.context = context
        self.pdf = pdf

@app.route('/response', methods=['POST'])
def get_response():
    try:
        data = request.json
        data_request = ProductRequest(**data)
    except (TypeError, ValidationError) as e:
        return jsonify({"error": str(e)}), 400
    
    question = data_request.question
    context = data_request.context
    pdf = data_request.pdf

    # Fetch multiple responses based on question and context
    answer = get_answer(question, context, 0)
    pre = get_answer(question, context, 1)
    project = get_answer(question, context, 2)
    title = get_answer(question, context, 3)

    # Get YouTube links and book links based on the title
    youtube = youtube_link(title)
    book = book_link(title)

    # Create a JSON response with all the values
    response = {
        "answer": answer,
        "prerequisite": pre,
        "project": project,
        "youtube_links": youtube,
        "book_links": book
    }

    return jsonify(response)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        main()
        return jsonify({"message": "File uploaded successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)

