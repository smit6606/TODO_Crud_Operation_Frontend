"use client";
import { motion } from "framer-motion";

export default function Shimmer() {
    return (
        <div className="w-full max-w-md mx-auto p-6 space-y-4">
            <motion.div
                className="h-8 bg-gray-200 rounded-md w-1/3 relative overflow-hidden"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </motion.div>

            <div className="space-y-3">
                <motion.div
                    className="h-10 bg-gray-200 rounded-lg w-full relative overflow-hidden"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.1 }}
                >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </motion.div>

                <motion.div
                    className="h-10 bg-gray-200 rounded-lg w-full relative overflow-hidden"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </motion.div>

                <motion.div
                    className="h-12 bg-gray-300 rounded-xl w-full mt-6 relative overflow-hidden"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </motion.div>
            </div>
        </div>
    );
}
