import React, { useState } from 'react';
import {
  Store,
  Users,
  Bell,
  CreditCard,
  Truck,
  Layers,
  Shield,
  Palette,
  HelpCircle,
  Upload,
  Check,
  MapPin,
} from 'lucide-react';
import { SafeImage } from '../../components/SafeImage';
import { APP_ASSETS } from '../../data/assets';

export const LojistaSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dados');
  const [storeName, setStoreName] = useState('ConstróiMais Materiais');
  const [cnpj, setCnpj] = useState('12.345.678/0001-90');
  const [description, setDescription] = useState(
    'Tudo para sua obra, com qualidade, preço justo e entrega rápida.'
  );
  const [email, setEmail] = useState('contato@construimais.com.br');
  const [phone, setPhone] = useState('(85) 9 9876-5432');
  const [address, setAddress] = useState('Av. Santos Dumont, 1234 - Aldeota, Fortaleza - CE');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {saved && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Alterações salvas com sucesso!</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs">
        <h1 className="text-base font-black text-slate-900 leading-tight">Configurações</h1>
        <p className="text-[11px] text-slate-500">
          Gerencie as preferências e dados cadastrais da sua loja.
        </p>
      </div>

      <div className="p-3.5 space-y-4 max-w-lg mx-auto">
        {/* Navigation pills */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1 text-xs">
          {[
            { id: 'dados', label: 'Dados da loja' },
            { id: 'pagamentos', label: 'Formas de pagamento' },
            { id: 'frete', label: 'Frete e entrega' },
            { id: 'notificacoes', label: 'Notificações' },
            { id: 'seguranca', label: 'Segurança' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeTab === t.id ? 'bg-[#0B4D9C] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Main Form (matches Digitalizado_20260911-1653-13.jpg) */}
        <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3.5 text-xs">
          <h3 className="font-bold text-slate-900">Dados da loja</h3>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome da loja *</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full p-2.5 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">CNPJ *</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className="w-full p-2.5 border rounded-lg"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-slate-700">Descrição da loja</label>
              <span className="text-[10px] text-slate-400">{description.length}/300</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full p-2.5 border rounded-lg"
            />
          </div>

          {/* Logo preview */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Logo da loja</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-[#073976] text-white flex items-center justify-center font-black text-xl border">
                CM
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50"
                >
                  Alterar logo
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>

          {/* Banner preview */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Banner da loja</label>
            <div className="relative h-24 rounded-xl overflow-hidden border">
              <SafeImage
                src={APP_ASSETS.workerBanner}
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  className="px-3 py-1.5 bg-white/90 rounded-lg text-slate-900 font-bold text-xs shadow"
                >
                  Alterar banner
                </button>
              </div>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">E-mail comercial</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Telefone comercial</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Endereço da loja física</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#0B4D9C] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
};
