//This file controls all the routing part that id what will come first when user starts the web application

import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/Login";
import DashboardPage from "../pages/Dashboard";
import DashboardHome from "../pages/Dashboardhome"
import Favourites from  "../pages/Favourites"
import Suggestions from "../pages/Suggestions";

/**
 * AppRouter controls navigation and access to protected routes.
 * - "/" -> LoginPage (redirects to /dashboard if already logged in)
 * - "/dashboard" -> DashboardPage (protected, redirects to / if not logged in)
 * - any other path -> redirect to "/"
 */
export default function AppRouter() {
    const { user, loading } = useAuth();

    if (loading) {
        return null; // replace with <Spinner/> if you add a loader component
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Public route: Login.
                If user exists, navigate to /dashboard instead of showing login. */}
                <Route
                    path="/"
                    element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
                />

                {/* Protected route: Dashboard.
                If no user, send them to login. */}
                <Route
                    path="/dashboard"
                    element={user ? <DashboardPage /> : <Navigate to="/" replace />}
                >
                    <Route index element={<DashboardHome />} />
                    <Route path="favourites" element={<Favourites />} />
                    <Route path="suggestions" element={<Suggestions />} />
                </Route>


                {/* Catch-all: redirect unknown routes to "/" */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}