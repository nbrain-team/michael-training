import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

let prisma: PrismaClient;

export const connectDatabase = async (): Promise<void> => {
  try {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
    
    await prisma.$connect();
    
    logger.info('✅ PostgreSQL connected successfully via Prisma');
  } catch (error) {
    logger.error('❌ PostgreSQL connection error:', error);
    throw error;
  }
};

export const getPrismaClient = (): PrismaClient => {
  if (!prisma) {
    throw new Error('Database not initialized. Call connectDatabase() first.');
  }
  return prisma;
};

export const disconnectDatabase = async (): Promise<void> => {
  if (prisma) {
    await prisma.$disconnect();
    logger.info('PostgreSQL disconnected');
  }
}; 