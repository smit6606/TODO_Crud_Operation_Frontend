import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import { Plus, Search, Filter, SortAsc, Edit2, Trash2, Calendar, Flag, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchTodos, deleteTodo } from "../../redux/Features/Todo/todoSlice";
import toast from "react-hot-toast";

export default function TodoListView() {
    const dispatch = useDispatch<AppDispatch>();
    const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { data: todos, loading } = useSelector((state: RootState) => state.todos);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Date");

    const filteredTodos = useMemo(() => {
        return todos.filter((todo: any) => {
            const titleMatch = todo.title && todo.title.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "All" || (todo.status || "").toLowerCase().replace(" ", "-") === statusFilter.toLowerCase().replace(" ", "-");
            const matchesPriority = priorityFilter === "All" || (todo.priority || "").toLowerCase() === priorityFilter.toLowerCase();
            return titleMatch && matchesStatus && matchesPriority;
        }).sort((a: any, b: any) => {
            if (sortBy === "Date") return new Date(b.createdAt || b.id).getTime() - new Date(a.createdAt || a.id).getTime(); // Newest first
            if (sortBy === "Status") return (a.status || "").localeCompare(b.status || "");

            const priorityMap: any = { "high": 3, "medium": 2, "low": 1 };
            const pA = priorityMap[(a.priority || "").toLowerCase()] || 0;
            const pB = priorityMap[(b.priority || "").toLowerCase()] || 0;

            if (sortBy === "Priority (High to Low)") return pB - pA;
            if (sortBy === "Priority (Low to High)") return pA - pB;

            return 0;
        });
    }, [search, statusFilter, priorityFilter, sortBy, todos]);

    useEffect(() => {
        if (isAuthenticated && token) {
            dispatch(fetchTodos({ token }));
        }
    }, [dispatch, isAuthenticated, token]);

    const handleDelete = async (id: number) => {
        if (!token) return;
        try {
            await dispatch(deleteTodo({ id, token })).unwrap();
            toast.success("Task deleted permanently.");
        } catch (error: any) {
            toast.error(error || "Failed to delete task.");
        }
    };

    const getPriorityColor = (p: string) => {
        const pLower = (p || "").toLowerCase();
        if (pLower === "high") return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50";
        if (pLower === "medium") return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50";
        return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50";
    };

    const getStatusColor = (s: string) => {
        const sLower = (s || "").toLowerCase();
        if (sLower === "completed") return "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-transparent";
        if (sLower === "in-progress" || sLower === "in progress") return "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-transparent";
        return "bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-transparent";
    };

    return (
        <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 flex flex-col h-[calc(100vh-4rem)]">

            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-base)] tracking-tight">Tasks</h1>
                    <p className="text-[var(--color-text-muted)] mt-1 font-medium">Manage and track your operational workflow.</p>
                </div>
                <Link to="/todos/new" className="btn-primary inline-flex justify-center items-center gap-2 max-w-[180px]">
                    <Plus size={18} />
                    New Task
                </Link>
            </div>

            {/* Filters & Search Engine */}
            <div className="card p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                    />
                </div>

                <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex-nowrap sm:flex-wrap">
                    <div className="relative shrink-0 min-w-[170px] group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors pointer-events-none">
                            <Filter size={16} />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full appearance-none bg-[var(--color-bg-base)] text-[var(--color-text-base)] text-sm font-medium border border-[var(--color-border-subtle)] rounded-xl pl-9 pr-10 py-2.5 cursor-pointer outline-none hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 transition-all shadow-sm"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                            <ChevronDown size={16} />
                        </div>
                    </div>

                    <div className="relative shrink-0 min-w-[150px] group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors pointer-events-none">
                            <Flag size={16} />
                        </div>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="w-full appearance-none bg-[var(--color-bg-base)] text-[var(--color-text-base)] text-sm font-medium border border-[var(--color-border-subtle)] rounded-xl pl-9 pr-10 py-2.5 cursor-pointer outline-none hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 transition-all shadow-sm"
                        >
                            <option value="All">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                            <ChevronDown size={16} />
                        </div>
                    </div>

                    <div className="relative shrink-0 min-w-[180px] group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors pointer-events-none">
                            <SortAsc size={16} />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full appearance-none bg-[var(--color-bg-base)] text-[var(--color-text-base)] text-sm font-medium border border-[var(--color-border-subtle)] rounded-xl pl-9 pr-10 py-2.5 cursor-pointer outline-none hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 transition-all shadow-sm"
                        >
                            <option value="Date">Sort by Date</option>
                            <option value="Priority (High to Low)">Priority (High - Low)</option>
                            <option value="Priority (Low to High)">Priority (Low - High)</option>
                            <option value="Status">Sort by Status</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Task Grid / List */}
            <div className="flex-1 overflow-y-auto pr-2 pb-10">
                <AnimatePresence>
                    {filteredTodos.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[var(--color-border-subtle)] rounded-2xl"
                        >
                            <div className="w-16 h-16 bg-[var(--color-bg-elevated)] rounded-full flex items-center justify-center mb-4 text-[var(--color-text-muted)] shadow-sm">
                                <Search size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--color-text-base)] mb-1">No tasks found</h3>
                            <p className="text-[var(--color-text-muted)] text-center max-w-sm">Adjust your filters or break down a new project by creating a task.</p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {loading && todos.length === 0 ? (
                                <div className="col-span-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="card p-5 h-48 animate-pulse bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)]/50 rounded-2xl flex flex-col justify-between">
                                            <div className="flex justify-between">
                                                <div className="w-24 h-6 bg-[var(--color-border-subtle)] rounded-md"></div>
                                                <div className="w-16 h-6 bg-[var(--color-border-subtle)] rounded-md"></div>
                                            </div>
                                            <div className="space-y-3 mt-4">
                                                <div className="w-3/4 h-5 bg-[var(--color-border-subtle)] rounded-md"></div>
                                                <div className="w-full h-4 bg-[var(--color-border-subtle)] rounded-md"></div>
                                                <div className="w-5/6 h-4 bg-[var(--color-border-subtle)] rounded-md"></div>
                                            </div>
                                            <div className="mt-auto pt-4 flex justify-between border-t border-[var(--color-border-subtle)]/50">
                                                <div className="w-24 h-5 bg-[var(--color-border-subtle)] rounded-md"></div>
                                                <div className="w-20 h-6 bg-[var(--color-border-subtle)] rounded-full"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredTodos.map((todo: any) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    key={todo.id}
                                    className="card group hover:-translate-y-1 transition-transform duration-300 flex flex-col"
                                >
                                    <div className="p-5 flex-1 border-b border-[var(--color-border-subtle)]/50">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border shrink-0 ${getPriorityColor(todo.priority)}`}>
                                                {todo.priority}
                                            </div>
                                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                {(todo.status || "").toLowerCase() !== 'completed' && (
                                                    <Link to={`/todos/${todo.id}/edit`} className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-bg-base)] rounded-lg transition-colors inline-block">
                                                        <Edit2 size={16} />
                                                    </Link>
                                                )}
                                                <button onClick={() => handleDelete(todo.id)} className="p-1.5 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors ml-1">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-[var(--color-text-base)] mb-2 leading-tight group-hover:text-[var(--color-brand-primary)] transition-colors">{todo.title}</h3>
                                        <p className="text-[var(--color-text-muted)] text-sm line-clamp-2">{todo.description}</p>
                                    </div>

                                    <div className="p-4 bg-[var(--color-bg-base)] rounded-b-2xl flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)]">
                                            <Calendar size={16} />
                                            Updated: {todo.updatedAt ? new Date(todo.updatedAt).toLocaleString() : (todo.createdAt ? new Date(todo.createdAt).toLocaleString() : 'Active Task')}
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold capitalize ${getStatusColor(todo.status)}`}>
                                            {(todo.status || "").toLowerCase() === 'completed' ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                                            {(todo.status || "Pending").replace('-', ' ')}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
