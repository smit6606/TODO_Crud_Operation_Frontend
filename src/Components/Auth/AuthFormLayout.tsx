"use client";
import { motion, AnimatePresence } from "framer-motion";

interface AuthFormLayoutProps {
    children: React.ReactNode;
    layoutKey: string;
    direction?: number;
}

export default function AuthFormLayout({
    children,
    layoutKey,
    direction = 1,
}: AuthFormLayoutProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={layoutKey}
                initial={{ x: 20 * direction, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20 * direction, opacity: 0 }}
                transition={{
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}