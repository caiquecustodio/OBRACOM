import React, { useState } from 'react';
import {
  Upload,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Video,
  Truck,
  Box,
  Check,
} from 'lucide-react';
import { SafeImage } from '../../components/SafeImage';
import { Product } from '../../types';

interface LojistaAddProductViewProps {
  onSuccess: (newProduct: Partial<Product>) => void;
  onCancel: () => void;
}

export const LojistaAddProductView: React.FC<LojistaAddProductViewProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Cimento CP II 50kg');
  const [category, setCategory] = useState('Materiais Básicos');
  const [brand, setBrand] = useState('Votorantim');
  const [model, setModel] = useState('CP II');
  const [sku, setSku] = useState('CIM-001234');
  const [description, setDescription] = useState(
    'Cimento Portland CP II de alta resistência inicial e trabalhabilidade superior, indicado para obras estruturais e alvenaria em geral.'
  );

  const [price, setPrice] = useState('32,90');
  const [promoPrice, setPromoPrice] = useState('0,00');
  const [stock, setStock] = useState('150');
  const [minStock, setMinStock] = useState('10');
  const [unit, setUnit] = useState('Unidade (un)');
  const [weight, setWeight] = useState('50,00');
  const [length, setLength] = useState('40,00');
  const [width, setWidth] = useState('30,00');
  const [height, setHeight] = useState('20,00');
  const [ncm, setNcm] = useState('25232900');
  const [origin, setOrigin] = useState('Nacional');

  const [photos, setPhotos] = useState([
    { label: 'Principal', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&auto=format&fit=crop&q=80' },
    { label: 'Lateral', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80' },
    { label: 'Detalhe', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&auto=format&fit=crop&q=80' },
    { label: 'Aplicação', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&auto=format&fit=crop&q=80' },
  ]);

  const handleFinish = () => {
    onSuccess({
      name,
      category,
      brand,
      sku,
      price: parseFloat(price.replace(',', '.')) || 32.90,
      stock: parseInt(stock, 10) || 150,
      description,
      imageUrl: photos[0]?.url,
    });
  };

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-y-auto">
      {/* Header with 5 steps indicator (matches Digitalizado_20260911-1653-05.jpg) */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black text-slate-900 leading-tight">Cadastrar produto</h1>
            <p className="text-[11px] text-slate-500">Adicione novo produto ao seu catálogo online.</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Cancelar
          </button>
        </div>

        {/* 5-step stepper */}
        <div className="flex items-center justify-between max-w-sm mx-auto pt-1">
          {[
            { num: 1, label: 'Informações' },
            { num: 2, label: 'Preço/Estoque' },
            { num: 3, label: 'Mídia' },
            { num: 4, label: 'Entrega' },
            { num: 5, label: 'Revisão' },
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
                <span className="text-[8px] font-semibold text-slate-600 mt-1">
                  {s.label}
                </span>
              </div>
              {idx < 4 && (
                <div
                  className={`h-0.5 flex-1 mx-0.5 ${
                    step > idx + 1 ? 'bg-[#0B4D9C]' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="p-3.5 space-y-4 max-w-lg mx-auto">
        {/* Step 1: Informações */}
        {step === 1 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-900">1. Informações do produto</h3>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome do produto *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Cimento CP II 50kg"
                className="w-full p-2.5 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Categoria *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border rounded-lg bg-white"
              >
                <option value="Materiais Básicos">Materiais Básicos</option>
                <option value="Alvenaria">Alvenaria</option>
                <option value="Tintas e Acabamentos">Tintas e Acabamentos</option>
                <option value="Hidráulica">Hidráulica</option>
                <option value="Elétrica">Elétrica</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Marca *</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Código (SKU) *</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Descrição do produto *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full p-2.5 border rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Step 2: Preço e Estoque */}
        {step === 2 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-900">2. Preço e estoque</h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Preço de venda (R$) *</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2.5 border rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Estoque disponível *</label>
                <input
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full p-2.5 border rounded-lg font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Estoque mínimo (alerta)</label>
                <input
                  type="text"
                  value={minStock}
                  onChange={(e) => setMinStock(e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Unidade de medida</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
              <div>
                <label className="text-[10px] text-slate-500">Peso (kg)</label>
                <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Comp. (cm)</label>
                <input type="text" value={length} onChange={(e) => setLength(e.target.value)} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Larg. (cm)</label>
                <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Alt. (cm)</label>
                <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-2 border rounded" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Mídia */}
        {step === 3 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-900">3. Mídia do produto</h3>
            <p className="text-[11px] text-slate-500">Fotos de alta qualidade aumentam as vendas em até 3x.</p>

            <div className="grid grid-cols-2 gap-2">
              {photos.map((p, idx) => (
                <div key={idx} className="relative rounded-lg border border-slate-200 overflow-hidden bg-slate-50 p-1">
                  <div className="h-24 flex items-center justify-center">
                    <SafeImage src={p.url} alt="" className="h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 block text-center mt-1">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50">
              <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
              <span className="font-bold text-[#0B4D9C] block text-xs">Adicionar mais fotos</span>
              <span className="text-[10px] text-slate-400">Até 10 fotos (PNG, JPG)</span>
            </div>
          </div>
        )}

        {/* Step 4: Entrega */}
        {step === 4 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-900">4. Opções de entrega</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-blue-600 bg-blue-50 text-slate-900 font-bold">
                <input type="checkbox" defaultChecked className="text-[#0B4D9C]" />
                <span>Frota própria da loja (Entrega rápida em Fortaleza)</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 text-slate-700">
                <input type="checkbox" defaultChecked className="text-[#0B4D9C]" />
                <span>Transportadora parceira (Correios / Jadlog)</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 text-slate-700">
                <input type="checkbox" defaultChecked className="text-[#0B4D9C]" />
                <span>Retirada no balcão da loja física</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 5: Revisão (matches Digitalizado_20260911-1653-08.jpg) */}
        {step === 5 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-900">5. Revisão final</h3>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Nome:</span>
                <span className="font-bold text-slate-900">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Categoria:</span>
                <span className="font-bold text-slate-900">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Preço de venda:</span>
                <span className="font-bold text-emerald-700">R$ {price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estoque inicial:</span>
                <span className="font-bold text-slate-900">{stock} un</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tudo pronto! Seu produto será publicado instantaneamente.</span>
            </div>
          </div>
        )}

        {/* Navigation bottom */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
            >
              Voltar
            </button>
          )}

          <button
            type="button"
            onClick={step === 5 ? handleFinish : () => setStep(step + 1)}
            className="flex-1 py-2.5 rounded-xl bg-[#0B4D9C] hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer ml-auto"
          >
            <span>{step === 5 ? 'Finalizar cadastro' : 'Continuar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
