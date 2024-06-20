import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
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
        navigate("/result", { state: { visualMatches: data.visual_matches } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="full-container">
      <div className="back">
        <h1>Google-Lens Search</h1>
      </div>
      <div className="container">
        <div className="box1">
          <h2>Upload Image</h2>
          <input type="file" onChange={handleFileChange} />
          <button className="upload-btn" onClick={handleUpload}>
            Search Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
