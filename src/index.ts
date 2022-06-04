import { RedisService } from "./services/redis.service"
import express from 'express'
const indexRoute = require('./router/router')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', indexRoute);
const port = process.env.PORT || 3000;

RedisService.connect(() => console.log('Connected to redis on', process.env.REDIS_URL));
app.listen(port, () => console.log(`Running on port ${port}`))