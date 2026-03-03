import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/Features/Auth/authSlice";
import { useTheme } from "../../Context/ThemeContext";
import {
    LayoutDashboard,
    ListTodo,
    Users,
    User as UserIcon,
    LogOut,
    Plus,
    Sun,
    Moon,
    Menu,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
    isOpen?: boolean;
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            dispatch(logout());
            navigate("/");
        }
    };

    const navLinks = [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
        { name: "Todos", path: "/todos", icon: <ListTodo size={20} /> },
        { name: "Users Directory", path: "/users", icon: <Users size={20} /> },
        { name: "Profile", path: "/profile", icon: <UserIcon size={20} /> },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    const sidebarContent = (
        <div className="flex flex-col h-full bg-[var(--color-bg-surface)] border-r border-[var(--color-border-subtle)] w-full shadow-xl md:shadow-none z-50">
            {/* Logo area */}
            <div className="h-16 flex items-center px-6 border-b border-[var(--color-border-subtle)] shrink-0">
                <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMobileOpen(false)}>
                    <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-hover)] rounded-lg flex items-center justify-center shadow-sm shadow-blue-500/30 group-hover:from-blue-600 group-hover:to-cyan-500 transition-colors">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16H9v-6h2v6zm4 0h-2v-6h2v6z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-[var(--color-text-base)] tracking-tight">TaskHub</span>
                </Link>
            </div>

            {/* Quick Actions */}
            <div className="p-4 shrink-0">
                <Link
                    to="/todos/new"
                    onClick={() => setIsMobileOpen(false)}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3 shadow-md group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    Create Task
                </Link>
            </div>

            {/* Navigation Array */}
            <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-hide">
                {navLinks.map((link) => {
                    const active = isActive(link.path);
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active
                                ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                                : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-base)] hover:text-[var(--color-text-base)]"
                                }`}
                        >
                            <div className={`${active ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-muted)]"}`}>
                                {link.icon}
                            </div>
                            {link.name}
                        </Link>
                    )
                })}
            </nav>
        </div>
    );

    return (
        <>
            {/* Desktop Fixed Sidebar */}
            <motion.div
                initial={false}
                animate={{
                    width: isOpen ? 256 : 0,
                    opacity: isOpen ? 1 : 0
                }}
                className="hidden md:flex flex-col fixed inset-y-0 left-0 top-0 z-40 bg-[var(--color-bg-base)] border-r border-[var(--color-border-subtle)] overflow-hidden"
            >
                <div className="w-64 h-full flex flex-col">
                    {sidebarContent}
                </div>
            </motion.div>

            {/* Mobile Header Toggle (Only visible on small screens when authenticated) */}
            <div className="md:hidden flex items-center justify-between h-16 px-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] sticky top-0 z-40 shadow-sm">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-sm shadow-blue-500/30 transition-colors">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16H9v-6h2v6zm4 0h-2v-6h2v6z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-[var(--color-text-base)] tracking-tight">TaskHub</span>
                </Link>
                <div className="flex gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] rounded-lg transition-colors focus:outline-none"
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsMobileOpen(true)}
                        className="p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <div className="fixed inset-0 z-50 md:hidden isolate">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                            className="absolute inset-y-0 left-0 w-64 bg-[var(--color-bg-surface)] shadow-2xl flex flex-col"
                        >
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-[var(--color-bg-base)] rounded-full text-[var(--color-text-muted)] shadow-md border border-[var(--color-border-subtle)] z-50 hover:text-[var(--color-text-base)]"
                            >
                                <X size={20} />
                            </button>
                            {sidebarContent}

                            {/* Mobile User Profile Footer within Drawer */}
                            <div className="p-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-base)] shrink-0">
                                <div className="flex justify-between items-center px-1">
                                    <Link to="/profile" className="flex items-center gap-3 overflow-hidden" onClick={() => setIsMobileOpen(false)}>
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-hover)] shrink-0 flex items-center justify-center text-white font-bold shadow-sm">
                                            {user?.profile_image ? (
                                                <img src={user.profile_image} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                user?.name ? user.name.charAt(0).toUpperCase() : (user?.user_name?.charAt(0).toUpperCase() || "U")
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-bold text-[var(--color-text-base)] truncate">{user?.user_name}</p>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 text-[var(--color-text-muted)] hover:text-red-500 rounded-lg transition-colors"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
