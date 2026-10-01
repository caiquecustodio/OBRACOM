export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  categorySlug: string;
  brand: string;
  sku: string;
  price: number;
  originalPrice?: number;
  pixDiscountPercent?: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  images: string[];
  seller: {
    name: string;
    distanceKm: number;
    rating: number;
    reviewsCount: number;
    deliveryType: string;
    city: string;
  };
  specifications: Record<string, string>;
  description: string;
  features: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  hasOffer?: boolean;
  status?: 'active' | 'paused' | 'out_of_stock' | 'review';
  salesCount?: number;
  viewsCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSeller?: Product['seller'];
}

export interface Store {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  deliveryType: string;
  deliveryFee?: number;
  imageUrl: string;
  city: string;
  address: string;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewsCount: number;
  city: string;
  maxDistanceKm: number;
  isVerified: boolean;
  isAvailable: boolean;
  yearsExperience: number;
  completedJobs: number;
  workingHours: string;
  about: string;
  categories: string[];
  servicesOffered: { title: string; priceStarting?: number }[];
  certifications: string[];
  portfolioImages: string[];
  reviews: { author: string; date: string; rating: number; comment: string }[];
  avatarUrl: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl: string;
}

export interface Order {
  id: string; // e.g. "#OBR254789"
  date: string;
  total: number;
  itemsCount: number;
  status: 'entregue' | 'em_transporte' | 'em_separacao' | 'aguardando_pagamento' | 'cancelado';
  statusLabel: string;
  items: OrderItem[];
  deliveryAddress: string;
  deliveryForecast?: string;
  deliveredDate?: string;
  driver?: {
    name: string;
    vehiclePlate: string;
    phone: string;
  };
  trackingSteps: {
    title: string;
    subtitle: string;
    time: string;
    completed: boolean;
    current?: boolean;
  }[];
  paymentMethod: string;
  deliveryFee: number;
  discount: number;
  storeName: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  category: 'pedidos' | 'ofertas' | 'novidades' | 'sistema';
  read: boolean;
  actionText?: string;
  iconType: 'truck' | 'check' | 'package' | 'tag' | 'star' | 'store' | 'settings' | 'file';
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  count?: number;
  color?: string;
}

// ---- Simulation-shared types ----

export interface StoreOrder {
  id: string;
  customer: string;
  city: string;
  date: string;
  itemsCount: number;
  total: number;
  paymentMethod: string;
  status: 'em_aberto' | 'em_separacao' | 'em_transporte' | 'entregue' | 'cancelado';
  thumbUrl: string;
  itemSummary: string;
  isNew?: boolean;
}

export interface ChatMessage {
  id: string;
  from: 'me' | 'driver';
  text: string;
  time: string;
}

export interface PriceDropInfo {
  productId: string;
  productName: string;
  oldPrice: number;
  newPrice: number;
  at: number;
}
