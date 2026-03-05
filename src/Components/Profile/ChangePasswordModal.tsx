import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/Features/Auth/authSlice";
import { changePasswordAPI } from "../../Services/api";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state: RootState) => state.auth);

    const [loading, setLoading] = useState(false);
    const [showOldProps, setShowOldProps] = useState(false);
    const [showNewProps, setShowNewProps] = useState(false);
    const [showConfirmProps, setShowConfirmProps] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (formData.newPassword !== formData.confirmPassword) {
            setErrors({ confirmPassword: "New passwords do not match." });
            return;
        }

        try {
            setLoading(true);
            const response = await changePasswordAPI({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            }, token!);

            if (response.data.success) {
                toast.success("Password changed successfully! Please log in again.");
                onClose();
                dispatch(logout());
                navigate("/login");
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || "Failed to change password.";
            if (msg.toLowerCase().includes("current") || msg.toLowerCase().includes("old") || msg.toLowerCase().includes("match")) {
                setErrors({ oldPassword: msg });
            } else {
                setErrors({ global: msg });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center isolate px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]">
                            <h2 className="text-xl font-bold text-[var(--color-text-base)] flex items-center gap-2">
                                <Lock size={20} className="text-[var(--color-brand-primary)]" />
                                Change Password
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] hover:bg-[var(--color-bg-elevated)] p-1.5 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {errors.global && (
                                <div className="text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800/50 px-4 py-3 rounded-xl text-sm font-medium text-center transition-all animate-in fade-in">
                                    {errors.global}
                                </div>
                            )}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="text-sm font-semibold text-[var(--color-text-base)]">Current Password</label>
                                </div>
                                {errors.oldPassword && (
                                    <p className="text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800/50 mb-2 animate-in slide-in-from-top-1">
                                        {errors.oldPassword}
                                    </p>
                                )}
                                <div className="relative">
                                    <input
                                        type={showOldProps ? "text" : "password"}
                                        name="oldPassword"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter current password"
                                        className={`w-full pl-4 pr-10 py-3 bg-[var(--color-bg-surface)] border ${errors.oldPassword ? "border-red-500 focus:ring-red-200" : "border-[var(--color-border-subtle)] focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]/20"} rounded-xl text-[var(--color-text-base)] rounded-xl focus:ring-2 outline-none transition-all`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOldProps(!showOldProps)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]"
                                    >
                                        {showOldProps ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="text-sm font-semibold text-[var(--color-text-base)]">New Password</label>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800/50 mb-2 animate-in slide-in-from-top-1">
                                        {errors.newPassword}
                                    </p>
                                )}
                                <div className="relative">
                                    <input
                                        type={showNewProps ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Create new password"
                                        className={`w-full pl-4 pr-10 py-3 bg-[var(--color-bg-surface)] border ${errors.newPassword ? "border-red-500 focus:ring-red-200" : "border-[var(--color-border-subtle)] focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]/20"} rounded-xl text-[var(--color-text-base)] rounded-xl focus:ring-2 outline-none transition-all`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewProps(!showNewProps)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]"
                                    >
                                        {showNewProps ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="text-sm font-semibold text-[var(--color-text-base)]">Confirm New Password</label>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800/50 mb-2 animate-in slide-in-from-top-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                                <div className="relative">
                                    <input
                                        type={showConfirmProps ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Confirm new password"
                                        className={`w-full pl-4 pr-10 py-3 bg-[var(--color-bg-surface)] border ${errors.confirmPassword ? "border-red-500 focus:ring-red-200" : "border-[var(--color-border-subtle)] focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]/20"} rounded-xl text-[var(--color-text-base)] rounded-xl focus:ring-2 outline-none transition-all`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmProps(!showConfirmProps)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]"
                                    >
                                        {showConfirmProps ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="px-5 py-2.5 rounded-xl font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] hover:bg-[var(--color-bg-surface)] transition-colors"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary px-6 py-2.5 rounded-xl font-bold flex items-center justify-center min-w-[140px]"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : "Update Password"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
