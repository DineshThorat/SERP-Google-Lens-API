import React, { useState } from "react";
// import "./App.css";

function App() {
  const [visualMatches, setVisualMatches] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

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
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="app">
      <input type="file" id="fileUploadBtn" onChange={handleFileUpload} />
      <div id="resultBox">
        {visualMatches.map((element, index) => (
          <div className="card" key={index}>
            <img src={element.thumbnail} alt="" />
            <div className="content">
              <a href={element.link}>{element.title}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
