"use client";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Features/Auth/authSlice";

export default function HomePage() {
    const dispatch = useDispatch();

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
                Welcome to TaskHub
            </h1>
            <p className="text-gray-500 mb-8">
                You are successfully logged in!
            </p>
            <button
                onClick={() => dispatch(logout())}
                className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
}
