import { NotificationItem, PriceDropInfo, Product, StoreOrder } from '../types';

const CUSTOMER_NAMES = [
  'Luan Castro',
  'Mariana Souza',
  'Carlos Mendes',
  'Fernanda Alves',
  'Ricardo Nunes',
  'Juliana Costa',
  'Aline Martins',
  'Diego Ferreira',
  'Patrícia Gomes',
  'Marcos Vieira',
  'Camila Rocha',
  'Rafael Teixeira',
  'Bruno Lima',
  'Tatiane Araújo',
];

const ORDER_CITIES = [
  'Aldeota, Fortaleza - CE',
  'Meireles, Fortaleza - CE',
  'Papicu, Fortaleza - CE',
  'Eusébio - CE',
  'Maracanaú - CE',
  'Caucaia - CE',
  'Fortaleza - CE',
];

const ORDER_POOLS: { summary: string; items: number; min: number; max: number; thumb: string }[] = [
  {
    summary: 'Cimento Votoran 50kg x2 + Tijolo 9x19x19 x100',
    items: 3,
    min: 180,
    max: 420,
    thumb: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=100&auto=format&fit=crop&q=80',
  },
  {
    summary: 'Vergalhão CA-50 10mm x10 barras',
    items: 1,
    min: 400,
    max: 520,
    thumb: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=100&auto=format&fit=crop&q=80',
  },
  {
    summary: 'Tinta Coral Rende Muito 18L + Rolo de lã',
    items: 2,
    min: 280,
    max: 360,
    thumb: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&auto=format&fit=crop&q=80',
  },
  {
    summary: 'Capacete EPI Classe B x4 + Luvas de raspa',
    items: 5,
    min: 120,
    max: 210,
    thumb: 'https://images.unsplash.com/photo-1578873375972-e64e9a38f714?w=100&auto=format&fit=crop&q=80',
  },
  {
    summary: 'Furadeira de impacto 750W + Brocas para concreto',
    items: 2,
    min: 320,
    max: 410,
    thumb: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&auto=format&fit=crop&q=80',
  },
  {
    summary: 'Cimento Votoran Palete 40 sacos (2 toneladas)',
    items: 1,
    min: 1050,
    max: 1200,
    thumb: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=100&auto=format&fit=crop&q=80',
  },
  {
    summary: 'Escada de alumínio 7 degraus + Nível a laser',
    items: 2,
    min: 500,
    max: 680,
    thumb: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=100&auto=format&fit=crop&q=80',
  },
];

const PAYMENT_METHODS = ['PIX', 'Cartão de crédito', 'Boleto'];

const NOTIFICATION_TEMPLATES: {
  title: string;
  description: string;
  category: NotificationItem['category'];
  iconType: NotificationItem['iconType'];
}[] = [
  {
    title: 'Seu pedido saiu para entrega',
    description:
      'O caminhão já carregou sua carga e está a caminho da sua obra. Acompanhe o trajeto em tempo real.',
    category: 'pedidos',
    iconType: 'truck',
  },
  {
    title: 'Pedido separado no depósito',
    description:
      'Ajudantes da ConstróiMais conferiram e embalaram todos os volumes do seu pedido.',
    category: 'pedidos',
    iconType: 'package',
  },
  {
    title: 'Oferta relâmpago na sua região',
    description:
      'Argamassa AC-III com 18% OFF no depósito vizinho. Somente enquanto durar o estoque.',
    category: 'ofertas',
    iconType: 'tag',
  },
  {
    title: 'Cimento com preço menor hoje',
    description:
      'O preço do Cimento Votoran 50kg caiu na loja mais próxima da sua obra. Economize agora.',
    category: 'ofertas',
    iconType: 'tag',
  },
  {
    title: 'Pedido entregue na obra',
    description:
      'Carga conferida e recebida no endereço da obra. Obrigado por construir com a OBRACOM!',
    category: 'pedidos',
    iconType: 'check',
  },
  {
    title: 'Profissional respondeu seu orçamento',
    description:
      'O eletricista Rafael Souza enviou uma proposta para a sua solicitação. Veja o valor e o prazo.',
    category: 'pedidos',
    iconType: 'star',
  },
  {
    title: 'Nova loja parceira em Fortaleza',
    description:
      'Depósito Central da Construção entrou na OBRACOM com frete grátis acima de R$ 300.',
    category: 'novidades',
    iconType: 'store',
  },
];

const DRIVER_CHAT_LINES = [
  'Olá! Sou o Carlos, motorista do seu pedido. Tudo bem por aí?',
  'Já carreguei todos os volumes e estou saindo do depósito agora.',
  'Estou passando pela Av. Santos Dumont, devo chegar em ~15 minutos.',
  'O trânsito está tranquilo na Aldeota, vou acelerar o passo.',
  'Cheguei próximo ao seu canteiro. Onde devo descarregar?',
  'Vou deixar os sacos de cimento paletizados perto da portaria, ok?',
  'Pode deixar a senha do portão com a recepção que eu subo com o romaneio.',
  'Carga conferida e assinada! Boa obra! 🏗️',
  'Qualquer coisa me chama aqui no chat que estou na rota ainda.',
];

let orderSeq = 9850;

export function generateStoreOrder(): StoreOrder {
  orderSeq += 1;
  const pool = ORDER_POOLS[Math.floor(Math.random() * ORDER_POOLS.length)];
  const total = Math.round((pool.min + Math.random() * (pool.max - pool.min)) * 100) / 100;
  const now = new Date();
  const date = `${now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}/${now.getFullYear()} - ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  return {
    id: `#OBR25${String(orderSeq).slice(-5)}`,
    customer: CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)],
    city: ORDER_CITIES[Math.floor(Math.random() * ORDER_CITIES.length)],
    date,
    itemsCount: pool.items,
    total,
    paymentMethod: PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)],
    status: 'em_aberto',
    thumbUrl: pool.thumb,
    itemSummary: pool.summary,
    isNew: true,
  };
}

export function generateNotification(seq: number): NotificationItem {
  const tpl = NOTIFICATION_TEMPLATES[seq % NOTIFICATION_TEMPLATES.length];
  return {
    id: `sim-notif-${Date.now()}-${seq}`,
    title: tpl.title,
    description: tpl.description,
    timeAgo: 'Agora',
    category: tpl.category,
    read: false,
    iconType: tpl.iconType,
  };
}

export function pickDriverReply(): string {
  return DRIVER_CHAT_LINES[Math.floor(Math.random() * DRIVER_CHAT_LINES.length)];
}

export function pickPriceDrop(products: Product[]): PriceDropInfo | null {
  const candidates = products.filter((p) => p.stock > 0 && p.price > 10);
  if (candidates.length === 0) return null;
  const product = candidates[Math.floor(Math.random() * candidates.length)];
  const dropPct = 0.05 + Math.random() * 0.12; // 5% a 17% de queda
  const newPrice = Math.max(1, Math.round(product.price * (1 - dropPct) * 100) / 100);
  return {
    productId: product.id,
    productName: product.name,
    oldPrice: product.price,
    newPrice,
    at: Date.now(),
  };
}

export function pickStockUpdate(products: Product[]): { productId: string; productName: string; newStock: number } | null {
  const candidates = products.filter((p) => p.status !== 'out_of_stock');
  if (candidates.length === 0) return null;
  const product = candidates[Math.floor(Math.random() * candidates.length)];
  const newStock = Math.max(0, product.stock - Math.ceil(Math.random() * 6));
  return { productId: product.id, productName: product.name, newStock };
}
