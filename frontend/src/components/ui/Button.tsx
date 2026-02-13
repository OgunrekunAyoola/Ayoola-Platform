import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 font-medium rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--background)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--accent)] text-black hover:brightness-110 focus:ring-[var(--accent)] shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/30 hover:-translate-y-0.5",
    secondary:
      "bg-transparent border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] focus:ring-[var(--muted)] hover:bg-[var(--card-bg)] hover:-translate-y-0.5",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:-translate-y-0.5",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600 shadow-lg shadow-green-600/20 hover:shadow-green-600/30 hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] px-4 py-2",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
