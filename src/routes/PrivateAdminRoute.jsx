import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext/AuthContext.jsx";

const PrivateAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // ⏳ Wait until auth state is ready
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Chargement...
      </div>
    );
  }

  // ❌ If not admin or not logged in
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allow access
  return children;
};

export default PrivateAdminRoute;
