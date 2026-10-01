import React from 'react';
import {
  Search,
  SlidersHorizontal,
  Layers,
  Wrench,
  HardHat,
  Truck,
  Grid,
  CheckCircle2,
  Clock,
  Percent,
  Star,
  ChevronRight,
  Heart,
  Plus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CreditCard,
  MapPin,
  Building,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { Product, Store } from '../types';
import { APP_ASSETS } from '../data/assets';

interface HomeViewProps {
  onSearchClick: () => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onNavigateCategory: (slug: string) => void;
  onNavigateServices: () => void;
  onNavigateOffers: () => void;
  featuredProducts: Product[];
  nearbyStores: Store[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSearchClick,
  onProductClick,
  onAddToCart,
  onNavigateCategory,
  onNavigateServices,
  onNavigateOffers,
  featuredProducts,
  nearbyStores,
}) => {
  return (
    <div className="flex-1 w-full pb-20 overflow-y-auto bg-slate-50">
      {/* Mobile-only Search Box (Desktop has search in the header) */}
      <div className="sm:hidden p-3 bg-gradient-to-b from-[#0A56B0] to-transparent pb-2">
        <div className="flex items-center gap-2">
          <div
            onClick={onSearchClick}
            className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200/90 px-3.5 py-2.5 flex items-center gap-2.5 cursor-pointer hover:border-blue-400 transition-colors"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium truncate">
              O que você precisa para sua obra?
            </span>
          </div>

          <button
            type="button"
            onClick={onSearchClick}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 hover:text-[#0B4D9C] shadow-sm hover:border-blue-400 transition-colors cursor-pointer"
            aria-label="Filtros"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area - Full width with 7xl container for spacious layout */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* Hero Section: Responsive wide banner */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#062d5e] via-[#0B4D9C] to-[#0A56B0] text-white shadow-xl p-5 sm:p-8 lg:p-10">
          {/* Background worker photo with gradient overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-2/5 sm:w-1/2 overflow-hidden pointer-events-none opacity-85 hidden sm:block">
            <SafeImage
              src={APP_ASSETS.workerBanner}
              alt="Profissional OBRACOM"
              className="w-full h-full object-cover object-center mix-blend-luminosity brightness-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#062d5e] via-[#0B4D9C]/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-200 text-xs font-bold mb-3 border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O Maior Marketplace da Construção</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight uppercase">
              Construa <br />
              <span className="text-cyan-300">Sem Complicação</span>
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 font-medium mt-2 leading-relaxed max-w-md">
              Materiais básicos, acabamentos, ferramentas, serviços especializados e frete rápido entregues direto no seu canteiro de obras.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onNavigateOffers}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0B4D9C] hover:bg-blue-50 active:scale-95 text-xs sm:text-sm font-black shadow-lg transition-all cursor-pointer"
              >
                <span>Ver Ofertas da Semana</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onNavigateServices}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold border border-white/25 backdrop-blur-sm transition-all cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-cyan-300" />
                <span>Contratar Profissionais</span>
              </button>
            </div>
          </div>

          {/* Trust bullet markers */}
          <div className="mt-6 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-blue-100 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>Fornecedores verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>Entrega rápida no canteiro</span>
            </div>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>Desconto de 5% no PIX</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Garantia de entrega OBRACOM</span>
            </div>
          </div>
        </div>

        {/* Categories Bar: Spacious responsive grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0B4D9C]" />
              Categorias Principais
            </h2>
            <button
              type="button"
              onClick={onSearchClick}
              className="text-xs font-bold text-[#0B4D9C] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              Ver todas as 12 categorias <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-4">
            <button
              type="button"
              onClick={() => onNavigateCategory('materiais-basicos')}
              className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B4D9C] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Materiais Básicos</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Cimento, Areia</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateCategory('alvenaria')}
              className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Alvenaria</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Tijolos, Blocos</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateCategory('tintas')}
              className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Tintas</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Acabamentos</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateCategory('ferramentas')}
              className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Ferramentas</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Manuais e Elétricas</span>
            </button>

            <button
              type="button"
              onClick={onNavigateServices}
              className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <HardHat className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Serviços</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Profissionais</span>
            </button>

            <button
              type="button"
              onClick={onSearchClick}
              className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Grid className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Mais Opções</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Elétrica, EPI, Pisos</span>
            </button>
          </div>
        </div>

        {/* Promo strip */}
        <div
          onClick={onNavigateOffers}
          className="rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-4 text-white flex items-center justify-between shadow-md cursor-pointer hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Percent className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight">Super Ofertas da Semana</h3>
              <p className="text-xs text-blue-200">Economize até 25% em cimento, aço, tintas e ferramentas para sua obra.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-cyan-300 flex items-center gap-1 shrink-0 hover:underline">
            Conferir todas <ChevronRight className="w-4 h-4" />
          </span>
        </div>

        {/* Lojas parceiras próximas: Responsive 4-column card grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0B4D9C]" />
              Lojas Parceiras na sua Região
            </h2>
            <button
              type="button"
              onClick={onSearchClick}
              className="text-xs font-bold text-[#0B4D9C] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              Ver todas <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbyStores.map((store) => (
              <div
                key={store.id}
                onClick={onSearchClick}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="h-28 bg-slate-100 relative overflow-hidden">
                    <SafeImage
                      src={store.imageUrl}
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{store.rating}</span>
                      <span className="text-slate-400">({store.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="p-3.5">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0B4D9C] transition-colors">
                      {store.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{store.category}</p>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{store.address}</p>
                  </div>
                </div>

                <div className="p-3.5 pt-0 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">📍 {store.distanceKm} km</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                    {store.deliveryType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products: Comprehensive multi-column responsive grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Mais Vendidos e em Destaque
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Preços atualizados com entrega expressa para Fortaleza e Região</p>
            </div>
            <button
              type="button"
              onClick={onSearchClick}
              className="text-xs font-bold text-[#0B4D9C] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              Ver catálogo completo <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="p-3">
                  <div className="h-32 sm:h-36 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center relative mb-2.5 p-2">
                    <SafeImage
                      src={product.imageUrl}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {product.isBestSeller && (
                      <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs">
                        Mais vendido
                      </span>
                    )}
                    {product.pixDiscountPercent && (
                      <span className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                        -{product.pixDiscountPercent}% no PIX
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                    {product.category}
                  </span>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug mt-0.5 group-hover:text-[#0B4D9C] transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-500">
                    <div className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                      <span>{product.rating}</span>
                    </div>
                    <span>·</span>
                    <span className="truncate">{product.seller.name}</span>
                  </div>
                </div>

                <div className="p-3 pt-0 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">A partir de</span>
                    <span className="text-sm sm:text-base font-black text-slate-900">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, e);
                    }}
                    className="w-9 h-9 rounded-xl bg-[#0B4D9C] hover:bg-[#0e5cb8] text-white flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
                    title={`Adicionar ${product.name} ao carrinho`}
                    aria-label={`Adicionar ${product.name} ao carrinho`}
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services & Professionals Showcase Banner */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-400/30">
              Profissionais Especializados
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-2 leading-tight">
              Precisa de mão de obra para sua obra ou reforma?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Encontre encanadores, eletricistas, pedreiros e pintores com antecedentes verificados, avaliações reais e orçamentos rápidos sem compromisso.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateServices}
            className="px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs sm:text-sm font-black shadow-lg transition-all shrink-0 cursor-pointer"
          >
            Encontrar Profissionais Agora
          </button>
        </div>
      </div>
    </div>
  );
};
