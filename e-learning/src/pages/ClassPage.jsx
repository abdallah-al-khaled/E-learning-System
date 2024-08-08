// Classes.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css";
import { useParams } from "react-router-dom";
import "../styles/ClassPage.css";

const Class = () => {
  const { id } = useParams();

  console.log(id);

  const [classes, setClasses] = useState([]);
  const [files, setFiles] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/class/${id}`);
        setClasses(response.data.singleClass);
        setFiles(response.data.files);
        console.log(response);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleDownload = async (file) => {
    try {
        console.log(file);
        
      const response = await axios.post(`http://localhost:8080/file/download`, {
        responseType: 'blob',
        filename:file.filename,
        path:file.path,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      console.log(response);
      
      link.setAttribute('download',"png.png");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="classes">
      <h1>Available Classes</h1>
      {message && <p>{message}</p>}
      <ul>
        <li>
          <h2>{classes.name}</h2>
          <p>{classes.description}</p>
          <p>{}</p>
          <button>Enroll</button>
        </li>
      </ul>

      <div className="file-list">
        <h2>Files for Class {classes.name}</h2>
        <ul>
          {files.map((file) => (
            <li key={file._id} className="file-item">
              <span className="file-name">{file.filename}</span>
              <button
              className="download-button"
              onClick={() => handleDownload(file)}
            >Download</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Class;
