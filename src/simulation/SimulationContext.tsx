import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ChatMessage,
  NotificationItem,
  Order,
  PriceDropInfo,
  Product,
  StoreOrder,
} from '../types';
import {
  generateNotification,
  generateStoreOrder,
  pickDriverReply,
  pickPriceDrop,
  pickStockUpdate,
} from './scenarios';
import { mockNotifications, mockOrders, mockProducts } from '../data/mockData';

export type SimulationSpeed = 1 | 2 | 4;

export interface SimulationEvent {
  id: string;
  time: string;
  text: string;
  kind: 'order' | 'notification' | 'price' | 'stock' | 'delivery' | 'chat';
}

const INITIAL_STORE_ORDERS: StoreOrder[] = [
  {
    id: '#OBR250489',
    customer: 'João Silva',
    city: 'Fortaleza - CE',
    date: '12/09/2026 - 14:32',
    itemsCount: 3,
    total: 320.0,
    paymentMethod: 'Pix',
    status: 'entregue',
    thumbUrl:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=100&auto=format&fit=crop&q=80',
    itemSummary: 'Cimento Votoran 50kg x2 + Tijolo 9x19x19 x100',
  },
  {
    id: '#OBR250488',
    customer: 'Mariana Souza',
    city: 'Fortaleza - CE',
    date: '12/09/2026 - 11:20',
    itemsCount: 1,
    total: 150.0,
    paymentMethod: 'Cartão de crédito',
    status: 'em_transporte',
    thumbUrl:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&auto=format&fit=crop&q=80',
    itemSummary: 'Tinta Coral Rende Muito 18L',
  },
  {
    id: '#OBR250487',
    customer: 'Carlos Lima',
    city: 'Fortaleza - CE',
    date: '11/09/2026 - 18:40',
    itemsCount: 2,
    total: 560.0,
    paymentMethod: 'Boleto',
    status: 'em_separacao',
    thumbUrl:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=100&auto=format&fit=crop&q=80',
    itemSummary: 'Vergalhão CA-50 10mm x10 barras',
  },
  {
    id: '#OBR250486',
    customer: 'Fernanda Alves',
    city: 'Fortaleza - CE',
    date: '11/09/2026 - 09:15',
    itemsCount: 4,
    total: 210.0,
    paymentMethod: 'Pix',
    status: 'em_aberto',
    thumbUrl:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&auto=format&fit=crop&q=80',
    itemSummary: 'Capacete EPI Classe B x4 + Luvas de raspa',
  },
  {
    id: '#OBR250485',
    customer: 'Ricardo Nunes',
    city: 'Fortaleza - CE',
    date: '10/09/2026 - 16:10',
    itemsCount: 1,
    total: 84.9,
    paymentMethod: 'Cartão de crédito',
    status: 'entregue',
    thumbUrl:
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=100&auto=format&fit=crop&q=80',
    itemSummary: 'Rolo de Lã e Bandeja de Pintura',
  },
];

const SEED_DRIVER_CHAT: ChatMessage[] = [
  {
    id: 'seed-1',
    from: 'driver',
    text: 'Olá! Sou o Carlos, motorista do seu pedido. Já carreguei os volumes.',
    time: '14:10',
  },
  {
    id: 'seed-2',
    from: 'me',
    text: 'Boa tarde! Pode deixar na portaria do canteiro?',
    time: '14:12',
  },
  {
    id: 'seed-3',
    from: 'driver',
    text: 'Pode deixar! Vou ligar na recepção quando chegar.',
    time: '14:13',
  },
];

// ---- Persistência local: a simulação sobrevive a recargas da página ----
const STORAGE_KEY = 'obracom-sim-v1';

const isPlainRecord = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);

interface PersistedSimState {
  products: Product[];
  orders: Order[];
  notifications: NotificationItem[];
  storeOrders: StoreOrder[];
  priceDrops: Record<string, PriceDropInfo>;
  deliveryProgress: Record<string, number>;
  driverChats: Record<string, ChatMessage[]>;
}

const DEFAULT_SIM_STATE: PersistedSimState = {
  products: mockProducts,
  orders: mockOrders,
  notifications: mockNotifications,
  storeOrders: INITIAL_STORE_ORDERS,
  priceDrops: {},
  deliveryProgress: {},
  driverChats: { '#OBR254789': SEED_DRIVER_CHAT },
};

/** Remove duplicatas por id (auto-cura de estados salvos antigos) */
function dedupeById<T extends { id: string }>(list: T[]): T[] {
  const seen = new Set<string>();
  return list.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

/** Restaura o estado salvo; volta às seeds se estiver ausente ou corrompido */
function loadPersistedSimState(): PersistedSimState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SIM_STATE;
    const parsed: unknown = JSON.parse(raw);
    if (!isPlainRecord(parsed)) return DEFAULT_SIM_STATE;
    return {
      products: dedupeById(
        Array.isArray(parsed.products)
          ? (parsed.products as Product[])
          : DEFAULT_SIM_STATE.products
      ),
      orders: dedupeById(
        Array.isArray(parsed.orders)
          ? (parsed.orders as Order[])
          : DEFAULT_SIM_STATE.orders
      ),
      notifications: dedupeById(
        Array.isArray(parsed.notifications)
          ? (parsed.notifications as NotificationItem[])
          : DEFAULT_SIM_STATE.notifications
      ),
      storeOrders: dedupeById(
        Array.isArray(parsed.storeOrders)
          ? (parsed.storeOrders as StoreOrder[])
          : DEFAULT_SIM_STATE.storeOrders
      ),
      priceDrops: isPlainRecord(parsed.priceDrops)
        ? (parsed.priceDrops as Record<string, PriceDropInfo>)
        : {},
      deliveryProgress: isPlainRecord(parsed.deliveryProgress)
        ? (parsed.deliveryProgress as Record<string, number>)
        : {},
      driverChats: isPlainRecord(parsed.driverChats)
        ? (parsed.driverChats as Record<string, ChatMessage[]>)
        : DEFAULT_SIM_STATE.driverChats,
    };
  } catch {
    return DEFAULT_SIM_STATE;
  }
}

interface SimulationContextValue {
  running: boolean;
  speed: SimulationSpeed;
  toggleRunning: () => void;
  setSpeed: (s: SimulationSpeed) => void;

  products: Product[];
  addProduct: (p: Product) => void;

  orders: Order[];
  addOrder: (o: Order) => void;

  notifications: NotificationItem[];
  markAllNotificationsRead: () => void;

  storeOrders: StoreOrder[];
  acceptStoreOrder: (id: string) => void;
  advanceStoreOrder: (id: string) => void;

  priceDrops: Record<string, PriceDropInfo>;

  deliveryProgress: Record<string, number>;
  startDelivery: (orderId: string) => void;

  driverChats: Record<string, ChatMessage[]>;
  sendDriverMessage: (orderId: string, text: string) => void;

  events: SimulationEvent[];
}

const SimulationContext = createContext<SimulationContextValue | null>(null);

export const useSimulation = () => {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error('useSimulation deve ser usado dentro de SimulationProvider');
  return ctx;
};

export const SimulationProvider: React.FC<{
  onEvent?: (text: string, kind: SimulationEvent['kind']) => void;
  children: React.ReactNode;
}> = ({ onEvent, children }) => {
  const [running, setRunning] = useState(true);
  const [speed, setSpeedState] = useState<SimulationSpeed>(1);
  // Primeiro acesso usa as seeds; depois restaura o estado persistido
  const [persistedState] = useState<PersistedSimState>(loadPersistedSimState);
  const [products, setProducts] = useState<Product[]>(persistedState.products);
  const [orders, setOrders] = useState<Order[]>(persistedState.orders);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(persistedState.notifications);
  const [storeOrders, setStoreOrders] =
    useState<StoreOrder[]>(persistedState.storeOrders);
  const [priceDrops, setPriceDrops] = useState<Record<string, PriceDropInfo>>(
    persistedState.priceDrops
  );
  const [deliveryProgress, setDeliveryProgress] = useState<Record<string, number>>(
    persistedState.deliveryProgress
  );
  const [driverChats, setDriverChats] = useState<Record<string, ChatMessage[]>>(
    persistedState.driverChats
  );
  const [events, setEvents] = useState<SimulationEvent[]>([]);

  // Refs para acesso fresco dentro dos intervalos
  const runningRef = useRef(running);
  runningRef.current = running;
  const productsRef = useRef(products);
  productsRef.current = products;
  const ordersRef = useRef(orders);
  ordersRef.current = orders;
  const progressRef = useRef(deliveryProgress);
  progressRef.current = deliveryProgress;
  const storeOrdersRef = useRef(storeOrders);
  storeOrdersRef.current = storeOrders;
  const notifSeq = useRef(0);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const pushEvent = useCallback((text: string, kind: SimulationEvent['kind']) => {
    const time = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setEvents((prev) =>
      [{ id: `evt-${Date.now()}-${Math.random()}`, time, text, kind }, ...prev].slice(0, 10)
    );
    onEventRef.current?.(text, kind);
  }, []);

  const setSpeed = useCallback((s: SimulationSpeed) => setSpeedState(s), []);
  const toggleRunning = useCallback(() => setRunning((r) => !r), []);

  // ---- Persiste catálogo, pedidos e chats para sobreviver a recargas ----
  useEffect(() => {
    try {
      const payload: PersistedSimState = {
        products,
        orders,
        notifications,
        storeOrders,
        priceDrops,
        deliveryProgress,
        driverChats,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Armazenamento cheio ou bloqueado: continua só em memória
    }
  }, [products, orders, notifications, storeOrders, priceDrops, deliveryProgress, driverChats]);

  // ---- Motor principal: eventos de marketplace a cada 5s / velocidade ----
  useEffect(() => {
    const interval = setInterval(() => {
      if (!runningRef.current) return;
      const roll = Math.random();

      if (roll < 0.32) {
        // Novo pedido chegando na loja do lojista.
        // O contador de sequência recomeça a cada carregamento, então após
        // restaurar do localStorage o ID pode colidir — garante unicidade.
        let so = generateStoreOrder();
        const existingIds = new Set(
          storeOrdersRef.current.map((o) => o.id)
        );
        let guard = 0;
        while (existingIds.has(so.id) && guard < 100) {
          so = generateStoreOrder();
          guard += 1;
        }
        setStoreOrders((prev) => [so, ...prev].slice(0, 40));
        pushEvent(
          `Novo pedido ${so.id} · ${so.customer} · R$ ${so.total.toFixed(2)}`,
          'order'
        );
      } else if (roll < 0.52) {
        // Notificação push para o consumidor
        const n = generateNotification(notifSeq.current++);
        setNotifications((prev) => [n, ...prev].slice(0, 30));
        pushEvent(`Notificação: ${n.title}`, 'notification');
      } else if (roll < 0.72) {
        // Queda de preço em um produto do catálogo
        const drop = pickPriceDrop(productsRef.current);
        if (drop) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === drop.productId
                ? { ...p, price: drop.newPrice, originalPrice: p.price }
                : p
            )
          );
          setPriceDrops((prev) => ({ ...prev, [drop.productId]: drop }));
          pushEvent(
            `Queda de preço: ${drop.productName} R$ ${drop.oldPrice.toFixed(2)} → R$ ${drop.newPrice.toFixed(2)}`,
            'price'
          );
        }
      } else if (roll < 0.88) {
        // Atualização de estoque (vendas consumindo o depósito)
        const upd = pickStockUpdate(productsRef.current);
        if (upd) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === upd.productId ? { ...p, stock: upd.newStock } : p
            )
          );
          pushEvent(`Estoque: ${upd.productName} → ${upd.newStock} un`, 'stock');
        }
      } else {
        // Lojista avançando um pedido no pipeline operacional.
        // A transição é calculada FORA do updater: chamar setState dentro de
        // outro updater acontece durante a fase de render e dispara o aviso
        // "Cannot update SimulationProvider while rendering a parent".
        const candidates = storeOrdersRef.current.filter(
          (o) =>
            o.status === 'em_aberto' ||
            o.status === 'em_separacao' ||
            o.status === 'em_transporte'
        );
        const target = candidates[Math.floor(Math.random() * candidates.length)];
        const flow: Record<string, StoreOrder['status'] | null> = {
          em_aberto: 'em_separacao',
          em_separacao: 'em_transporte',
          em_transporte: 'entregue',
        };
        const nextStatus = target ? flow[target.status] : null;
        if (target && nextStatus) {
          pushEvent(
            `Pedido ${target.id} avançou para "${
              nextStatus === 'em_separacao'
                ? 'Em separação'
                : nextStatus === 'em_transporte'
                ? 'Em transporte'
                : 'Entregue'
            }"`,
            'order'
          );
          setStoreOrders((prev) =>
            prev.map((o) =>
              o.id === target.id ? { ...o, status: nextStatus, isNew: false } : o
            )
          );
        }
      }
    }, 5000 / speed);
    return () => clearInterval(interval);
  }, [speed, pushEvent]);

  // ---- Progresso de entrega GPS: pedidos ativos avançam até 100% ----
  useEffect(() => {
    const interval = setInterval(() => {
      if (!runningRef.current) return;
      const current = progressRef.current;
      const ids = Object.keys(current);
      if (ids.length === 0) return;

      let changed = false;
      const nextProgress = { ...current };
      for (const id of ids) {
        const prog = current[id];
        if (prog >= 100) continue;
        changed = true;
        const np = Math.min(100, prog + 3 + Math.random() * 7);
        nextProgress[id] = np;

        if (np >= 100) {
          const order = ordersRef.current.find((o) => o.id === id);
          setOrders((prev) =>
            prev.map((o) =>
              o.id === id
                ? {
                    ...o,
                    status: 'entregue',
                    statusLabel: 'Entregue',
                    deliveredDate: new Date().toLocaleDateString('pt-BR'),
                    trackingSteps: o.trackingSteps.map((s, i, arr) =>
                      i === arr.length - 1
                        ? { ...s, completed: true, current: false, time: 'Agora' }
                        : { ...s, completed: true, current: false }
                    ),
                  }
                : o
            )
          );
          setNotifications((prev) =>
            [
              {
                id: `sim-deliv-${Date.now()}`,
                title: 'Pedido entregue na obra',
                description: `Pedido ${id} foi entregue e conferido no endereço da obra. Carga recebida com sucesso!`,
                timeAgo: 'Agora',
                category: 'pedidos' as const,
                read: false,
                iconType: 'check' as const,
              },
              ...prev,
            ].slice(0, 30)
          );
          pushEvent(`Pedido ${id} ENTREGUE na obra`, 'delivery');
        }
      }
      if (changed) {
        progressRef.current = nextProgress;
        setDeliveryProgress(nextProgress);
      }
    }, 2000 / speed);
    return () => clearInterval(interval);
  }, [speed, pushEvent]);

  // ---- Ações ----
  const addProduct = useCallback((p: Product) => {
    setProducts((prev) => [p, ...prev]);
  }, []);

  const addOrder = useCallback((o: Order) => {
    setOrders((prev) => [o, ...prev]);
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const acceptStoreOrder = useCallback((id: string) => {
    setStoreOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: 'em_separacao', isNew: false } : o
      )
    );
    pushEvent(`Pedido ${id} aceito e em separação`, 'order');
  }, [pushEvent]);

  const advanceStoreOrder = useCallback(
    (id: string) => {
      // Transição calculada fora do updater (mesma razão do motor principal)
      const target = storeOrdersRef.current.find((o) => o.id === id);
      if (!target) return;
      const flow: Record<string, StoreOrder['status'] | null> = {
        em_aberto: 'em_separacao',
        em_separacao: 'em_transporte',
        em_transporte: 'entregue',
      };
      const nextStatus = flow[target.status];
      if (!nextStatus) return;
      pushEvent(
        `Pedido ${id} avançou manualmente para "${
          nextStatus === 'em_separacao'
            ? 'Em separação'
            : nextStatus === 'em_transporte'
            ? 'Em transporte'
            : 'Entregue'
        }"`,
        'order'
      );
      setStoreOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status: nextStatus, isNew: false } : o
        )
      );
    },
    [pushEvent]
  );

  const startDelivery = useCallback((orderId: string) => {
    progressRef.current = { ...progressRef.current, [orderId]: 35 };
    setDeliveryProgress({ ...progressRef.current });
    // Saudação do entregador assim que a rota começa
    const now = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setDriverChats((prev) =>
      prev[orderId]
        ? prev
        : {
            ...prev,
            [orderId]: [
              {
                id: `seed-${Date.now()}`,
                from: 'driver',
                text: 'Olá! Sou o Carlos, motorista responsável pela sua entrega. Já carreguei os volumes e estou saindo do depósito agora.',
                time: now,
              },
            ],
          }
    );
  }, []);

  const sendDriverMessage = useCallback(
    (orderId: string, text: string) => {
      const now = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setDriverChats((prev) => ({
        ...prev,
        [orderId]: [
          ...(prev[orderId] || []),
          { id: `m-${Date.now()}`, from: 'me', text, time: now },
        ],
      }));
      // O motorista responde após um tempo realista
      setTimeout(() => {
        const replyTime = new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });
        setDriverChats((prev) => ({
          ...prev,
          [orderId]: [
            ...(prev[orderId] || []),
            {
              id: `r-${Date.now()}`,
              from: 'driver',
              text: pickDriverReply(),
              time: replyTime,
            },
          ],
        }));
        pushEvent(`Motorista respondeu no chat do pedido ${orderId}`, 'chat');
      }, 1800 + Math.random() * 2800);
    },
    [pushEvent]
  );

  const value: SimulationContextValue = {
    running,
    speed,
    toggleRunning,
    setSpeed,
    products,
    addProduct,
    orders,
    addOrder,
    notifications,
    markAllNotificationsRead,
    storeOrders,
    acceptStoreOrder,
    advanceStoreOrder,
    priceDrops,
    deliveryProgress,
    startDelivery,
    driverChats,
    sendDriverMessage,
    events,
  };

  return (
    <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>
  );
};
