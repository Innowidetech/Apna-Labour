// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // 🚫 If not logged in, go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚦 Allow only admin users
  if (userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized admin → render the page
  return children;
};

export default PrivateRoute;

