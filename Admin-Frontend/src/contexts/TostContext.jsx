import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now().toString();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message, duration) => addToast(message, 'success', duration);
  const showError = (message, duration) => addToast(message, 'error', duration);
  const showInfo = (message, duration) => addToast(message, 'info', duration);
  const showWarning = (message, duration) => addToast(message, 'warning', duration);

  return (
    <ToastContext.Provider value={{ 
      addToast, 
      removeToast, 
      showSuccess, 
      showError, 
      showInfo, 
      showWarning 
    }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.5, transition: { duration: 0.2 } }}
            className={`
              max-w-sm rounded-lg shadow-lg p-4 cursor-pointer
              ${toast.type === 'success' ? 'bg-green-500 text-white' : ''}
              ${toast.type === 'error' ? 'bg-red-500 text-white' : ''}
              ${toast.type === 'warning' ? 'bg-yellow-500 text-white' : ''}
              ${toast.type === 'info' ? 'bg-blue-500 text-white' : ''}
            `}
            onClick={() => removeToast(toast.id)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{toast.message}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeToast(toast.id);
                }}
                className="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
