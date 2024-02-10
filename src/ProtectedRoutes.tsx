import React from "react";
import { Route, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("profile") || "");

  if (isAuthenticated) {
    return <>{element}</>;
  } else {
    return <Route element={<Navigate to="/account" replace />} />;
  }
};

export default ProtectedRoute;
