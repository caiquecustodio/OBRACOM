import React from 'react';
import { Home, Search, Package, Heart, User, Store, BarChart3, Boxes, DollarSign, MoreHorizontal } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  mode: 'consumer' | 'lojista';
  favoritesCount?: number;
}

interface NavTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentView,
  onNavigate,
  mode,
  favoritesCount = 12,
}) => {
  // Hide on onboarding splash or authentication
  if (['splash', 'login', 'register'].includes(currentView)) {
    return null;
  }

  const isLojista = mode === 'lojista';

  const consumerTabs: NavTab[] = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'search-catalog', label: 'Buscar', icon: Search },
    { id: 'orders', label: 'Pedidos', icon: Package },
    { id: 'favorites', label: 'Favoritos', icon: Heart, badge: favoritesCount > 0 ? favoritesCount : undefined },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  const lojistaTabs: NavTab[] = [
    { id: 'lojista-dashboard', label: 'Início', icon: Home },
    { id: 'lojista-orders', label: 'Pedidos', icon: Package },
    { id: 'lojista-products', label: 'Produtos', icon: Boxes },
    { id: 'lojista-financial', label: 'Financeiro', icon: DollarSign },
    { id: 'lojista-settings', label: 'Mais', icon: MoreHorizontal },
  ];

  const activeTabs: NavTab[] = isLojista ? lojistaTabs : consumerTabs;

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center max-w-lg mx-auto h-16 px-1">
        {activeTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            currentView === tab.id ||
            (tab.id === 'search-catalog' && ['product-detail', 'search-results'].includes(currentView)) ||
            (tab.id === 'orders' && ['order-tracking', 'order-confirmed'].includes(currentView)) ||
            (tab.id === 'lojista-products' && currentView === 'lojista-add-product');

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              className={`relative flex flex-col items-center justify-center h-full py-1 group transition-all ${
                isActive ? 'text-[#0B4D9C]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8] group-hover:scale-105'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1 min-w-[14px] h-[14px] bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-1 tracking-tight leading-none ${
                  isActive ? 'font-bold text-[#0B4D9C]' : 'font-medium text-slate-500'
                }`}
              >
                {tab.label}
              </span>

              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 bg-[#0B4D9C] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
