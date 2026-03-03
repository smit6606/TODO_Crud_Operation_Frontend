"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Mail, ArrowLeft } from "lucide-react";
import AuthFormLayout from "../../Components/Auth/AuthFormLayout";
import FormInput from "../../Components/Auth/FormInput";
import AuthButton from "../../Components/Auth/AuthButton";
import { forgotPasswordAPI } from "../../Services/api";
import toast from "react-hot-toast";

export default function ForgotPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState<boolean | number>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await forgotPasswordAPI({
                identifier: email,
                sendMethod: "email"
            });
            if (response.data.success) {
                toast.success(response.data.message || "OTP sent successfully");
                // Store email in sessionStorage to use it in verify OTP step if needed
                sessionStorage.setItem("reset_email", email);
                navigate("/verify-otp");
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Failed to send OTP";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthFormLayout layoutKey="forgot">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Reset Your Password
                </h1>
                <p className="text-gray-500 text-sm">
                    Enter your email and we'll send you a verification code
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100/80 backdrop-blur-sm"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        icon={Mail}
                        delay={0.4}
                    />

                    <AuthButton loading={loading}>Send Verification Code</AuthButton>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-gray-300 active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all duration-300 relative z-10" />
                        <span className="relative z-10 group-hover:text-blue-700 transition-colors duration-300">Back to Login</span>
                    </button>
                </div>
            </motion.div>
        </AuthFormLayout>
    );
}