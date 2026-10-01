import React from 'react';
import {
  Store,
  TrendingUp,
  ShieldCheck,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Award,
} from 'lucide-react';
import { SafeImage } from '../../components/SafeImage';
import { APP_ASSETS } from '../../data/assets';

interface BecomeSellerViewProps {
  onStartRegistration: () => void;
  onGoToDashboard: () => void;
}

export const BecomeSellerView: React.FC<BecomeSellerViewProps> = ({
  onStartRegistration,
  onGoToDashboard,
}) => {
  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header (matches Digitalizado_20260911-1651-02.jpg) */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-slate-900 leading-tight">
            Seja um lojista na OBRACOM
          </h1>
          <p className="text-[11px] text-slate-500">
            Aumente suas vendas e alcance mais clientes no maior marketplace da construção.
          </p>
        </div>
        <div className="flex items-center gap-1.5 p-2 bg-blue-50 rounded-xl text-[#0B4D9C]">
          <Store className="w-5 h-5" />
        </div>
      </div>

      <div className="p-3.5 space-y-4 max-w-lg mx-auto">
        {/* 4 Pillars of Value */}
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Store className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <h4 className="font-black text-slate-900">Mais clientes</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Divulgue seus produtos para todo o Brasil.</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <TrendingUp className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <h4 className="font-black text-slate-900">Mais vendas</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Aumente seu faturamento e giro de estoque.</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <h4 className="font-black text-slate-900">Segurança</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Transações protegidas e repasses pontuais.</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <LayoutDashboard className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
            <h4 className="font-black text-slate-900">Gestão simples</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Controle pedidos, catálogo e fretes.</p>
          </div>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#063065] to-[#0B4D9C] text-white p-5 shadow-sm relative">
          <div className="relative z-10 max-w-[65%] space-y-2">
            <h3 className="text-base font-black leading-snug">
              Juntos, construímos oportunidades.
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              A OBRACOM conecta lojistas, distribuidores e prestadores a milhares de construtores e engenheiros.
            </p>
            <button
              type="button"
              onClick={onStartRegistration}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md cursor-pointer transition-colors"
            >
              <span>Quero ser um lojista</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
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

        {/* Como se tornar um lojista (4 steps) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900">Como se tornar um lojista?</h3>
          <p className="text-[11px] text-slate-500">É simples, rápido e totalmente online.</p>

          <div className="space-y-3 pt-1 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0B4D9C] text-white flex items-center justify-center font-bold text-xs shrink-0">
                1
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Cadastre sua empresa</span>
                <span className="text-[11px] text-slate-500">Informe seus dados cadastrais e documentos básicos.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0B4D9C] text-white flex items-center justify-center font-bold text-xs shrink-0">
                2
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Aguarde a aprovação</span>
                <span className="text-[11px] text-slate-500">Nossa equipe analisa e valida seu CNPJ em até 24h.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0B4D9C] text-white flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Configure sua loja</span>
                <span className="text-[11px] text-slate-500">Adicione produtos, fotos, estoques e opções de frete.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                4
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Comece a vender!</span>
                <span className="text-[11px] text-slate-500">Sua loja ativa no catálogo e pronta para receber pedidos.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo store trigger */}
        <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-center space-y-2">
          <p className="text-xs text-slate-600">
            Já tem uma loja aprovada? Acesse o painel de demonstração:
          </p>
          <button
            type="button"
            onClick={onGoToDashboard}
            className="w-full py-2.5 rounded-lg bg-[#0B4D9C] text-white text-xs font-bold hover:bg-blue-800"
          >
            Acessar Painel: ConstróiMais Materiais &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
