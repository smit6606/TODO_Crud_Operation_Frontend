import { Outlet } from "react-router";
import { Toaster, ToastIcon } from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import { useState } from "react";
import Header from "./Components/Layout/Header";
import Sidebar from "./Components/Layout/Sidebar";
import Footer from "./Components/Layout/Footer";

export default function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full flex bg-[var(--color-bg-base)] transition-colors duration-200">

      {/* If authenticated, Sidebar takes over navigation root handling */}
      {isAuthenticated && <Sidebar isOpen={isSidebarOpen} />}

      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${isAuthenticated && isSidebarOpen ? 'md:ml-64' : ''}`}>

        {/* Global Header */}
        <Header toggleSidebar={isAuthenticated ? toggleSidebar : undefined} />

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: '',
            style: {
              background: 'var(--color-bg-surface)',
              color: 'var(--color-text-base)',
              padding: '16px 24px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid var(--color-border-subtle)',
              fontSize: '14px',
              fontWeight: 500,
            },
            success: {
              duration: 4000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
              style: {
                borderLeft: '4px solid #10b981',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
              style: {
                borderLeft: '4px solid #ef4444',
              },
            },
          }}
        >
          {(t) => (
            <div
              className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-[var(--color-bg-surface)] shadow-2xl rounded-2xl pointer-events-auto flex border border-[var(--color-border-subtle)]`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="shrink-0 pt-0.5">
                    <ToastIcon toast={t} />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-[var(--color-text-base)]">
                      {t.type === 'error' ? 'Error' : 'Notification'}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                      {typeof t.message === 'function' ? t.message(t) : t.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Toaster>

        <main className="grow flex flex-col w-full min-h-0 relative">
          <Outlet />
        </main>

        {/* Global Footer */}
        {isAuthenticated && <Footer />}
      </div>
    </div>
  );
}