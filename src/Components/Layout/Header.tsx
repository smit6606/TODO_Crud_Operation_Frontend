import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/Features/Auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, LogOut, User, Lock, Menu, X } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";

interface HeaderProps {
    toggleSidebar?: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            dispatch(logout());
            setIsProfileOpen(false);
            navigate("/");
        }
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Contact Us", path: "/contact" },
        ...(isAuthenticated ? [
            { name: "Todos", path: "/todos" },
            { name: "Users", path: "/users" }
        ] : [])
    ];

    const isAuthPage = location.pathname.match(/^\/(login|signup|register|forgot|verify-otp|change-password)/);

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    };

    return (
        <header className={`sticky top-0 z-50 w-full transition-colors duration-200 ${isAuthenticated ? 'hidden md:block bg-[var(--color-bg-surface)]/80 backdrop-blur-md border-b border-[var(--color-border-subtle)]' : (isAuthPage ? 'bg-[var(--color-bg-surface)] shadow-sm' : 'bg-[var(--color-bg-surface)]/80 backdrop-blur-md border-b border-[var(--color-border-subtle)]')}`}>
            <div className={isAuthenticated ? "w-full px-4 sm:px-6 lg:px-8" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section & Sidebar Toggle */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated && toggleSidebar && (
                            <button
                                onClick={toggleSidebar}
                                className="flex p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] transition-colors"
                            >
                                <Menu size={24} />
                            </button>
                        )}
                        {!isAuthenticated && (
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-sm shadow-blue-500/30 group-hover:from-blue-600 group-hover:to-cyan-500 transition-colors">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16H9v-6h2v6zm4 0h-2v-6h2v6z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-[var(--color-text-base)] tracking-tight">TaskHub</span>
                            </Link>
                        )}
                    </div>

                    {/* Desktop Navigation */}
                    {!isAuthPage && !isAuthenticated && (
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors hover:text-[var(--color-brand-primary)] ${isActive(link.path)
                                        ? "text-[var(--color-brand-primary)] border-b-2 border-[var(--color-brand-primary)] pb-1"
                                        : "text-[var(--color-text-muted)] pb-1"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    )}

                    {/* Right Section: Theme + Profile/Auth */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle (Hidden on Auth Pages) */}
                        {!isAuthPage && (
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-base)] transition-colors focus:outline-none"
                                aria-label="Toggle Dark Mode"
                            >
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        )}

                        {/* Desktop Auth/Profile */}
                        <div className="hidden md:block">
                            {isAuthenticated && user ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 focus:outline-none"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-hover)] flex items-center justify-center text-white shadow-sm overflow-hidden border-2 border-transparent hover:border-[var(--color-border-subtle)] transition-all">
                                            {user.profile_image ? (
                                                <img src={user.profile_image} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-sm font-semibold">
                                                    {user.user_name?.charAt(0).toUpperCase() || "U"}
                                                </span>
                                            )}
                                        </div>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-56 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5 origin-top-right"
                                            >
                                                <div className="px-4 py-3 border-b border-[var(--color-border-subtle)]">
                                                    <p className="text-sm font-medium text-[var(--color-text-base)] truncate">{user.user_name}</p>
                                                    <p className="text-xs text-[var(--color-text-muted)] truncate">{user.email}</p>
                                                </div>

                                                <Link
                                                    to="/profile"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-bg-base)] transition-colors"
                                                >
                                                    <User size={16} className="text-[var(--color-text-muted)]" />
                                                    View Profile
                                                </Link>
                                                <Link
                                                    to="/change-password"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-bg-base)] transition-colors"
                                                >
                                                    <Lock size={16} className="text-[var(--color-text-muted)]" />
                                                    Change Password
                                                </Link>
                                                <div className="border-t border-[var(--color-border-subtle)] my-1"></div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors text-left"
                                                >
                                                    <LogOut size={16} />
                                                    Sign out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    {isAuthPage ? (
                                        <div className="flex items-center gap-3">
                                            <Link
                                                to="/"
                                                className="text-sm font-semibold bg-[var(--color-bg-elevated)] text-[var(--color-text-base)] border border-[var(--color-border-subtle)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] px-4 py-2 rounded-lg transition-colors shadow-sm"
                                            >
                                                Home Page
                                            </Link>
                                            {location.pathname === "/login" && (
                                                <Link
                                                    to="/signup"
                                                    className="text-sm font-semibold bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-hover)] px-4 py-2 rounded-lg transition-colors shadow-sm"
                                                >
                                                    Sign Up
                                                </Link>
                                            )}
                                            {(location.pathname === "/signup") && (
                                                <Link
                                                    to="/login"
                                                    className="text-sm font-semibold bg-[var(--color-bg-elevated)] text-[var(--color-text-base)] border border-[var(--color-border-subtle)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] px-4 py-2 rounded-lg transition-colors shadow-sm"
                                                >
                                                    Sign In
                                                </Link>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="text-sm font-semibold bg-[var(--color-bg-elevated)] text-[var(--color-text-base)] border border-[var(--color-border-subtle)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] px-4 py-2 rounded-lg transition-colors shadow-sm"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="text-sm font-semibold bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-hover)] px-4 py-2 rounded-lg transition-colors shadow-sm"
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {!isAuthPage && navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`block px-3 py-2 rounded-lg text-base font-medium ${isActive(link.path)
                                        ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                                        : "text-[var(--color-text-base)] hover:bg-[var(--color-bg-elevated)]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Mobile User Section */}
                            {isAuthenticated && user ? (
                                <div className="pt-4 mt-2 border-t border-[var(--color-border-subtle)]">
                                    <div className="flex items-center gap-3 px-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center text-white font-bold">
                                            {user.profile_image ? (
                                                <img src={user.profile_image} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                user.user_name?.charAt(0).toUpperCase() || "U"
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[var(--color-text-base)]">{user.user_name}</p>
                                            <p className="text-xs text-[var(--color-text-muted)]">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-[var(--color-text-base)] hover:bg-[var(--color-bg-elevated)]"
                                    >
                                        <User size={18} className="text-[var(--color-text-muted)]" />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-red-500 hover:bg-red-500/10 text-left mt-1"
                                    >
                                        <LogOut size={18} />
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <div className="pt-4 mt-2 border-t border-[var(--color-border-subtle)] flex flex-col gap-2">
                                    {isAuthPage ? (
                                        <div className="flex flex-col gap-2">
                                            <Link
                                                to="/"
                                                className="block px-3 py-2.5 rounded-lg text-center text-base font-medium text-[var(--color-text-base)] hover:bg-[var(--color-bg-elevated)]"
                                            >
                                                Home Page
                                            </Link>
                                            {location.pathname === "/login" && (
                                                <Link
                                                    to="/signup"
                                                    className="block px-3 py-2.5 rounded-lg text-center text-base font-medium bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-hover)]"
                                                >
                                                    Sign Up
                                                </Link>
                                            )}
                                            {(location.pathname === "/signup") && (
                                                <Link
                                                    to="/login"
                                                    className="block px-3 py-2.5 rounded-lg text-center text-base font-medium text-[var(--color-text-base)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-elevated)]"
                                                >
                                                    Sign In
                                                </Link>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="block px-3 py-2.5 rounded-lg text-center text-base font-medium text-[var(--color-text-base)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-elevated)]"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="block px-3 py-2.5 rounded-lg text-center text-base font-medium bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-hover)]"
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
