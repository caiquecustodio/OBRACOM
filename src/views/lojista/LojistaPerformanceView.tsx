import React, { useState } from 'react';
import {
  Calendar,
  ShoppingBag,
  TrendingUp,
  Users,
  Star,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

export const LojistaPerformanceView: React.FC = () => {
  const [period, setPeriod] = useState('Últimos 30 dias');
  const [activeTab, setActiveTab] = useState<'geral' | 'vendas' | 'produtos' | 'clientes'>('geral');

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black text-slate-900 leading-tight">
              Desempenho da minha loja
            </h1>
            <p className="text-[11px] text-slate-500">
              Acompanhe resultados e tome decisões com dados.
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-[#0B4D9C]" />
            <span>{period}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar pt-1">
          {['geral', 'vendas', 'produtos', 'clientes'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tab === 'geral' ? 'Visão geral' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3.5 space-y-4 max-w-lg mx-auto">
        {/* Top 4 Metrics */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <ShoppingBag className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] text-emerald-700 font-bold">↑ 18%</span>
            </div>
            <span className="text-xl font-black text-slate-900 block mt-1">124</span>
            <span className="text-[10px] text-slate-500">Pedidos concluídos</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] text-emerald-700 font-bold">↑ 22%</span>
            </div>
            <span className="text-xl font-black text-slate-900 block mt-1">R$ 28.450</span>
            <span className="text-[10px] text-slate-500">Faturamento</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-[10px] text-emerald-700 font-bold">↑ 15%</span>
            </div>
            <span className="text-xl font-black text-slate-900 block mt-1">856</span>
            <span className="text-[10px] text-slate-500">Clientes</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-[10px] text-slate-500">320 avaliações</span>
            </div>
            <span className="text-xl font-black text-slate-900 block mt-1">4,8</span>
            <span className="text-[10px] text-slate-500">Avaliação média</span>
          </div>
        </div>

        {/* SVG Sales Trend Chart (matches Digitalizado_20260911-1653-03.jpg) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Vendas nos últimos 30 dias</h3>
              <p className="text-[10px] text-slate-500">Média diária de R$ 948,00</p>
            </div>
            <span className="text-[11px] font-semibold text-[#0B4D9C] hover:underline cursor-pointer">
              Ver relatório completo &gt;
            </span>
          </div>

          {/* Line Chart */}
          <div className="h-44 w-full relative pt-2">
            <svg viewBox="0 0 400 140" className="w-full h-full overflow-visible">
              {/* Horizontal Grid lines */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="1" />

              {/* Area gradient under curve */}
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B4D9C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0B4D9C" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="M 10 110 Q 50 115, 80 90 T 150 95 T 200 65 T 250 30 T 300 70 T 350 50 T 390 60 L 390 125 L 10 125 Z"
                fill="url(#salesGradient)"
              />

              {/* Trend line */}
              <path
                d="M 10 110 Q 50 115, 80 90 T 150 95 T 200 65 T 250 30 T 300 70 T 350 50 T 390 60"
                fill="none"
                stroke="#0B4D9C"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Peak node at 26/08 */}
              <circle cx="250" cy="30" r="4.5" fill="#0B4D9C" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* Tooltip callout on peak */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/4 bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-bold shadow-md">
              R$ 1.850 · 26/08
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-1">
              <span>10/08</span>
              <span>15/08</span>
              <span>20/08</span>
              <span>25/08</span>
              <span>30/08</span>
              <span>09/09</span>
            </div>
          </div>
        </div>

        {/* Status Breakdown (Donut Chart) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900">Pedidos por status</h3>

          <div className="flex items-center gap-4">
            {/* Donut representation */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#10b981" strokeWidth="3.8" strokeDasharray="58 42" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#3b82f6" strokeWidth="3.8" strokeDasharray="23 77" strokeDashoffset="-58" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#f59e0b" strokeWidth="3.8" strokeDasharray="11 89" strokeDashoffset="-81" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#ef4444" strokeWidth="3.8" strokeDasharray="5 95" strokeDashoffset="-92" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-black text-slate-900">124</span>
                <span className="text-[8px] text-slate-400 uppercase">Pedidos</span>
              </div>
            </div>

            {/* Legend list */}
            <div className="flex-1 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Entregues
                </span>
                <span className="font-bold text-slate-900">72 (58%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Em transporte
                </span>
                <span className="font-bold text-slate-900">28 (23%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Em separação
                </span>
                <span className="font-bold text-slate-900">14 (11%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Cancelados
                </span>
                <span className="font-bold text-slate-900">6 (5%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos mais vendidos */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Produtos mais vendidos</h3>
            <span className="text-[11px] font-semibold text-[#0B4D9C] cursor-pointer">Ver todos &gt;</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                  1
                </span>
                <div>
                  <h5 className="font-bold text-slate-900">Cimento CP II 50kg</h5>
                  <span className="text-[10px] text-slate-500">256 vendas</span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold">↑ 12%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                  2
                </span>
                <div>
                  <h5 className="font-bold text-slate-900">Vergalhão CA-50 10mm</h5>
                  <span className="text-[10px] text-slate-500">198 vendas</span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold">↑ 8%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                  3
                </span>
                <div>
                  <h5 className="font-bold text-slate-900">Bloco Cerâmico 9x19x19</h5>
                  <span className="text-[10px] text-slate-500">142 vendas</span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold">↑ 15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
