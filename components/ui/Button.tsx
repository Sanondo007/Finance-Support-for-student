
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  glow = true,
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-orbitron font-bold uppercase transition-all duration-300 relative overflow-hidden clip-path-polygon";
  
  const variants = {
    primary: "bg-cyber-cyan text-cyber-black hover:bg-white " + (glow ? "shadow-neonCyan" : ""),
    secondary: "bg-cyber-purple text-white hover:bg-cyber-pink " + (glow ? "shadow-neonPurple" : ""),
    danger: "bg-cyber-red text-white hover:bg-red-400 " + (glow ? "shadow-neonRed" : ""),
    ghost: "bg-transparent border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-black"
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
      {...props}
    >
      {children}
    </button>
  );
};
