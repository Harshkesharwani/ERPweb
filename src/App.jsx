import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './Pages/Login';
import StudentRoute from './Pages/StudentRoute';
import TeacherRoute from './Pages/TeacherRoute';
import AdminRoute from './Pages/AdminRoute';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Student/*" element={<StudentRoute />} />
        <Route path="/Teacher/*" element={<TeacherRoute />} />
        <Route path="/Admin/*" element={<AdminRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
