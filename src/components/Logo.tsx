import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  white?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', white = true }) => {
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon: Modern house/building roof silhouette with inner arch */}
      <div
        className={`flex items-center justify-center rounded-xl font-bold transition-transform ${
          isLg ? 'w-12 h-12 text-2xl' : isSm ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-base'
        } ${white ? 'text-[#0B4D9C] bg-white shadow-sm' : 'text-white bg-[#0B4D9C]'}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isLg ? 'w-8 h-8' : isSm ? 'w-5 h-5' : 'w-6 h-6'}
        >
          <path d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H15v-5a3 3 0 0 0-6 0v5H4.5A1.5 1.5 0 0 1 3 19.5v-9z" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-wider ${
            isLg ? 'text-3xl' : isSm ? 'text-xl' : 'text-2xl'
          } ${white ? 'text-white' : 'text-[#0B4D9C]'}`}
          style={{ letterSpacing: '0.04em' }}
        >
          OBRACOM
        </span>
        <span
          className={`font-medium ${
            isLg ? 'text-xs mt-0.5' : isSm ? 'text-[9px]' : 'text-[10px]'
          } ${white ? 'text-blue-100' : 'text-slate-500'}`}
        >
          Tudo para sua obra, em um só lugar.
        </span>
      </div>
    </div>
  );
};
