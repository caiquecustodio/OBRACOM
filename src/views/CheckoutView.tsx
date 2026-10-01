import React, { useMemo, useState } from 'react';
import {
  Check,
  ShieldCheck,
  MapPin,
  Truck,
  CreditCard,
  QrCode,
  FileText,
  Tag,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  PartyPopper,
  X,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { CartItem } from '../types';

export type DeliveryOption = 'rapida' | 'economica' | 'retirada';
export type PaymentMethod = 'pix' | 'credit' | 'boleto';

/** Payload real da finalização: App.tsx monta o pedido com estes valores */
export interface CheckoutPayload {
  subtotal: number;
  offerDiscount: number;
  pixDiscount: number;
  couponDiscount: number;
  couponCode: string | null;
  deliveryFee: number;
  total: number;
  savings: number;
  paymentMethod: PaymentMethod;
  paymentMethodLabel: string;
  deliveryOption: DeliveryOption;
  deliveryForecast: string;
  deliveryAddress: string;
}

interface CheckoutViewProps {
  cartItems: CartItem[];
  onFinishOrder: (payload: CheckoutPayload) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  onRemoveCartItem: (productId: string) => void;
  onContinueShopping?: () => void;
}

/** Cupons válidos da demo: percentual sobre o subtotal ou frete grátis */
const COUPONS: Record<
  string,
  { description: string; percent?: number; freeShipping?: boolean }
> = {
  OBRA10: { description: '10% OFF', percent: 0.1 },
  OBRACOM15: { description: '15% OFF', percent: 0.15 },
  FRETEGRATIS: { description: 'Frete grátis', freeShipping: true },
};

const DELIVERY_OPTIONS: Record<
  DeliveryOption,
  { label: string; fee: number; forecast: string; note: string; badge: string }
> = {
  rapida: {
    label: 'Entrega Rápida',
    fee: 0,
    forecast: 'Hoje até às 18:00',
    note: 'Hoje até às 18h no canteiro',
    badge: '✓ Mais escolhida',
  },
  economica: {
    label: 'Entrega Agendada',
    fee: 19.9,
    forecast: 'Entrega em 2 a 3 dias úteis',
    note: 'Em 2 a 3 dias úteis',
    badge: 'Carga pesada',
  },
  retirada: {
    label: 'Retirada na Loja',
    fee: 0,
    forecast: 'Retirada na loja em até 2 horas',
    note: 'Disponível em 2 horas na loja',
    badge: 'ConstróiMais Aldeota',
  },
};

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  pix: 'PIX',
  credit: 'Cartão de crédito',
  boleto: 'Boleto bancário',
};

const brl = (v: number) => `R$ ${v.toFixed(2).replace('.', ',')}`;

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  onFinishOrder,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onContinueShopping,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    title: 'Casa (Endereço principal)',
    street: 'Av. Santos Dumont, 2500',
    neighborhood: 'Aldeota',
    city: 'Fortaleza - CE',
    cep: '60150-161',
  });
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('rapida');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // ---- Cálculos do pedido (memorizados) ----
  const { subtotal, offerDiscount } = useMemo(() => {
    let sub = 0;
    let offer = 0;
    for (const item of cartItems) {
      sub += item.product.price * item.quantity;
      if (
        item.product.originalPrice &&
        item.product.originalPrice > item.product.price
      ) {
        offer +=
          (item.product.originalPrice - item.product.price) * item.quantity;
      }
    }
    return { subtotal: sub, offerDiscount: offer };
  }, [cartItems]);

  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const couponRule = appliedCoupon ? COUPONS[appliedCoupon] : null;
  const couponDiscount = couponRule?.percent ? subtotal * couponRule.percent : 0;
  const rawFreight = DELIVERY_OPTIONS[deliveryOption].fee;
  const deliveryFee = couponRule?.freeShipping ? 0 : rawFreight;
  const freightSaved = rawFreight - deliveryFee;

  const total = Math.max(
    0,
    subtotal - offerDiscount - pixDiscount - couponDiscount + deliveryFee
  );
  const savings = offerDiscount + pixDiscount + couponDiscount + freightSaved;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError(null);
    } else {
      setAppliedCoupon(null);
      setCouponError('Cupom inválido ou expirado. Tente OBRA10 ou OBRACOM15.');
    }
  };

  const finish = () => {
    onFinishOrder({
      subtotal,
      offerDiscount,
      pixDiscount,
      couponDiscount,
      couponCode: appliedCoupon,
      deliveryFee,
      total,
      savings,
      paymentMethod,
      paymentMethodLabel: PAYMENT_LABELS[paymentMethod],
      deliveryOption,
      deliveryForecast: DELIVERY_OPTIONS[deliveryOption].forecast,
      deliveryAddress:
        deliveryOption === 'retirada'
          ? 'Retirada na Loja ConstróiMais — Av. Santos Dumont, 2500 - Aldeota - Fortaleza - CE'
          : `${address.street} - ${address.neighborhood} - ${address.city}, CEP ${address.cep} (${address.title})`,
    });
  };

  const itemsCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // ---- Stepper (Carrinho → Entrega → Pagamento → Conclusão) ----
  const stepNames = ['Carrinho', 'Entrega', 'Pagamento', 'Conclusão'];
  const renderStepper = () => (
    <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-10 shadow-xs">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {stepNames.map((name, idx) => {
          const num = idx + 1;
          const done = num < step || (num === 4 && false);
          const active = num === step;
          const clickable = num < step;
          return (
            <React.Fragment key={name}>
              {idx > 0 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    num <= step ? 'bg-[#0B4D9C]' : 'bg-slate-200'
                  }`}
                />
              )}
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && setStep(num as 1 | 2 | 3)}
                className={`flex flex-col items-center ${
                  clickable ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${
                    active
                      ? 'bg-[#0B4D9C] text-white ring-4 ring-blue-100'
                      : done
                      ? 'bg-[#0B4D9C] text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : num}
                </div>
                <span
                  className={`text-[10px] mt-1 ${
                    active
                      ? 'font-bold text-[#0B4D9C]'
                      : done
                      ? 'font-medium text-blue-900'
                      : 'font-medium text-slate-400'
                  }`}
                >
                  {idx + 1}. {name}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  // ---- Carrinho vazio ----
  if (cartItems.length === 0) {
    return (
      <div className="flex-1 w-full bg-slate-50 pb-20 flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-xs">
          <ShoppingCart className="w-9 h-9 text-slate-300" />
        </div>
        <h1 className="text-xl font-black text-slate-900">Seu carrinho está vazio</h1>
        <p className="text-xs text-slate-500 mt-1.5 max-w-xs">
          Adicione materiais de construção para finalizar a compra e acompanhar a entrega em tempo real.
        </p>
        <button
          type="button"
          onClick={onContinueShopping}
          className="mt-6 px-6 py-3 rounded-2xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-xs font-black shadow-lg flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continuar comprando</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-slate-50 pb-24 overflow-y-auto">
      {renderStepper()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {step === 1 && 'Revise seu carrinho'}
              {step === 2 && 'Entrega na obra'}
              {step === 3 && 'Pagamento e desconto'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {step === 1 && 'Confira os itens e quantidades antes de seguir.'}
              {step === 2 && 'Escolha o endereço e a modalidade de envio.'}
              {step === 3 && 'Aplique cupons e escolha a forma de pagamento.'}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Compra 100% Segura</span>
          </div>
        </div>

        {/* ================= ETAPA 1 — CARRINHO ================= */}
        {step === 1 && (
          <div className="max-w-3xl mx-auto space-y-4">
            {cartItems.map((item) => {
              const hasOffer =
                !!item.product.originalPrice &&
                item.product.originalPrice > item.product.price;
              const lineTotal = item.product.price * item.quantity;
              return (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-wrap gap-4 items-center"
                >
                  <SafeImage
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-contain bg-slate-50 p-2 border border-slate-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-[180px]">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {item.product.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.product.seller.name} · {item.product.seller.deliveryType}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs font-black text-slate-900">
                        {brl(item.product.price)}
                      </span>
                      {hasOffer && (
                        <>
                          <span className="text-[11px] text-slate-400 line-through">
                            {brl(item.product.originalPrice!)}
                          </span>
                          <span className="bg-red-100 text-red-700 text-[10px] font-black px-1.5 py-0.5 rounded">
                            OFERTA
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quantidade */}
                  <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                    <button
                      type="button"
                      aria-label="Diminuir"
                      onClick={() =>
                        onUpdateCartQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700 hover:text-[#0B4D9C] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-black text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Aumentar"
                      onClick={() =>
                        onUpdateCartQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700 hover:text-[#0B4D9C] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-slate-900 block">
                      {brl(lineTotal)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveCartItem(item.product.id)}
                      className="text-[11px] text-red-500 hover:underline font-semibold inline-flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remover
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Subtotal + continuar */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-slate-500 block">
                  {itemsCount} {itemsCount === 1 ? 'item' : 'itens'} no carrinho
                </span>
                <span className="text-lg font-black text-slate-900">
                  Subtotal {brl(subtotal)}
                </span>
                {offerDiscount > 0 && (
                  <span className="block text-xs font-bold text-emerald-700">
                    Você já economiza {brl(offerDiscount)} em ofertas
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3.5 rounded-2xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-sm font-black shadow-lg flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Continuar para entrega</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= ETAPA 2 — ENTREGA ================= */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Endereço */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Endereço de entrega da obra
                    </h3>
                    <p className="text-xs text-slate-500">{address.title}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-xs font-bold text-[#0B4D9C] hover:underline"
                >
                  {isEditingAddress ? 'Salvar Endereço' : 'Alterar Endereço'}
                </button>
              </div>

              {isEditingAddress ? (
                <div className="space-y-3 pt-2 text-xs border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Rua / Avenida e Número
                      </label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Bairro
                      </label>
                      <input
                        type="text"
                        value={address.neighborhood}
                        onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Cidade / UF
                      </label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        CEP
                      </label>
                      <input
                        type="text"
                        value={address.cep}
                        onChange={(e) => setAddress({ ...address, cep: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed">
                  <p className="font-semibold text-slate-900">
                    {address.street} - {address.neighborhood}
                  </p>
                  <p className="text-slate-500">
                    {address.city} · CEP: {address.cep}
                  </p>
                </div>
              )}
            </div>

            {/* Modalidades */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0B4D9C]" />
                Modalidade de Envio
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(DELIVERY_OPTIONS) as DeliveryOption[]).map((key) => {
                  const opt = DELIVERY_OPTIONS[key];
                  const selected = deliveryOption === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setDeliveryOption(key)}
                      className={`p-4 rounded-xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                        selected
                          ? 'border-[#0B4D9C] bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">
                            {opt.label}
                          </span>
                          <span
                            className={`text-xs font-black ${
                              opt.fee === 0 ? 'text-emerald-700' : 'text-slate-900'
                            }`}
                          >
                            {opt.fee === 0 ? 'GRÁTIS' : brl(opt.fee)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{opt.note}</p>
                      </div>
                      <span
                        className={`text-[10px] font-bold mt-2 ${
                          key === 'rapida' ? 'text-emerald-700' : 'text-slate-400'
                        }`}
                      >
                        {opt.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao carrinho</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 rounded-2xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-sm font-black shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Continuar para pagamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= ETAPA 3 — PAGAMENTO ================= */}
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: pagamento + cupom */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#0B4D9C]" />
                  Forma de Pagamento
                </h3>
                <div className="space-y-2.5">
                  {/* PIX */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                      paymentMethod === 'pix'
                        ? 'border-emerald-600 bg-emerald-50/30 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            PIX Instantâneo
                          </span>
                          <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                            5% OFF
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Aprovação imediata e envio prioritário
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === 'pix'
                          ? 'border-emerald-600 bg-emerald-600 ring-2 ring-emerald-200'
                          : 'border-slate-300'
                      }`}
                    />
                  </button>

                  {/* Cartão */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                      paymentMethod === 'credit'
                        ? 'border-[#0B4D9C] bg-blue-50/30 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B4D9C] flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-bold text-slate-900 block">
                          Cartão de Crédito
                        </span>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Em até 12x sem juros
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === 'credit'
                          ? 'border-[#0B4D9C] bg-[#0B4D9C] ring-2 ring-blue-100'
                          : 'border-slate-300'
                      }`}
                    />
                  </button>

                  {/* Boleto */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('boleto')}
                    className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                      paymentMethod === 'boleto'
                        ? 'border-[#0B4D9C] bg-blue-50/30 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-bold text-slate-900 block">
                          Boleto Bancário
                        </span>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Vencimento em 3 dias úteis
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === 'boleto'
                          ? 'border-[#0B4D9C] bg-[#0B4D9C] ring-2 ring-blue-100'
                          : 'border-slate-300'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Cupom */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#0B4D9C]" />
                  Cupom de Desconto
                </h3>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-2">
                      <PartyPopper className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="text-xs font-black text-emerald-800">
                          {appliedCoupon}
                        </span>
                        <span className="text-xs text-emerald-700 ml-2">
                          {COUPONS[appliedCoupon].description} aplicado
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponInput('');
                      }}
                      className="text-slate-400 hover:text-red-500 cursor-pointer"
                      aria-label="Remover cupom"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase());
                          setCouponError(null);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                        placeholder="Ex: OBRA10, OBRACOM15, FRETEGRATIS"
                        className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-bold uppercase text-slate-800 placeholder:normal-case placeholder:font-normal placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] font-semibold text-red-600">
                        {couponError}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400">
                      Cupons da demo: OBRA10 (10% OFF) · OBRACOM15 (15% OFF) ·
                      FRETEGRATIS (frete grátis)
                    </p>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
              </div>
            </div>

            {/* RIGHT: resumo */}
            <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-900">
                    Resumo do Pedido
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    {itemsCount} {itemsCount === 1 ? 'item' : 'itens'}
                  </span>
                </div>

                {/* Itens */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="pt-2.5 first:pt-0 flex items-center gap-3">
                      <SafeImage
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-contain bg-slate-50 p-1 border border-slate-100 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {item.quantity}x {brl(item.product.price)}
                        </p>
                      </div>
                      <span className="text-xs font-black text-slate-900 shrink-0">
                        {brl(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>{brl(subtotal)}</span>
                  </div>
                  {offerDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Desconto das ofertas</span>
                      <span>- {brl(offerDiscount)}</span>
                    </div>
                  )}
                  {pixDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Desconto PIX (5%)</span>
                      <span>- {brl(pixDiscount)}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Cupom {appliedCoupon}</span>
                      <span>- {brl(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Frete ({DELIVERY_OPTIONS[deliveryOption].label})</span>
                    <span
                      className={
                        deliveryFee === 0 ? 'text-emerald-700 font-bold' : ''
                      }
                    >
                      {deliveryFee === 0 ? 'GRÁTIS' : brl(deliveryFee)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                    <div>
                      <span className="text-sm font-black text-slate-900 block">
                        Total a Pagar
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {PAYMENT_LABELS[paymentMethod]} · {DELIVERY_OPTIONS[deliveryOption].forecast}
                      </span>
                    </div>
                    <span className="text-2xl font-black text-[#0B4D9C]">
                      {brl(total)}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <PartyPopper className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px] font-black text-emerald-700">
                        Você está economizando {brl(savings)} nesta compra
                      </span>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="button"
                  onClick={finish}
                  className="w-full py-4 px-6 rounded-2xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-sm font-black shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <span>Confirmar e Finalizar Pedido · {brl(total)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Garantia de Entrega e Compra Segura OBRACOM</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
