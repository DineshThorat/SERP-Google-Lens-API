import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./App.css";

function Result() {
  const location = useLocation();
  const { visualMatches } = location.state || { visualMatches: [] };

  return (
    <div id="resultContainer">
      <h2 className="result-title">Results</h2>
      <div id="resultBox">
        {visualMatches.map((element, index) => (
          <div className="card" key={index}>
            <img src={element.thumbnail} alt={element.title} />
            <div className="content">
              <a href={element.link}>{element.title}</a>
            </div>
          </div>
        ))}
      </div>
      <Link to="/" className="back-btn">
        Back to Home
      </Link>
    </div>
  );
}

export default Result;
