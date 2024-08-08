// src/pages/WithdrawClass.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css';
import { classesRemote } from '../services/classesService';

const WithdrawClass = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [userId, setUserId] = useState(''); // Assuming you have a way to get the user ID
  const [withdrawReason, setWithdrawReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const response = await classesRemote.getClasses();
        setEnrolledClasses(response);
      } catch (error) {
        console.error('Error fetching enrolled classes:', error);
      }
    };

    fetchEnrolledClasses();
  }, [userId]);

  const handleWithdraw = async (classId) => {
    try {
        const token = localStorage.getItem("token");
      const response  =  await axios.post('http://localhost:8080/withdrawal/request', 
        { userId, classId,reason:withdrawReason },
        {
          headers: {
            Authorization:token
          },
        }
    );
      console.log(response);
      
      alert('Successfully withdrawn from class');
    } catch (error) {
      console.error('Error withdrawing from class:', error);
    }
  };

  const handleWithdrawClick = (classItem) => {
    setSelectedClass(classItem);
    setShowModal(true);
  };

  return (
    <div className="classes">
      <h2>Withdraw from Class</h2>
      <ul>
        {enrolledClasses.map((classItem) => (
          <li key={classItem._id}>
            {classItem.name}
            <button onClick={() => handleWithdrawClick(classItem)}>Withdraw</button>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Reason for Withdrawal</h3>
            <textarea
              value={withdrawReason}
              onChange={(e) => setWithdrawReason(e.target.value)}
              placeholder="Enter your reason here..."
            ></textarea>
            <button onClick={() =>handleWithdraw(selectedClass._id)}>Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawClass;
