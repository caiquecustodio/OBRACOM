import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  Edit2,
  Copy,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Eye,
  TrendingUp,
  Boxes,
} from 'lucide-react';
import { SafeImage } from '../../components/SafeImage';
import { Product } from '../../types';

interface LojistaProductsViewProps {
  products: Product[];
  onAddNewProduct: () => void;
  onEditProduct: (product: Product) => void;
}

export const LojistaProductsView: React.FC<LojistaProductsViewProps> = ({
  products,
  onAddNewProduct,
  onEditProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'ativos' | 'revisao' | 'pausados' | 'inativos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = products.filter((p) => {
    if (activeTab === 'ativos' && p.status !== 'active') return false;
    if (activeTab === 'pausados' && p.status !== 'paused') return false;
    if (activeTab === 'inativos' && p.status !== 'out_of_stock') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex-1 w-full bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Meus produtos</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Gerencie catálogo, estoques e mantenha preços atualizados.
              </p>
            </div>

            <button
              type="button"
              onClick={onAddNewProduct}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Produto</span>
            </button>
          </div>

          {/* 4 Metric counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-black text-slate-900 block text-base sm:text-lg">328</span>
              <span className="text-[11px] text-slate-500 font-medium">Cadastrados</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800">
              <span className="font-black block text-base sm:text-lg">276</span>
              <span className="text-[11px] font-semibold">Ativos</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
              <span className="font-black block text-base sm:text-lg">24</span>
              <span className="text-[11px] font-semibold">Em revisão</span>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800">
              <span className="font-black block text-base sm:text-lg">28</span>
              <span className="text-[11px] font-semibold">Sem estoque</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
            {[
              { id: 'todos', label: 'Todos (328)' },
              { id: 'ativos', label: 'Ativos (276)' },
              { id: 'revisao', label: 'Em revisão (24)' },
              { id: 'pausados', label: 'Pausados (11)' },
              { id: 'inativos', label: 'Inativos (28)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, código ou SKU..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs space-y-2.5 hover:border-blue-300 transition-all"
          >
            <div className="flex items-start justify-between gap-2.5">
              <div className="flex items-start gap-2.5 min-w-0">
                <SafeImage
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-12 h-12 object-contain rounded-lg bg-slate-50 p-1 border border-slate-100 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 text-xs">
                  <h4 className="font-bold text-slate-900 truncate">{prod.name}</h4>
                  <p className="text-[10px] text-slate-500">
                    {prod.category} · SKU: {prod.sku}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[10px]">
                    <span className="font-black text-slate-900">
                      R$ {prod.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-600 font-medium">
                      Estoque: <strong>{prod.stock} un</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    prod.stock > 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {prod.stock > 0 ? '● Ativo' : '● Sem estoque'}
                </span>
              </div>
            </div>

            {/* Metrics & Actions row */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-slate-400" /> {prod.viewsCount || 2100}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-slate-400" /> {prod.salesCount || 120} vendas
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEditProduct(prod)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                  title="Editar produto"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                  title="Duplicar"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                  title="Mais ações"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>

        {/* Pagination bar */}
        <div className="mt-6 p-4 bg-white rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <span className="font-medium">Mostrando 1-6 de 328 produtos cadastrados</span>
          <div className="flex gap-1.5">
            <span className="w-8 h-8 rounded-xl bg-[#0B4D9C] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              1
            </span>
            <span className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-xs cursor-pointer">
              2
            </span>
            <span className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-xs cursor-pointer">
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
