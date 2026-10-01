import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
  onBack: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onGoToRegister,
}) => {
  const [email, setEmail] = useState('luan.castro@email.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between p-5">
      <div className="max-w-sm mx-auto w-full">
        <div className="text-left mb-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Bem-vindo de volta!
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Acesse sua conta e continue construindo com a OBRACOM.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C] focus:ring-1 focus:ring-[#0B4D9C]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C] focus:ring-1 focus:ring-[#0B4D9C]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs font-semibold text-[#0B4D9C] hover:underline"
            >
              Esqueceu sua senha?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#0E62C4] hover:bg-[#116edc] active:bg-[#0c53a6] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Entrar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Social logins */}
        <div className="mt-6 text-center">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Ou continue com
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          <div className="grid grid-cols-3 gap-2.5 mt-3">
            <button
              type="button"
              onClick={onLoginSuccess}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
            >
              <span className="font-bold text-red-500">G</span> Google
            </button>
            <button
              type="button"
              onClick={onLoginSuccess}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
            >
              <span className="font-bold text-blue-600">f</span> Facebook
            </button>
            <button
              type="button"
              onClick={onLoginSuccess}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
            >
              <span className="font-bold text-[#0077B5]">in</span> LinkedIn
            </button>
          </div>

          <div className="mt-6">
            <p className="text-xs text-slate-500 mb-2">Ainda não tem uma conta?</p>
            <button
              type="button"
              onClick={onGoToRegister}
              className="w-full py-2.5 rounded-full border border-[#0B4D9C] text-[#0B4D9C] hover:bg-blue-50 font-bold text-xs transition-colors"
            >
              Criar conta
            </button>
          </div>
        </div>
      </div>

      {/* Security statement banner */}
      <div className="mt-6 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-left max-w-sm mx-auto w-full">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-blue-900 leading-tight">
            Seus dados estão seguros
          </h4>
          <p className="text-[11px] text-blue-700 leading-snug mt-0.5">
            Utilizamos criptografia e seguimos as melhores práticas de segurança para proteger suas informações.
          </p>
        </div>
      </div>
    </div>
  );
};
