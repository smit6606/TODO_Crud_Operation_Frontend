"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import AuthFormLayout from "../../Components/Auth/AuthFormLayout";
import FormInput from "../../Components/Auth/FormInput";
import AuthButton from "../../Components/Auth/AuthButton";
import { resetPasswordAPI } from "../../Services/api";
import toast from "react-hot-toast";

export default function ChangePasswordPage() {
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [loading, setLoading] = useState<boolean | number>(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const resetToken = sessionStorage.getItem("reset_token");
        if (!resetToken) {
            toast.error("Session expired, please restart password reset");
            navigate("/forgot");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await resetPasswordAPI({
                resetToken,
                newPassword: formData.password,
                confirmPassword: formData.confirmPassword
            });
            if (response.data.success) {
                toast.success(response.data.message || "Password changed successfully!");
                sessionStorage.removeItem("reset_token");
                sessionStorage.removeItem("reset_email");
                navigate("/login");
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Failed to reset password";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <AuthFormLayout layoutKey="change-password">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                    <Lock className="w-8 h-8 text-green-500" />
                </motion.div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Create New Password
                </h1>
                <p className="text-gray-500 text-sm">
                    Your new password must be different from previous used passwords
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100/80 backdrop-blur-sm"
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormInput
                        label="New Password"
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        icon={Lock}
                        showPasswordToggle
                        onTogglePassword={
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        }
                        delay={0.4}
                    />

                    <FormInput
                        label="Confirm Password"
                        type={showPass2 ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        icon={Lock}
                        showPasswordToggle
                        onTogglePassword={
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                                onClick={() => setShowPass2(!showPass2)}
                            >
                                {showPass2 ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        }
                        delay={0.5}
                    />

                    <AuthButton loading={loading} gradient="green">Update Password</AuthButton>
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