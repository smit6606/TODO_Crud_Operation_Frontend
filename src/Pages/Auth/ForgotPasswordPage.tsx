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
                <h1 className="text-2xl font-bold text-[var(--color-text-base)] mb-2 mt-4">Reset Password</h1>
                <p className="text-[var(--color-text-muted)] text-sm px-4">
                    Enter your email to receive a password reset link
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-[var(--color-bg-surface)] rounded-2xl p-6 sm:p-8 shadow-xl border border-[var(--color-border-subtle)] backdrop-blur-sm"
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

                <div className="text-center mt-6 pt-6 border-t border-[var(--color-border-subtle)]">
                    <p className="text-[var(--color-text-muted)] text-sm">
                        Remember your password?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-[var(--color-brand-primary)] font-semibold hover:text-[var(--color-brand-hover)] transition-colors"
                        >Back to Login</button>
                    </p>
                </div>
            </motion.div>
        </AuthFormLayout>
    );
}