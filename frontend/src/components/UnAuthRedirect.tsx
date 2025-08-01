import React from "react";
import { Navigate } from "react-router-dom";

const UnAuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default UnAuthRedirect;