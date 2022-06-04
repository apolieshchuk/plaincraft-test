import { PayloadDto } from "../dto/payload.dto";
import * as crypto from "crypto";

export class GeneratorService {
  static generatePayload(): PayloadDto {
    return {
      name: GeneratorService.randomString(20),
      description: GeneratorService.randomString(100),
      createdAt: new Date()
    }
  }

  private static randomString(chars: number) {
    return crypto.randomBytes(chars / 2).toString('hex');
  }
}