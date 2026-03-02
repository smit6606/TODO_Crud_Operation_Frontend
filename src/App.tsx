import { Outlet } from "react-router";
import { Toaster, ToastIcon } from "react-hot-toast";

export default function App() {
  return (
    <div className="h-screen w-full flex flex-col">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            color: '#1f2937',
            padding: '16px 24px',
            borderRadius: '16px',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
            border: '1px solid rgba(229, 231, 235, 0.5)',
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
              } max-w-md w-full bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black/5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="shrink-0 pt-0.5">
                  <ToastIcon toast={t} />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {t.type === 'error' ? 'Error' : 'Notification'}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {typeof t.message === 'function' ? t.message(t) : t.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Toaster>
      <main className="grow flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}