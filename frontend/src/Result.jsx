import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Result.css";

function Result() {
  const location = useLocation();
  const { visualMatches } = location.state || { visualMatches: [] };

  return (
    <div id="resultPage">
      <div id="titleContainer">
        <h2>Results</h2>
      </div>
      <div id="resultContainer">
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
        <div className="back-home">
          <Link to="/" className="back-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
