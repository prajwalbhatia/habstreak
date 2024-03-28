import useGetUserData from "Hooks/useGetUserData";
import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  // const isAuthenticated = JSON.parse(localStorage.getItem("profile") || "");

  const user = useGetUserData();
  const isAuthenticated = user || null;

  if (isAuthenticated) {
    return <>{element}</>;
  } else {
    return  <Routes><Route element={<Navigate to="/account" replace />} /></Routes> ;
  }
};

export default ProtectedRoute;
