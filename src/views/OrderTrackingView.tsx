import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SafeImage } from '../components/SafeImage';
import {
  Truck,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Headphones,
  Send,
  Navigation,
  PackageCheck,
} from 'lucide-react';
import { ChatMessage, Order } from '../types';

/** Interpola uma posição t (0–1) ao longo dos waypoints da rota */
function positionAlongRoute(
  route: [number, number][],
  t: number
): [number, number] {
  if (t <= 0) return route[0];
  if (t >= 1) return route[route.length - 1];
  const seg = t * (route.length - 1);
  const i = Math.min(route.length - 2, Math.floor(seg));
  const f = seg - i;
  const [lat1, lng1] = route[i];
  const [lat2, lng2] = route[i + 1];
  return [lat1 + (lat2 - lat1) * f, lng1 + (lng2 - lng1) * f];
}

interface OrderTrackingViewProps {
  order: Order;
  progress?: number;
  chatMessages?: ChatMessage[];
  onSendMessage?: (text: string) => void;
  onCallDriver: () => void;
  onChatDriver: () => void;
  onOpenHelp: () => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  order,
  progress: progressProp,
  chatMessages = [],
  onSendMessage,
  onCallDriver,
  onChatDriver,
  onOpenHelp,
}) => {
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const vanMarkerRef = useRef<L.Marker | null>(null);

  // Rota da entrega em Fortaleza: loja ConstróiMais (Aldeota) → obra (Papicu)
  const ROUTE: [number, number][] = [
    [-3.7358, -38.529], // Loja ConstróiMais
    [-3.733, -38.5255],
    [-3.73, -38.5215], // Meireles
    [-3.727, -38.518],
    [-3.7245, -38.5145], // Papicu
    [-3.7218, -38.511], // Sua Obra
  ];
  const plate = order.driver?.vehiclePlate?.split(' ')[0] || 'OBR-1234';

  // GPS ao vivo: 0–100% da rota percorrida (motor da simulação)
  const progress =
    progressProp !== undefined ? progressProp : order.status === 'entregue' ? 100 : 35;
  const delivered = progress >= 100 || order.status === 'entregue';
  const etaMinutes = delivered
    ? 0
    : Math.max(2, Math.ceil(((100 - progress) / 100) * 42));

  // Etapas derivadas do progresso GPS ao vivo (0–100%)
  const s2Done = progress >= 10; // Pagamento aprovado
  const s3Done = progress >= 30; // Separação concluída / saiu para entrega

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length]);

  // Cria o mapa real (Leaflet) uma vez: tile layer, rota e marcadores.
  // Marcadores usam divIcon porque os ícones padrão do Leaflet quebram
  // quando empacotados pelo Vite.
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el || mapRef.current) return;

    const vanIcon = L.divIcon({
      className: 'obracom-van-marker',
      html: `<div style="display:flex;flex-direction:column;align-items:center;transform:translateY(-8px)"><div style="width:30px;height:30px;border-radius:9999px;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg></div><div style="margin-top:2px;background:#0f172a;color:#fff;font-size:8px;font-weight:900;padding:0 4px;border-radius:3px;white-space:nowrap">${plate}</div></div>`,
      iconSize: [34, 54],
      iconAnchor: [17, 16],
    });

    const map = L.map(el);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
    L.polyline(ROUTE, {
      color: '#0B4D9C',
      weight: 5,
      opacity: 0.85,
      dashArray: '8 6',
    }).addTo(map);
    L.marker(ROUTE[0], {
      icon: L.divIcon({
        className: 'obracom-store-pin',
        html: '<div style="width:26px;height:26px;border-radius:9999px;background:#0B4D9C;color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35)">Loja</div>',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      }),
    }).addTo(map);
    L.marker(ROUTE[ROUTE.length - 1], {
      icon: L.divIcon({
        className: 'obracom-dest-pin',
        html: '<div style="width:28px;height:28px;border-radius:9999px;background:#059669;color:#fff;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35)"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg></div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    }).addTo(map);
    vanMarkerRef.current = L.marker(ROUTE[0], { icon: vanIcon }).addTo(map);
    map.fitBounds(L.latLngBounds(ROUTE).pad(0.4));
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      vanMarkerRef.current = null;
    };
  }, []);

  // GPS ao vivo: desloca a van pela rota conforme o progresso (0–100%)
  useEffect(() => {
    const van = vanMarkerRef.current;
    if (!van) return;
    van.setLatLng(
      positionAlongRoute(ROUTE, Math.max(0, Math.min(1, progress / 100)))
    );
  }, [progress]);

  const handleSend = () => {
    const text = chatInput.trim();
    if (!text || !onSendMessage) return;
    onSendMessage(text);
    setChatInput('');
  };

  return (
    <div className="flex-1 w-full bg-slate-50 pb-20 overflow-y-auto">
      {/* Header Info */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                {delivered ? 'Pedido entregue' : 'Pedido em entrega'}
              </h1>
              <p className="text-xs text-slate-500">
                {delivered
                  ? 'Entrega concluída com sucesso na obra.'
                  : 'Acompanhe cada etapa do seu pedido em tempo real.'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-slate-900">{order.id}</span>
              <span className="text-[11px] text-slate-400 block">{order.date}</span>
            </div>
          </div>

          {/* 5-Step Progress Bar (ilumina conforme o progresso GPS avança ao vivo) */}
          <div className="mt-5 flex items-center justify-between text-center relative max-w-2xl mx-auto">
          <div className="flex flex-col items-center z-10">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              ✓
            </div>
            <span className="text-[9px] font-semibold text-slate-700 mt-1">Confirmado</span>
          </div>
          <div className={`h-0.5 flex-1 mx-0.5 ${s2Done ? 'bg-blue-600' : 'bg-slate-200'}`} />

          <div className="flex flex-col items-center z-10">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              s2Done ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'
            }`}>
              {s2Done ? '✓' : '2'}
            </div>
            <span className={`text-[9px] font-semibold mt-1 ${s2Done ? 'text-slate-700' : 'text-slate-400'}`}>
              Aprovado
            </span>
          </div>
          <div className={`h-0.5 flex-1 mx-0.5 ${s3Done ? 'bg-blue-600' : 'bg-slate-200'}`} />

          <div className="flex flex-col items-center z-10">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              s3Done ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'
            }`}>
              {s3Done ? '✓' : '3'}
            </div>
            <span className={`text-[9px] font-semibold mt-1 ${s3Done ? 'text-slate-700' : 'text-slate-400'}`}>
              Separação
            </span>
          </div>
          <div className={`h-0.5 flex-1 mx-0.5 ${s3Done ? 'bg-blue-600' : 'bg-slate-200'}`} />

          <div className="flex flex-col items-center z-10">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              delivered
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0B4D9C] text-white ring-4 ring-blue-100 animate-pulse'
            }`}>
              {delivered ? <PackageCheck className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
            </div>
            <span className={`text-[9px] font-bold mt-1 ${delivered ? 'text-emerald-700' : 'text-[#0B4D9C]'}`}>
              {delivered ? 'Entregue' : 'Em entrega'}
            </span>
          </div>
          <div className={`h-0.5 flex-1 mx-0.5 ${delivered ? 'bg-emerald-500' : 'bg-slate-200'}`} />

          <div className="flex flex-col items-center z-10">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              delivered ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
            }`}>
              {delivered ? '✓' : '5'}
            </div>
            <span className={`text-[9px] font-medium mt-1 ${delivered ? 'text-emerald-700' : 'text-slate-400'}`}>
              Entregue
            </span>
          </div>
        </div>

        {/* Barra de progresso GPS ao vivo */}
        <div className="mt-4 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-[#0B4D9C] flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              {delivered ? 'Carga entregue e conferida na obra' : `Rota em andamento · ${Math.round(progress)}%`}
            </span>
            <span className="text-slate-600">
              {delivered ? 'Entregue agora' : `≈ ${etaMinutes} min de rota`}
            </span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-blue-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0B4D9C] to-sky-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
        {/* Main Map Box */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Status banner */}
          <div className="p-3.5 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0B4D9C] text-white flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Seu pedido está a caminho!</h3>
                <p className="text-[11px] text-slate-600">
                  Previsão de entrega: <strong>{order.deliveryForecast}</strong>
                </p>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
              delivered ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${delivered ? 'bg-emerald-600' : 'bg-blue-600 animate-ping'}`} />
              {delivered ? 'Entregue' : 'Em rota'}
            </span>
          </div>

          {/* Mapa real (Leaflet) — rota ao vivo da entrega em Fortaleza */}
          <div
            ref={mapContainerRef}
            className="h-72 w-full bg-slate-200"
            style={{ zIndex: 0 }}
          />

        {/* Chat ao vivo com o entregador */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mt-4">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0B4D9C] text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Chat com {order.driver?.name || 'o entregador'}
                </h4>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online agora
                </p>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">
              {chatMessages.length} {chatMessages.length === 1 ? 'mensagem' : 'mensagens'}
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto p-3 space-y-2 bg-[#f7f9fc]">
            {chatMessages.length === 0 && (
              <p className="text-center text-[11px] text-slate-400 py-4">
                Inicie a conversa com o entregador…
              </p>
            )}
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.from === 'me'
                      ? 'bg-[#0B4D9C] text-white rounded-br-md'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`block text-[9px] mt-0.5 ${msg.from === 'me' ? 'text-blue-200' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-2.5 border-t border-slate-100 flex items-center gap-2 bg-white">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escreva para o entregador…"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-100 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B4D9C]/40"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!chatInput.trim() || !onSendMessage}
              className="w-9 h-9 rounded-xl bg-[#0B4D9C] text-white flex items-center justify-center shadow-xs hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

          {/* Entregador Card (matches DETALHES DA COMPRA.jpg) */}
          <div className="p-3.5 bg-white flex items-center justify-between border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                <Truck className="w-5 h-5 text-[#0B4D9C]" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Entregador parceiro</span>
                <h4 className="text-xs font-bold text-slate-900">{order.driver?.name}</h4>
                <p className="text-[10px] text-slate-500">Veículo: {order.driver?.vehiclePlate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onChatDriver}
                className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-700 cursor-pointer"
                title="Conversar no chat"
              >
                <MessageSquare className="w-4 h-4 text-[#0B4D9C]" />
              </button>
              <button
                type="button"
                onClick={onCallDriver}
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xs cursor-pointer"
                title="Ligar para o motorista"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Histórico do pedido (Timeline) */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900">Histórico do pedido</h3>
          <div className="space-y-3 pl-2">
            {order.trackingSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 relative text-xs">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    step.current
                      ? 'bg-blue-600 text-white ring-2 ring-blue-200'
                      : step.completed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                {idx < order.trackingSteps.length - 1 && (
                  <div
                    className={`absolute left-2.5 top-5 w-0.5 h-6 ${
                      step.completed ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${step.current ? 'text-blue-900' : 'text-slate-800'}`}>
                      {step.title}
                    </span>
                    <span className="text-[10px] text-slate-400">{step.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo do pedido */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Resumo do pedido</h3>
            <span className="text-xs font-bold text-slate-900">
              Total: R$ {order.total.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <SafeImage
                    src={item.imageUrl}
                    alt=""
                    className="w-8 h-8 object-contain rounded bg-slate-50 p-0.5 border border-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 block truncate max-w-[200px]">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-400">Qtd: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-slate-900">
                  R$ {item.totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Suporte de atendimento */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-[#0B4D9C]" />
            <h3 className="text-xs font-bold text-slate-900">Precisa de ajuda com esta entrega?</h3>
          </div>
          <p className="text-[11px] text-slate-500">
            Nosso time de atendimento está disponível para tirar dúvidas sobre a sua rota.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={onOpenHelp}
              className="py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#0B4D9C]" />
              <span>Chat online</span>
            </button>
            <button
              type="button"
              onClick={onCallDriver}
              className="py-2 rounded-lg bg-[#0B4D9C] text-white text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Ligar agora</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
