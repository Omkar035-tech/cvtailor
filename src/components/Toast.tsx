import React, { useEffect, useState } from "react";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "info"; // Type of toast
    duration?: number; // Duration in milliseconds
    onClose?: () => void; // Callback when the toast is closed
}

const Toast: React.FC<ToastProps> = ({
    message,
    type = "info",
    duration = 5000,
    onClose,
}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    // Type-specific colors
    const backgroundColor = {
        success: "#4caf50",
        error: "#f44336",
        info: "#2196f3",
    }[type];

    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                backgroundColor,
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
                minWidth: "200px",
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <span>{message}</span>
            <button
                onClick={() => setVisible(false)}
                style={{
                    marginLeft: "10px",
                    background: "none",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                }}
            >
                ✕
            </button>
        </div>
    );
};

export default Toast;
