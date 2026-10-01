import React from 'react';
import {
  Users,
  Store,
  Boxes,
  Briefcase,
  Target,
  Compass,
  Award,
  CheckCircle2,
  Play,
  ArrowRight,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { APP_ASSETS } from '../data/assets';

interface AboutViewProps {
  onRegisterClick: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onRegisterClick }) => {
  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs">
        <h1 className="text-lg font-black text-slate-900 leading-tight">Sobre a OBRACOM</h1>
        <p className="text-[11px] text-slate-500">
          Mais que um marketplace, somos parceiros na construção de um futuro melhor.
        </p>
      </div>

      <div className="p-3.5 space-y-4 max-w-lg mx-auto">
        {/* Hero Card */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#063065] to-[#0B4D9C] text-white p-5 shadow-sm relative">
          <div className="relative z-10 max-w-[65%] space-y-2">
            <h2 className="text-base font-black leading-snug">
              Conectando pessoas para construir histórias
            </h2>
            <p className="text-xs text-blue-100 leading-relaxed">
              A OBRACOM nasceu para simplificar o mercado da construção civil, aproximando quem compra, quem vende e quem presta serviços em um único lugar, com mais praticidade, transparência e confiança.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer mt-1"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Assistir ao nosso vídeo</span>
            </button>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-40">
            <SafeImage
              src={APP_ASSETS.workerBanner}
              alt=""
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 4 Stats Counters */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <span className="text-base font-black text-slate-900 block">+10 mil</span>
            <span className="text-[10px] text-slate-500 font-medium">Clientes cadastrados</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Store className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <span className="text-base font-black text-slate-900 block">+2.500</span>
            <span className="text-[10px] text-slate-500 font-medium">Lojas parceiras</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Boxes className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <span className="text-base font-black text-slate-900 block">+50 mil</span>
            <span className="text-[10px] text-slate-500 font-medium">Produtos disponíveis</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Briefcase className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <span className="text-base font-black text-slate-900 block">+5 mil</span>
            <span className="text-[10px] text-slate-500 font-medium">Profissionais e serviços</span>
          </div>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0B4D9C] font-bold">
              <Target className="w-4 h-4" />
              <h4>Nossa Missão</h4>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              Facilitar o acesso a materiais, serviços e soluções para a construção civil, conectando pessoas e gerando oportunidades reais de negócio.
            </p>
          </div>

          <div className="space-y-1 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-[#0B4D9C] font-bold">
              <Compass className="w-4 h-4" />
              <h4>Nossa Visão</h4>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              Ser a principal plataforma do Brasil no setor da construção civil, reconhecida pela inovação, confiabilidade e impacto positivo na vida das pessoas.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-[#0B4D9C] font-bold">
              <Award className="w-4 h-4" />
              <h4>Nossos Valores</h4>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pl-6 text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Transparência</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Confiança</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Inovação</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Foco no cliente</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-black text-blue-950">Faça parte dessa história!</h4>
            <p className="text-[10px] text-blue-700">Construa seu negócio ou sua obra com a OBRACOM.</p>
          </div>
          <button
            type="button"
            onClick={onRegisterClick}
            className="px-3.5 py-2 rounded-lg bg-[#0B4D9C] text-white text-xs font-bold flex items-center gap-1 hover:bg-blue-800"
          >
            <span>Quero me cadastrar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
