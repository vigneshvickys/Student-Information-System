import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuth } from './helperFunction'; // Assuming you have a helper function for authentication

const PrivateRoute = ({ element, ...rest }) => {
  const auth = isAuth(); // Assuming isAuth checks if the user is authenticated
  return auth ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location }} />
  );
};

export default PrivateRoute;
