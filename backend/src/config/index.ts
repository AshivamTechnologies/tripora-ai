import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  jwt: {
    secret: process.env.JWT_SECRET || 'tripora-super-secure-jwt-secret-key-2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'tripora-super-secure-refresh-jwt-secret-key-2026',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'https://localhost:3000', '*'],
  },
  ai: {
    provider: (process.env.AI_PROVIDER || 'GEMINI').toUpperCase(), // 'GEMINI' | 'OPENAI' | 'MOCK'
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.AI_MODEL || 'gemini-1.5-flash',
  },
  external: {
    amadeusClientId: process.env.AMADEUS_CLIENT_ID || '',
    amadeusClientSecret: process.env.AMADEUS_CLIENT_SECRET || '',
    openWeatherApiKey: process.env.OPENWEATHER_API_KEY || '',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
};
