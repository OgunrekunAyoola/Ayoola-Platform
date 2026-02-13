import React from "react";

interface StatusBadgeProps {
  status: string;
  className?: string;
  variant?: "default" | "success" | "warning" | "error" | "info" | "purple";
}

export default function StatusBadge({ status, className = "", variant }: StatusBadgeProps) {
  // Auto-detect variant if not provided
  const getVariant = (status: string) => {
    if (variant) return variant;
    
    switch (status.toLowerCase()) {
      case "published":
      case "public":
      case "approved":
      case "systems":
        return "success";
      case "draft":
      case "pending":
      case "tools":
        return "warning";
      case "rejected":
      case "error":
        return "error";
      case "scheduled":
      case "info":
      case "experiments":
        return "info";
      case "email_gated":
        return "purple";
      default:
        return "default";
    }
  };

  const activeVariant = getVariant(status);

  const styles = {
    default: "bg-[var(--muted)]/10 text-[var(--muted)] border-[var(--muted)]/20",
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20",
    info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border ${styles[activeVariant]} ${className}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
