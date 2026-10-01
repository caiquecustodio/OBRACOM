import React, { useState } from 'react';
import {
  Activity,
  Bell,
  ChevronDown,
  ChevronUp,
  Package,
  Pause,
  Play,
  ShoppingBag,
  Tag,
  Truck,
  MessageSquare,
  Boxes,
  FastForward,
} from 'lucide-react';
import { useSimulation, SimulationEvent } from '../simulation/SimulationContext';

const KIND_ICON: Record<SimulationEvent['kind'], React.ReactNode> = {
  order: <ShoppingBag className="w-3 h-3 text-blue-600" />,
  notification: <Bell className="w-3 h-3 text-amber-600" />,
  price: <Tag className="w-3 h-3 text-emerald-600" />,
  stock: <Boxes className="w-3 h-3 text-purple-600" />,
  delivery: <Truck className="w-3 h-3 text-sky-600" />,
  chat: <MessageSquare className="w-3 h-3 text-rose-600" />,
};

export const SimulationDock: React.FC = () => {
  const { running, speed, toggleRunning, setSpeed, events } = useSimulation();
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className="fixed bottom-20 right-3 z-40 flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900/95 text-white text-[10px] font-black shadow-2xl border border-emerald-500/50 cursor-pointer hover:bg-slate-800"
        title="Abrir painel de simulação"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            running ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'
          }`}
        />
        SIM
        <ChevronUp className="w-3 h-3" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-3 z-40 w-72 max-w-[calc(100vw-1.5rem)] bg-white/95 backdrop-blur rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-wider">
            Simulação ao vivo
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              running ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'
            }`}
          />
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleRunning}
            className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
            title={running ? 'Pausar simulação' : 'Retomar simulação'}
          >
            {running ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
            title="Minimizar"
          >
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Speed selector */}
      <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
          <FastForward className="w-3 h-3" /> Velocidade
        </span>
        <div className="flex gap-1">
          {([1, 2, 4] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-black cursor-pointer transition-colors ${
                speed === s
                  ? 'bg-[#0B4D9C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Event feed */}
      <div className="max-h-44 overflow-y-auto divide-y divide-slate-50">
        {events.length === 0 && (
          <p className="px-3 py-3 text-[10px] text-slate-400 text-center">
            Aguardando primeiros eventos…
          </p>
        )}
        {events.map((evt) => (
          <div
            key={evt.id}
            className="px-3 py-1.5 flex items-start gap-2 text-[10px] animate-in fade-in slide-in-from-top-1"
          >
            <span className="mt-0.5 shrink-0">{KIND_ICON[evt.kind]}</span>
            <span className="flex-1 text-slate-700 leading-snug">{evt.text}</span>
            <span className="text-slate-400 font-mono shrink-0 text-[9px]">
              {evt.time}
            </span>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center gap-1 text-[9px] text-slate-400">
        <Package className="w-3 h-3" />
        <span>
          Pedidos, preços, estoque e entregas mudando em tempo real
        </span>
      </div>
    </div>
  );
};
