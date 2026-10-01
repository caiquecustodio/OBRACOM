import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  ChevronLeft,
  Check,
} from 'lucide-react';

interface RequestQuoteViewProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const RequestQuoteView: React.FC<RequestQuoteViewProps> = ({
  onSuccess,
  onBack,
}) => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('Instalações Hidráulicas');
  const [serviceType, setServiceType] = useState('Reparo de vazamentos e infiltrações');
  const [title, setTitle] = useState('Reparo de vazamento no cano da cozinha');
  const [description, setDescription] = useState(
    'Identifiquei umidade na parede sob a pia da cozinha e barulho constante de água correndo. Preciso de avaliação para conserto de cano PVC 25mm.'
  );
  const [urgency, setUrgency] = useState('o-quanto-antes');
  const [photosUploaded, setPhotosUploaded] = useState(1);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black text-slate-900 leading-tight">
              Solicitação de orçamento
            </h1>
            <p className="text-[11px] text-slate-500">
              Receba até 5 propostas gratuitas de profissionais da sua região.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Gratuito
          </span>
        </div>

        {/* 4 Steps stepper (matches Digitalizado_20260911-1651-01.jpg) */}
        <div className="flex items-center justify-between max-w-sm mx-auto pt-1">
          {[
            { num: 1, label: 'Dados do serviço' },
            { num: 2, label: 'Detalhes' },
            { num: 3, label: 'Revisão' },
            { num: 4, label: 'Concluir' },
          ].map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step >= s.num
                      ? 'bg-[#0B4D9C] text-white shadow-xs'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className="text-[9px] font-semibold text-slate-600 mt-1">
                  {s.label}
                </span>
              </div>
              {idx < 3 && (
                <div
                  className={`h-0.5 flex-1 mx-1 ${
                    step > idx + 1 ? 'bg-[#0B4D9C]' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="p-3.5 space-y-4 max-w-lg mx-auto">
        {step === 1 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3.5 text-xs">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0B4D9C]" />
              1. Dados do serviço
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Categoria do serviço *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#0B4D9C]"
              >
                <option value="Instalações Hidráulicas">Instalações Hidráulicas</option>
                <option value="Instalações Elétricas">Instalações Elétricas</option>
                <option value="Obras e Reformas">Obras e Reformas</option>
                <option value="Pintura">Pintura e Acabamentos</option>
                <option value="Ar Condicionado">Ar Condicionado</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Tipo de serviço *
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#0B4D9C]"
              >
                <option value="Reparo de vazamentos e infiltrações">Reparo de vazamentos e infiltrações</option>
                <option value="Instalação completa de tubulação">Instalação completa de tubulação</option>
                <option value="Desentupimento">Desentupimento de esgoto/ralo</option>
                <option value="Limpeza de caixa d'água">Limpeza ou troca de caixa d'água</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Título da solicitação *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Instalação de ar condicionado"
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-slate-700">Descrição do serviço *</label>
                <span className="text-[10px] text-slate-400">{description.length}/500</span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Descreva com o máximo de detalhes o que você precisa..."
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
              />
            </div>

            {/* Photo dropzone */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Adicionar fotos (opcional)
              </label>
              <div
                onClick={() => setPhotosUploaded(photosUploaded + 1)}
                className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="font-bold text-[#0B4D9C] block text-xs">
                  Clique para adicionar fotos
                </span>
                <span className="text-[10px] text-slate-400">
                  Fotos ajudam os profissionais a orçarem melhor (JPG, PNG máx 10 MB)
                </span>
                {photosUploaded > 0 && (
                  <div className="mt-2 text-[10px] text-emerald-700 font-bold">
                    ✓ {photosUploaded} foto(s) anexada(s)
                  </div>
                )}
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-2">
                Quando precisa do serviço?
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'o-quanto-antes', label: 'O quanto antes' },
                  { id: '7-dias', label: 'Em até 7 dias' },
                  { id: '30-dias', label: 'Em até 30 dias' },
                  { id: 'nao-sei', label: 'Ainda não sei' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer text-xs ${
                      urgency === item.id ? 'border-[#0B4D9C] bg-blue-50/50 font-bold' : 'border-slate-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      checked={urgency === item.id}
                      onChange={() => setUrgency(item.id)}
                      className="text-[#0B4D9C]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step > 1 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs text-xs space-y-3">
            <h3 className="font-bold text-slate-900">Resumo da Solicitação</h3>
            <div className="bg-slate-50 p-3 rounded-lg space-y-1 text-[11px]">
              <p><strong>Categoria:</strong> {category}</p>
              <p><strong>Serviço:</strong> {serviceType}</p>
              <p><strong>Título:</strong> {title}</p>
              <p><strong>Descrição:</strong> {description}</p>
              <p><strong>Prazo:</strong> {urgency}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-800 text-xs font-semibold">
              Sua solicitação será enviada para os melhores profissionais cadastrados em Fortaleza - CE.
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={step === 1 ? onBack : () => setStep(step - 1)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-2.5 rounded-xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>{step === 4 ? 'Confirmar solicitação' : 'Continuar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
