import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { apiRouter } from './routes';
import { standardLimiter } from './middleware/rate-limiter';
import { errorHandler } from './middleware/error';
import { checkDatabaseConnection } from './database/prisma';

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin) return callback(null, true);
    if (config.cors.origin.includes('*') || config.cors.origin.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Dev-friendly permissive
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Request logger (disabled during automated tests to avoid noisy output)
if (config.nodeEnv !== 'test') {
  app.use(morgan(config.isProduction ? 'combined' : 'dev'));
}

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Global rate limiter
app.use('/api/', standardLimiter);

// Liveness & Readiness Probes
app.get('/health', async (req: Request, res: Response) => {
  const dbOk = await checkDatabaseConnection();
  res.status(200).json({
    status: 'UP',
    name: 'TRIPORA AI Backend API',
    version: '1.0.0',
    environment: config.nodeEnv,
    uptime: Math.round(process.uptime()),
    database: dbOk ? 'CONNECTED' : 'STANDALONE_FALLBACK',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health/liveness', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.get('/health/readiness', async (req: Request, res: Response) => {
  res.status(200).json({ ready: true });
});

// Root API information
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'TRIPORA AI — Premium AI Travel Planning API',
    tagline: 'Explore More. Plan Smarter. Travel Better.',
    apiVersion: 'v1',
    documentation: '/api/v1',
    status: 'ACTIVE',
  });
});

// Mount API v1
app.use('/api/v1', apiRouter);

// 404 Catch-all
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Cannot ${req.method} ${req.originalUrl}`,
    },
  });
});

// Centralized exception handler
app.use(errorHandler);

export { app };
