"use client";

import { useState, useCallback } from "react";

interface NotificationState {
  isOpen: boolean;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  autoClose: boolean;
  autoCloseDelay: number;
}

const initialState: NotificationState = {
  isOpen: false,
  type: "info",
  title: "",
  message: "",
  autoClose: true,
  autoCloseDelay: 3000,
};

export const useNotification = () => {
  const [notification, setNotification] =
    useState<NotificationState>(initialState);

  const showNotification = useCallback(
    (
      type: NotificationState["type"],
      title: string,
      message: string,
      autoClose = true,
      autoCloseDelay = 3000
    ) => {
      setNotification({
        isOpen: true,
        type,
        title,
        message,
        autoClose,
        autoCloseDelay,
      });
    },
    []
  );

  const showSuccess = useCallback(
    (
      title: string,
      message: string,
      autoClose = true,
      autoCloseDelay = 3000
    ) => {
      showNotification("success", title, message, autoClose, autoCloseDelay);
    },
    [showNotification]
  );

  const showError = useCallback(
    (
      title: string,
      message: string,
      autoClose = true,
      autoCloseDelay = 5000
    ) => {
      showNotification("error", title, message, autoClose, autoCloseDelay);
    },
    [showNotification]
  );

  const showWarning = useCallback(
    (
      title: string,
      message: string,
      autoClose = true,
      autoCloseDelay = 4000
    ) => {
      showNotification("warning", title, message, autoClose, autoCloseDelay);
    },
    [showNotification]
  );

  const showInfo = useCallback(
    (
      title: string,
      message: string,
      autoClose = true,
      autoCloseDelay = 3000
    ) => {
      showNotification("info", title, message, autoClose, autoCloseDelay);
    },
    [showNotification]
  );

  const hideNotification = useCallback(() => {
    setNotification(initialState);
  }, []);

  return {
    notification,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideNotification,
  };
};
