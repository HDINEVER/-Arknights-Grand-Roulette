import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const AKButton: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyle = "relative font-bold uppercase tracking-wider py-3 px-8 transition-all duration-300 clip-path-slant group overflow-hidden";
  
  // Updated colors: Primary -> Cyan-300 (#67E8F9), Secondary -> Blue-500 (#3B82F6)
  const variants = {
    primary: "bg-[#67E8F9] text-black hover:bg-[#22d3ee] shadow-[0_0_15px_rgba(103,232,249,0.4)] disabled:bg-slate-700 disabled:text-slate-500",
    secondary: "bg-[#3B82F6] text-white hover:bg-[#2563eb] shadow-[0_0_15px_rgba(59,130,246,0.4)] disabled:bg-slate-700 disabled:text-slate-500",
    outline: "bg-transparent border-2 border-[#67E8F9]/30 text-[#67E8F9] hover:border-[#67E8F9] hover:bg-[#67E8F9]/10 disabled:border-slate-700 disabled:text-slate-700"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
      disabled={disabled}
      {...props}
    >
      {/* Rhombus decoration */}
      <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rotate-45" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Hover slide effect */}
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
    </button>
  );
};

export const AKCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`relative bg-[#0f172a]/80 backdrop-blur-md border border-[#67E8F9]/20 p-6 ${className}`}>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#67E8F9]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#67E8F9]" />
      {children}
    </div>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6 border-l-4 border-[#67E8F9] pl-4">
    <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white shadow-black drop-shadow-lg">
      {title}
    </h2>
    {subtitle && <p className="text-[#67E8F9] text-sm font-bold tracking-widest uppercase">{subtitle}</p>}
  </div>
);