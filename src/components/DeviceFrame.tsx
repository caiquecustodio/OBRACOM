import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
  currentView?: string;
  onNavigate?: (view: string) => void;
  mode?: 'consumer' | 'lojista';
  onToggleMode?: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col text-slate-800 antialiased selection:bg-[#0B4D9C] selection:text-white">
      {/* 100% Full-screen responsive viewport */}
      <div className="flex-1 w-full flex flex-col relative">
        {children}
      </div>
    </div>
  );
};
