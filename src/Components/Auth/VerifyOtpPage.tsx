"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { KeyRound, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import AuthFormLayout from "./AuthFormLayout";
import AuthButton from "../Auth/AuthButton";
import { verifyOtpAPI, forgotPasswordAPI } from "../../Services/Auth";
import toast from "react-hot-toast";

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState<boolean | number>(false);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds cooldown
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join("");
        const email = sessionStorage.getItem("reset_email");

        if (!email) {
            toast.error("Session expired, please restart password reset");
            navigate("/forgot");
            return;
        }

        try {
            setLoading(true);
            const response = await verifyOtpAPI({ identifier: email, otp: otpCode });
            if (response.data.success) {
                toast.success(response.data.message || "OTP Verified");
                sessionStorage.setItem("reset_token", response.data.data.resetToken);
                navigate("/change-password");
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Invalid OTP";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timeLeft > 0) return; // Prevent resend if timer is still ticking

        const email = sessionStorage.getItem("reset_email");
        if (!email) {
            toast.error("Session expired, please restart password reset");
            navigate("/forgot");
            return;
        }

        try {
            await forgotPasswordAPI({ identifier: email, sendMethod: "email" });
            toast.success("OTP resent to your email");
            setTimeLeft(60); // Reset timer to 60s
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        }
    };

    return (
        <AuthFormLayout layoutKey="verify-otp">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                    <KeyRound className="w-8 h-8 text-blue-500" />
                </motion.div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Verify Your Email
                </h1>
                <p className="text-gray-500 text-sm">
                    Enter the 6-digit code sent to your email
                </p>
            </motion.div>

            {/* Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100/80 backdrop-blur-sm"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                            6-Digit Verification Code
                        </label>
                        <div className="flex justify-center gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el: HTMLInputElement | null) => {
                                        inputsRef.current[index] = el;
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-12 text-center text-lg font-semibold rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-white"
                                />
                            ))}
                        </div>
                    </motion.div>

                    <AuthButton loading={loading}>Verify Code</AuthButton>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-6 space-y-3"
                >
                    <p className="text-gray-600 text-sm">
                        Didn't receive the code?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={timeLeft > 0}
                            className={`font-semibold transition-colors ${timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:text-blue-500"
                                }`}
                        >
                            {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
                        </button>
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/forgot")}
                        className="text-blue-600 font-semibold hover:text-blue-500 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Forgot Password
                    </button>
                </motion.div>
            </motion.div>
        </AuthFormLayout>
    );
}