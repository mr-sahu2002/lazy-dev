import React, { useState } from "react";
import axios from "axios";
import "../style/chat.css"; // Make sure to create this CSS file
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [pdf, setPdf] = useState("");

  const [answer, setAnswer] = useState(null);
  const [pre, setPre] = useState([]);
  const [project, setProject] = useState([]);
  const [youtube_link, setYotube] = useState([]);
  const [book_link, setBook] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:5000/response", {
        question: question,
        context: context,
        pdf: pdf,
      });

      const ans = response.data.answer;
      const prerequisite = response.data.prerequisite;
      const project_list = response.data.project;
      const youtube = response.data.youtube_links;
      const book = response.data.book_links;

      setAnswer(ans);
      setPre(prerequisite);
      setProject(project_list);
      setYotube(youtube);
      setBook(book);

      console.log(response);
      console.log(pre);
    } catch (err) {
      setError(
        "Error: " + (err.response ? err.response.data.error : err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <div className="logo">Vidya.ai</div>
        <div className="nav">
          <a href="index.html">Home</a>
          <a href="about.html">About Us</a>
          <a href="features.html">Features</a>
        </div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="chat-input">
            <div className="form-section">
              <label htmlFor="learning-topic">What You Want to Learn?</label>
              <input
                type="text"
                id="learning-topic"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex: Deep Learning"
              />
            </div>
            <div className="form-section">
              <label htmlFor="background-knowledge">Background Knowledge</label>
              <input
                type="text"
                id="background-knowledge"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Ex: Python"
              />
            </div>
          </div>
          <button className="button" id="background-knowledge-button">
            {loading ? "loading..." : "start"}
          </button>
        </form>
        <hr></hr>
        <div className="answer">
          <label htmlFor="answer">Answer</label>
          <p> {answer}</p>
        </div>

        <div className="output">
          <div className="form-section feature-box prerequisite">
            <label htmlFor="prerequisite">Prerequisite</label>
            <p>{pre}</p>
          </div>

          <div className="form-section feature-box project-to-do">
            <label htmlFor="project-to-do">Project to Do</label>
            <p>{project}</p>
          </div>

          <div className="form-section feature-box prerequisite">
            <label htmlFor="youtube-links">YouTube Links</label>
            <p> {youtube_link}</p>
          </div>

          <div className="form-section feature-box project-to-do">
            <label htmlFor="textbook">Textbook</label>
            <p>{book_link}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
