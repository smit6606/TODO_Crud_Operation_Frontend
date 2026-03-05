import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { updateTodo, fetchTodos } from "../../redux/Features/Todo/todoSlice";

export default function EditTodoPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { token } = useSelector((state: RootState) => state.auth);
    const { data: todos } = useSelector((state: RootState) => state.todos);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: ""
    });

    useEffect(() => {
        if (!token) return;

        const todoToEdit = todos.find(t => t.id === Number(id));
        if (todoToEdit) {

            setFormData({
                title: todoToEdit.title || "",
                description: todoToEdit.description || "",
                status: todoToEdit.status || "Pending",
                priority: todoToEdit.priority || ""
            });
        } else {
            // If missing from state, fetch it
            dispatch(fetchTodos({ token })).then((res: any) => {
                const fetchedTodos = res.payload?.data || [];
                const found = fetchedTodos.find((t: any) => t.id === Number(id));
                if (found) {

                    setFormData({
                        title: found.title || "",
                        description: found.description || "",
                        status: found.status || "Pending",
                        priority: found.priority || ""
                    });
                } else {
                    toast.error("Task not found.");
                    navigate("/todos");
                }
            });
        }
    }, [id, todos, token, dispatch, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title) {
            toast.error("Task Title is required.");
            return;
        }
        if (!formData.priority) {
            toast.error("Please select an Execution Priority.");
            return;
        }

        try {
            setLoading(true);
            await dispatch(updateTodo({ id: Number(id), taskData: formData, token: token! })).unwrap();
            toast.success("Task updated successfully!");
            navigate("/todos");
        } catch (error: any) {
            toast.error(error || "Failed to update task.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            <Link to="/todos" className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] font-medium transition-colors mb-8 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to Tasks
            </Link>

            <div className="card overflow-hidden shadow-lg border-[var(--color-border-strong)]">
                <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-cyan-600 px-8 py-10 text-white">
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2">Edit Task</h1>
                    <p className="text-cyan-100 font-medium opacity-90">Modify parameters for this task.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-base)] mb-1.5">Task Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Prepare Q3 Financial Report"
                                className="w-full px-4 py-3 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 outline-none transition-all placeholder:text-[var(--color-text-muted)]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-base)] mb-1.5">Detailed Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Provide comprehensive technical or operational details..."
                                rows={4}
                                className="w-full px-4 py-3 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 outline-none transition-all resize-none placeholder:text-[var(--color-text-muted)]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text-base)] mb-1.5">Operational Status</label>
                                <div className="relative group">
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 pr-10 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] appearance-none outline-none focus:border-[var(--color-brand-primary)] hover:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 transition-all font-medium cursor-pointer shadow-sm"
                                    >
                                        <option value="pending">Pending Validation</option>
                                        <option value="in-progress">Actively In Progress</option>
                                        <option value="completed">Completed Successfully</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)] group-hover:text-[var(--color-text-base)] transition-colors">
                                        <ChevronDown size={18} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text-base)] mb-1.5">Execution Priority <span className="text-red-500">*</span></label>
                                <div className="relative group">
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 pr-10 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-base)] appearance-none outline-none focus:border-[var(--color-brand-primary)] hover:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 transition-all font-medium cursor-pointer shadow-sm"
                                    >
                                        <option value="" disabled>Select Priority</option>
                                        <option value="low">Low - Deferrable</option>
                                        <option value="medium">Medium - Standard</option>
                                        <option value="high">High - Mission Critical</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)] group-hover:text-[var(--color-text-base)] transition-colors">
                                        <ChevronDown size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-end gap-4">
                        <Link to="/todos" className="px-6 py-3 font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] hover:bg-[var(--color-bg-base)] rounded-xl transition-colors">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[var(--color-brand-primary)] text-white font-bold py-3 px-8 rounded-xl hover:bg-[var(--color-brand-hover)] active:scale-95 transition-all shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Check size={18} strokeWidth={3} />
                                    Update Task
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
