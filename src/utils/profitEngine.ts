import { Product, ProfitSettings } from '@/types';

export const calculateSellingPrice = (
  product: Product,
  settings: ProfitSettings
): { sellingPrice: number; profit: number } => {
  let basePrice = product.basePrice;
  let profit = 0;

  // Apply category-specific or global profit
  if (settings.globalEnabled) {
    if (settings.globalType === 'fixed') {
      profit = settings.globalValue;
    } else {
      profit = Math.round(basePrice * (settings.globalValue / 100));
    }
  } else {
    // Category-specific
    if (product.category === 'premium') {
      if (settings.premiumType === 'fixed') {
        profit = settings.premiumValue;
      } else {
        profit = Math.round(basePrice * (settings.premiumValue / 100));
      }
    } else {
      if (settings.nokosType === 'fixed') {
        profit = settings.nokosValue;
      } else {
        profit = Math.round(basePrice * (settings.nokosValue / 100));
      }
    }
  }

  // Apply min/max limits
  profit = Math.max(settings.minProfit, Math.min(settings.maxProfit, profit));

  let sellingPrice = basePrice + profit;

  // Auto round
  if (settings.autoRound && settings.roundTo > 0) {
    sellingPrice = Math.ceil(sellingPrice / settings.roundTo) * settings.roundTo;
    profit = sellingPrice - basePrice;
  }

  return { sellingPrice, profit };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num);
};

export const DEFAULT_PROFIT_SETTINGS: ProfitSettings = {
  globalEnabled: true,
  globalType: 'fixed',
  globalValue: 2000,
  premiumType: 'percentage',
  premiumValue: 15,
  nokosType: 'fixed',
  nokosValue: 1000,
  autoRound: true,
  roundTo: 500,
  minProfit: 500,
  maxProfit: 50000,
};

export const DEFAULT_API_CONFIG = {
  premiumApiKey: '',
  nokosApiKey: '',
  premiumBaseUrl: 'https://premku.com/api',
  nokosBaseUrl: 'https://premku.com/api',
  rumahOtpApiKey: '',
  pakasirSlug: '',
  pakasirApiKey: '',
};
