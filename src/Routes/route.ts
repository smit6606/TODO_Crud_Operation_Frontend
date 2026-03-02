import { createBrowserRouter } from "react-router";
import App from "../App";
import AuthPage from "../Components/Auth/AuthPage";
import HomePage from "../Pages/Home/HomePage";
import ProtectedRoute from "../Components/common/ProtectedRoute";
import PublicRoute from "../Components/common/PublicRoute";
import NotFound from "../Components/common/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                // PROTECTED: Only authenticated users can see the Home page.
                // If not authenticated, ProtectedRoute bounces them to /login
                Component: ProtectedRoute,
                children: [
                    {
                        path: "/",
                        Component: HomePage,
                    },
                ]
            },
            {
                // PUBLIC: Only UN-authenticated users can see the Login page.
                // If they are logged in, PublicRoute automatically bounces them to /
                Component: PublicRoute,
                children: [
                    {
                        path: "/login",
                        Component: AuthPage,
                    },
                    {
                        path: "/signup",
                        Component: AuthPage,
                    },
                    {
                        path: "/forgot",
                        Component: AuthPage,
                    },
                    {
                        path: "/verify-otp",
                        Component: AuthPage,
                    },
                    {
                        path: "/change-password",
                        Component: AuthPage,
                    }
                ]
            },
            {
                path: "*",
                Component: NotFound,
            }
        ],
    },
]);