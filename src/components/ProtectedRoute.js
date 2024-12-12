// components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, currentUser }) => {
	const location = useLocation();

	if (!currentUser) {
		// Redirect to login while saving the intended destination
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export default ProtectedRoute;
