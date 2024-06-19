import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [visualMatches, setVisualMatches] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer your-token-if-any",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVisualMatches(data.visual_matches);
        navigate("/result", { state: { visualMatches: data.visual_matches } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="app">
      <div className="upload-section">
        <h2 className="upload-title">Upload Image</h2>
        <input type="file" id="fileInput" onChange={handleFileChange} />
        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default Home;
