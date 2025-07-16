import { createClient } from 'redis';
import { logger } from '../utils/logger';

let redisClient: any = null;

export const initRedis = async () => {
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    logger.warn('No REDIS_URL provided, using in-memory cache');
    return null;
  }

  try {
    redisClient = createClient({
      url: redisUrl
    });

    redisClient.on('error', (err: any) => {
      logger.error('Redis Client Error', err);
    });

    await redisClient.connect();
    logger.info('✅ Redis connected successfully');
    return redisClient;
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    return null;
  }
};

export const getRedisClient = () => redisClient; 