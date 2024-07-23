// src/App.js

import React from "react";
import DocumentUpload from "./pages/upload";
import DocumentQuery from "./pages/query";
import Chat from "./pages/chat";
import "./App.css";

function App() {
  return (
    <div className="App">
      <main>
        <Chat />
        <DocumentUpload />
        <DocumentQuery />
      </main>
    </div>
  );
}

export default App;
