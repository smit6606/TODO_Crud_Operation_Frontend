"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Mail, ArrowLeft } from "lucide-react";
import AuthFormLayout from "./AuthFormLayout";
import FormInput from "./FormInput";
import AuthButton from "../Auth/AuthButton";
import { forgotPasswordAPI } from "../../Services/Auth";
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

                <div className="text-center mt-6 pt-6 border-t border-gray-100">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-600 font-semibold hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </button>
                </div>
            </motion.div>
        </AuthFormLayout>
    );
}