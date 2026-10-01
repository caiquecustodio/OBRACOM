import React from 'react';
import {
  Edit3,
  Camera,
  User,
  MapPin,
  CreditCard,
  Bell,
  Sliders,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Crown,
  Leaf,
  Info,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { APP_ASSETS } from '../data/assets';

interface ProfileViewProps {
  onNavigateHelp: () => void;
  onNavigateNotifications: () => void;
  onNavigateAbout: () => void;
  onLogout: () => void;
  onSwitchToLojista: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigateHelp,
  onNavigateNotifications,
  onNavigateAbout,
  onLogout,
  onSwitchToLojista,
}) => {
  return (
    <div className="flex-1 w-full bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">Meu perfil</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Seus dados, preferências e configurações em um só lugar.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-[#0B4D9C]" />
            <span>Editar perfil</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto w-full">
        {/* User Card (matches Digitalizado_20260911-1650-14.jpg) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3.5">
          <div className="relative">
            <SafeImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
              alt="Luan de Castro"
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-600 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0B4D9C] text-white flex items-center justify-center shadow-xs"
            >
              <Camera className="w-3 h-3" />
            </button>
          </div>

          <div className="flex-1 min-w-0 text-xs">
            <h3 className="text-sm font-black text-slate-900 truncate">Luan de Castro</h3>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
              Cliente
            </span>
            <p className="text-slate-500 text-[11px] mt-1 truncate">luan.castro@email.com</p>
            <p className="text-slate-500 text-[11px]">(85) 9 9888-7766</p>
          </div>
        </div>

        {/* Cliente OBRACOM VIP Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-[#0B4D9C] to-indigo-900 text-white rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <h4 className="text-xs font-bold">Cliente OBRACOM</h4>
          </div>
          <p className="text-[11px] text-blue-100">
            Aproveite uma experiência completa: compre mais rápido, acompanhe entregas e receba ofertas exclusivas!
          </p>
          <button
            type="button"
            onClick={onSwitchToLojista}
            className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Acessar / Criar Loja no OBRACOM &gt;
          </button>
        </div>

        {/* Menu Items List */}
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden text-xs">
          <button
            type="button"
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Meus dados</span>
                <span className="text-[11px] text-slate-500">Nome, e-mail, telefone e endereço</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Endereços</span>
                <span className="text-[11px] text-slate-500">Gerencie seus locais de entrega</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Formas de pagamento</span>
                <span className="text-[11px] text-slate-500">Cartões salvos, PIX e outras opções</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={onNavigateNotifications}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Notificações</span>
                <span className="text-[11px] text-slate-500">Escolha o que deseja receber</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={onNavigateAbout}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Sobre a OBRACOM</span>
                <span className="text-[11px] text-slate-500">Nossa missão, visão e impacto</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Segurança</span>
                <span className="text-[11px] text-slate-500">Alterar senha e autenticação</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={onNavigateHelp}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Central de ajuda</span>
                <span className="text-[11px] text-slate-500">Dúvidas frequentes e suporte</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-50 text-rose-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block">Sair da conta</span>
                <span className="text-[11px] text-rose-400">Faça logout com segurança</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-400" />
          </button>
        </div>

        {/* Sua obra, nosso propósito card */}
        <div className="rounded-xl overflow-hidden bg-slate-900 text-white relative shadow-sm p-4">
          <div className="relative z-10 max-w-[70%]">
            <h4 className="text-xs font-black">Sua obra, nosso propósito.</h4>
            <p className="text-[10px] text-slate-300 mt-1 leading-snug">
              Qualidade, economia e parceiros confiáveis para construir um futuro melhor.
            </p>
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
      </div>
    </div>
  );
};
