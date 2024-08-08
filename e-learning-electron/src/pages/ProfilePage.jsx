import React, { useEffect, useState } from "react";
import "../styles/LoginPage.css";
import { classesRemote } from "../services/classesService";

function ProfilePage() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await classesRemote.getClasses();
        setClasses(response);
        console.log(response);
        
      } catch (error) {
        console.error("Error fetching classes", error);
      }
    };

    fetchClasses();    
  }, []);
  return (
    <div className='classes'>
      <h1>My Enrolled Classes</h1>
      {/* {message && <p>{message}</p>} */}
    <ul>
      {classes.map((classItem) => (
        <li key={classItem._id}>
          <h2>{classItem.name}</h2>
          <p>{classItem._id}</p>
          <p>{classItem.description}</p>
        </li>
      ))}
    </ul>
  </div>
  );
}
export default ProfilePage;
