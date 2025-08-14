// client/src/components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show a loading indicator while the context is checking the user's auth status
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // If there's no user, redirect them to the login page
  if (!user) {
    // We also pass the original location so we can redirect them back after they log in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, show them the page they requested
  return children;
};

export default ProtectedRoute;