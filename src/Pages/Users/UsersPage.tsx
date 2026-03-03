import { useState, useEffect } from "react";
import { Search, Mail, X, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchUsers } from "../../redux/Features/Users/userSlice";
import type { UserProfile } from "../../redux/Features/Users/userSlice";

export default function UsersPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { token, isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const { data: users } = useSelector((state: RootState) => state.users);

    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (isAuthenticated && token) {
            dispatch(fetchUsers(token));
        }
    }, [dispatch, isAuthenticated, token]);

    const filteredUsers = users.filter((u: any) =>
        u.email !== user?.email &&
        ((u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
            (u.user_name && u.user_name.toLowerCase().includes(search.toLowerCase())))
    );

    return (
        <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 h-[calc(100vh-4rem)] flex flex-col">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-base)] tracking-tight">User Directory</h1>
                    <p className="text-[var(--color-text-muted)] mt-1 font-medium">Browse public profiles across the network.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                    <input
                        type="text"
                        placeholder="Search team members..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-all shadow-sm"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-10 pr-2">
                {filteredUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                        <div className="w-20 h-20 bg-[var(--color-bg-surface)] rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-border-subtle)] shadow-sm">
                            <Users className="text-[var(--color-text-muted)]" size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-text-base)] mb-2">No users found</h3>
                        <p className="text-[var(--color-text-muted)] max-w-sm">
                            We couldn't find any users matching your search criteria.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUsers.map(user => (
                            <div
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                className="card p-6 flex items-start gap-4 cursor-pointer group hover:-translate-y-1 transition-transform"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-hover)] shrink-0 flex items-center justify-center text-white text-xl font-bold shadow-md overflow-hidden">
                                    {user.profile_image ? (
                                        <img src={user.profile_image} alt={user.user_name} className="w-full h-full object-cover" />
                                    ) : (
                                        user.name ? user.name.charAt(0) : user.user_name.charAt(0)
                                    )}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h3 className="text-lg font-bold text-[var(--color-text-base)] truncate group-hover:text-[var(--color-brand-primary)] transition-colors">{user.name || user.user_name}</h3>
                                    <p className="text-[var(--color-text-muted)] text-sm mb-2">@{user.user_name}</p>
                                    <div className="inline-flex items-center text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-base)] px-2 py-1 rounded-md border border-[var(--color-border-subtle)]">
                                        <Mail size={12} className="mr-1.5" />
                                        {user.email || 'Private'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* User Focus Modal Overlay */}
            <AnimatePresence>
                {selectedUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 isolate">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedUser(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative bg-[var(--color-bg-elevated)] w-full max-w-lg rounded-2xl shadow-2xl border border-[var(--color-border-subtle)] overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-cyan-600 h-24 w-full"></div>

                            <button
                                onClick={() => setSelectedUser(null)}
                                className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                            >
                                <X size={18} />
                            </button>

                            <div className="px-8 pb-8">
                                <div className="flex justify-between items-end -mt-12 mb-6">
                                    <div className="w-24 h-24 rounded-full border-4 border-[var(--color-bg-elevated)] bg-white overflow-hidden text-slate-800 flex items-center justify-center text-4xl font-black shadow-lg">
                                        {selectedUser.profile_image ? (
                                            <img src={selectedUser.profile_image} className="w-full h-full object-cover" />
                                        ) : (
                                            selectedUser.name ? selectedUser.name.charAt(0) : selectedUser.user_name.charAt(0)
                                        )}
                                    </div>
                                    <div className="px-3 py-1 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-lg text-sm font-medium text-[var(--color-text-muted)]">
                                        {selectedUser.gender || 'Not specified'}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-[var(--color-text-base)] leading-tight">{selectedUser.name || selectedUser.user_name}</h2>
                                <p className="text-[var(--color-brand-primary)] font-medium mb-4">@{selectedUser.user_name}</p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-base)] rounded-xl border border-[var(--color-border-subtle)]">
                                        <div className="p-2 bg-[var(--color-bg-surface)] rounded-lg text-[var(--color-text-muted)] shadow-sm">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[var(--color-text-muted)] font-medium">Verified Email</p>
                                            <p className="text-[var(--color-text-base)] text-sm font-medium">{selectedUser.email}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-[var(--color-text-base)] mb-2 uppercase tracking-wider">About Overview</h4>
                                        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed p-4 bg-[var(--color-bg-base)] rounded-xl border border-[var(--color-border-subtle)] min-h-[100px]">
                                            {selectedUser.about || "This user hasn't added an overview yet."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
