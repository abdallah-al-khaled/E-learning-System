import React, { useState } from 'react';
import { authRemote } from '../services/authService';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authRemote.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
