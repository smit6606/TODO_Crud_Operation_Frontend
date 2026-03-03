import { createBrowserRouter } from "react-router";
import App from "../App";
import AuthPage from "../Pages/Auth/AuthPage";
import HomePage from "../Pages/Home/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "../Pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: HomePage,
            },
            {
                path: "/about",
                Component: (await import("../Pages/About/AboutPage")).default,
            },
            {
                path: "/services",
                Component: (await import("../Pages/Services/ServicesPage")).default,
            },
            {
                path: "/pricing",
                Component: (await import("../Pages/Home/PricingPage")).default,
            },
            {
                path: "/contact",
                Component: (await import("../Pages/Contact/ContactPage")).default,
            },
            {
                // PROTECTED: Only authenticated users can see these pages.
                Component: ProtectedRoute,
                children: [
                    {
                        path: "/todos",
                        Component: (await import("../Pages/Todos/TodoListPage")).default,
                    },
                    {
                        path: "/todos/new",
                        Component: (await import("../Pages/Todos/AddTodoPage")).default,
                    },
                    {
                        path: "/todos/:id/edit",
                        Component: (await import("../Pages/Todos/EditTodoPage")).default,
                    },
                    {
                        path: "/profile",
                        Component: (await import("../Pages/Profile/ProfilePage")).default,
                    },
                    {
                        path: "/users",
                        Component: (await import("../Pages/Users/UsersPage")).default,
                    }
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