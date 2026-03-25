import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  toast: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg min-w-[280px]
                ${t.type === 'success' ? 'bg-sage text-warm-brown' : ''}
                ${t.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200' : ''}
                ${t.type === 'info' ? 'bg-lavender-light text-warm-brown dark:bg-lavender-dark dark:text-dark-text' : ''}
              `}
            >
              {t.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span className="text-sm font-medium flex-1">{t.message}</span>
              <button onClick={() => removeToast(t.id)} className="cursor-pointer p-0.5 hover:opacity-70">
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
