import React, { useState } from 'react';
import { User, Building2, Mail, FileText, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface RegisterViewProps {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  onRegisterSuccess,
  onGoToLogin,
}) => {
  const [accountType, setAccountType] = useState<'pf' | 'pj'>('pf');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      return;
    }
    onRegisterSuccess();
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between p-5 overflow-y-auto">
      <div className="max-w-sm mx-auto w-full">
        {/* Toggle PF / PJ */}
        <div className="p-1 bg-slate-100 rounded-xl flex items-center mb-5">
          <button
            type="button"
            onClick={() => setAccountType('pf')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              accountType === 'pf'
                ? 'bg-[#0B4D9C] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Pessoa Física</span>
          </button>
          <button
            type="button"
            onClick={() => setAccountType('pj')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              accountType === 'pj'
                ? 'bg-[#0B4D9C] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Empresa</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {accountType === 'pf' ? 'Nome completo' : 'Razão Social ou Nome Fantasia'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={accountType === 'pf' ? 'Digite seu nome' : 'Nome da sua empresa'}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu@email.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {accountType === 'pf' ? 'CPF' : 'CNPJ'}
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                placeholder={accountType === 'pf' ? '000.000.000-00' : '00.000.000/0000-00'}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Telefone
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(85) 98765-4321"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirmar senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
                required
              />
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-[#0B4D9C] focus:ring-[#0B4D9C]"
            />
            <span className="text-[11px] text-slate-600 leading-tight">
              Li e aceito os{' '}
              <span className="text-[#0B4D9C] underline">Termos de Uso</span> e a{' '}
              <span className="text-[#0B4D9C] underline">Política de Privacidade</span>
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#0E62C4] hover:bg-[#116edc] active:bg-[#0c53a6] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2"
          >
            <span>CRIAR CONTA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Social */}
        <div className="mt-5 text-center">
          <div className="relative flex py-1.5 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-400">
              OU
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <button
              type="button"
              onClick={onRegisterSuccess}
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl border border-slate-200 text-xs text-slate-700 hover:bg-slate-50"
            >
              <span className="font-bold text-red-500">G</span> Google
            </button>
            <button
              type="button"
              onClick={onRegisterSuccess}
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl border border-slate-200 text-xs text-slate-700 hover:bg-slate-50"
            >
              <span className="font-bold text-blue-600">f</span> Facebook
            </button>
            <button
              type="button"
              onClick={onRegisterSuccess}
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl border border-slate-200 text-xs text-slate-700 hover:bg-slate-50"
            >
              <span className="font-bold text-[#0077B5]">in</span> LinkedIn
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <span>Já tem conta?</span>
            <button
              type="button"
              onClick={onGoToLogin}
              className="font-bold text-[#0B4D9C] hover:underline"
            >
              Fazer login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
