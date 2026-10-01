import React, { useState } from 'react';
import {
  Star,
  Smile,
  Users,
  ChevronDown,
  MessageSquare,
  MoreVertical,
} from 'lucide-react';
import { SafeImage } from '../../components/SafeImage';

export const LojistaReviewsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'geral' | 'avaliacoes' | 'respostas'>('geral');

  const customerReviews = [
    {
      author: 'Carlos Silva',
      date: '22/08/2026',
      rating: 5,
      product: 'Cimento CP II 50kg',
      comment: 'Entrega rápida e produto de ótima qualidade. Recomendo!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      productThumb: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=80&auto=format&fit=crop&q=80',
    },
    {
      author: 'Mariana Costa',
      date: '21/08/2026',
      rating: 5,
      product: 'Tinta Coral Rende Muito 18L',
      comment: 'Produto conforme o anúncio. Chegou bem embalado.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      productThumb: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=80&auto=format&fit=crop&q=80',
    },
    {
      author: 'Roberto Almeida',
      date: '20/08/2026',
      rating: 4,
      product: 'Caixa d\'água 500L',
      comment: 'Excelente atendimento e entrega pontual no canteiro da obra.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      productThumb: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=80&auto=format&fit=crop&q=80',
    },
    {
      author: 'Fernanda Lima',
      date: '18/08/2026',
      rating: 5,
      product: 'Areia média lavada 1m³',
      comment: 'Tudo certo! Material limpo, sem impurezas. Recomendo a loja ConstróiMais.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      productThumb: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=80&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs space-y-3">
        <div>
          <h1 className="text-base font-black text-slate-900 leading-tight">Avaliações</h1>
          <p className="text-[11px] text-slate-500">
            Veja o que seus clientes estão dizendo e fortaleça sua reputação.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar pt-1">
          {['geral', 'avaliacoes', 'respostas'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tab === 'geral' ? 'Visão geral' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3.5 space-y-4 max-w-lg mx-auto">
        {/* Rating Overview Card (matches Digitalizado_20260911-1653-15.jpg) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-center shrink-0 pr-4 border-r border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                Nota da loja
              </span>
              <span className="text-3xl font-black text-slate-900 block mt-0.5">4,8</span>
              <div className="flex text-amber-400 text-xs justify-center mt-1">★★★★★</div>
              <span className="text-[9px] text-slate-400 block mt-1">256 avaliações</span>
            </div>

            {/* 5-Star Breakdown Bars */}
            <div className="flex-1 space-y-1 text-[10px]">
              {[
                { star: 5, pct: 82 },
                { star: 4, pct: 12 },
                { star: 3, pct: 4 },
                { star: 2, pct: 1 },
                { star: 1, pct: 1 },
              ].map((row) => (
                <div key={row.star} className="flex items-center gap-2">
                  <span className="w-12 text-slate-500 font-medium">{row.star} estrelas</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${row.pct}%` }} />
                  </div>
                  <span className="w-7 text-right text-slate-600 font-bold">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center gap-2">
              <Smile className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="font-bold text-emerald-950 block">94%</span>
                <span className="text-[9px] text-emerald-800">Recomendariam sua loja</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-700 shrink-0" />
              <div>
                <span className="font-bold text-blue-950 block">256 avaliações</span>
                <span className="text-[9px] text-blue-800">Últimos 12 meses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Avaliações recentes feed */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Avaliações recentes</h3>
            <span className="text-[11px] text-slate-500">Mais recentes v</span>
          </div>

          <div className="divide-y divide-slate-100">
            {customerReviews.map((rev, idx) => (
              <div key={idx} className="py-3 space-y-1.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <SafeImage
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-7 h-7 rounded-full object-cover border"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block leading-tight">{rev.author}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(rev.rating)}
                    {'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg">
                  <SafeImage
                    src={rev.productThumb}
                    alt=""
                    className="w-6 h-6 object-contain rounded bg-white p-0.5 border"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[10px] font-semibold text-slate-700 truncate">
                    {rev.product}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed pl-1">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
