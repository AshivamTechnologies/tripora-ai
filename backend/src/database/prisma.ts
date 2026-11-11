import { PrismaClient } from '@prisma/client';
import { config } from '../config';

let prisma: PrismaClient | null = null;
let isDbConnected = false;

if (config.database.url) {
  try {
    prisma = new PrismaClient({
      log: config.isProduction ? ['error'] : ['warn', 'error'],
    });
  } catch (err) {
    console.warn('[Database] Prisma Client initialization failed, fallback will be used:', err);
  }
}

export async function checkDatabaseConnection(): Promise<boolean> {
  if (!prisma) return false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    isDbConnected = true;
    return true;
  } catch (err) {
    isDbConnected = false;
    return false;
  }
}

export { prisma, isDbConnected };
