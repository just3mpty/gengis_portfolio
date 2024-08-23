"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AUTH } from "@/utils/firebaseConfig";
import Login from "./Login";
import DashBoard from "./DashBoard";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(AUTH, (user) => {
            setIsAuthenticated(!!user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Loading...</p>;

    return isAuthenticated ? (
        <DashBoard />
    ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
    );
};

export default ProtectedRoute;
