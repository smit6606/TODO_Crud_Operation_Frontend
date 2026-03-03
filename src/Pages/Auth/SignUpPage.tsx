"use client";
import { useState } from "react";
import { SocialIcon } from "../../Components/Auth/SocialIcon";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import AuthFormLayout from "../../Components/Auth/AuthFormLayout";
import FormInput from "../../Components/Auth/FormInput";
import AuthButton from "../../Components/Auth/AuthButton";
import { registerUserAPI } from "../../Services/api";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [loading, setLoading] = useState<boolean | number>(false);
    const [formData, setFormData] = useState({
        name: "",
        user_name: "",
        email: "",
        phone_no: "",
        password: "",
        confirmPassword: "",
        gender: "",
        about: "",
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const validateField = (name: string, value: string) => {
        let error = "";
        if (name === "name" && value.length < 2) error = "Full Name must be at least 2 characters";
        if (name === "user_name" && value.length < 3) error = "Username must be at least 3 characters";
        if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        if (name === "phone_no" && !/^\d{10}$/.test(value)) error = "Phone number must be exactly 10 digits";
        if (name === "password" && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
            error = "Password must be 8+ chars, with upper, lower, number, and special char";
        }
        if (name === "confirmPassword" && value !== formData.password) error = "Passwords do not match";
        if (name === "gender" && !value) error = "Please select a gender";

        setFormErrors(prev => ({ ...prev, [name]: error }));
        return error === "";
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        validateField(e.target.name, e.target.value);
    };

    const validateForm = () => {
        const isFullNameValid = validateField("name", formData.name);
        const isNameValid = validateField("user_name", formData.user_name);
        const isEmailValid = validateField("email", formData.email);
        const isPhoneValid = validateField("phone_no", formData.phone_no);
        const isPassValid = validateField("password", formData.password);
        const isConfirmValid = validateField("confirmPassword", formData.confirmPassword);
        const isGenderValid = validateField("gender", formData.gender);
        return isFullNameValid && isNameValid && isEmailValid && isPhoneValid && isPassValid && isConfirmValid && isGenderValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form before submitting.");
            return;
        }
        try {
            setLoading(true);

            // Build FormData
            const fData = new FormData();
            fData.append("name", formData.name);
            fData.append("user_name", formData.user_name);
            fData.append("email", formData.email);
            fData.append("phone_no", formData.phone_no);
            fData.append("password", formData.password);
            fData.append("confirmPassword", formData.confirmPassword);
            fData.append("gender", formData.gender);
            if (formData.about) fData.append("about", formData.about);

            const response = await registerUserAPI(fData);

            if (response.data.success) {
                toast.success(response.data.message || "Registered successfully!");
                navigate("/login"); // Go to login
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <AuthFormLayout layoutKey="signup" direction={-1}>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Join TaskHub</h1>
                <p className="text-gray-500 text-sm">
                    Start your storytelling journey today
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100/80 backdrop-blur-sm"
            >
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
                            or sign up with email
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormInput
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={formErrors.name}
                        placeholder="Enter your full name"
                        icon={User}
                        delay={0.4}
                    />

                    <FormInput
                        label="Username"
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={formErrors.user_name}
                        placeholder="Choose a username"
                        icon={User}
                        delay={0.45}
                    />

                    <FormInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={formErrors.email}
                        placeholder="Enter your email"
                        icon={Mail}
                        delay={0.5}
                    />

                    <FormInput
                        label="Phone Number"
                        type="tel"
                        name="phone_no"
                        value={formData.phone_no}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={formErrors.phone_no}
                        placeholder="10 digit phone number"
                        icon={User}
                        delay={0.55}
                    />

                    <div className="flex gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.58 }}
                            className="flex-1"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={(e: any) => {
                                    handleChange(e);
                                    validateField("gender", e.target.value);
                                }}
                                className={`w-full py-3.5 rounded-xl border ${formErrors.gender ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"} focus:ring-3 transition-all duration-200 outline-none bg-white px-4 ${!formData.gender ? "text-gray-400" : "text-gray-900"}`}
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {formErrors.gender && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs mt-1 absolute"
                                >
                                    {formErrors.gender}
                                </motion.p>
                            )}
                        </motion.div>
                    </div>

                    <FormInput
                        label="Password"
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={formErrors.password}
                        placeholder="Create a password"
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
                        delay={0.6}
                    />

                    <FormInput
                        label="Confirm Password"
                        type={showPass2 ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={formErrors.confirmPassword}
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
                        delay={0.65}
                    />

                    <AuthButton loading={loading}>Create Account</AuthButton>
                </form>

                <div className="text-center mt-6 pt-6 border-t border-gray-100">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </motion.div>
        </AuthFormLayout>
    );
}