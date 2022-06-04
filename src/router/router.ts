"use strict";
import express, { Response, Request } from 'express';
import { RedisService } from "../services/redis.service";
import bodyValidation from "../middleware/body-validator.middleware";
import { PayloadDto } from "../dto/payload.dto";
import {GeneratorService} from "../services/generator.service";
let router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let data: string[] = await RedisService.getAll()
  res.status(200).send({ status: 'ok', data })
})

router.get('/:key', async (req: Request, res: Response) => {
  let data: PayloadDto = await RedisService.get(req.params.key)

  if (data) {
    // If cache already exists: log and return exists cache
    console.log('cache hit')
  } else {
    // If cache doesn't exist: log, generate new hash for key and return it
    console.log('cache miss')
    const payload = GeneratorService.generatePayload();
    data = await RedisService.set(req.params.key, payload)
  }

  res.status(200).send({ status: 'ok', data })
})

router.post('/:key', bodyValidation(PayloadDto), async (req: Request, res: Response) => {
  const { body, params } = req;
  const data = await RedisService.set(params.key, body)
  res.status(200).send({ status: 'ok', data })
})

router.delete('/', async (req: Request, res: Response) => {
  await RedisService.deleteAll()
  res.status(200).send({ status: 'ok' })
})

router.delete('/:key', async (req: Request, res: Response) => {
  await RedisService.delete(req.params.key)
  res.status(200).send({ status: 'ok' })
})

module.exports = router;