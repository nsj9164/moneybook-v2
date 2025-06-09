"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const NotificationModal = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  autoClose = true,
  autoCloseDelay = 3000,
}: NotificationModalProps) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-emerald-600" />;
      case "error":
        return <XCircle className="h-6 w-6 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-amber-600" />;
      case "info":
        return <Info className="h-6 w-6 text-blue-600" />;
      default:
        return <Info className="h-6 w-6 text-blue-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-emerald-50 border-emerald-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-amber-50 border-amber-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case "success":
        return "text-emerald-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-amber-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-blue-800";
    }
  };

  const getMessageColor = () => {
    switch (type) {
      case "success":
        return "text-emerald-700";
      case "error":
        return "text-red-700";
      case "warning":
        return "text-amber-700";
      case "info":
        return "text-blue-700";
      default:
        return "text-blue-700";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`w-full max-w-md rounded-xl border shadow-lg ${getBackgroundColor()}`}
          >
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">{getIcon()}</div>
                <div className="ml-4 flex-1">
                  <h3 className={`text-sm font-medium ${getTitleColor()}`}>
                    {title}
                  </h3>
                  <p className={`mt-1 text-sm ${getMessageColor()}`}>
                    {message}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    <span className="sr-only">닫기</span>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
