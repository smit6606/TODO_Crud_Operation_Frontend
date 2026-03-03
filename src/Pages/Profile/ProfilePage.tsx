import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { setCredentials } from "../../redux/Features/Auth/authSlice";
import { User, Mail, Shield, Check, Camera, Lock, Trash2, AlertTriangle } from "lucide-react";
import ChangePasswordModal from "../../Components/Profile/ChangePasswordModal";
import { updateProfileAPI, fetchProfileAPI, deleteAccountAPI } from "../../Services/api";
import { logout } from "../../redux/Features/Auth/authSlice";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                if (!token) return;
                const response = await fetchProfileAPI(token);
                if (response.data.success) {
                    dispatch(setCredentials({ user: response.data.data, token }));
                    const fetchedUser = response.data.data;
                    setFormData(prev => ({
                        ...prev,
                        name: fetchedUser.name || prev.name,
                        user_name: fetchedUser.user_name || prev.user_name,
                        email: fetchedUser.email || prev.email,
                        phone_no: fetchedUser.phone_no || prev.phone_no,
                        gender: fetchedUser.gender || prev.gender,
                        about: fetchedUser.about || prev.about
                    }));
                }
            } catch (error) {
                console.error("Failed to load live profile", error);
            }
        };
        loadProfile();
    }, [dispatch, token]);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        user_name: user?.user_name || "",
        email: user?.email || "",
        phone_no: user?.phone_no || "",
        gender: user?.gender || "Not specified",
        about: user?.about || "SaaS Professional focused on efficiency.",
        profile_image: null as File | null
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, profile_image: file });
            setPreviewUrl(URL.createObjectURL(file));
            setIsEditing(true); // Auto-enable edit mode so they can save
        }
    };

    const handleSaveProfile = async () => {
        try {
            setLoading(true);
            const reqData = new FormData();
            reqData.append("name", formData.name);
            reqData.append("user_name", formData.user_name);
            reqData.append("email", formData.email);
            reqData.append("phone_no", formData.phone_no);
            reqData.append("gender", formData.gender);
            reqData.append("about", formData.about);
            if (formData.profile_image) {
                reqData.append("profile_image", formData.profile_image);
            }

            const response = await updateProfileAPI(reqData, token!);

            if (response.data.success) {
                toast.success("Profile updated successfully!");
                dispatch(setCredentials({ user: response.data.data, token: token! }));
                setIsEditing(false);
                setPreviewUrl(null);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!token) return;
        try {
            setDeleteLoading(true);
            const response = await deleteAccountAPI(token);
            if (response.data.success) {
                toast.success("Account deleted successfully.");
                dispatch(logout());
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete account. Please ensure all Pending/In-Progress tasks are completed or deleted first.");
        } finally {
            setDeleteLoading(false);
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-[var(--color-text-base)] tracking-tight mb-8">Account Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card p-6 flex flex-col items-center text-center">
                        <div className="relative group mb-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--color-bg-base)] shadow-md bg-[var(--color-brand-primary)] flex items-center justify-center text-4xl font-bold text-white">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : user?.profile_image ? (
                                    <img src={user.profile_image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    user?.name?.charAt(0).toUpperCase() || user?.user_name?.charAt(0).toUpperCase() || "U"
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 p-2.5 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] hover:border-[var(--color-brand-primary)] transition-all shadow-sm group-hover:scale-110"
                            >
                                <Camera size={18} />
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                        </div>
                        <h2 className="text-xl font-bold text-[var(--color-text-base)]">{user?.name || user?.user_name}</h2>
                        <p className="text-[var(--color-text-muted)] text-sm font-medium mb-4">@{user?.user_name}</p>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                            <Shield size={14} /> Verified Account
                        </div>
                    </div>

                    <div className="card p-2">
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 w-full p-4 hover:bg-[var(--color-bg-base)] rounded-xl transition-colors text-left group cursor-pointer">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h3 className="text-[var(--color-text-base)] font-medium text-sm">Change Password</h3>
                            </div>
                        </button>
                        <button onClick={() => setIsDeleteModalOpen(true)} className="flex items-center gap-3 w-full p-4 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors text-left group cursor-pointer mt-1">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] flex items-center justify-center text-red-500 group-hover:text-white group-hover:bg-red-500 transition-colors">
                                <Trash2 size={20} />
                            </div>
                            <div>
                                <h3 className="text-red-600 dark:text-red-400 font-medium text-sm">Delete Account</h3>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Right Column: Edit Form */}
                <div className="lg:col-span-2">
                    <div className="card p-6 sm:p-8">
                        <div className="flex justify-between items-center mb-6 border-b border-[var(--color-border-subtle)] pb-4">
                            <h3 className="text-xl font-bold text-[var(--color-text-base)]">Public Profile Information</h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${isEditing
                                    ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                                    : "bg-[var(--color-bg-base)] text-[var(--color-text-base)] hover:border-[var(--color-border-strong)] border border-[var(--color-border-subtle)]"
                                    }`}
                            >
                                {isEditing ? "Cancel Edit" : "Edit Profile"}
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[var(--color-text-muted)]">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                                            <User size={18} />
                                        </div>
                                        <input
                                            disabled={!isEditing}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] disabled:opacity-70 disabled:cursor-not-allowed focus:border-[var(--color-brand-primary)] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[var(--color-text-muted)]">Username</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                                            <User size={18} />
                                        </div>
                                        <input
                                            disabled={!isEditing}
                                            value={formData.user_name}
                                            onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] disabled:opacity-70 disabled:cursor-not-allowed focus:border-[var(--color-brand-primary)] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[var(--color-text-muted)]">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            disabled={!isEditing}
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] disabled:opacity-70 disabled:cursor-not-allowed focus:border-[var(--color-brand-primary)] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[var(--color-text-muted)]">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                                            <span className="font-bold text-sm">#</span>
                                        </div>
                                        <input
                                            disabled={!isEditing}
                                            value={formData.phone_no}
                                            onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] disabled:opacity-70 disabled:cursor-not-allowed focus:border-[var(--color-brand-primary)] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--color-text-muted)]">Gender</label>
                                <select
                                    disabled={!isEditing}
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] disabled:opacity-70 disabled:cursor-not-allowed outline-none appearance-none"
                                >
                                    <option value="Not specified">Prefer not to say</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--color-text-muted)]">About Me</label>
                                <textarea
                                    disabled={!isEditing}
                                    value={formData.about}
                                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] disabled:opacity-70 disabled:cursor-not-allowed focus:border-[var(--color-brand-primary)] outline-none resize-none transition-all"
                                />
                            </div>

                            {isEditing && (
                                <div className="pt-4 flex justify-end">
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={loading}
                                        className="btn-primary inline-flex w-auto px-8 py-2.5 items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : <Check size={18} />}
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ChangePasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Delete Account Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[var(--color-bg-surface)] w-full max-w-sm rounded-[2rem] p-6 sm:p-8 shadow-xl">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6">
                                <AlertTriangle size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--color-text-base)] mb-3">Delete Account?</h2>
                            <p className="text-[var(--color-text-muted)] mb-8">
                                This action is permanent and cannot be undone. If you have any outstanding tasks, you will not be able to delete your account.
                            </p>

                            <div className="flex w-full gap-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 px-4 py-3 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] font-bold hover:bg-[var(--color-bg-elevated)] transition-colors"
                                    disabled={deleteLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors disabled:opacity-70 flex items-center justify-center"
                                    disabled={deleteLoading}
                                >
                                    {deleteLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        "Delete"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
