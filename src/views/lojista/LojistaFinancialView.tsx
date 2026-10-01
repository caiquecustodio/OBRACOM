import React, { useState } from 'react';
import {
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  ChevronDown,
  ArrowDownRight,
  ArrowUpRight,
  Percent,
  Download,
} from 'lucide-react';

export const LojistaFinancialView: React.FC = () => {
  const [month, setMonth] = useState('Agosto 2026');
  const [activeTab, setActiveTab] = useState<'geral' | 'recebimentos' | 'repasses' | 'extrato'>('geral');

  const transactions = [
    {
      id: '#10234',
      type: 'Venda realizada',
      date: '22/08/2026',
      amount: 329.90,
      status: 'Recebido',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: '#10217',
      type: 'Repasse agendado',
      date: '21/08/2026',
      amount: 1250.00,
      status: 'A receber',
      statusColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'Taxa da plataforma',
      type: 'Comissão OBRACOM',
      date: '21/08/2026',
      amount: -125.00,
      status: 'Pago',
      statusColor: 'bg-rose-100 text-rose-800',
    },
    {
      id: '#10198',
      type: 'Venda realizada',
      date: '20/08/2026',
      amount: 489.00,
      status: 'Recebido',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header (matches Digitalizado_20260911-1653-12.jpg) */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black text-slate-900 leading-tight">Financeiro</h1>
            <p className="text-[11px] text-slate-500">
              Acompanhe vendas, recebimentos e repasses.
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-[#0B4D9C]" />
            <span>{month}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar pt-1">
          {['geral', 'recebimentos', 'repasses', 'extrato'].map((tab) => (
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
        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">Vendas no período</span>
            <span className="text-sm font-black text-slate-900 block mt-0.5">R$ 12.580,00</span>
            <span className="text-[9px] text-emerald-700 font-bold block mt-0.5">↑ 12% vs mês ant.</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">A receber</span>
            <span className="text-sm font-black text-slate-900 block mt-0.5">R$ 3.240,00</span>
            <span className="text-[9px] text-slate-500 block mt-0.5">5 pedidos proc.</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">Recebido</span>
            <span className="text-sm font-black text-slate-900 block mt-0.5">R$ 9.340,00</span>
            <span className="text-[9px] text-emerald-700 font-bold block mt-0.5">↑ 18% vs mês ant.</span>
          </div>
        </div>

        {/* Resumo de vendas - Daily Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Resumo de vendas</h3>
            <span className="text-[11px] text-slate-500">Últimos 30 dias</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-40 w-full relative pt-2">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] text-slate-400">
              <span>R$ 4.000</span>
              <span>R$ 3.000</span>
              <span>R$ 2.000</span>
              <span>R$ 1.000</span>
              <span>R$ 0</span>
            </div>

            <div className="ml-12 h-32 flex items-end justify-between gap-1 border-b border-slate-200 pt-2 pb-0.5">
              {[
                { h: 30, d: '01' },
                { h: 45, d: '03' },
                { h: 60, d: '05' },
                { h: 75, d: '08' },
                { h: 50, d: '10' },
                { h: 40, d: '12' },
                { h: 65, d: '15' },
                { h: 80, d: '18' },
                { h: 95, d: '22' },
                { h: 70, d: '26' },
                { h: 55, d: '28' },
                { h: 48, d: '31' },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center group">
                  <div
                    className="w-full bg-[#0B4D9C] hover:bg-blue-600 rounded-t transition-all group-hover:scale-y-105"
                    style={{ height: `${bar.h}%` }}
                    title={`R$ ${(bar.h * 40).toFixed(0)}`}
                  />
                  <span className="text-[8px] text-slate-400 mt-1">{bar.d}</span>
                </div>
              ))}
            </div>

            <div className="ml-12 flex justify-between text-[10px] text-slate-500 mt-1">
              <span>01/08</span>
              <span>08/08</span>
              <span>15/08</span>
              <span>22/08</span>
              <span>31/08</span>
            </div>
          </div>
        </div>

        {/* Transações recentes */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Transações recentes</h3>
            <span className="text-[11px] font-semibold text-[#0B4D9C] cursor-pointer">Ver todas &gt;</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {transactions.map((tx, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{tx.id}</span>
                    <span className="text-[10px] text-slate-400">{tx.date}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{tx.type}</span>
                </div>

                <div className="text-right">
                  <span className={`font-black block ${tx.amount < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                    {tx.amount < 0 ? '- ' : ''}R$ {Math.abs(tx.amount).toFixed(2).replace('.', ',')}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${tx.statusColor}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
