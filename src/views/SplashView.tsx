import React from 'react';
import { ShoppingCart, UserCheck, Truck, Wrench, ArrowRight } from 'lucide-react';
import { Logo } from '../components/Logo';
import { APP_ASSETS } from '../data/assets';

interface SplashViewProps {
  onStart: () => void;
  onLogin: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onStart, onLogin }) => {
  return (
    <div className="relative min-h-full flex-1 flex flex-col justify-between bg-[#073B7B] text-white overflow-hidden p-6">
      {/* Background construction photo with gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={APP_ASSETS.craneSkyline}
          alt="Canteiro de obras OBRACOM"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#063167]/80 via-[#0A4D9A]/85 to-[#073B7B]/95" />
      </div>

      {/* Top Brand Logo */}
      <div className="relative z-10 pt-8 flex flex-col items-center text-center">
        <Logo size="lg" white={true} />
      </div>

      {/* Center 4 Feature Cards (matches INCIAL.jpg) */}
      <div className="relative z-10 py-6">
        <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto text-center">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-2 shadow-lg hover:scale-105 transition-transform">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold leading-tight text-blue-100">
              Compre materiais
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-2 shadow-lg hover:scale-105 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold leading-tight text-blue-100">
              Contrate serviços
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-2 shadow-lg hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold leading-tight text-blue-100">
              Alugue equipamentos
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-2 shadow-lg hover:scale-105 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold leading-tight text-blue-100">
              Faça fretes
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="relative z-10 pb-4 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={onStart}
          className="w-full max-w-sm h-13 rounded-full bg-[#0E62C4] hover:bg-[#116edc] active:bg-[#0c53a6] text-white font-bold text-base shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Começar</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onLogin}
          className="text-xs font-semibold text-white/90 hover:text-white underline underline-offset-4 cursor-pointer"
        >
          Já tenho uma conta
        </button>

        {/* Carousel indicator dots */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white" />
          <span className="w-2 h-2 rounded-full bg-white/40" />
          <span className="w-2 h-2 rounded-full bg-white/40" />
          <span className="w-2 h-2 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
};
