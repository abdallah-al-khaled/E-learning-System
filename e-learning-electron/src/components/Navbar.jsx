import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import axios from 'axios';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const [isAdmin, setIsAdmin] = useState(false);
 
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">E-Learning System</h1>
      <ul className="navbar-links">
        {!token && <li><Link to="/register">Register</Link></li>}
       {!token &&  <li><Link to="/login">Login</Link></li>}
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/">Classes</Link></li>
        <li><Link to="/withdraw">Withdraw</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
