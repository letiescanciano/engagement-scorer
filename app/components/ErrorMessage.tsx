/**
 * Error Message Component
 * Displays error messages with context
 */

import { cn } from "@/lib/utils/cn";

interface ErrorMessageProps {
  message: string;
  details?: string;
  type?: "error" | "warning" | "info";
  onDismiss?: () => void;
}

export function ErrorMessage({
  message,
  details,
  type = "error",
  onDismiss,
}: ErrorMessageProps) {
  const typeStyles = {
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: "❌",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      icon: "⚠️",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: "ℹ️",
    },
  };

  const style = typeStyles[type];

  return (
    <div
      className={cn(
        "w-full rounded-lg border p-4 mb-6",
        style.bg,
        style.border,
        style.text
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">{style.icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{message}</h3>
          {details && <p className="text-sm opacity-90">{details}</p>}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-xl hover:opacity-70 transition-opacity"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
