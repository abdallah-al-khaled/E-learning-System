// Classes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css';
import { useNavigate } from "react-router-dom";



const Classes = () => {

  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState('');
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/class');
        setClasses(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);
  


  const enrollClass = async (classId) => {
    try {
    const token = localStorage.getItem('token');
    console.log(token);
    
      const response = await axios.post(`http://localhost:8080/class/${classId}/enroll`,{}, { 
        headers: {
                  Authorization: `${token}`,
                },
       });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error enrolling class:', error);
      setMessage('Failed to enroll');
    }
  };
  const navigate = useNavigate();
  const handelNav = (id) =>{
    navigate("/"+id);
  }

  return (
    <div className='classes'>
      <h1>Available Classes</h1>
      {message && <p>{message}</p>}
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>
            <h2 onClick={() => handelNav(classItem._id)}>{classItem.name}</h2>
            <p>{classItem._id}</p>
            <p>{classItem.description}</p>
            <button onClick={() => enrollClass(classItem._id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classes;
