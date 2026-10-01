import React, { useState } from 'react';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  FileCheck,
  MessageSquare,
  FileText,
  ChevronRight,
  Droplet,
  Wrench,
  Check,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { Professional } from '../types';

interface ProfessionalProfileViewProps {
  professional: Professional;
  onRequestQuote: () => void;
  onChat: () => void;
  onBack: () => void;
}

export const ProfessionalProfileView: React.FC<ProfessionalProfileViewProps> = ({
  professional,
  onRequestQuote,
  onChat,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'sobre' | 'servicos' | 'avaliacoes' | 'portfolio' | 'atuacao'>('sobre');

  return (
    <div className="flex-1 w-full bg-slate-50 pb-20 overflow-y-auto">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 flex items-center gap-1.5">
          <button onClick={onBack} className="hover:text-blue-700 font-medium">Início</button>
          <span>&gt;</span>
          <button onClick={onBack} className="hover:text-blue-700 font-medium">Serviços</button>
          <span>&gt;</span>
          <span className="font-bold text-slate-800">{professional.name}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto w-full">
        {/* Main Profile Header Card (matches Digitalizado_20260911-1650-18.jpg) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-start gap-3.5">
            <div className="relative">
              <SafeImage
                src={professional.avatarUrl}
                alt={professional.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0B4D9C]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0B4D9C] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                ✓
              </div>
            </div>

            <div className="flex-1 min-w-0 text-xs">
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-black text-slate-900 truncate">
                  {professional.name}
                </h1>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                  Disponível agora
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">{professional.role}</p>

              <div className="flex items-center gap-1 text-blue-700 font-semibold mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[10px]">Profissional parceiro OBRACOM</span>
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-600">
                <span className="text-amber-500 font-bold">★ {professional.rating}</span>
                <span>({professional.reviewsCount} avaliações)</span>
              </div>

              <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-500">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{professional.city} · Atende em até {professional.maxDistanceKm} km</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={onRequestQuote}
              className="py-2.5 px-3 rounded-xl bg-[#0B4D9C] hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Solicitar orçamento</span>
            </button>
            <button
              type="button"
              onClick={onChat}
              className="py-2.5 px-3 rounded-xl border border-[#0B4D9C] text-[#0B4D9C] hover:bg-blue-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Conversar no chat</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Counters */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Briefcase className="w-4 h-4 text-blue-600 mx-auto mb-1" />
            <span className="font-black text-slate-900 block">{professional.yearsExperience}+</span>
            <span className="text-[9px] text-slate-500 leading-tight">Anos exp.</span>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto mb-1" />
            <span className="font-black text-slate-900 block">{professional.completedJobs}</span>
            <span className="text-[9px] text-slate-500 leading-tight">Serviços</span>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 mx-auto mb-1" />
            <span className="font-black text-slate-900 block">{professional.reviewsCount}</span>
            <span className="text-[9px] text-slate-500 leading-tight">Avaliações</span>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Clock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
            <span className="font-black text-slate-900 block text-[10px]">7h às 18h</span>
            <span className="text-[9px] text-slate-500 leading-tight">Seg a Sáb</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="flex border-b border-slate-200 text-xs font-semibold overflow-x-auto no-scrollbar">
            {['sobre', 'servicos', 'avaliacoes', 'portfolio', 'atuacao'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab as any)}
                className={`py-3 px-3.5 border-b-2 capitalize whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'border-[#0B4D9C] text-[#0B4D9C] font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab === 'atuacao' ? 'Área de atuação' : tab}
              </button>
            ))}
          </div>

          <div className="p-4 text-xs space-y-4">
            {activeTab === 'sobre' && (
              <div className="space-y-3.5">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Sobre o profissional</h4>
                  <p className="text-slate-600 leading-relaxed">{professional.about}</p>
                </div>

                {/* 5 trust badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Serviço com garantia</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Atendimento personalizado</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Orçamento gratuito</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Equipamentos profissionais</span>
                  </div>
                </div>

                {/* Certificações */}
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    Certificações verificadas
                  </h4>
                  <div className="space-y-1.5">
                    {professional.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-900 text-[11px] font-medium border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'servicos' && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 mb-2">Serviços oferecidos</h4>
                <div className="divide-y divide-slate-100">
                  {professional.servicesOffered.map((srv, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-semibold text-slate-800">{srv.title}</span>
                      </div>
                      <span className="font-bold text-[#0B4D9C]">
                        {srv.priceStarting ? `A partir de R$ ${srv.priceStarting}` : 'Sob consulta'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'avaliacoes' && (
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900">Avaliações de clientes</h4>
                {professional.reviews.map((rev, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{rev.author}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400 text-xs">★★★★★</div>
                    <p className="text-slate-600 text-[11px]">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Fotos de trabalhos realizados</h4>
                <div className="grid grid-cols-2 gap-2">
                  {professional.portfolioImages.map((img, idx) => (
                    <div key={idx} className="h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <SafeImage src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'atuacao' && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Região de atendimento</h4>
                <p className="text-slate-600">
                  Base em <strong>Fortaleza - CE</strong>. Atendimento com deslocamento próprio para toda a região metropolitana (Caucaia, Maracanaú, Eusébio, Aquiraz) em até 50 km.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-black text-blue-950">Precisa de um serviço sob medida?</h4>
            <p className="text-[10px] text-blue-700">Envie fotos e detalhes para receber proposta rápida.</p>
          </div>
          <button
            type="button"
            onClick={onRequestQuote}
            className="px-3.5 py-2 rounded-lg bg-[#0B4D9C] text-white text-xs font-bold hover:bg-blue-800"
          >
            Solicitar orçamento &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
