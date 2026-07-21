import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const token = localStorage.getItem("token");

    if (!token) {
        // Redirect to login if token is missing
        return <Navigate to="/admin/login" replace />;
    }

    // Render nested dashboard elements if authenticated
    return <Outlet />;
}
