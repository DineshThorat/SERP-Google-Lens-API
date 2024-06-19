import React from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

function Result() {
  const location = useLocation();
  const { visualMatches } = location.state || { visualMatches: [] };

  return (
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
  );
}

export default Result;
