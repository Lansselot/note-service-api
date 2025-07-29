import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

export default redis;
