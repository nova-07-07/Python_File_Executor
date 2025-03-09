import { useState } from "react";
import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a Python file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/execute", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error("Error executing file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container ffffff-container">
      <h1 className="app-title ffffff-title">Python File Executor</h1>
      <input
        type="file"
        accept=".py"
        onChange={handleFileChange}
        className="file-input ffffff-input"
      />
      <button
        onClick={handleSubmit}
        className="execute-button ffffff-button"
      >
        {loading ? "Executing..." : "Execute"}
      </button>
      {loading && <div className="loader ffffff-loader"></div>}
      {output && (
        <div className="output-container ffffff-output">
          <h2 className="output-title ffffff-output-title">Output:</h2>
          <pre className="output-text ffffff-output-text">{output}</pre>
        </div>
      )}
    </div>
  );
}
