import React, { useState } from 'react';
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Percent,
  RotateCcw,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  MapPin,
  Check,
  Star,
  Play,
  CheckCircle2,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { Product } from '../types';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onSelectRelated: (product: Product) => void;
  relatedProducts: Product[];
  onBack: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onSelectRelated,
  relatedProducts,
  onBack,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'faq'>('desc');
  const [isFavorite, setIsFavorite] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  const displayImages = [
    product.imageUrl,
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
  ];

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setNotificationMsg('Produto adicionado ao carrinho!');
    setTimeout(() => setNotificationMsg(''), 2500);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div className="flex-1 w-full bg-slate-50 pb-24 overflow-y-auto">
      {/* Toast alert */}
      {notificationMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-4 h-4" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Breadcrumbs (Full width) */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 text-xs text-slate-500 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
          <button onClick={onBack} className="hover:text-[#0B4D9C] font-semibold cursor-pointer">Início</button>
          <span>&gt;</span>
          <span className="hover:text-[#0B4D9C] cursor-pointer">{product.category}</span>
          <span>&gt;</span>
          <span className="font-bold text-slate-800 truncate">{product.name}</span>
        </div>
      </div>

      {/* Responsive Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Gallery Showcase + Details Tabs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Gallery Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs relative">
              <div className="relative h-72 sm:h-96 w-full flex items-center justify-center rounded-2xl bg-slate-50 p-6 overflow-hidden">
                <SafeImage
                  src={displayImages[selectedImageIndex]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />

                {product.isBestSeller && (
                  <span className="absolute top-4 left-4 bg-amber-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full shadow-sm">
                    ★ Mais vendido
                  </span>
                )}

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors cursor-pointer"
                    aria-label="Favoritar"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                    aria-label="Compartilhar"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav arrows */}
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1))}
                  className="absolute left-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0))}
                  className="absolute right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  aria-label="Próxima"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails row */}
              <div className="flex gap-3 justify-center mt-4">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden p-1 transition-all cursor-pointer ${
                      selectedImageIndex === idx ? 'border-[#0B4D9C] shadow-sm scale-105' : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt=""
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Tabs (Description, Specs, Reviews) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
              <div className="flex border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('desc')}
                  className={`flex-1 py-3.5 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'desc'
                      ? 'border-[#0B4D9C] text-[#0B4D9C] bg-blue-50/40'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Descrição do Produto
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-3.5 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-[#0B4D9C] text-[#0B4D9C] bg-blue-50/40'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Especificações Técnicas
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-3.5 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'border-[#0B4D9C] text-[#0B4D9C] bg-blue-50/40'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Avaliações ({product.reviewsCount})
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'desc' && (
                  <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>{product.description}</p>
                    <div className="pt-2">
                      <h4 className="font-bold text-slate-900 mb-2">Principais Vantagens:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features?.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {Object.entries(product.specifications || {}).map(([key, val]) => (
                      <div key={key} className="py-2.5 flex justify-between">
                        <span className="font-semibold text-slate-500">{key}</span>
                        <span className="font-bold text-slate-900 text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                      <div className="text-3xl font-black text-amber-600">{product.rating}</div>
                      <div>
                        <div className="flex text-amber-500">
                          {'★'.repeat(5)}
                        </div>
                        <p className="text-xs text-slate-600 font-semibold mt-0.5">
                          Baseado em {product.reviewsCount} avaliações verificadas de compradores.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Buy Box & Pricing Card (5 cols - Sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
              {/* Product Header */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {product.brand} · SKU: {product.sku}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs text-slate-500 mt-1">{product.subtitle}</p>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal ml-1">({product.reviewsCount} avaliações)</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-bold border border-emerald-200">
                    Em estoque ({product.stock} un.)
                  </span>
                </div>
              </div>

              {/* Price card */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#0B4D9C]">
                    R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      R$ {(product.originalPrice * quantity).toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                  <Percent className="w-4 h-4" />
                  <span>5% de desconto no PIX: R$ {((product.price * quantity) * 0.95).toFixed(2).replace('.', ',')}</span>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  ou em até <span className="font-bold text-slate-900">12x de R$ {((product.price * quantity) / 12).toFixed(2).replace('.', ',')}</span> sem juros
                </p>
              </div>

              {/* Seller info */}
              <div className="p-3.5 rounded-2xl border border-slate-200/90 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B4D9C] flex items-center justify-center font-bold text-xs">
                    {product.seller.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{product.seller.name}</h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span>📍 {product.seller.city}</span>
                      <span>·</span>
                      <span>{product.seller.distanceKm} km</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  {product.seller.deliveryType}
                </span>
              </div>

              {/* Quantity Stepper */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Quantidade:</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-black text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Total: R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Adicionar ao Carrinho</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuy}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-xs sm:text-sm font-black shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-98"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Comprar Agora</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Entrega rápida garantida no seu canteiro</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Compra 100% segura com garantia de devolução em até 7 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-base font-black text-slate-900 mb-4">
              Quem comprou este produto também comprou
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelated(rel)}
                  className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="h-28 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center mb-2 p-2">
                      <SafeImage src={rel.imageUrl} alt={rel.name} className="max-h-full object-contain" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                      {rel.name}
                    </h4>
                    <span className="text-[10px] text-slate-500">{rel.subtitle}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <span className="text-sm font-black text-slate-900">
                      R$ {rel.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
