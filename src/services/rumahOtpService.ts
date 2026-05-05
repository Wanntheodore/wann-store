import { RumahOtpPrice, RumahOtpPriceMap } from '@/types';

const RUMAHOTP_BASE_URL = 'https://api.rumahotp.id';

export interface RumahOtpPriceResponse {
  success: boolean;
  data?: {
    country: string;
    operator: string;
    price: number;
    stock: number;
  }[];
  message?: string;
}

/**
 * Fetch prices from RumahOTP API
 * Note: This is a frontend implementation and API key is exposed (not recommended for production)
 */
export const fetchRumahOtpPrices = async (apiKey: string): Promise<RumahOtpPriceMap> => {
  if (!apiKey) {
    console.warn('RumahOTP API key not configured');
    return {};
  }

  try {
    // Note: This is a simulated response since we don't have actual API access
    // In production, you would call the actual RumahOTP API endpoint
    const response = await fetch(`${RUMAHOTP_BASE_URL}/api/v1/prices`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // If API fails, return mock data for demo purposes
      console.warn('RumahOTP API request failed, using fallback prices');
      return getFallbackPrices();
    }

    const data: RumahOtpPriceResponse = await response.json();
    
    if (!data.success || !data.data) {
      return getFallbackPrices();
    }

    const priceMap: RumahOtpPriceMap = {};
    data.data.forEach(item => {
      const key = `${item.country}_${item.operator}`;
      priceMap[key] = {
        country: item.country,
        app: item.operator,
        price: item.price,
        stock: item.stock,
      };
    });

    return priceMap;
  } catch (error) {
    console.error('Error fetching RumahOTP prices:', error);
    return getFallbackPrices();
  }
};

/**
 * Get price for specific country and app combination
 */
export const getRumahOtpPrice = (
  priceMap: RumahOtpPriceMap,
  country: string,
  app: string
): RumahOtpPrice | null => {
  const key = `${country}_${app}`;
  return priceMap[key] || null;
};

/**
 * Fallback prices when API is unavailable
 * These are example prices in IDR
 */
const getFallbackPrices = (): RumahOtpPriceMap => {
  const countries = ['ID', 'US', 'RU', 'UK', 'DE', 'FR', 'JP', 'KR', 'IN', 'BR'];
  const apps = ['whatsapp', 'telegram', 'capcut', 'alight', 'tiktok', 'instagram', 'twitter', 'discord', 'spotify', 'netflix'];
  
  const basePrices: { [key: string]: number } = {
    'ID': 2000,
    'US': 8000,
    'RU': 3500,
    'UK': 7500,
    'DE': 7000,
    'FR': 6500,
    'JP': 9000,
    'KR': 8500,
    'IN': 2500,
    'BR': 4000,
  };

  const appMultipliers: { [key: string]: number } = {
    'whatsapp': 1.2,
    'telegram': 1.0,
    'capcut': 0.8,
    'alight': 0.8,
    'tiktok': 1.5,
    'instagram': 1.3,
    'twitter': 1.1,
    'discord': 0.9,
    'spotify': 1.0,
    'netflix': 1.4,
  };

  const priceMap: RumahOtpPriceMap = {};

  countries.forEach(country => {
    apps.forEach(app => {
      const basePrice = basePrices[country] || 5000;
      const multiplier = appMultipliers[app] || 1.0;
      const price = Math.round(basePrice * multiplier / 100) * 100; // Round to nearest 100
      
      const key = `${country}_${app}`;
      priceMap[key] = {
        country,
        app,
        price,
        stock: Math.floor(Math.random() * 50) + 10,
      };
    });
  });

  return priceMap;
};

/**
 * Format price for display
 */
export const formatRumahOtpPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
