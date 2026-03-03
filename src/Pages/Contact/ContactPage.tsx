import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500 min-h-[calc(100vh-4rem)] flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-base)] tracking-tight mb-6">
                    Get in <span className="text-[var(--color-brand-primary)]">Touch</span>
                </h1>
                <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed">
                    Experiencing a network glitch? Looking for enterprise scaling options? Our engineering routing team is here to support you.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-2xl bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-3xl p-8 shadow-2xl"
            >
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-base)] mb-2">First Name</label>
                            <input type="text" className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-base)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors" placeholder="John" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-base)] mb-2">Last Name</label>
                            <input type="text" className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-base)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors" placeholder="Doe" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[var(--color-text-base)] mb-2">Corporate Email</label>
                        <input type="email" className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-base)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors" placeholder="johndoe@company.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[var(--color-text-base)] mb-2">How can we help?</label>
                        <textarea rows={5} className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-base)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors resize-none" placeholder="Describe your query..." />
                    </div>

                    <button type="button" className="w-full btn-primary py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                        Send Message
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
