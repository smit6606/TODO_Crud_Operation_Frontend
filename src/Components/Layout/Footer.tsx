import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="w-full bg-[var(--color-bg-surface)] border-t border-[var(--color-border-subtle)] mt-auto py-6 shrink-0 transition-colors duration-200">
            <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">

                    <span className="text-sm font-bold text-[var(--color-text-base)] tracking-tight">TaskHub &copy; {new Date().getFullYear()}</span>
                </div>

                <div className="flex items-center justify-center gap-6">
                    <Link to="/about" className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] transition-colors">
                        About Us
                    </Link>
                    <Link to="/services" className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] transition-colors">
                        Services
                    </Link>
                    <Link to="/contact" className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] transition-colors">
                        Contact Us
                    </Link>
                </div>

                <div className="text-xs font-medium text-[var(--color-text-muted)] text-center md:text-right">
                    Built for enterprise productivity. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
