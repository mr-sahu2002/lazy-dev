// src/components/DocumentUpload.js

import React, { useState } from "react";
import axios from "axios";

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFiles) {
      setMessage("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("file", selectedFiles[i]);
    }

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
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error uploading files");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload PDF Documents</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DocumentUpload;
