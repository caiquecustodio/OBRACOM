import React, { useState } from 'react';
import {
  Search,
  Package,
  CreditCard,
  Box,
  Store,
  KeyRound,
  Headphones,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Users,
} from 'lucide-react';

interface HelpCenterViewProps {
  onBack?: () => void;
}

export const HelpCenterView: React.FC<HelpCenterViewProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Como rastrear meu pedido?',
      a: 'Você pode acompanhar em tempo real na aba "Pedidos" clicando em "Acompanhar pedido". O mapa exibirá o trajeto da entrega, veículo e horário estimado de chegada.',
    },
    {
      q: 'Qual o prazo de entrega?',
      a: 'Na modalidade Entrega Rápida, as compras feitas até as 12h são entregues no mesmo dia ou em até 24h úteis na Grande Fortaleza. Para entregas econômicas, o prazo varia de 2 a 5 dias úteis.',
    },
    {
      q: 'Posso trocar ou devolver um produto?',
      a: 'Sim, você tem até 7 dias corridos após o recebimento para solicitar a devolução ou troca sem custos, diretamente pelo app na seção do pedido.',
    },
    {
      q: 'Quais são as formas de pagamento?',
      a: 'Aceitamos PIX com desconto instantâneo de 5%, cartões de crédito em até 12x sem juros (conforme o lojista), boleto bancário e saldo da Carteira Obracom.',
    },
    {
      q: 'Como me tornar uma loja parceira?',
      a: 'Basta acessar o menu "Seja um Lojista" ou alternar para o Modo Lojista no topo do app. Em menos de 5 minutos você cadastra seu CNPJ e começa a vender para milhares de construtores.',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs space-y-3">
        <div>
          <h1 className="text-lg font-black text-slate-900 leading-tight">Central de Ajuda</h1>
          <p className="text-[11px] text-slate-500">
            Estamos aqui para ajudar você em todas as etapas da sua obra.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Como podemos ajudar?"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B4D9C]"
            />
          </div>
          <button
            type="button"
            className="px-3.5 py-2 rounded-xl bg-[#0B4D9C] text-white text-xs font-bold"
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="p-3.5 space-y-4 max-w-lg mx-auto">
        {/* 6 Help categories */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-center flex flex-col items-center shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center mb-1">
              <Package className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-900 leading-tight">Meus pedidos</span>
            <span className="text-[9px] text-slate-500">Compras e entregas</span>
          </button>

          <button
            type="button"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-center flex flex-col items-center shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center mb-1">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-900 leading-tight">Pagamentos</span>
            <span className="text-[9px] text-slate-500">PIX e cartões</span>
          </button>

          <button
            type="button"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-center flex flex-col items-center shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center mb-1">
              <Box className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-900 leading-tight">Produtos</span>
            <span className="text-[9px] text-slate-500">Trocas e garantias</span>
          </button>

          <button
            type="button"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-center flex flex-col items-center shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center mb-1">
              <Store className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-900 leading-tight">Lojas parceiras</span>
            <span className="text-[9px] text-slate-500">Vendedores</span>
          </button>

          <button
            type="button"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-center flex flex-col items-center shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center mb-1">
              <KeyRound className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-900 leading-tight">Conta e acesso</span>
            <span className="text-[9px] text-slate-500">Segurança</span>
          </button>

          <button
            type="button"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-center flex flex-col items-center shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B4D9C] flex items-center justify-center mb-1">
              <Headphones className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-900 leading-tight">Outros</span>
            <span className="text-[9px] text-slate-500">Fale conosco</span>
          </button>
        </div>

        {/* Precisa de ajuda? Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900">Precisa de ajuda?</h3>
              <p className="text-xs text-slate-500">Nossa equipe especializada está pronta para te atender.</p>
              <span className="text-[10px] text-slate-400 block mt-1">
                Atendimento de segunda a sábado das 8h às 20h
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <a
              href="https://wa.me/5585999999999"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 flex items-center justify-between hover:bg-slate-50"
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-bold text-slate-900 block">Atendimento via WhatsApp</span>
                  <span className="text-[10px] text-slate-500">Tire suas dúvidas instantaneamente</span>
                </div>
              </div>
              <span className="text-slate-400">&gt;</span>
            </a>

            <a
              href="mailto:atendimento@obracom.com"
              className="py-2.5 flex items-center justify-between hover:bg-slate-50"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="font-bold text-slate-900 block">Enviar um e-mail</span>
                  <span className="text-[10px] text-slate-500">atendimento@obracom.com</span>
                </div>
              </div>
              <span className="text-slate-400">&gt;</span>
            </a>

            <a
              href="tel:8540001234"
              className="py-2.5 flex items-center justify-between hover:bg-slate-50"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-purple-600" />
                <div>
                  <span className="font-bold text-slate-900 block">Ligar para nós</span>
                  <span className="text-[10px] text-slate-500">(85) 4000-1234</span>
                </div>
              </div>
              <span className="text-slate-400">&gt;</span>
            </a>
          </div>
        </div>

        {/* Perguntas frequentes */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900">Perguntas frequentes</h3>

          <div className="divide-y divide-slate-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-slate-800"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <p className="mt-1.5 text-[11px] text-slate-600 leading-relaxed pl-1">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust cards */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block leading-tight">Compra segura</span>
              <span className="text-[10px] text-slate-500">Dados criptografados</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block leading-tight">Comunidade OBRACOM</span>
              <span className="text-[10px] text-slate-500">Dicas e tutoriais</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
