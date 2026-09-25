"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

interface ToastMessage {
  id: number;
  text: string;
}

interface ToastContextValue {
  showToast: (text: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text }]);

    {/* auto remove after 2.6 seconds */}
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — fixed top-right */}
      <div className="fixed top-5 right-5 z-999 flex flex-col items-end gap-2 pointer-events-none max-w-md">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-toast-in rounded-lg bg-base-card border border-accent/40 px-4 py-3 text-sm text-text shadow-lg shadow-black/50 pointer-events-auto"
          >
            {t.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}