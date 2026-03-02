"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface FormInputProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder: string;
    name?: string;
    required?: boolean;
    icon?: LucideIcon;
    showPasswordToggle?: boolean;
    onTogglePassword?: React.ReactNode;
    delay?: number;
    error?: string | null;
}

export default function FormInput({
    label,
    type,
    value,
    onChange,
    onBlur,
    placeholder,
    name,
    required = true,
    icon: Icon,
    showPasswordToggle = false,
    onTogglePassword,
    delay = 0,
    error,
}: FormInputProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <AnimatePresence>
                    {error && (
                        <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-md"
                        >
                            {error}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className={`h-5 w-5 transition-colors ${error ? "text-red-400" : "text-gray-400"}`} />
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-full py-3.5 rounded-xl border transition-all duration-200 outline-none placeholder-gray-400 ${error
                            ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-200 bg-red-50/30"
                            : "border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 bg-white"
                        } ${Icon ? "pl-10" : "px-4"} ${showPasswordToggle ? "pr-12" : "px-4"}`}
                    placeholder={placeholder}
                    required={required}
                />
                {showPasswordToggle && onTogglePassword && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {onTogglePassword}
                    </div>
                )}
            </div>
        </motion.div>
    );
}