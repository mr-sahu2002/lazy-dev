import React from "react";
import "../style/features.css";

const FeaturesPage = () => {
  return (
    <div>
      <div className="header">
        <div className="logo">LOGO</div>
        <div className="nav">
          <a href="index.html">Home</a>
          <a href="chat.html">Chat</a>
          <a href="about.html">About Us</a>
        </div>
      </div>
      <div className="content">
        <div className="features-heading">FEATURES</div>
        <div className="features">
          <div className="feature-box references">
            <h3>REFERENCES</h3>
            <a href="#">Link</a>
            <p>Description</p>
          </div>
          <div className="feature-box roadmap">
            <h3>ROAD MAP</h3>
            <p>Description</p>
          </div>
          <div className="feature-box ask-notes">
            <h3>ASK YOUR NOTES</h3>
            <p>Description</p>
          </div>
          <div className="feature-box mock-test">
            <h3>MOCK TEST</h3>
            <p>Description</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
