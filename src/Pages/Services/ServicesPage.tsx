import { motion } from "framer-motion";

export default function ServicesPage() {
    return (
        <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500 min-h-[calc(100vh-4rem)]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-base)] tracking-tight mb-6">
                    Professional <span className="text-[var(--color-brand-primary)]">Services</span>
                </h1>
                <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed">
                    Designed specifically for high-performance networks requiring ultra-fast routing, live state synchronization, and absolute accuracy.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="p-8 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-3xl shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-sm shadow-blue-500/30 group-hover:scale-110 transition-transform mb-6">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-base)] mb-4">Live Task Sync</h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">Instantly synchronize tasks across your network. Create, modify, and mark items as complete with immediate feedback mechanisms powered by Redux stores.</p>
                </div>

                <div className="p-8 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-3xl shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-sm shadow-blue-500/30 group-hover:scale-110 transition-transform mb-6">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-base)] mb-4">Enterprise Directory</h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">Map your entire organization automatically. Our Users Directory visualizes global staff profiles utilizing highly secure authenticated channels.</p>
                </div>
            </div>
        </div>
    );
}
