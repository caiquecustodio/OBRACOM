import React, { useState } from 'react';
import {
  ChevronLeft,
  Bell,
  ShoppingCart,
  MapPin,
  ChevronDown,
  Store as StoreIcon,
  User,
  Search,
  Wrench,
  Package,
  Heart,
  Home,
} from 'lucide-react';
import { SafeImage } from './SafeImage';
import { Logo } from './Logo';
import { APP_ASSETS } from '../data/assets';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  canGoBack: boolean;
  onBack: () => void;
  cartCount: number;
  unreadNotifsCount: number;
  mode: 'consumer' | 'lojista';
  onToggleMode: () => void;
  locationCity: string;
  locationStreet: string;
  onOpenLocationModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  canGoBack,
  onBack,
  cartCount,
  unreadNotifsCount,
  mode,
  onToggleMode,
  locationCity,
  locationStreet,
  onOpenLocationModal,
}) => {
  const [headerSearch, setHeaderSearch] = useState('');

  // Hide main header on initial splash screen
  if (currentView === 'splash') {
    return null;
  }

  const isLojista = mode === 'lojista';

  const handleHeaderSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      onNavigate('search-catalog');
    }
  };

  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-r from-[#073B7B] via-[#0B4D9C] to-[#0A56B0] text-white shadow-md z-30">
      {/* Background crane overlay image with gradient scrim */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-luminosity overflow-hidden">
        <SafeImage
          src={APP_ASSETS.craneSkyline}
          alt=""
          className="w-full h-full object-cover object-right-top"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#073B7B]/70 via-[#0B4D9C]/60 to-[#0A56B0]/95" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2.5">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Left section: back button and brand logo */}
          <div className="flex items-center gap-2 shrink-0">
            {canGoBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Voltar"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/15 active:bg-white/25 transition-colors shrink-0"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigate(isLojista ? 'lojista-dashboard' : 'home')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <Logo size="md" white={true} />
            </button>
          </div>

          {/* Desktop & Tablet Search Bar - Greatly improves UX */}
          {!isLojista && (
            <div className="hidden sm:flex flex-1 max-w-xl mx-2">
              <form onSubmit={handleHeaderSearchSubmit} className="relative w-full flex items-center">
                <input
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  onFocus={() => {
                    if (currentView !== 'search-catalog') onNavigate('search-catalog');
                  }}
                  placeholder="O que você precisa para sua obra? Cimento, tintas, ferramentas..."
                  className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm pl-4 pr-10 py-2.5 rounded-full shadow-inner border border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/30 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-2 rounded-full bg-[#0B4D9C] hover:bg-[#083c7a] text-white transition-colors"
                  aria-label="Buscar"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* Desktop Navigation Links */}
          {!isLojista && (
            <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-blue-100">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className={`hover:text-white transition-colors flex items-center gap-1 ${currentView === 'home' ? 'text-white font-bold' : ''}`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Início</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('search-catalog')}
                className={`hover:text-white transition-colors flex items-center gap-1 ${currentView === 'search-catalog' ? 'text-white font-bold' : ''}`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Catálogo</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className={`hover:text-white transition-colors flex items-center gap-1 ${currentView === 'services' ? 'text-white font-bold' : ''}`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Serviços</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('orders')}
                className={`hover:text-white transition-colors flex items-center gap-1 ${currentView === 'orders' ? 'text-white font-bold' : ''}`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Meus Pedidos</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('favorites')}
                className={`hover:text-white transition-colors flex items-center gap-1 ${currentView === 'favorites' ? 'text-white font-bold' : ''}`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Favoritos</span>
              </button>
            </nav>
          )}

          {/* Right section: Switcher, Notifications & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mode Switcher pill */}
            <button
              type="button"
              onClick={onToggleMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-sm ${
                isLojista
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 ring-2 ring-amber-300/40'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/25 backdrop-blur-sm'
              }`}
              title="Alternar entre modo Consumidor e Painel do Lojista"
            >
              {isLojista ? (
                <>
                  <StoreIcon className="w-3.5 h-3.5" />
                  <span>Painel Lojista</span>
                </>
              ) : (
                <>
                  <StoreIcon className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Área do</span> Lojista
                </>
              )}
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => onNavigate('notifications')}
              className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Notificações"
            >
              <Bell className="w-5 h-5 text-white" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border border-[#0B4D9C]">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Cart (only in consumer mode) */}
            {!isLojista && (
              <button
                type="button"
                onClick={() => onNavigate('checkout')}
                className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 transition-all cursor-pointer"
                aria-label="Carrinho de compras"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-white" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-amber-400 text-slate-900 rounded-full text-[10px] font-black flex items-center justify-center border border-[#0B4D9C]">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-white">
                  Carrinho
                </span>
              </button>
            )}

            {/* Profile avatar shortcut */}
            <button
              type="button"
              onClick={() => onNavigate(isLojista ? 'lojista-settings' : 'profile')}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Meu Perfil"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Location selector strip (matches screenshots) */}
        {!isLojista && (
          <div className="mt-2.5 flex items-center justify-between text-xs pt-1.5 border-t border-white/15">
            <button
              type="button"
              onClick={onOpenLocationModal}
              className="flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors group cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <div className="flex items-center gap-1 text-left truncate">
                <span className="font-semibold text-white">{locationCity}</span>
                <ChevronDown className="w-3 h-3 text-blue-200" />
                <span className="text-blue-200/90 text-[11px] truncate max-w-[200px] sm:max-w-md">
                  · Entregar em {locationStreet}
                </span>
              </div>
            </button>

            <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-blue-200/80">
              <span className="hidden md:inline">✓ FRETE RÁPIDO</span>
              <span className="hidden sm:inline">✓ COMPRA GARANTIDA</span>
              <span>CONSTRUA · COMPARE · REALIZE</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
