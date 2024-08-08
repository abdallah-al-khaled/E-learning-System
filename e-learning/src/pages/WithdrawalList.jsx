// src/pages/WithdrawClass.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css';
import "../styles/ClassPage.css";
import { classesRemote } from '../services/classesService';

const WithdrawalList = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [userId, setUserId] = useState(''); // Assuming you have a way to get the user ID
  const [withdrawReason, setWithdrawReason] = useState('');

  useEffect(() => {
    const fetchWithdrawal = async () => {
        try {
            const response  =  await axios.get('http://localhost:8080/withdrawal/');
            console.log(response.data);
            setWithdrawals(response.data);
          } catch (error) {
            console.error('Error withdrawing from class:', error);
          }
    };

    fetchWithdrawal();
  }, [userId]);
  const token = localStorage.getItem("token");

  const handleWithdrawApprove = async (withdrawal) => {
    try {
      const response  =  await axios.put('http://localhost:8080/withdrawal/approve/'+withdrawal._id,
        {},
        {
          headers: {
            Authorization:token
          },
        }
      );
      console.log(response.data);
      withdrawal.status = "approved"
      setWithdrawReason("")
    } catch (error) {
      console.error('Error withdrawing from class:', error);
    }
  };

  const handleWithdrawReject = async (withdrawal) => {
    try {
      const response  =  await axios.put('http://localhost:8080/withdrawal/reject/'+withdrawal._id,
        {},
        {
          headers: {
            Authorization:token
          },
        }
      );
      console.log(response.data);
      withdrawal.status = "rejected"
      setWithdrawReason(withdrawal.reason)
    } catch (error) {
      console.error('Error withdrawing from class:', error);
    }
  };

  return (
    <div className="classes">
      <h2>Withdraw from Class</h2>
      <ul>
        {withdrawals.map((withdrawal) => (
          <li key={withdrawal._id}>
            status:{withdrawal.status}
            <br />
            student email:{withdrawal.user.email}
            <br />
            class name: {withdrawal.class.name}
            <br />
            reason:{(withdrawal.reason)}
            <button className='download-button' style={{ backgroundColor:"#4CAF50" }}
            onClick={()=>handleWithdrawApprove(withdrawal)}>approve</button>
            <button className='download-button' style={{ backgroundColor:"red" }}
            onClick={()=>handleWithdrawReject(withdrawal)}>reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WithdrawalList;
