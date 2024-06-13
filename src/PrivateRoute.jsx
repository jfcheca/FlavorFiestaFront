import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './component/AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
