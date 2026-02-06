import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-3 font-medium rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95";
  
  const variants = {
    primary: "bg-[var(--accent)] text-black hover:brightness-110 focus:ring-[var(--accent)] shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/30 hover:-translate-y-0.5",
    secondary: "bg-transparent border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] focus:ring-[var(--muted)] hover:bg-[var(--card-bg)] hover:-translate-y-0.5",
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
