import React, { useEffect, useRef, useState } from 'react';
import { DeviceFrame } from './components/DeviceFrame';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { SimulationDock } from './components/SimulationDock';

// Simulation
import {
  SimulationProvider,
  useSimulation,
  SimulationEvent,
} from './simulation/SimulationContext';

// Types and Mock Data
import { Product, Order, CartItem, Professional } from './types';
import {
  mockProducts,
  mockCategories,
  mockStores,
  mockProfessionals,
  mockOrders,
} from './data/mockData';

// Consumer Views
import { SplashView } from './views/SplashView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { HomeView } from './views/HomeView';
import { SearchCatalogView } from './views/SearchCatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView, CheckoutPayload } from './views/CheckoutView';
import { OrderConfirmedView } from './views/OrderConfirmedView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { OrdersListView } from './views/OrdersListView';
import { FavoritesView } from './views/FavoritesView';
import { ReviewsView } from './views/ReviewsView';
import { ProfileView } from './views/ProfileView';
import { ServicesMarketplaceView } from './views/ServicesMarketplaceView';
import { ProfessionalProfileView } from './views/ProfessionalProfileView';
import { RequestQuoteView } from './views/RequestQuoteView';
import { NotificationsView } from './views/NotificationsView';
import { HelpCenterView } from './views/HelpCenterView';
import { AboutView } from './views/AboutView';

// Lojista Views
import { BecomeSellerView } from './views/lojista/BecomeSellerView';
import { LojistaDashboardView } from './views/lojista/LojistaDashboardView';
import { LojistaProductsView } from './views/lojista/LojistaProductsView';
import { LojistaAddProductView } from './views/lojista/LojistaAddProductView';
import { LojistaOrdersView } from './views/lojista/LojistaOrdersView';
import { LojistaFinancialView } from './views/lojista/LojistaFinancialView';
import { LojistaPerformanceView } from './views/lojista/LojistaPerformanceView';
import { LojistaReviewsView } from './views/lojista/LojistaReviewsView';
import { LojistaSettingsView } from './views/lojista/LojistaSettingsView';

export default function App() {
  // Ref que permite ao AppContent (filho) registrar o handler de toast
  // para eventos da simulação emitidos pelo provedor (pai).
  const toastHandlerRef = useRef<
    ((text: string, kind: SimulationEvent['kind']) => void) | null
  >(null);

  return (
    <SimulationProvider
      onEvent={(text, kind) => toastHandlerRef.current?.(text, kind)}
    >
      <AppContent toastHandlerRef={toastHandlerRef} />
    </SimulationProvider>
  );
}

const AppContent: React.FC<{
  toastHandlerRef: React.MutableRefObject<
    ((text: string, kind: SimulationEvent['kind']) => void) | null
  >;
}> = ({ toastHandlerRef }) => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewHistory, setViewHistory] = useState<string[]>(['home']);
  const [mode, setMode] = useState<'consumer' | 'lojista'>('consumer');

  // Simulation-driven domain state
  const {
    running,
    products,
    orders,
    notifications,
    storeOrders,
    priceDrops,
    deliveryProgress,
    driverChats,
    addProduct,
    addOrder,
    markAllNotificationsRead,
    acceptStoreOrder,
    advanceStoreOrder,
    startDelivery,
    sendDriverMessage,
  } = useSimulation();

  // UI-only state
  const [selectedProductId, setSelectedProductId] = useState<string>(mockProducts[0].id);
  // Resolução ao vivo: sempre espelha o estado atual do catálogo (preço/estoque em tempo real)
  const selectedProduct =
    products.find((p) => p.id === selectedProductId) ?? mockProducts[0];
  const [selectedOrder, setSelectedOrder] = useState<Order>(mockOrders[0]);
  const [favorites, setFavorites] = useState<Product[]>([
    mockProducts[0],
    mockProducts[1],
    mockProducts[2],
  ]);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional>(
    mockProfessionals[0]
  );
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  // Cart State (pre-filled with the 4 items from the checkout screenshot)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: mockProducts[0],
      quantity: 10,
      selectedSeller: mockProducts[0].seller,
    },
    {
      product: mockProducts[1],
      quantity: 500,
      selectedSeller: mockProducts[1].seller,
    },
    {
      product: mockProducts[2],
      quantity: 15,
      selectedSeller: mockProducts[2].seller,
    },
    {
      product: mockProducts[3],
      quantity: 2,
      selectedSeller: mockProducts[3].seller,
    },
  ]);

  // Carrinho espelhado com dados ao vivo do catálogo (preço e estoque atualizados)
  const liveCartItems = cartItems.map((ci) => ({
    ...ci,
    product: products.find((p) => p.id === ci.product.id) ?? ci.product,
  }));

  // Favoritos espelhados com dados ao vivo (quedas de preço aparecem na hora)
  const liveFavorites = favorites.map(
    (f) => products.find((p) => p.id === f.id) ?? f
  );

  // Pedido selecionado espelhado ao vivo (simulação marca como entregue em tempo real)
  const liveSelectedOrder =
    orders.find((o) => o.id === selectedOrder.id) ?? selectedOrder;

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    // 6s: tempo suficiente para ler o toast durante a demo
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  // Registra o handler de eventos da simulação: só "tosta" eventos importantes
  useEffect(() => {
    toastHandlerRef.current = (text, kind) => {
      if (kind === 'order' || kind === 'delivery' || kind === 'price') {
        showToast(text);
      }
    };
    return () => {
      toastHandlerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigation handlers
  const navigateTo = (view: string) => {
    setViewHistory((prev) => [...prev, view]);
    setCurrentView(view);
    if (view.startsWith('lojista-') || view === 'become-seller') {
      setMode('lojista');
    }
  };

  const handleBack = () => {
    if (viewHistory.length > 1) {
      const nextHistory = [...viewHistory];
      nextHistory.pop();
      const prevView = nextHistory[nextHistory.length - 1];
      setViewHistory(nextHistory);
      setCurrentView(prevView);
    } else {
      navigateTo('home');
    }
  };

  const handleToggleMode = () => {
    if (mode === 'consumer') {
      setMode('lojista');
      navigateTo('lojista-dashboard');
    } else {
      setMode('consumer');
      navigateTo('home');
    }
  };

  // Cart actions
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedSeller: product.seller,
        },
      ];
    });
    showToast(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removido do carrinho');
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    navigateTo('checkout');
  };

  // Favorites
  const handleToggleFavorite = (product: Product) => {
    const isFav = favorites.some((f) => f.id === product.id);
    if (isFav) {
      setFavorites((prev) => prev.filter((f) => f.id !== product.id));
      showToast('Item removido dos favoritos');
    } else {
      setFavorites((prev) => [...prev, product]);
      showToast('Item adicionado aos favoritos!');
    }
  };

  // Order Completed — recebe o payload real do checkout (totais, descontos, pagamento)
  const handleFinishOrder = (payload: CheckoutPayload) => {
    const liveItems = cartItems.map((ci) => ({
      ...ci,
      product: products.find((p) => p.id === ci.product.id) ?? ci.product,
    }));
    const discount =
      payload.offerDiscount + payload.pixDiscount + payload.couponDiscount;
    const now = new Date();
    const timeNow = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    const newOrder: Order = {
      id: `#OBR-${Math.floor(100000 + Math.random() * 900000)}`,
      date:
        now.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }) +
        ` às ${now.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })}`,
      total: payload.total,
      itemsCount: liveItems.reduce((acc, it) => acc + it.quantity, 0),
      status: 'em_transporte',
      statusLabel: 'Em rota',
      deliveryAddress: payload.deliveryAddress,
      deliveryForecast: payload.deliveryForecast,
      storeName: 'ConstróiMais Materiais',
      paymentMethod: payload.paymentMethodLabel,
      deliveryFee: payload.deliveryFee,
      discount,
      driver: {
        name: 'Carlos Silva',
        vehiclePlate: 'OBR-1234 (Fiorino Furgão)',
        phone: '(85) 9 9123-4567',
      },
      items: liveItems.map((ci, idx) => ({
        id: String(idx + 1),
        name: ci.product.name,
        quantity: ci.quantity,
        unitPrice: ci.product.price,
        totalPrice: ci.product.price * ci.quantity,
        imageUrl: ci.product.imageUrl,
      })),
      trackingSteps: [
        {
          title: 'Pedido realizado',
          subtitle: payload.couponCode
            ? `Cupom ${payload.couponCode} aplicado na compra`
            : 'Pedido registrado na ConstróiMais',
          time: timeNow,
          completed: true,
          current: false,
        },
        {
          title: 'Pagamento aprovado',
          subtitle: `${payload.paymentMethodLabel} aprovado instantaneamente`,
          time: timeNow,
          completed: true,
          current: false,
        },
        {
          title: 'Pedido em separação',
          subtitle: 'Itens conferidos e embalados pela loja',
          time: timeNow,
          completed: true,
          current: false,
        },
        {
          title: 'Saiu para entrega',
          subtitle: 'Motorista Carlos Silva com Fiorino OBR-1234',
          time: timeNow,
          completed: true,
          current: true,
        },
        {
          title: 'Entregue no endereço',
          subtitle: `Previsão: ${payload.deliveryForecast}`,
          time: `Previsão ${payload.deliveryForecast}`,
          completed: false,
          current: false,
        },
      ],
    };

    addOrder(newOrder);
    setSelectedOrder(newOrder);
    setCartItems([]);
    // Liga o rastreamento GPS simulado: o caminhão anda até a obra em tempo real
    startDelivery(newOrder.id);
    navigateTo('order-confirmed');
  };

  // Add Product from Lojista Wizard
  const handleLojistaProductAdded = (newProdData: Partial<Product>) => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newProdData.name || 'Novo Produto',
      subtitle: newProdData.subtitle || 'Unidade',
      category: newProdData.category || 'Materiais Básicos',
      categorySlug: 'materiais-basicos',
      brand: newProdData.brand || 'ConstróiMais',
      sku: newProdData.sku || `SKU-${Date.now()}`,
      price: newProdData.price || 49.9,
      stock: newProdData.stock || 50,
      rating: 5.0,
      reviewsCount: 1,
      imageUrl:
        newProdData.imageUrl ||
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
      ],
      seller: {
        name: 'ConstróiMais Materiais',
        distanceKm: 2.3,
        rating: 4.8,
        reviewsCount: 1200,
        deliveryType: 'Entrega rápida',
        city: 'Fortaleza - CE',
      },
      specifications: {
        Unidade: 'Unidade',
        Garantia: '3 meses',
      },
      description:
        newProdData.description ||
        'Produto de excelente qualidade cadastrado pelo lojista ConstróiMais.',
      features: ['Pronta entrega', 'Garantia de fábrica'],
      status: 'active',
      salesCount: 0,
      viewsCount: 1,
    };

    addProduct(newProd);
    showToast(`Produto "${newProd.name}" cadastrado com sucesso!`);
    navigateTo('lojista-products');
  };

  // Render the current active screen
  const renderScreen = () => {
    switch (currentView) {
      case 'splash':
        return (
          <SplashView
            onStart={() => navigateTo('home')}
            onLogin={() => navigateTo('login')}
          />
        );

      case 'login':
        return (
          <LoginView
            onLoginSuccess={() => navigateTo('home')}
            onGoToRegister={() => navigateTo('register')}
            onBack={handleBack}
          />
        );

      case 'register':
        return (
          <RegisterView
            onRegisterSuccess={() => navigateTo('home')}
            onGoToLogin={() => navigateTo('login')}
          />
        );

      case 'home':
        return (
          <HomeView
            onSearchClick={() => {
              setSearchInitialQuery('');
              navigateTo('search-catalog');
            }}
            onProductClick={(p) => {
              setSelectedProductId(p.id);
              navigateTo('product-detail');
            }}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onNavigateCategory={(slug) => {
              setSearchInitialQuery(slug);
              navigateTo('search-catalog');
            }}
            onNavigateServices={() => navigateTo('services')}
            onNavigateOffers={() => {
              setSearchInitialQuery('ofertas');
              navigateTo('search-catalog');
            }}
            featuredProducts={products}
            nearbyStores={mockStores}
          />
        );

      case 'search-catalog':
      case 'search-results':
        return (
          <SearchCatalogView
            initialQuery={currentView === 'search-results' ? 'cimento' : searchInitialQuery}
            onProductClick={(p) => {
              setSelectedProductId(p.id);
              navigateTo('product-detail');
            }}
            onAddToCart={(p, q) => handleAddToCart(p, q)}
            allProducts={products}
            categories={mockCategories}
          />
        );

      case 'product-detail':
        return (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={(p, q) => handleAddToCart(p, q)}
            onBuyNow={(p, q) => handleBuyNow(p, q)}
            onSelectRelated={(p) => {
              setSelectedProductId(p.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            relatedProducts={products.filter((p) => p.id !== selectedProduct.id).slice(0, 4)}
            onBack={handleBack}
          />
        );

      case 'checkout':
        return (
          <CheckoutView
            cartItems={liveCartItems}
            onFinishOrder={handleFinishOrder}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveCartItem={handleRemoveCartItem}
            onContinueShopping={() => navigateTo('search-catalog')}
          />
        );

      case 'order-confirmed':
        return (
          <OrderConfirmedView
            order={liveSelectedOrder}
            onTrackOrder={() => navigateTo('order-tracking')}
            onBuyAgain={() => {
              cartItems.length === 0 &&
                setCartItems(
                  liveSelectedOrder.items.map((it) => ({
                    product:
                      products.find((p) => p.name === it.name) || products[0],
                    quantity: it.quantity,
                    selectedSeller: products[0].seller,
                  }))
                );
              navigateTo('checkout');
            }}
            onGoHome={() => navigateTo('home')}
            onOpenHelp={() => navigateTo('help-center')}
          />
        );

      case 'order-tracking':
        return (
          <OrderTrackingView
            order={liveSelectedOrder}
            progress={deliveryProgress[liveSelectedOrder.id]}
            chatMessages={driverChats[liveSelectedOrder.id] || []}
            onSendMessage={(text) => sendDriverMessage(liveSelectedOrder.id, text)}
            onCallDriver={() => showToast('Ligando para Carlos Silva: (85) 9 9123-4567')}
            onChatDriver={() => showToast('Abrindo chat com entregador...')}
            onOpenHelp={() => navigateTo('help-center')}
          />
        );

      case 'orders':
        return (
          <OrdersListView
            orders={orders}
            onSelectOrder={(ord) => {
              setSelectedOrder(ord);
              navigateTo('order-confirmed');
            }}
            onTrackOrder={(ord) => {
              setSelectedOrder(ord);
              navigateTo('order-tracking');
            }}
            onBuyAgain={(ord) => {
              setSelectedOrder(ord);
              showToast('Itens adicionados para nova compra!');
              navigateTo('checkout');
            }}
            onGoToFavorites={() => navigateTo('favorites')}
          />
        );

      case 'favorites':
        return (
          <FavoritesView
            favoriteProducts={liveFavorites}
            priceDrops={priceDrops}
            onProductClick={(p) => {
              setSelectedProductId(p.id);
              navigateTo('product-detail');
            }}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onRemoveFavorite={(id) => {
              setFavorites((prev) => prev.filter((f) => f.id !== id));
              showToast('Item removido dos favoritos');
            }}
            onActivateNotifications={() => navigateTo('notifications')}
          />
        );

      case 'reviews':
        return <ReviewsView />;

      case 'profile':
        return (
          <ProfileView
            onNavigateHelp={() => navigateTo('help-center')}
            onNavigateNotifications={() => navigateTo('notifications')}
            onNavigateAbout={() => navigateTo('about')}
            onLogout={() => {
              showToast('Você saiu da sua conta');
              navigateTo('login');
            }}
            onSwitchToLojista={() => {
              setMode('lojista');
              navigateTo('lojista-dashboard');
            }}
          />
        );

      case 'services':
        return (
          <ServicesMarketplaceView
            professionals={mockProfessionals}
            onSelectProfessional={(pro) => {
              setSelectedProfessional(pro);
              navigateTo('professional-profile');
            }}
            onRequestQuote={() => navigateTo('request-quote')}
          />
        );

      case 'professional-profile':
        return (
          <ProfessionalProfileView
            professional={selectedProfessional}
            onRequestQuote={() => navigateTo('request-quote')}
            onChat={() => showToast(`Iniciando conversa com ${selectedProfessional.name}...`)}
            onBack={handleBack}
          />
        );

      case 'request-quote':
        return (
          <RequestQuoteView
            onSuccess={() => {
              showToast('Orçamento enviado para os profissionais da sua região!');
              navigateTo('services');
            }}
            onBack={handleBack}
          />
        );

      case 'notifications':
        return (
          <NotificationsView
            notifications={notifications}
            onMarkAllRead={() => {
              markAllNotificationsRead();
              showToast('Todas as notificações foram marcadas como lidas');
            }}
            onSelectNotification={(notif) => {
              if (notif.category === 'pedidos') {
                navigateTo('orders');
              } else if (notif.category === 'ofertas') {
                navigateTo('search-catalog');
              }
            }}
          />
        );

      case 'help-center':
        return <HelpCenterView onBack={handleBack} />;

      case 'about':
        return (
          <AboutView
            onRegisterClick={() => {
              setMode('lojista');
              navigateTo('become-seller');
            }}
          />
        );

      // LOJISTA SCREENS
      case 'become-seller':
        return (
          <BecomeSellerView
            onStartRegistration={() => navigateTo('lojista-dashboard')}
            onGoToDashboard={() => navigateTo('lojista-dashboard')}
          />
        );

      case 'lojista-dashboard':
        return (
          <LojistaDashboardView
            recentOrders={storeOrders}
            allStoreOrders={storeOrders}
            onNavigateAddProduct={() => navigateTo('lojista-add-product')}
            onNavigateProducts={() => navigateTo('lojista-products')}
            onNavigateOrders={() => navigateTo('lojista-orders')}
            onNavigatePerformance={() => navigateTo('lojista-performance')}
            onNavigateFinancial={() => navigateTo('lojista-financial')}
            onNavigateSettings={() => navigateTo('lojista-settings')}
            onNavigateReviews={() => navigateTo('lojista-reviews')}
            onSwitchToConsumer={() => {
              setMode('consumer');
              navigateTo('home');
            }}
          />
        );

      case 'lojista-products':
        return (
          <LojistaProductsView
            products={products}
            onAddNewProduct={() => navigateTo('lojista-add-product')}
            onEditProduct={(p) => {
              setSelectedProductId(p.id);
              showToast(`Editando produto: ${p.name}`);
            }}
          />
        );

      case 'lojista-add-product':
        return (
          <LojistaAddProductView
            onSuccess={handleLojistaProductAdded}
            onCancel={() => navigateTo('lojista-products')}
          />
        );

      case 'lojista-orders':
        return (
          <LojistaOrdersView
            orders={storeOrders}
            onAcceptOrder={acceptStoreOrder}
            onAdvanceOrder={advanceStoreOrder}
          />
        );

      case 'lojista-financial':
        return <LojistaFinancialView />;

      case 'lojista-performance':
        return <LojistaPerformanceView />;

      case 'lojista-reviews':
        return <LojistaReviewsView />;

      case 'lojista-settings':
        return <LojistaSettingsView />;

      default:
        return (
          <HomeView
            onSearchClick={() => navigateTo('search-catalog')}
            onProductClick={(p) => {
              setSelectedProductId(p.id);
              navigateTo('product-detail');
            }}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onNavigateCategory={(slug) => {
              setSearchInitialQuery(slug);
              navigateTo('search-catalog');
            }}
            onNavigateServices={() => navigateTo('services')}
            onNavigateOffers={() => navigateTo('search-catalog')}
            featuredProducts={products}
            nearbyStores={mockStores}
          />
        );
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  // Espelha o carrinho com preços ao vivo no badge do header
  const cartTotal = liveCartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <DeviceFrame
      currentView={currentView}
      onNavigate={navigateTo}
      mode={mode}
      onToggleMode={handleToggleMode}
    >
      {/* Dynamic Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        canGoBack={viewHistory.length > 1 && currentView !== 'home'}
        onBack={handleBack}
        cartCount={totalCartCount}
        unreadNotifsCount={unreadNotifsCount}
        mode={mode}
        onToggleMode={handleToggleMode}
        locationCity="Fortaleza - CE"
        locationStreet="Aldeota"
        onOpenLocationModal={() => showToast('Local de entrega: Aldeota, Fortaleza - CE')}
      />

      {/* Simulation live indicator in header area */}
      <div className="flex justify-end px-3 -mt-0 relative z-30 pointer-events-none">
        <span
          className={`pointer-events-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
            running
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              running ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'
            }`}
          />
          {running ? 'Simulação ativa' : 'Simulação pausada'}
        </span>
      </div>

      {/* Floating Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl border border-blue-500/40 flex items-center gap-2 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Body */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {renderScreen()}
      </div>

      {/* Persistent Bottom Tab Bar */}
      <BottomNavigation
        currentView={currentView}
        onNavigate={navigateTo}
        mode={mode}
        favoritesCount={favorites.length}
      />

      {/* Floating Simulation Control Dock */}
      <SimulationDock />
    </DeviceFrame>
  );
};
