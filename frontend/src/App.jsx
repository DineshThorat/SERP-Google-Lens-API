import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Result from "./Result";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [visualMatches, setVisualMatches] = useState([]);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     fetch("http://localhost:3000/upload", {
//       method: "POST",
//       body: formData,
//       headers: {
//         Authorization: "Bearer your-token-if-any",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setVisualMatches(data.visual_matches);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div id="app">
//       <div className="upload-section">
//         <h2 className="upload-title">Upload Image</h2>
//         <input type="file" id="fileInput" onChange={handleFileChange} />
//         <button className="upload-btn" onClick={handleUpload}>Upload</button>
//       </div>
//       <div id="resultBox">
//         {visualMatches.map((element, index) => (
//           <div className="card" key={index}>
//             <img src={element.thumbnail} alt={element.title} />
//             <div className="content">
//               <a href={element.link}>{element.title}</a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
