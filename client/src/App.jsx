import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [files, setFiles] = useState([]); // Store available Python files
  const [output, setOutput] = useState(null); // Script output
  const [loading, setLoading] = useState(false); // Loading state

  const API_BASE_URL = "http://127.0.0.1:5000";

  useEffect(() => {
    fetchFiles();
  }, []);

  // Function to fetch file list
  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/files`);
      setFiles(response.data.files);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  // Function to execute the selected file
  const executeFile = async (file) => {
    setLoading(true);
    setOutput(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/file-output`, {
        params: { name: file },
      });

      setOutput(response.data.output);
    } catch (err) {
      console.error("Error executing file:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Python File Executor</h2>
      <div className="container">
        {/* File List */}
        <div className="file-list">
          <h3>Available Files:</h3>
          <div className="files_div">
            {files.length === 0 ? (
              <p>No files found.</p>
            ) : (
              files.map((file, index) => (
                <div className="file" key={index}>
                  <button
                    onClick={() => executeFile(file)}
                    className="button"
                    disabled={loading}
                  >
                    {"▶"}
                  </button>
                  <span>{file.toUpperCase()}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Display Output */}
        {output && (
          <div className="output">
            <h3>Execution Output:</h3>
            <pre>{output}</pre>
          </div>
        )}
      </div>
    </>
  );
}
