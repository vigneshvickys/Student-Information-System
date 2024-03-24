import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../login';
import StudentManagement from '../Datatable';
import { Toaster } from 'react-hot-toast';
const MainRouter = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
    else{
        setLoggedIn(false);
    }
  }, []);

  const checkAuthAndNavigate = (loggedIn) => {
    if (!loggedIn) {
        
      return <Navigate to="/login" replace />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              {checkAuthAndNavigate(loggedIn)}
              <StudentManagement />
            </>
          }
        />
      </Routes>
      <Toaster position='top-center' reverseOrder={false} />
    </Router>
  );
};

export default MainRouter;
