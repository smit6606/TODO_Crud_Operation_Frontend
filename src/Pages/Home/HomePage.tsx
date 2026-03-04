import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchTodos } from "../../redux/Features/Todo/todoSlice";
import { Link } from "react-router";
import { CheckCircle2, ListTodo, Clock, LayoutDashboard, ArrowRight, ShieldCheck, Zap, BarChart3, Plus } from "lucide-react";

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, user, token } = useSelector((state: RootState) => state.auth);
    const { data: todos, loading } = useSelector((state: RootState) => state.todos);

    useEffect(() => {
        if (isAuthenticated && token) {
            dispatch(fetchTodos({ token }));
        }
    }, [dispatch, isAuthenticated, token]);

    const stats = useMemo(() => {
        let completed = 0;
        let pending = 0;
        let inProgress = 0;

        todos.forEach((t) => {
            const statusLower = (t.status || "").toLowerCase().replace(" ", "-");
            if (statusLower === "completed") completed++;
            else if (statusLower === "in-progress") inProgress++;
            else pending++; // defaults to pending
        });

        return {
            total: todos.length,
            completed,
            pending,
            inProgress
        };
    }, [todos]);

    if (isAuthenticated) {
        return (
            <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 flex flex-col h-[calc(100vh-4rem)]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--color-text-base)] tracking-tight">
                            Welcome back, {user?.user_name || "User"}
                        </h1>
                        <p className="text-[var(--color-text-muted)] mt-1 font-medium">
                            Here is your productivity overview for today.
                        </p>
                    </div>
                    <Link
                        to="/todos/new"
                        className="btn-primary flex justify-center items-center gap-2 max-w-[200px]"
                    >
                        <Plus size={18} />
                        Create New Task
                    </Link>
                </div>

                {/* Dashboard Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-transform cursor-default">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                                <LayoutDashboard size={24} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-4xl font-extrabold text-[var(--color-text-base)] mb-1">
                                {loading ? "..." : stats.total}
                            </h3>
                            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-wider">Total Tasks</p>
                        </div>
                    </div>

                    <div className="card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-transform cursor-default">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={24} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-4xl font-extrabold text-[var(--color-text-base)] mb-1">
                                {loading ? "..." : stats.completed}
                            </h3>
                            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-wider">Completed</p>
                        </div>
                    </div>

                    <div className="card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-transform cursor-default">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                                <Clock size={24} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-4xl font-extrabold text-[var(--color-text-base)] mb-1">
                                {loading ? "..." : stats.inProgress}
                            </h3>
                            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-wider">In Progress</p>
                        </div>
                    </div>

                    <div className="card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-transform cursor-default">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl group-hover:scale-110 transition-transform">
                                <ListTodo size={24} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-4xl font-extrabold text-[var(--color-text-base)] mb-1">
                                {loading ? "..." : stats.pending}
                            </h3>
                            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-wider">Pending Validations</p>
                        </div>
                    </div>
                </div>

                {/* Recent Tasks Preview */}
                <div className="card overflow-hidden flex-1 flex flex-col">
                    <div className="px-6 py-5 border-b border-[var(--color-border-subtle)] flex justify-between items-center bg-[var(--color-bg-base)]">
                        <h2 className="text-lg font-bold text-[var(--color-text-base)] flex items-center gap-2">
                            <Clock size={18} className="text-[var(--color-brand-primary)]" />
                            Recent Activity
                        </h2>
                        <Link to="/todos" className="text-sm font-bold text-[var(--color-brand-primary)] hover:text-[var(--color-brand-hover)] transition-colors inline-flex items-center gap-1">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center min-h-[250px] bg-[var(--color-bg-surface)]">
                        {loading ? (
                            <div className="w-10 h-10 border-4 border-[var(--color-brand-primary)]/30 border-t-[var(--color-brand-primary)] rounded-full animate-spin"></div>
                        ) : todos.length === 0 ? (
                            <div className="text-center animate-in fade-in duration-500">
                                <div className="w-20 h-20 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <ListTodo className="text-[var(--color-text-muted)] opacity-50" size={36} />
                                </div>
                                <h3 className="text-xl font-bold text-[var(--color-text-base)] mb-2">No active tasks found</h3>
                                <p className="text-[var(--color-text-muted)] max-w-sm mx-auto mb-8 leading-relaxed font-medium">Your operational grid is empty. Create a new task to automatically populate real-time metrics across your dashboard.</p>
                                <Link to="/todos/new" className="btn-primary inline-flex px-8 py-3 w-auto items-center gap-2 font-bold shadow-md hover:-translate-y-0.5 transition-transform">
                                    <Plus size={20} />
                                    Create First Task
                                </Link>
                            </div>
                        ) : (
                            <div className="w-full self-start space-y-3">
                                {todos.slice(0, 5).map(todo => (
                                    <div key={todo.id} className="flex items-center justify-between p-4 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl hover:border-[var(--color-brand-primary)]/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${todo.status === 'Completed' ? 'bg-emerald-500' : todo.status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-500'}`} />
                                            <span className="font-semibold text-[var(--color-text-base)]">{todo.title}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${todo.priority.toLowerCase() === 'high' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:border-red-800/50 dark:text-red-400' :
                                                todo.priority.toLowerCase() === 'medium' ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800/50 dark:text-amber-400' :
                                                    'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800/50 dark:text-emerald-400'
                                                }`}>
                                                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    /* -------------------------------------------
       MARKETING LANDING PAGE (Unauthenticated)
       ------------------------------------------- */
    return (
        <div className="w-full flex-1 flex flex-col bg-[var(--color-bg-base)]">
            {/* Hero Section */}
            <section className="relative px-4 pt-20 pb-32 sm:px-6 lg:px-8 flex flex-col items-center text-center max-w-5xl mx-auto z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] font-semibold text-sm mb-8 border border-[var(--color-brand-primary)]/20 shadow-sm">
                    <Zap size={16} className="fill-[var(--color-brand-primary)]" />
                    <span>TaskHub 2.0 is now live</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--color-text-base)] mb-6 drop-shadow-sm">
                    Organize Your Tasks. <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-[var(--color-brand-primary)] to-cyan-500 bg-clip-text text-transparent">Stay Focused. Get Things Done.</span>
                </h1>

                <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                    The premium company-level Todo application designed to help you track progress, manage priorities, and boost your daily productivity securely.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        to="/pricing"
                        className="btn-primary sm:w-auto px-8 py-4 text-lg inline-flex items-center justify-center gap-2 group"
                    >
                        Start for free
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/login"
                        className="card bg-[var(--color-bg-surface)] text-[var(--color-text-base)] sm:w-auto px-8 py-4 text-lg font-semibold inline-flex items-center justify-center hover:bg-[var(--color-bg-base)] transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-[var(--color-bg-base)] border-y border-[var(--color-border-subtle)] py-24 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border-strong)] to-transparent"></div>
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20 animate-in slide-in-from-bottom duration-700">
                        <h2 className="text-3xl font-bold text-[var(--color-text-base)] mb-4 tracking-tight">Enterprise-Grade Features</h2>
                        <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">Everything you need to manage your personal or team workflows in one clean, scalable workspace.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card p-8 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--color-brand-primary)]/10 transition-all duration-300 border border-[var(--color-border-subtle)] hover:border-[var(--color-brand-primary)]/50 bg-[var(--color-bg-surface)]">
                            <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-primary)]/10 group-hover:bg-[var(--color-brand-primary)] text-[var(--color-brand-primary)] group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-extrabold text-[var(--color-text-base)] mb-3 group-hover:text-[var(--color-brand-primary)] transition-colors">Secure Authentication</h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
                                Fortified with OTP verifications, rate limiting, and encrypted session management.
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="card p-8 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--color-brand-primary)]/10 transition-all duration-300 border border-[var(--color-border-subtle)] hover:border-[var(--color-brand-primary)]/50 bg-[var(--color-bg-surface)]">
                            <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-primary)]/10 group-hover:bg-[var(--color-brand-primary)] text-[var(--color-brand-primary)] group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                                <ListTodo size={28} />
                            </div>
                            <h3 className="text-xl font-extrabold text-[var(--color-text-base)] mb-3 group-hover:text-[var(--color-brand-primary)] transition-colors">Smart Workflows</h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
                                Deep sorting, robust status tracking, and priority tagging built elegantly into a high-performance grid.
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="card p-8 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 border border-[var(--color-border-subtle)] hover:border-purple-500/50 bg-[var(--color-bg-surface)]">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 group-hover:bg-purple-500 text-purple-600 dark:text-purple-400 group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                                <BarChart3 size={28} />
                            </div>
                            <h3 className="text-xl font-extrabold text-[var(--color-text-base)] mb-3 group-hover:text-purple-500 transition-colors">Instant Insights</h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
                                Dynamic dashboard rendering your exact progress ratios live, so you always know exactly where you stand.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scale Section added for premium look */}
            <section className="bg-gradient-to-b from-[var(--color-bg-surface)] to-[var(--color-bg-base)] py-24">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-[var(--color-text-base)] mb-6">Built for scale. Designed for you.</h2>
                    <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10">Whether you are handling daily errands or orchestrating high-level company directives, our system dynamically adapts to your workload without missing a single beat.</p>
                    <Link
                        to="/signup"
                        className="btn-primary inline-flex px-8 py-4 w-auto items-center justify-center font-bold text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all"
                    >
                        Create an Account Now
                    </Link>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="py-20 bg-gray-900 border-t border-gray-800 text-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="flex items-center justify-center gap-3 mb-8 opacity-90 transition-opacity hover:opacity-100 cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16H9v-6h2v6zm4 0h-2v-6h2v6z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-extrabold text-white tracking-tight">TaskHub</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-12">
                        <Link to="/about" className="text-gray-400 hover:text-white transition-colors font-medium">About Us</Link>
                        <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors font-medium">Pricing</Link>
                        <Link to="/services" className="text-gray-400 hover:text-white transition-colors font-medium">Services</Link>
                        <Link to="/contact" className="text-gray-400 hover:text-white transition-colors font-medium">Contact</Link>
                    </div>

                    <div className="w-full h-px bg-gray-800 mb-8 max-w-3xl border-0"></div>

                    <p className="text-gray-500 font-medium tracking-wide">&copy; {new Date().getFullYear()} TaskHub Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
