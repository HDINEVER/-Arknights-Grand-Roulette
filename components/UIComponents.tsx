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
  
  // Theme colors for light background
  const variants = {
    primary: "bg-[#4a6a9a] text-white hover:bg-[#5a7aaa] shadow-[0_0_15px_rgba(74,106,154,0.3)] disabled:bg-slate-300 disabled:text-slate-500",
    secondary: "bg-[#7ab3d9] text-[#1e293b] hover:bg-[#8ac3e9] shadow-[0_0_15px_rgba(122,179,217,0.3)] disabled:bg-slate-300 disabled:text-slate-500",
    outline: "bg-transparent border-2 border-[#4a6a9a]/40 text-[#4a6a9a] hover:border-[#4a6a9a] hover:bg-[#4a6a9a]/10 disabled:border-slate-300 disabled:text-slate-400"
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
    <div className={`relative bg-white/80 backdrop-blur-md border border-[#4a6a9a]/20 p-6 shadow-lg ${className}`}>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#4a6a9a]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#4a6a9a]" />
      {children}
    </div>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6 border-l-4 border-[#4a6a9a] pl-4">
    <h2 className="text-3xl font-black italic tracking-tighter uppercase text-[#2a3f5f] drop-shadow-sm">
      {title}
    </h2>
    {subtitle && <p className="text-[#4a6a9a] text-sm font-bold tracking-widest uppercase">{subtitle}</p>}
  </div>
);