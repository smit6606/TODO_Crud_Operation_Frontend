"use client";
import { motion } from "framer-motion";

export default function AuthLeftHero() {
    return (
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {/* Floating Shapes */}
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-6 h-6 bg-blue-400/30 rounded-full"
                />
                <motion.div
                    animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-cyan-400/20 rounded-full"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                />
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 px-8 text-white text-center"
            >
                {/* Logo & Brand */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center mb-12"
                >
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-6"
                    >
                        <svg
                            className="w-12 h-12 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16H9v-6h2v6zm4 0h-2v-6h2v6z" />
                        </svg>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-5xl font-bold mb-3"
                    >
                        <span className="bg-gradient-to-br from-white to-gray-200 bg-clip-text text-transparent pb-1 inline-block">
                            TaskHub
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-blue-300 font-medium text-lg"
                    >
                        Organize. Track. Achieve.
                    </motion.p>
                </motion.div>

                {/* Main Slogan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-light mb-6 leading-tight">
                        Where Great Tasks
                        <br />
                        <span className="font-bold text-cyan-300">Get Done</span>
                    </h2>
                </motion.div>

                {/* Feature Points */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="space-y-4 text-blue-200 text-sm"
                >
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Smart Task Management
                    </motion.div>
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Set Priorities & Deadlines
                    </motion.div>
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Smart Task Sorting
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        </div>
    );
}