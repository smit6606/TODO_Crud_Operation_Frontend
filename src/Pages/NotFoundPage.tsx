"use client";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { CopyX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
            >
                <div className="flex justify-center">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.05 }}
                        className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center shadow-inner"
                    >
                        <CopyX size={48} className="drop-shadow-sm" />
                    </motion.div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold">Page Not Found</h2>
                    <p className="text-gray-500 text-sm">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>

                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/30 transition-shadow"
                    >
                        Return Home
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
