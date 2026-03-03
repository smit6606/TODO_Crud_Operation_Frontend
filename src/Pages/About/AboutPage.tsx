import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500 min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-base)] tracking-tight mb-6">
                    About <span className="text-[var(--color-brand-primary)]">TaskHub</span>
                </h1>
                <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-8">
                    We are obsessively focused on building the most seamless, enterprise-grade task management system in the world. Engineered to help teams and individuals achieve a level of clarity they've never experienced before.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
                    <div className="p-6 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
                            <span className="font-bold text-xl">1</span>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-text-base)] mb-2">Simplicity First</h3>
                        <p className="text-[var(--color-text-muted)] text-sm">No overwhelming menus. Just what you need to track your goals effortlessly.</p>
                    </div>

                    <div className="p-6 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-xl flex items-center justify-center mb-4">
                            <span className="font-bold text-xl">2</span>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-text-base)] mb-2">Enterprise Ready</h3>
                        <p className="text-[var(--color-text-muted)] text-sm">Real-time sync, massive grid scaling, and uncompromising security standards.</p>
                    </div>

                    <div className="p-6 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-4">
                            <span className="font-bold text-xl">3</span>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-text-base)] mb-2">Data Precision</h3>
                        <p className="text-[var(--color-text-muted)] text-sm">Know exactly what is pending, what is validated, and what requires immediate action.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
