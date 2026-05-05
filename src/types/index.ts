export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  duration?: string;
  features: string[];
  icon: string;
  stock: number;
  apiEndpoint?: string;
}

export interface Transaction {
  id: string;
  productId: string;
  productName: string;
  category: string;
  basePrice: number;
  sellingPrice: number;
  profit: number;
  paymentMethod: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: Date;
  customerEmail?: string;
  orderId?: string;
}

export interface ProfitSettings {
  globalEnabled: boolean;
  globalType: 'fixed' | 'percentage';
  globalValue: number;
  premiumType: 'fixed' | 'percentage';
  premiumValue: number;
  nokosType: 'fixed' | 'percentage';
  nokosValue: number;
  autoRound: boolean;
  roundTo: number;
  minProfit: number;
  maxProfit: number;
}

export interface ApiConfig {
  premiumApiKey: string;
  nokosApiKey: string;
  premiumBaseUrl: string;
  nokosBaseUrl: string;
  rumahOtpApiKey: string;
  pakasirSlug: string;
  pakasirApiKey: string;
}

export interface PakasirTransaction {
  project: string;
  order_id: string;
  amount: number;
  fee: number;
  total_payment: number;
  payment_method: string;
  payment_number: string;
  expired_at: string;
}

export interface RumahOtpPrice {
  country: string;
  app: string;
  price: number;
  stock: number;
}

export interface RumahOtpPriceMap {
  [key: string]: RumahOtpPrice; // key format: "country_app" e.g. "ID_whatsapp"
}

export interface StockMap {
  [productId: string]: number;
}

export interface CustomPriceMap {
  [productId: string]: number | null; // null means use profit engine calculation
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export const NOKOS_COUNTRIES = [
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
];

export const NOKOS_APPS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬' },
  { id: 'telegram', name: 'Telegram', icon: '✈️' },
  { id: 'capcut', name: 'CapCut', icon: '🎬' },
  { id: 'alight', name: 'Alight Motion', icon: '✨' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵' },
  { id: 'instagram', name: 'Instagram', icon: '📸' },
  { id: 'twitter', name: 'Twitter/X', icon: '🐦' },
  { id: 'discord', name: 'Discord', icon: '🎮' },
  { id: 'spotify', name: 'Spotify', icon: '🎧' },
  { id: 'netflix', name: 'Netflix', icon: '🎬' },
];

export const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS', icon: '📱' },
  { id: 'dana', name: 'Dana', icon: '💳' },
  { id: 'ovo', name: 'OVO', icon: '💜' },
  { id: 'gopay', name: 'GoPay', icon: '💚' },
];
