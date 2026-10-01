import React, { useState } from 'react';
import {
  Search,
  Filter,
  Package,
  RotateCcw,
  ChevronRight,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  Heart,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { Order } from '../types';

interface OrdersListViewProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onTrackOrder: (order: Order) => void;
  onBuyAgain: (order: Order) => void;
  onGoToFavorites: () => void;
}

export const OrdersListView: React.FC<OrdersListViewProps> = ({
  orders,
  onSelectOrder,
  onTrackOrder,
  onBuyAgain,
  onGoToFavorites,
}) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'andamento' | 'entregues' | 'cancelados'>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'andamento' && !['em_transporte', 'em_separacao', 'aguardando_pagamento'].includes(order.status)) {
      return false;
    }
    if (activeTab === 'entregues' && order.status !== 'entregue') {
      return false;
    }
    if (activeTab === 'cancelados' && order.status !== 'cancelado') {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchProduct = order.items.some((it) => it.name.toLowerCase().includes(q));
      if (!matchId && !matchProduct) return false;
    }
    return true;
  });

  const getStatusBadge = (status: Order['status'], label: string) => {
    switch (status) {
      case 'entregue':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Entregue
          </span>
        );
      case 'em_transporte':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-blue-600" /> Em transporte
          </span>
        );
      case 'em_separacao':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Em separação
          </span>
        );
      case 'cancelado':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Cancelado
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold">
            {label}
          </span>
        );
    }
  };

  return (
    <div className="flex-1 w-full bg-slate-50 pb-20 overflow-y-auto">
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Meus pedidos</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Acompanhe o status das suas compras, rastreie entregas no mapa ou compre novamente.
              </p>
            </div>
            <button
              type="button"
              onClick={onGoToFavorites}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Ver Favoritos</span>
            </button>
          </div>

          {/* Tabs and search row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('todos')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'todos' ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos ({orders.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('andamento')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'andamento' ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Em andamento
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('entregues')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'entregues' ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Entregues
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cancelados')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'cancelados' ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Cancelados
              </button>
            </div>

            <div className="relative flex items-center w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por código ou produto..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orders List Container: Multi-column responsive grid on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto shadow-xs">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Nenhum pedido encontrado</h3>
            <p className="text-xs text-slate-500 mt-1">Não há pedidos para a categoria ou busca selecionada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Order header row */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900 group-hover:text-[#0B4D9C] transition-colors">
                          {order.id}
                        </span>
                        {getStatusBadge(order.status, order.statusLabel)}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        Realizado em {order.date} · {order.storeName}
                      </span>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Items preview */}
                  <div className="py-3.5 space-y-2">
                    {order.items.slice(0, 3).map((it) => (
                      <div key={it.id} className="flex items-center gap-3">
                        <SafeImage
                          src={it.imageUrl}
                          alt={it.name}
                          className="w-10 h-10 rounded-lg object-contain bg-slate-50 p-1 border border-slate-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{it.name}</h4>
                          <span className="text-[11px] text-slate-500">
                            {it.quantity} un. · R$ {it.unitPrice.toFixed(2).replace('.', ',')} cada
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          R$ {it.totalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-[11px] text-slate-400 italic">
                        + {order.items.length - 3} outros itens neste pedido
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer with totals and action buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Total do Pedido</span>
                    <span className="text-base font-black text-slate-900">
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {['em_transporte', 'em_separacao'].includes(order.status) && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTrackOrder(order);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-50 text-[#0B4D9C] hover:bg-blue-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Rastrear Entrega</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBuyAgain(order);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Comprar Novamente</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
