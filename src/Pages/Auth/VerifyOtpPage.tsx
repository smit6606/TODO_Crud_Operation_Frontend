"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { KeyRound, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import AuthFormLayout from "../../Components/Auth/AuthFormLayout";
import AuthButton from "../../Components/Auth/AuthButton";
import { verifyOtpAPI, forgotPasswordAPI } from "../../Services/api";
import toast from "react-hot-toast";

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState<boolean | number>(false);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds cooldown for resend
    const [verifyCooldown, setVerifyCooldown] = useState(0); // Lockout timer for Verify button
    const [isInvalidated, setIsInvalidated] = useState(false);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    const displayIdentifier = () => {
        const email = sessionStorage.getItem("reset_email") || "";
        if (!email.includes("@")) return email;
        const [localPart, domain] = email.split("@");
        if (localPart.length <= 6) return email; // fallback
        const firstThree = localPart.substring(0, 3);
        const lastThree = localPart.substring(localPart.length - 3);
        const maskedChars = "*".repeat(localPart.length - 6);
        return `${firstThree}${maskedChars}${lastThree}@${domain}`;
    };

    const handleTryAnotherWay = async () => {
        if (timeLeft > 0) return; // Prevent resend if timer is still ticking

        const email = sessionStorage.getItem("reset_email");
        if (!email) {
            toast.error("Session expired, please restart password reset");
            navigate("/forgot");
            return;
        }

        try {
            await forgotPasswordAPI({ identifier: email, sendMethod: "phone" });
            toast.success("OTP sent via SMS text message");
            setTimeLeft(60);
            setIsInvalidated(false);
            setOtp(["", "", "", "", "", ""]);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to send SMS OTP");
        }
    };

    // Timer logic for Resend OTP
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    // Timer logic for Verify OTP Lockout
    useEffect(() => {
        if (verifyCooldown <= 0) return;
        const timerId = setInterval(() => {
            setVerifyCooldown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [verifyCooldown]);

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

        if (otp.some(digit => digit === "")) {
            toast.error("6-Digit Verification Code is required");
            return;
        }

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
            const backendMsg = error.response?.data?.message;
            const fallbackMsg = error.message === 'Network Error' ? "Cannot connect to server" : "Invalid OTP";
            const errorMsg = backendMsg || fallbackMsg;

            toast.error(errorMsg);

            // Progressive restriction logic binding
            if (errorMsg.includes("locked for")) {
                const match = errorMsg.match(/locked for (\d+) (seconds|minutes|hours)/);
                if (match) {
                    const amount = parseInt(match[1]);
                    const unit = match[2];
                    let totalSeconds = amount;
                    if (unit === 'minutes') totalSeconds = amount * 60;
                    if (unit === 'hours') totalSeconds = amount * 3600;

                    setVerifyCooldown(totalSeconds);
                    setIsInvalidated(true);
                }
            } else if (errorMsg.includes("invalidated") || errorMsg.includes("Too many") || errorMsg.includes("locked")) {
                setIsInvalidated(true);
            }
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
            setIsInvalidated(false); // Enable the verify button again
            setOtp(["", "", "", "", "", ""]); // Clear previous OTP
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
                <p className="text-gray-500 text-sm font-medium">
                    Enter the 6-digit code sent to {displayIdentifier()}
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

                    <AuthButton loading={loading} disabled={isInvalidated || verifyCooldown > 0}>
                        Verify Code
                    </AuthButton>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-6 space-y-3"
                >
                    <div className="text-gray-600 text-sm flex flex-col gap-2">
                        <div>
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
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={handleTryAnotherWay}
                                disabled={timeLeft > 0}
                                className={`font-semibold transition-colors ${timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:text-blue-500"
                                    }`}
                            >
                                Try another way (SMS)
                            </button>
                        </div>
                    </div>
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