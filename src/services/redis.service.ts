import * as redis from 'redis'
import { PayloadDto } from "../dto/payload.dto";

export class RedisService {
  static client: redis.RedisClientType
  static hashKey = 'hashKey'

  static connect(cb: () => void): redis.RedisClientType {
    // If client not exists already, create it
    if (!RedisService.client) {
      RedisService.client = redis.createClient({
        url: process.env.REDIS_URL
      })
    }

    // Connect to db
    RedisService.client.connect().then(cb);
    return RedisService.client
  }

  static async set(key: string, payload: PayloadDto): Promise<PayloadDto> {
    await RedisService.client.hSet(RedisService.hashKey, key, JSON.stringify(payload))
    return payload
  }

  static async get(key: string): Promise<PayloadDto> {
    const value = await RedisService.client.hGet(RedisService.hashKey, key);
    return JSON.parse(value)
  }

  static async getAll(): Promise<string[]> {
    return RedisService.client.hKeys(RedisService.hashKey)
  }

  static async delete(key: string): Promise<number> {
    return RedisService.client.hDel(RedisService.hashKey, key);
  }

  static async deleteAll(): Promise<number> {
    return RedisService.client.del(RedisService.hashKey);
  }
}