import React, { useState } from 'react';
import {
  CheckCircle2,
  Truck,
  Package,
  Tag,
  Star,
  Store,
  Settings,
  FileText,
  ChevronRight,
  CheckCheck,
  Bell,
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllRead,
  onSelectNotification,
}) => {
  const [activeTab, setActiveTab] = useState<'todas' | 'pedidos' | 'ofertas' | 'novidades' | 'sistema'>('todas');

  const filtered = notifications.filter((n) => {
    if (activeTab === 'todas') return true;
    return n.category === activeTab;
  });

  const getIcon = (type: NotificationItem['iconType']) => {
    switch (type) {
      case 'check':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'truck':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'package':
        return <Package className="w-4 h-4 text-amber-600" />;
      case 'tag':
        return <Tag className="w-4 h-4 text-rose-600" />;
      case 'star':
        return <Star className="w-4 h-4 text-amber-500 fill-amber-500" />;
      case 'store':
        return <Store className="w-4 h-4 text-purple-600" />;
      case 'settings':
        return <Settings className="w-4 h-4 text-slate-600" />;
      case 'file':
        return <FileText className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-tight">Notificações</h1>
            <p className="text-[11px] text-slate-500">
              Fique por dentro de tudo que acontece na sua obra.
            </p>
          </div>
          <button
            type="button"
            onClick={onMarkAllRead}
            className="flex items-center gap-1 text-[11px] font-bold text-[#0B4D9C] hover:underline"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Marcar todas como lidas</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('todas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === 'todas' ? 'bg-[#0B4D9C] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Todas ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pedidos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === 'pedidos' ? 'bg-[#0B4D9C] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Pedidos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ofertas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === 'ofertas' ? 'bg-[#0B4D9C] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Ofertas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('novidades')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === 'novidades' ? 'bg-[#0B4D9C] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Novidades
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sistema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === 'sistema' ? 'bg-[#0B4D9C] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Sistema
          </button>
        </div>
      </div>

      <div className="p-3.5 space-y-2.5 max-w-lg mx-auto">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectNotification(item)}
            className={`bg-white rounded-xl border p-3.5 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-blue-400 transition-all ${
              !item.read ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200'
            }`}
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(item.iconType)}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                    {item.title}
                  </h4>
                  {!item.read && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />}
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block font-medium">
                  {item.timeAgo}
                </span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
