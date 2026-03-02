"use client";
import { useState } from "react";
import { SocialIcon } from "./SocialIcon";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { setCredentials } from "../../redux/Features/Auth/authSlice";
import { useDispatch } from "react-redux";
import AuthFormLayout from "./AuthFormLayout";
import FormInput from "./FormInput";
import AuthButton from "../Auth/AuthButton";
import { loginUserAPI } from "../../Services/Auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState<boolean | number>(false);
    const [rememberMe, setRememberMeCheck] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await loginUserAPI(formData);
            if (response.data.success) {
                toast.success(response.data.message || "Logged in successfully!");
                const { token } = response.data.data;

                // Assuming backend doesn't return full user object in login response, 
                // but if it does, it's response.data.data.user
                const user = response.data.data.user;

                dispatch(setCredentials({ user, token, rememberMe }));
                // Redirection will be handled by Router
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Invalid credentials";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <AuthFormLayout layoutKey="login">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-500 text-sm">
                    Sign in to your TaskHub account
                </p>
            </motion.div>

            {/* Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100/80 backdrop-blur-sm"
            >
                {/* Social Login */}
                <div className="flex justify-center gap-3 mb-6">
                    <SocialIcon kind="google" />
                    <SocialIcon kind="github" />
                    <SocialIcon kind="twitter" />
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-white text-gray-500">
                            or continue with email
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormInput
                        label="Username, Email, or Phone"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your identifier"
                        icon={Mail}
                        delay={0.4}
                    />

                    <FormInput
                        label="Password"
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
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
                        delay={0.5}
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMeCheck(e.target.checked)}
                                className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-200"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
                            onClick={() => navigate("/forgot")}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <AuthButton loading={loading}>Sign In</AuthButton>
                </form>

                <div className="text-center mt-6 pt-6 border-t border-gray-100">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </motion.div>
        </AuthFormLayout>
    );
}