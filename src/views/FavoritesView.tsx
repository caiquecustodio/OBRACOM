import React, { useState } from 'react';
import {
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  Bell,
  MoreVertical,
  MapPin,
  Truck,
  Check,
  TrendingDown,
  Flame,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { PriceDropInfo, Product } from '../types';

interface FavoritesViewProps {
  favoriteProducts: Product[];
  priceDrops: Record<string, PriceDropInfo>;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onRemoveFavorite: (productId: string) => void;
  onActivateNotifications: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteProducts,
  priceDrops,
  onProductClick,
  onAddToCart,
  onRemoveFavorite,
  onActivateNotifications,
}) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'produtos' | 'lojas' | 'servicos'>('todos');
  const [toastMsg, setToastMsg] = useState('');

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setToastMsg(`${product.name} adicionado ao carrinho!`);
    setTimeout(() => setToastMsg(''), 2500);
  };

  return (
    <div className="flex-1 w-full bg-slate-50 pb-20 overflow-y-auto">
      {toastMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Meus favoritos</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Seus produtos, lojas e serviços salvos em um só lugar.
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Organizar</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              type="button"
              onClick={() => setActiveTab('todos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'todos' ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Todos ({favoriteProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('produtos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'produtos' ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Produtos ({favoriteProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('lojas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'lojas' ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Lojas (2)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('servicos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'servicos' ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Serviços (2)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favoriteProducts.map((product) => {
          const priceDrop = priceDrops[product.id];
          return (
          <div
            key={product.id}
            className={`bg-white rounded-xl border p-3.5 shadow-xs space-y-3 hover:border-blue-300 transition-all ${
              priceDrop ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200'
            }`}
          >
            <div className="flex gap-3">
              <div
                onClick={() => onProductClick(product)}
                className="w-16 h-16 bg-slate-50 rounded-lg p-1 border border-slate-100 flex items-center justify-center shrink-0 cursor-pointer relative"
              >
                <SafeImage
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(product.id);
                  }}
                  className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-red-500"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-500" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h4
                    onClick={() => onProductClick(product)}
                    className="text-xs font-bold text-slate-900 leading-tight truncate cursor-pointer hover:text-blue-700"
                  >
                    {product.name}
                  </h4>
                  <button type="button" className="text-slate-400 hover:text-slate-600">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">{product.subtitle}</p>
                {priceDrop && (
                  <span className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase animate-pulse">
                    <Flame className="w-2.5 h-2.5" />
                    Baixou {Math.round((1 - priceDrop.newPrice / priceDrop.oldPrice) * 100)}%
                  </span>
                )}

                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-600">
                  <span className="font-semibold text-slate-800">{product.seller.name}</span>
                  <span className="text-amber-500 font-bold">★ {product.rating}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                {priceDrop ? (
                  <>
                    <span className="text-[10px] text-slate-400 line-through block">
                      R$ {priceDrop.oldPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-base font-black text-emerald-600 flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </>
                ) : (
                  <span className="text-base font-black text-slate-900">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleAdd(product)}
                className="px-3.5 py-1.5 rounded-lg bg-[#0B4D9C] hover:bg-[#0e5db8] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Adicionar ao carrinho</span>
              </button>
            </div>
          </div>
          );
        })}
        </div>

        {/* Promo banner */}
        <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-blue-700 shrink-0" />
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-blue-900">Não perca as melhores oportunidades!</h5>
              <p className="text-xs text-blue-700">Seja avisado quando seus favoritos baixarem de preço.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onActivateNotifications}
            className="px-3.5 py-2 rounded-xl bg-[#0B4D9C] text-white text-xs font-bold shrink-0 hover:bg-blue-800 transition-colors"
          >
            Ativar notificações &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
