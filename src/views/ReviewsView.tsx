import React, { useState } from 'react';
import { Star, Send, CheckCircle2, ChevronDown, Check, MessageSquare } from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

export const ReviewsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pendentes' | 'avaliados' | 'lojas' | 'servicos'>('pendentes');
  const [rating1, setRating1] = useState(5);
  const [tags1, setTags1] = useState<string[]>(['Qualidade', 'Entrega']);
  const [comment1, setComment1] = useState('');
  const [submitted1, setSubmitted1] = useState(false);

  const toggleTag1 = (tag: string) => {
    setTags1((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs space-y-3">
        <div>
          <h1 className="text-lg font-black text-slate-900 leading-tight">Minhas avaliações</h1>
          <p className="text-[11px] text-slate-500">
            Avalie seus produtos, lojas e serviços e ajude a construir uma comunidade mais confiável.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('pendentes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === 'pendentes' ? 'bg-[#0B4D9C] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            ★ Pendentes ({submitted1 ? 1 : 2})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('avaliados')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === 'avaliados' ? 'bg-[#0B4D9C] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            ✓ Avaliados ({submitted1 ? 9 : 8})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lojas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === 'lojas' ? 'bg-[#0B4D9C] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Avaliar lojas (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('servicos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === 'servicos' ? 'bg-[#0B4D9C] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Avaliar serviços (1)
          </button>
        </div>
      </div>

      <div className="p-3.5 space-y-4 max-w-lg mx-auto">
        {/* Avaliações pendentes */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Avaliações pendentes
          </h3>

          <div className="space-y-3">
            {!submitted1 && (
              <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3">
                <div className="flex gap-3">
                  <div className="w-14 h-14 bg-slate-50 rounded-lg p-1 border border-slate-100 flex items-center justify-center shrink-0">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&auto=format&fit=crop&q=80"
                      alt=""
                      className="h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Cimento Votoran CP II-F-32 Saco 50 kg</h4>
                    <p className="text-[10px] text-slate-500">ConstróiMais · Entregue em 11/09/2026</p>
                  </div>
                </div>

                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">Como foi sua experiência?</span>
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" onClick={() => setRating1(s)} className="p-0.5">
                          <Star className={`w-4 h-4 ${s <= rating1 ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    {['Qualidade', 'Entrega', 'Atendimento'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag1(tag)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          tags1.includes(tag) ? 'bg-[#0B4D9C] text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={comment1}
                    onChange={(e) => setComment1(e.target.value)}
                    placeholder="Conte mais detalhes (opcional)..."
                    className="w-full p-2 text-xs border rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => setSubmitted1(true)}
                    className="w-full py-2 bg-[#0B4D9C] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar avaliação</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tijolo cerâmico */}
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3">
              <div className="flex gap-3">
                <div className="w-14 h-14 bg-slate-50 rounded-lg p-1 border border-slate-100 flex items-center justify-center shrink-0">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&auto=format&fit=crop&q=80"
                    alt=""
                    className="h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Tijolo Cerâmico 9x19x19</h4>
                  <p className="text-[10px] text-slate-500">Casa do Construtor · Entregue em 10/09/2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Avaliações realizadas */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Avaliações realizadas
          </h3>

          <div className="space-y-2.5">
            <div className="bg-white rounded-xl border border-slate-200 p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Tinta Coral Rende Muito Branco Neve - 18L</span>
                <span className="text-[10px] text-slate-400">05/08/2026</span>
              </div>
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-slate-600">
                Ótima qualidade, entrega dentro do prazo e atendimento excelente!
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Vergalhão CA-50 10 mm (barra 12 m)</span>
                <span className="text-[10px] text-slate-400">28/07/2026</span>
              </div>
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-slate-600">
                Produto de qualidade, entrega rápida. Recomendo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
