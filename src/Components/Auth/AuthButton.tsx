"use client";
import { motion } from "framer-motion";

interface AuthButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    gradient?: "blue" | "green";
    loading?: boolean | number; // boolean for spinner, or number for progress 0-100
    disabled?: boolean;
}

export default function AuthButton({
    children,
    type = "submit",
    onClick,
    gradient = "blue",
    loading = false,
    disabled = false,
}: AuthButtonProps) {
    const gradientClass =
        gradient === "blue"
            ? "from-blue-500 to-cyan-500 shadow-blue-500/25 hover:shadow-blue-500/40"
            : "from-green-500 to-emerald-500 shadow-green-500/25 hover:shadow-green-500/40";

    const progressValue = typeof loading === "number" ? loading : loading ? 100 : 0;
    const isLoaderActive = loading !== false && loading !== 0;

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            disabled={isLoaderActive || disabled}
            className={`relative w-full overflow-hidden bg-gradient-to-r ${gradientClass} text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ${(isLoaderActive || disabled) ? "cursor-not-allowed opacity-90 grayscale-[20%]" : ""
                }`}
        >
            {/* The Range Loader specific effect underneath the text */}
            {isLoaderActive && (
                <motion.div
                    className="absolute top-0 left-0 bottom-0 bg-white/20"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressValue}%` }}
                    transition={{ ease: "linear", duration: 0.3 }}
                />
            )}

            {/* Shimmer overlay when indeterminate loading (boolean true) */}
            {loading === true && (
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            )}

            <div className="relative z-10 flex items-center justify-center gap-2">
                {loading === true && (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {children}
            </div>
        </motion.button>
    );
}
