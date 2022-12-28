import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";


function PrivateRoutes() {
    const { user } = UserAuth();

    return (
        user ? <Outlet/> : <Navigate to="SignIn" />
);
}

export default PrivateRoutes;
