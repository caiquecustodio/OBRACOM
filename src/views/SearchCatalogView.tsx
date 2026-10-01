import React, { useState } from 'react';
import {
  Search,
  X,
  Clock,
  ArrowUpRight,
  Filter,
  Check,
  Star,
  ChevronDown,
  Layers,
  Box,
  Paintbrush,
  Droplet,
  Zap,
  Wrench,
  Cpu,
  Grid,
  Shield,
  Hammer,
  Cog,
  Square,
  Truck,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { Product, Category } from '../types';

interface SearchCatalogViewProps {
  initialQuery?: string;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  allProducts: Product[];
  categories: Category[];
}

export const SearchCatalogView: React.FC<SearchCatalogViewProps> = ({
  initialQuery = '',
  onProductClick,
  onAddToCart,
  allProducts,
  categories,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Cimento Votoran',
    'Tinta Coral 18L',
    'Tijolo 8 furos',
    'Vergalhão 12 mm',
    'Areia média',
  ]);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [fastDeliveryOnly, setFastDeliveryOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});

  const suggestions = [
    'Cimento CP II',
    'Areia Média',
    'Brita 1',
    'Tijolo 8 Furos',
    'Vergalhão CA-50',
    'Tinta Acrílica Coral',
    'Betoneira 120L',
    'Tubo PVC 100mm',
    'Argamassa AC-III',
  ];

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    if (term && !recentSearches.includes(term)) {
      setRecentSearches([term, ...recentSearches.slice(0, 4)]);
    }
  };

  const handleClearSearches = () => {
    setRecentSearches([]);
  };

  const getQuantity = (id: string) => productQuantities[id] || 1;
  const updateQuantity = (id: string, delta: number) => {
    const current = getQuantity(id);
    const next = Math.max(1, current + delta);
    setProductQuantities({ ...productQuantities, [id]: next });
  };

  // Filter products based on search term and filters
  const filteredProducts = allProducts.filter((product) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      const matchesBrand = product.brand.toLowerCase().includes(q);
      const matchesDesc = product.description.toLowerCase().includes(q);
      if (!matchesName && !matchesCategory && !matchesBrand && !matchesDesc) {
        return false;
      }
    }
    if (selectedBrand !== 'Todas' && !product.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
      return false;
    }
    if (freeShippingOnly && !product.seller.deliveryType.toLowerCase().includes('grátis')) {
      return false;
    }
    if (fastDeliveryOnly && !product.seller.deliveryType.toLowerCase().includes('rápida')) {
      return false;
    }
    if (inStockOnly && product.stock <= 0) {
      return false;
    }
    return true;
  });

  const categoryIconMap: Record<string, any> = {
    'materiais-basicos': Layers,
    'alvenaria': Box,
    'tintas': Paintbrush,
    'hidraulica': Droplet,
    'eletrica': Zap,
    'ferramentas': Wrench,
    'maquinas': Cpu,
    'andaimes': Grid,
    'epi': Shield,
    'construcao': Hammer,
    'pecas': Cog,
    'pisos': Square,
  };

  return (
    <div className="flex-1 w-full bg-slate-50 flex flex-col pb-20 overflow-y-auto">
      {/* Top Search Input Box (Full width) */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="O que você precisa para sua obra? Cimento, tintas, ferramentas..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C] focus:ring-2 focus:ring-blue-100 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  aria-label="Limpar busca"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowFiltersModal(!showFiltersModal)}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 font-bold text-xs transition-colors shrink-0 ${
                showFiltersModal || selectedBrand !== 'Todas' || freeShippingOnly
                  ? 'bg-[#0B4D9C] text-white border-[#0B4D9C] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* FILTER DRAWER / MODAL */}
      {showFiltersModal && (
        <div className="bg-white border-b border-slate-200 shadow-md animate-in fade-in duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Filtros e Ordenação de Produtos
              </h3>
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('Todas');
                  setFreeShippingOnly(false);
                  setFastDeliveryOnly(false);
                  setInStockOnly(false);
                  setSortBy('relevance');
                }}
                className="text-xs font-semibold text-[#0B4D9C] hover:underline"
              >
                Limpar todos os filtros
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Marca</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="Todas">Todas as marcas</option>
                  <option value="Votoran">Votoran</option>
                  <option value="Nacional">Nacional</option>
                  <option value="Coral">Coral</option>
                  <option value="Gerdau">Gerdau</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="relevance">Mais relevantes</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                  <option value="rating">Melhor avaliação</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 py-1">
                  <input
                    type="checkbox"
                    checked={freeShippingOnly}
                    onChange={(e) => setFreeShippingOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#0B4D9C]"
                  />
                  <span>Frete grátis</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 py-1">
                  <input
                    type="checkbox"
                    checked={fastDeliveryOnly}
                    onChange={(e) => setFastDeliveryOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#0B4D9C]"
                  />
                  <span>Entrega rápida no mesmo dia</span>
                </label>
              </div>

              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() => setShowFiltersModal(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0B4D9C] text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  Aplicar Filtros ({filteredProducts.length} itens)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* If no search query: Show Recent, Suggestions and 12 Categories */}
        {!searchQuery ? (
          <div className="space-y-8">
            {/* Buscas recentes */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Buscas Recentes
                  </h3>
                  <button
                    type="button"
                    onClick={handleClearSearches}
                    className="text-xs text-slate-500 hover:text-red-600 transition-colors font-semibold"
                  >
                    Limpar histórico
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSearch(term)}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-blue-400 hover:text-[#0B4D9C] shadow-xs transition-colors cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{term}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sugestões para você */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Sugestões de Produtos para Obra</h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSearch(sug)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:text-[#0B4D9C] shadow-xs transition-colors cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sug}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Buscar por categoria (12 visual cards) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900">Buscar por Categoria</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Selecione uma categoria para explorar todos os itens</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {categories.map((cat) => {
                  const IconComponent = categoryIconMap[cat.slug] || Layers;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSearch(cat.title)}
                      className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg group transition-all text-center cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B4D9C] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 leading-tight">
                        {cat.title}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 font-medium">
                        {cat.count} produtos
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* IF SEARCH QUERY PRESENT: SHOW RESULTS (matching PESQUISA.jpg) */
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Resultados para "{searchQuery}"
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {filteredProducts.length} materiais encontrados
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Ordenar:</span>
                <span className="font-bold text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  Mais relevantes
                </span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">Nenhum produto encontrado</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Não encontramos resultados para "{searchQuery}". Tente buscar por termos mais genéricos como "Cimento", "Tinta" ou "Areia".
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  Ver todos os produtos
                </button>
              </div>
            ) : (
              /* Responsive Grid of Product Cards */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => {
                  const qty = getQuantity(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between group"
                    >
                      <div
                        onClick={() => onProductClick(product)}
                        className="flex gap-4 cursor-pointer"
                      >
                        <div className="w-24 h-24 bg-slate-50 rounded-xl p-2 border border-slate-100 flex items-center justify-center shrink-0 relative overflow-hidden">
                          <SafeImage
                            src={product.imageUrl}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          {product.hasOffer && (
                            <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                              Oferta
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight group-hover:text-[#0B4D9C] transition-colors">
                              {product.name}
                            </h3>
                            <button
                              type="button"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-400 hover:text-red-500 p-1 shrink-0"
                            >
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{product.subtitle}</p>

                          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                            <span className="font-semibold text-slate-800">{product.seller.name}</span>
                            <span className="text-amber-500 font-bold">★ {product.rating}</span>
                          </div>

                          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                            <Truck className="w-3.5 h-3.5" />
                            <span>{product.seller.deliveryType}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom row: Price, Quantity controller & Add to Cart button */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-black text-slate-900">
                              R$ {(product.price * qty).toFixed(2).replace('.', ',')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-slate-400 line-through">
                                R$ {(product.originalPrice * qty).toFixed(2).replace('.', ',')}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-emerald-600 font-bold block">
                            5% de desconto no PIX
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-l-lg transition-colors cursor-pointer"
                              aria-label="Diminuir"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-slate-800">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-r-lg transition-colors cursor-pointer"
                              aria-label="Aumentar"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onAddToCart(product, qty)}
                            className="px-3.5 py-2 rounded-xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Comprar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
