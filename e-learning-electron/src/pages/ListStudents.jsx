// src/pages/ListStudents.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ListStudents.css";

const ListStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/all");
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="list-students classes">
      <h2>List of Students</h2>
      <ul>
        {students.map((student) =>
          student.students.map((st) => (
            <li key={st._id}>{st.name}<br></br>{st.email}</li>
            
          ))
        )}
      </ul>
    </div>
  );
};

export default ListStudents;
