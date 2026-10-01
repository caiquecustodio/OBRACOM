import React, { useState } from 'react';
import {
  CheckCircle2,
  Package,
  FileText,
  MapPin,
  Star,
  RefreshCw,
  HelpCircle,
  Store,
  ChevronRight,
  Send,
  Navigation,
  Check,
  Wallet,
  Truck,
  PartyPopper,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { Order } from '../types';

interface OrderConfirmedViewProps {
  order: Order;
  onTrackOrder: () => void;
  onBuyAgain: () => void;
  onGoHome: () => void;
  onOpenHelp: () => void;
}

export const OrderConfirmedView: React.FC<OrderConfirmedViewProps> = ({
  order,
  onTrackOrder,
  onBuyAgain,
  onGoHome,
  onOpenHelp,
}) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard?.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendReview = () => {
    if (!reviewText) return;
    setReviewSubmitted(true);
  };

  return (
    <div className="flex-1 w-full bg-slate-50 pb-20 overflow-y-auto">
      {/* Banner de sucesso (matches PEDIDO FINALIZADO.jpg) */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-[#0B4D9C] text-white py-6 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 shadow-md">
            <CheckCircle2 className="w-8 h-8 text-emerald-200" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black leading-tight">Pedido confirmado!</h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
              Obra em movimento! Juntos construímos mais.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
        {/* Order ID & dates header */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-slate-900">{order.id}</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="text-[11px] text-[#0B4D9C] font-semibold hover:underline"
              >
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Realizado em {order.date}
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
          >
            <FileText className="w-3.5 h-3.5 text-[#0B4D9C]" />
            <span>Ver nota fiscal</span>
          </button>
        </div>

        {/* Resumo da compra: economia, pagamento, previsão e frete */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-[#0B4D9C]" />
              Resumo da compra
            </h3>
            {order.discount > 0 && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                <PartyPopper className="w-3 h-3" />
                Você economizou R$ {order.discount.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-semibold">Pagamento</p>
              <p className="font-bold text-slate-900 mt-0.5">{order.paymentMethod}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-semibold">Previsão</p>
              <p className="font-bold text-slate-900 mt-0.5">{order.deliveryForecast}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                <Truck className="w-3 h-3" /> Frete
              </p>
              <p className={`font-bold mt-0.5 ${order.deliveryFee === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                {order.deliveryFee === 0 ? 'GRÁTIS' : `R$ ${order.deliveryFee.toFixed(2).replace('.', ',')}`}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
              <p className="text-[10px] text-blue-400 font-semibold">Total pago</p>
              <p className="font-black text-[#0B4D9C] mt-0.5 text-sm">
                R$ {order.total.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
          {order.discount > 0 && (
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Descontos aplicados: ofertas, PIX e cupom já deduzidos do total.
            </p>
          )}
        </div>

        {/* Real-time map callout card */}
        <div
          onClick={onTrackOrder}
          className="bg-gradient-to-r from-blue-900 to-[#0B4D9C] text-white rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold">Acompanhar entrega em tempo real</h4>
              <p className="text-[11px] text-blue-100">
                {order.deliveryForecast} · veja o veículo no mapa de Fortaleza
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-cyan-300" />
        </div>

        {/* Itens do pedido */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-[#0B4D9C]" />
            Itens do pedido
          </h3>

          <div className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-10 h-10 object-contain rounded-md bg-slate-50 p-1 border border-slate-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h5 className="font-bold text-slate-900 truncate">{item.name}</h5>
                    <p className="text-[11px] text-slate-500">
                      R$ {item.unitPrice.toFixed(2).replace('.', ',')} · Qtd: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 shrink-0">
                  R$ {item.totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Informações de entrega */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#0B4D9C]" />
            Informações de entrega
          </h3>

          <div className="space-y-3 pl-2">
            {order.trackingSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 relative text-xs">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    step.completed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Check className="w-3 h-3" />
                </div>
                {idx < order.trackingSteps.length - 1 && (
                  <div
                    className={`absolute left-2.5 top-5 w-0.5 h-6 ${
                      step.completed ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}
                <div>
                  <span className="font-bold text-slate-900">{step.title}</span>
                  <p className="text-[11px] text-slate-500">{step.subtitle} · {step.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
            <strong>Endereço de entrega:</strong> {order.deliveryAddress}
          </div>
        </div>

        {/* Avalie sua compra */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            Avalie sua compra
          </h3>

          {reviewSubmitted ? (
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-800 text-xs font-semibold text-center">
              Obrigado pela sua avaliação! Sua opinião ajuda a construir uma comunidade mais confiável.
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Conte pra gente o que achou dos produtos e do prazo de entrega..."
                rows={2}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
              />

              <button
                type="button"
                onClick={handleSendReview}
                className="px-4 py-2 rounded-lg bg-[#0B4D9C] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#0e5db8] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar avaliação</span>
              </button>
            </div>
          )}
        </div>

        {/* 4 Quick Actions (matches PEDIDO FINALIZADO.jpg) */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={onBuyAgain}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-left space-y-0.5 shadow-xs"
          >
            <RefreshCw className="w-4 h-4 text-[#0B4D9C] mb-1" />
            <h5 className="font-bold text-slate-900">Comprar novamente</h5>
            <p className="text-[10px] text-slate-500">Adicione os mesmos itens ao carrinho</p>
          </button>

          <button
            type="button"
            onClick={onOpenHelp}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-left space-y-0.5 shadow-xs"
          >
            <HelpCircle className="w-4 h-4 text-[#0B4D9C] mb-1" />
            <h5 className="font-bold text-slate-900">Precisa de ajuda?</h5>
            <p className="text-[10px] text-slate-500">Fale com nosso time de atendimento</p>
          </button>
        </div>

        <button
          type="button"
          onClick={onGoHome}
          className="w-full py-3 rounded-xl border border-[#0B4D9C] text-[#0B4D9C] hover:bg-blue-50 font-bold text-xs transition-colors"
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
};
