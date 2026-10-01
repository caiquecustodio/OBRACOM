import React, { useMemo, useState } from 'react';
import {
  Download,
  Search,
  CheckCircle2,
  Truck,
  Clock,
  XCircle,
  MoreVertical,
  Check,
  PackageOpen,
  PackageCheck,
  Flame,
} from 'lucide-react';
import { SafeImage } from '../../components/SafeImage';
import { StoreOrder } from '../../types';

type TabId =
  | 'todos'
  | 'aberto'
  | 'separacao'
  | 'enviados'
  | 'entregues'
  | 'cancelados';

interface LojistaOrdersViewProps {
  orders: StoreOrder[];
  onAcceptOrder: (id: string) => void;
  onAdvanceOrder: (id: string) => void;
}

export const LojistaOrdersView: React.FC<LojistaOrdersViewProps> = ({
  orders,
  onAcceptOrder,
  onAdvanceOrder,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Contagens ao vivo vindas do motor de simulação
  const counts = useMemo(() => {
    const c: Record<TabId, number> = {
      todos: orders.length,
      aberto: 0,
      separacao: 0,
      enviados: 0,
      entregues: 0,
      cancelados: 0,
    };
    for (const o of orders) {
      if (o.status === 'em_aberto') c.aberto++;
      else if (o.status === 'em_separacao') c.separacao++;
      else if (o.status === 'em_transporte') c.enviados++;
      else if (o.status === 'entregue') c.entregues++;
      else if (o.status === 'cancelado') c.cancelados++;
    }
    return c;
  }, [orders]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesTab =
        activeTab === 'todos' ||
        (activeTab === 'aberto' && o.status === 'em_aberto') ||
        (activeTab === 'separacao' && o.status === 'em_separacao') ||
        (activeTab === 'enviados' && o.status === 'em_transporte') ||
        (activeTab === 'entregues' && o.status === 'entregue') ||
        (activeTab === 'cancelados' && o.status === 'cancelado');
      if (!matchesTab) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q) ||
        o.itemSummary.toLowerCase().includes(q)
      );
    });
  }, [orders, activeTab, searchQuery]);

  const getStatusBadge = (status: StoreOrder['status']) => {
    switch (status) {
      case 'entregue':
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Entregue
          </span>
        );
      case 'em_transporte':
        return (
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center gap-1">
            <Truck className="w-3 h-3 text-blue-600" /> Em transporte
          </span>
        );
      case 'em_separacao':
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" /> Em separação
          </span>
        );
      case 'em_aberto':
        return (
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold flex items-center gap-1">
            <PackageOpen className="w-3 h-3 text-slate-500" /> Em aberto
          </span>
        );
      case 'cancelado':
        return (
          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold flex items-center gap-1">
            <XCircle className="w-3 h-3 text-rose-600" /> Cancelado
          </span>
        );
    }
  };

  // Exportação real: gera CSV dos pedidos e faz download
  const exportCsv = () => {
    const header = 'pedido;cliente;cidade;data;itens;total;pagamento;status\n';
    const rows = orders
      .map((o) =>
        [
          o.id,
          o.customer,
          o.city,
          `"${o.date}"`,
          o.itemsCount,
          o.total.toFixed(2).replace('.', ','),
          `"${o.paymentMethod}"`,
          o.status,
        ].join(';')
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedidos-obracom-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: 'todos', label: 'Todos', count: counts.todos },
    { id: 'aberto', label: 'Em aberto', count: counts.aberto },
    { id: 'separacao', label: 'Em separação', count: counts.separacao },
    { id: 'enviados', label: 'Em transporte', count: counts.enviados },
    { id: 'entregues', label: 'Entregues', count: counts.entregues },
    { id: 'cancelados', label: 'Cancelados', count: counts.cancelados },
  ];

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black text-slate-900 leading-tight flex items-center gap-2">
              Pedidos da loja
              <span className="flex items-center gap-1 text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Ao vivo
              </span>
            </h1>
            <p className="text-[11px] text-slate-500">
              Novos pedidos chegam automaticamente do marketplace.
            </p>
          </div>
          <button
            type="button"
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B4D9C] text-white text-xs font-bold hover:bg-blue-700 shadow-xs cursor-pointer transition-colors"
            title="Baixar CSV com todos os pedidos"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar</span>
          </button>
        </div>

        {/* Status tabs (contagens ao vivo) */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar pt-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0B4D9C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nº do pedido, cliente, cidade ou produto..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
          />
        </div>
      </div>

      <div className="p-3.5 space-y-2.5 max-w-lg mx-auto">
        {filtered.length === 0 && (
          <p className="text-center text-xs text-slate-400 py-10">
            Nenhum pedido encontrado para este filtro.
          </p>
        )}
        {filtered.map((ord) => (
          <div
            key={ord.id}
            className={`bg-white rounded-xl border p-3 shadow-xs space-y-2 text-xs transition-all ${
              ord.isNew
                ? 'border-emerald-300 ring-2 ring-emerald-100'
                : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900">{ord.id}</span>
                  {ord.isNew && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-black uppercase">
                      <Flame className="w-2.5 h-2.5" /> Novo
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">{ord.date}</span>
                </div>
                <p className="font-bold text-slate-700 mt-0.5">{ord.customer}</p>
                <span className="text-[10px] text-slate-500">{ord.city}</span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {getStatusBadge(ord.status)}
                <button type="button" className="text-slate-400 hover:text-slate-600 p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 font-medium leading-snug">
              {ord.itemSummary}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <SafeImage
                  src={ord.thumbUrl}
                  alt=""
                  className="w-8 h-8 object-contain rounded bg-slate-50 p-0.5 border shrink-0"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[11px] font-semibold text-slate-600">
                  {ord.itemsCount} {ord.itemsCount === 1 ? 'item' : 'itens'}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <span className="font-black text-slate-900 block">
                    R$ {ord.total.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[9px] text-slate-400">{ord.paymentMethod}</span>
                </div>

                {ord.status === 'em_aberto' && (
                  <button
                    type="button"
                    onClick={() => onAcceptOrder(ord.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs transition-colors cursor-pointer"
                    title="Aceitar e iniciar separação"
                  >
                    <Check className="w-3.5 h-3.5" /> Aceitar
                  </button>
                )}
                {ord.status === 'em_separacao' && (
                  <button
                    type="button"
                    onClick={() => onAdvanceOrder(ord.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shadow-xs transition-colors cursor-pointer"
                    title="Marcar como enviado"
                  >
                    <Truck className="w-3.5 h-3.5" /> Enviar
                  </button>
                )}
                {ord.status === 'em_transporte' && (
                  <button
                    type="button"
                    onClick={() => onAdvanceOrder(ord.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs transition-colors cursor-pointer"
                    title="Confirmar entrega"
                  >
                    <PackageCheck className="w-3.5 h-3.5" /> Entregue
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Footer de contagem */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>
            Mostrando {filtered.length} de {orders.length} pedidos
          </span>
          <span className="flex items-center gap-1 text-emerald-600 font-bold text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Sincronizado automaticamente
          </span>
        </div>
      </div>
    </div>
  );
};
