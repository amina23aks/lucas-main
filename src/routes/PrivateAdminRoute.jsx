// src/routes/PrivateAdminRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext/AuthContext.jsx";

const PrivateAdminRoute = ({ children }) => {
  const { user } = useAuth();

  // ✅ If not admin or not logged in, redirect to home
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allow access
  return children;
};

export default PrivateAdminRoute;
