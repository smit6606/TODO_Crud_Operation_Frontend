import { Link } from "react-router";
import { Check, ArrowLeft, Star, Zap, Building2 } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg-base)] w-full font-inter animate-in fade-in duration-500">
            {/* Header / Navigation Back */}
            <div className="max-w-[90rem] mx-auto px-4 pt-8 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] transition-colors font-semibold group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </div>

            {/* Hero Section */}
            <div className="text-center pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-base)] tracking-tight mb-6">
                    Transparent pricing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-cyan-500">every team</span>
                </h1>
                <p className="text-xl text-[var(--color-text-muted)] font-medium max-w-2xl mx-auto">
                    Choose the perfect plan to streamline your workflow. Upgrade, downgrade, or cancel anytime.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">

                    {/* Basic Plan */}
                    <div className="card bg-[var(--color-bg-surface)] p-8 border border-[var(--color-border-subtle)] hover:border-[var(--color-brand-primary)]/50 transition-all duration-300 rounded-3xl group">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mb-6 transition-colors">
                            <Star size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--color-text-base)] mb-2">Starter</h3>
                        <p className="text-[var(--color-text-muted)] h-12 mb-6">Perfect for individuals organizing personal projects.</p>
                        <div className="mb-8 border-b border-[var(--color-border-subtle)] pb-8">
                            <span className="text-5xl font-extrabold text-[var(--color-text-base)]">Free</span>
                            <span className="text-[var(--color-text-muted)] font-medium">/forever</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {['Up to 50 active tasks', 'Basic task filtering', 'Standard priority tags', 'Community support'].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-[var(--color-text-base)] font-medium">
                                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Link to="/signup" className="block w-full text-center py-3.5 rounded-xl font-bold text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10 hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors">
                            Get Started Free
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="card bg-gradient-to-b from-[var(--color-bg-surface)] to-[var(--color-bg-base)] p-8 border-2 border-[var(--color-brand-primary)] rounded-3xl relative transform md:-translate-y-4 shadow-xl shadow-[var(--color-brand-primary)]/10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[var(--color-brand-primary)] to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg tracking-wide uppercase">
                            Most Popular
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-brand-primary)] to-cyan-500 text-white flex items-center justify-center mb-6 shadow-md">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--color-text-base)] mb-2">Professional</h3>
                        <p className="text-[var(--color-text-muted)] h-12 mb-6">Ideal for power users who need advanced tracking.</p>
                        <div className="mb-8 border-b border-[var(--color-border-subtle)] pb-8">
                            <span className="text-5xl font-extrabold text-[var(--color-text-base)]">$12</span>
                            <span className="text-[var(--color-text-muted)] font-medium">/month</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {['Unlimited active tasks', 'Advanced analytics dashboard', 'Custom status workflows', 'Priority email support', 'Collaborative workspaces'].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-[var(--color-text-base)] font-medium">
                                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-brand-primary)] text-white flex items-center justify-center">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Link to="/signup" className="block w-full text-center py-3.5 rounded-xl font-bold text-white btn-primary shadow-lg shadow-[var(--color-brand-primary)]/20 hover:shadow-[var(--color-brand-primary)]/40 hover:-translate-y-0.5 transition-all">
                            Upgrade to Pro
                        </Link>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="card bg-[var(--color-bg-surface)] p-8 border border-[var(--color-border-subtle)] hover:border-[var(--color-brand-primary)]/50 transition-all duration-300 rounded-3xl group">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center mb-6 transition-colors">
                            <Building2 size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--color-text-base)] mb-2">Enterprise</h3>
                        <p className="text-[var(--color-text-muted)] h-12 mb-6">For large organizations requiring top-tier security.</p>
                        <div className="mb-8 border-b border-[var(--color-border-subtle)] pb-8">
                            <span className="text-5xl font-extrabold text-[var(--color-text-base)]">$49</span>
                            <span className="text-[var(--color-text-muted)] font-medium">/month</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {['Everything in Professional', 'SAML SSO integration', 'Dedicated success manager', 'Custom reporting APIs', '99.9% uptime SLA'].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-[var(--color-text-base)] font-medium">
                                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 flex items-center justify-center">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Link to="/contact" className="block w-full text-center py-3.5 rounded-xl font-bold text-[var(--color-text-base)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-base)] hover:border-[var(--color-border-strong)] transition-colors">
                            Contact Sales
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
