import React, { useState } from 'react';
import {
  Search,
  Wrench,
  Hammer,
  Zap,
  Droplet,
  Snowflake,
  Paintbrush,
  Grid,
  CheckCircle2,
  Star,
  ChevronRight,
  ShieldCheck,
  FileText,
  UserCheck,
  Heart,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { Professional } from '../types';
import { APP_ASSETS } from '../data/assets';

interface ServicesMarketplaceViewProps {
  professionals: Professional[];
  onSelectProfessional: (pro: Professional) => void;
  onRequestQuote: () => void;
}

export const ServicesMarketplaceView: React.FC<ServicesMarketplaceViewProps> = ({
  professionals,
  onSelectProfessional,
  onRequestQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { label: 'Todos os serviços', icon: Wrench },
    { label: 'Manutenção e Reparos', icon: Hammer },
    { label: 'Obras e Reformas', icon: Grid },
    { label: 'Instalações Elétricas', icon: Zap },
    { label: 'Instalações Hidráulicas', icon: Droplet },
    { label: 'Ar Condicionado', icon: Snowflake },
    { label: 'Pintura', icon: Paintbrush },
  ];

  const popularServices = [
    {
      title: 'Instalação elétrica residencial',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=400&auto=format&fit=crop&q=80',
    },
    {
      title: 'Manutenção hidráulica e vazamentos',
      price: 120,
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
    },
    {
      title: 'Construção de alvenaria e reformas',
      price: 200,
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop&q=80',
    },
    {
      title: 'Instalação de ar condicionado split',
      price: 250,
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="flex-1 w-full bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Serviços para sua obra</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Encontre profissionais qualificados para realizar serviços com segurança e qualidade.
              </p>
            </div>
            <button
              type="button"
              onClick={onRequestQuote}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B4D9C] text-white text-xs sm:text-sm font-bold hover:bg-blue-700 shadow-md shrink-0 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Solicitar Orçamento</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por serviço, profissional ou cidade..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
            />
          </div>

          {/* Categories scroll */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.label;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Banner: Profissionais Verificados */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#063065] to-[#0B4D9C] text-white p-4 shadow-sm relative">
          <div className="relative z-10 max-w-[65%] space-y-2">
            <h3 className="text-sm font-black leading-tight">
              Profissionais verificados para o seu projeto
            </h3>
            <div className="space-y-1 text-[11px] text-blue-100">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                <span>Profissionais com documentos verificados</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Avaliações reais de outros clientes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-cyan-300" />
                <span>Mais segurança para a sua obra</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-40">
            <SafeImage
              src={APP_ASSETS.workerBanner}
              alt=""
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Profissionais em destaque */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Profissionais em destaque
            </h3>
            <span className="text-[11px] font-semibold text-[#0B4D9C] cursor-pointer hover:underline">
              Ver todos &gt;
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {professionals.map((pro) => (
              <div
                key={pro.id}
                onClick={() => onSelectProfessional(pro)}
                className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="relative">
                      <SafeImage
                        src={pro.avatarUrl}
                        alt={pro.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      {pro.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mt-2 truncate">{pro.name}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">{pro.role}</p>

                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-600">
                    <span className="text-amber-500 font-bold">★ {pro.rating}</span>
                    <span className="text-slate-400">({pro.reviewsCount})</span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {pro.categories.slice(0, 2).map((cat, i) => (
                      <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProfessional(pro)}
                  className="mt-3 w-full py-1.5 rounded-lg bg-[#0B4D9C] hover:bg-blue-700 text-white text-xs font-bold text-center"
                >
                  Ver perfil
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Serviços mais buscados */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-900">Serviços mais buscados</h3>
            <span className="text-[11px] font-semibold text-[#0B4D9C] cursor-pointer">Ver todos &gt;</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularServices.map((serv, i) => (
              <div
                key={i}
                onClick={onRequestQuote}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
              >
                <div className="h-20 bg-slate-100 overflow-hidden">
                  <SafeImage
                    src={serv.imageUrl}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-2.5">
                  <h5 className="text-[11px] font-bold text-slate-900 line-clamp-1">{serv.title}</h5>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">A partir de</span>
                    <span className="text-xs font-black text-slate-900">
                      R$ {serv.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solicitacao rapida banner */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-black text-blue-950">Solicite um orçamento agora mesmo</h4>
            <p className="text-[10px] text-blue-700">Conte seu projeto e receba propostas em até 24h.</p>
          </div>
          <button
            type="button"
            onClick={onRequestQuote}
            className="px-3.5 py-2 rounded-lg bg-[#0B4D9C] text-white text-xs font-bold shrink-0 hover:bg-blue-800"
          >
            Solicitar orçamento &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
