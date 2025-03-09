from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import sys

app = Flask(__name__)
CORS(app)

@app.route('/execute', methods=['POST'])
def execute_python():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    try:
        code = file.read().decode('utf-8')

        python_executable = sys.executable  
        result = subprocess.run(
            [python_executable, "-c", code],
            capture_output=True,
            text=True,
            check=True
        )
        output = result.stdout
    except subprocess.CalledProcessError as e:
        output = e.stderr
    except Exception as e:
        output = str(e)

    return jsonify({'output': output})

app.run()
