from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess

app = Flask(__name__)
CORS(app)

FOLDER_PATH = r"I:\project\task-3\server\dir"  # Change to your actual folder path

@app.route("/files", methods=["GET"])
def list_files():
    """Return a list of Python files in the specified folder."""
    try:
        files = [f for f in os.listdir(FOLDER_PATH) if f.endswith(".py")]
        return jsonify({"files": files})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/file-output", methods=["GET"])
def execute_file():
    """Execute a Python file and return its output."""
    filename = request.args.get("name")
    
    if not filename:
        return jsonify({"error": "Filename is required"}), 400
    
    file_path = os.path.join(FOLDER_PATH, filename)
    if not os.path.exists(file_path) or not filename.endswith(".py"):
        return jsonify({"error": "Invalid or non-existent file"}), 400
    
    try:
        result = subprocess.run(["python", file_path], capture_output=True, text=True)
        return jsonify({"output": result.stdout, "error": result.stderr})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
