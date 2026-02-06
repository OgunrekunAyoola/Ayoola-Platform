"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType, duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-md transition-all animate-in slide-in-from-right-full
              ${toast.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-500" : ""}
              ${toast.type === "error" ? "bg-red-500/10 border-red-500/20 text-red-500" : ""}
              ${toast.type === "warning" ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-500" : ""}
              ${toast.type === "info" ? "bg-blue-500/10 border-blue-500/20 text-blue-500" : ""}
            `}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === "success" && <CheckCircleIcon className="w-5 h-5" />}
              {toast.type === "error" && <ExclamationCircleIcon className="w-5 h-5" />}
              {toast.type === "warning" && <ExclamationCircleIcon className="w-5 h-5" />}
              {toast.type === "info" && <InformationCircleIcon className="w-5 h-5" />}
            </div>
            <div className="flex-1 text-sm font-medium">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
