import React, { useMemo } from 'react';
import {
  Settings,
  Store,
  ExternalLink,
  ShoppingBag,
  TrendingUp,
  Users,
  Star,
  PlusCircle,
  Boxes,
  Percent,
  Truck,
  CreditCard,
  Palette,
  BookOpen,
  Headphones,
  BarChart3,
  ArrowRight,
  Clock,
  CheckCircle2,
  PackageOpen,
  PackageCheck,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { APP_ASSETS } from '../../data/assets';
import { StoreOrder } from '../../types';

interface LojistaDashboardViewProps {
  recentOrders: StoreOrder[];
  allStoreOrders: StoreOrder[];
  onNavigateAddProduct: () => void;
  onNavigateProducts: () => void;
  onNavigateOrders: () => void;
  onNavigatePerformance: () => void;
  onNavigateFinancial: () => void;
  onNavigateSettings: () => void;
  onNavigateReviews: () => void;
  onSwitchToConsumer: () => void;
}

export const LojistaDashboardView: React.FC<LojistaDashboardViewProps> = ({
  recentOrders,
  allStoreOrders,
  onNavigateAddProduct,
  onNavigateProducts,
  onNavigateOrders,
  onNavigatePerformance,
  onNavigateFinancial,
  onNavigateSettings,
  onNavigateReviews,
  onSwitchToConsumer,
}) => {
  // Métricas derivadas dos pedidos ao vivo
  const { revenue, activeCount, deliveredCount } = useMemo(() => {
    let rev = 0;
    let active = 0;
    let delivered = 0;
    for (const o of allStoreOrders) {
      rev += o.total;
      if (o.status === 'em_aberto' || o.status === 'em_separacao' || o.status === 'em_transporte') active++;
      if (o.status === 'entregue') delivered++;
    }
    return { revenue: rev, activeCount: active, deliveredCount: delivered };
  }, [allStoreOrders]);

  const formatBrl = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const statusBadge = (status: StoreOrder['status']) => {
    switch (status) {
      case 'em_aberto':
        return (
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold flex items-center gap-1">
            <PackageOpen className="w-3 h-3 text-slate-500" /> Em aberto
          </span>
        );
      case 'em_separacao':
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" /> Em separação
          </span>
        );
      case 'em_transporte':
        return (
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center gap-1">
            <Truck className="w-3 h-3 text-blue-600" /> Em transporte
          </span>
        );
      case 'entregue':
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Entregue
          </span>
        );
      case 'cancelado':
        return (
          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
            Cancelado
          </span>
        );
    }
  };

  return (
    <div className="flex-1 w-full bg-slate-50 pb-20 overflow-y-auto">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                Portal do Lojista
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-medium">ConstróiMais Materiais</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 mt-1 leading-tight">
              Painel de Gestão da Loja
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Acompanhe pedidos em tempo real, faturamento, estoque e métricas da sua loja.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSwitchToConsumer}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-[#0B4D9C] hover:bg-blue-100 text-xs font-bold transition-colors cursor-pointer"
            >
              <span>Ver como Cliente</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onNavigateSettings}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Configurações</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Store Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-[#073976] text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md border-2 border-blue-800">
              CM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  ConstróiMais Materiais de Construção
                </h2>
                <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full" title="Verificado">✓</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">CNPJ: 12.345.678/0001-90 · Aldeota, Fortaleza - CE</p>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.8</span>
                  <span className="text-slate-400 font-normal">(1.200 avaliações)</span>
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Loja aberta e recebendo pedidos
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onNavigateAddProduct}
            className="px-5 py-2.5 rounded-xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer transition-colors active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Cadastrar Novo Produto</span>
          </button>
        </div>

        {/* 4 Key Performance Metrics: valores ao vivo vindos da simulação */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={onNavigateOrders}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-blue-400 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> ao vivo
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-3">{allStoreOrders.length}</span>
            <span className="text-xs text-slate-500 font-medium">Pedidos recebidos</span>
          </div>

          <div
            onClick={onNavigateFinancial}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-blue-400 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">acumulado</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-3">{formatBrl(revenue)}</span>
            <span className="text-xs text-slate-500 font-medium">Faturamento bruto</span>
          </div>

          <div
            onClick={onNavigateProducts}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-blue-400 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Boxes className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md">48 ativos</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-3">54</span>
            <span className="text-xs text-slate-500 font-medium">Produtos no catálogo</span>
          </div>

          <div
            onClick={onNavigateReviews}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-blue-400 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">98% aprovação</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-3">4.8</span>
            <span className="text-xs text-slate-500 font-medium">Avaliação média da loja</span>
          </div>
        </div>

        {/* Quick Action Shortcuts: 6 columns on desktop */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-sm sm:text-base font-black text-slate-900">Ações Rápidas de Gestão</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              type="button"
              onClick={onNavigateAddProduct}
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center text-center group transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B4D9C] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <PlusCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Cadastrar Produto</span>
            </button>

            <button
              type="button"
              onClick={onNavigateProducts}
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center text-center group transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Boxes className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Gerenciar Catálogo</span>
            </button>

            <button
              type="button"
              onClick={onNavigateOrders}
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center text-center group transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Pedidos da Loja</span>
            </button>

            <button
              type="button"
              onClick={onNavigatePerformance}
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center text-center group transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Desempenho</span>
            </button>

            <button
              type="button"
              onClick={onNavigateFinancial}
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center text-center group transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Financeiro & Repasses</span>
            </button>

            <button
              type="button"
              onClick={onNavigateReviews}
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center text-center group transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Avaliações Clientes</span>
            </button>
          </div>
        </div>

        {/* Pipeline operacional ao vivo */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                Pipeline de Operações
                <span className="flex items-center gap-1 text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Tempo real
                </span>
              </h3>
              <p className="text-xs text-slate-500">Status de todos os pedidos da loja neste exato momento</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Em aberto', value: allStoreOrders.filter((o) => o.status === 'em_aberto').length, color: 'bg-slate-100 text-slate-700', icon: <PackageOpen className="w-4 h-4" /> },
              { label: 'Em separação', value: allStoreOrders.filter((o) => o.status === 'em_separacao').length, color: 'bg-amber-100 text-amber-700', icon: <Clock className="w-4 h-4" /> },
              { label: 'Em transporte', value: allStoreOrders.filter((o) => o.status === 'em_transporte').length, color: 'bg-blue-100 text-blue-700', icon: <Truck className="w-4 h-4" /> },
              { label: 'Entregues', value: deliveredCount, color: 'bg-emerald-100 text-emerald-700', icon: <PackageCheck className="w-4 h-4" /> },
            ].map((cell) => (
              <button
                key={cell.label}
                type="button"
                onClick={onNavigateOrders}
                className={`p-4 rounded-2xl ${cell.color} flex flex-col items-center gap-1 cursor-pointer hover:scale-[1.03] transition-transform`}
              >
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-80">
                  {cell.icon} {cell.label}
                </span>
                <span className="text-2xl font-black">{cell.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Orders in Store — ao vivo */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">Últimos Pedidos Recebidos</h3>
              <p className="text-xs text-slate-500">
                {activeCount > 0
                  ? `${activeCount} pedido${activeCount === 1 ? '' : 's'} ativo${activeCount === 1 ? '' : 's'} no pipeline agora`
                  : 'Nenhum pedido ativo no momento'}
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateOrders}
              className="text-xs font-bold text-[#0B4D9C] hover:underline flex items-center gap-0.5"
            >
              Ver todos os pedidos <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">
              Aguardando novos pedidos do marketplace…
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentOrders.slice(0, 6).map((ord) => (
                <div key={ord.id} className="py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B4D9C] flex items-center justify-center font-bold shrink-0">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{ord.id}</span>
                        {ord.isNew && (
                          <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-black uppercase">
                            <Flame className="w-2.5 h-2.5" /> Novo
                          </span>
                        )}
                        {statusBadge(ord.status)}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {ord.customer} · {ord.itemsCount} {ord.itemsCount === 1 ? 'item' : 'itens'} · {ord.itemSummary}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-slate-900 block">
                      {formatBrl(ord.total)}
                    </span>
                    <span className="text-[10px] text-slate-400">{ord.date} · {ord.paymentMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
