import React, { useState } from "react";
import axios from "axios";
import "../style/chat.css"; // Make sure to create this CSS file

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

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };
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
        <div className="logo">LOGO</div>
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
            {pre}
          </div>

          <div className="form-section feature-box project-to-do">
            <label htmlFor="project-to-do">Project to Do</label>
            <p>{project}</p>
          </div>

          <div className="form-section feature-box prerequisite">
            <label htmlFor="youtube-links">YouTube Links</label>
            {youtube_link}
          </div>

          <div className="form-section feature-box project-to-do">
            <label htmlFor="textbook">Textbook</label>
            <p>{book_link}</p>
          </div>

          {/* <div className="form-section">
            <label htmlFor="road-map">Road Map</label>
            <p></p>
          </div> */}
        </div>

        {/* <div className="form-section">
          <label htmlFor="pdf-upload">Upload PDF</label>
          <input
            type="file"
            id="pdf-upload"
            className="file-input"
            accept="application/pdf"
          />
        </div> */}
        <form onSubmit={handleFileUpload}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="application/pdf"
          />
          <button type="submit">Upload</button>
        </form>

        <div className="form-section">
          <label htmlFor="ask-question">Ask Question</label>
          <textarea id="ask-question"></textarea>
          <button className="button" id="ask-question-button">
            Submit
          </button>
        </div>

        <div className="form-section">
          <label htmlFor="mock-test">Mock Test</label>
          <textarea id="mock-test" disabled></textarea>
          <button className="button" id="mock-test-button" disabled>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
