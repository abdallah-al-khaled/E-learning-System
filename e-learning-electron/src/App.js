import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Classes from './pages/ClassesPage';
import ProfilePage from './pages/ProfilePage';
import Class from './pages/ClassPage';
import WithdrawClass from './pages/WithdrawClass';
import AdminPage from './pages/AdminPage';
import AddClass from './pages/AddClass';
import ListStudents from './pages/ListStudents';
import WithdrawalList from './pages/WithdrawalList';
import AddFile from './pages/AddFile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Classes />} />
      <Route path="/:id" element={<Class />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/withdraw" element={<WithdrawClass />} />
      <Route path="/admin" element={<AdminPage />} />

      <Route path="/admin/add-class" element={<AddClass />} />
      <Route path="/admin/list-students" element={<ListStudents />} />
      <Route path="/admin/withdraw-class" element={<WithdrawalList />} />
      <Route path="/admin/upload-files" element={<AddFile />} />
      {/* 
      <Route path="/list-students" element={<ListStudents />} />
      <Route path="/upload-files" element={<UploadFiles />} />
      */}

      {/* <Route path="/admin" element={<AdminPage />} />
      <Route path="/enroll" element={<EnrollPage />} />
      <Route path="/withdraw" element={<WithdrawalPage />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
