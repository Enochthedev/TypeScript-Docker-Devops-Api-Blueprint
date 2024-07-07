import express from 'express'
import * as dotEnv from 'dotenv'
import router from './routes/routes.Config'
import cors from 'cors'
import helmet from 'helmet'
import { errorConverter, errorHandler } from './middleware/error'
import { rateLimit } from 'express-rate-limit'
import { connectDB } from './configs/dbConfig'
import Config from './configs/Config'

const app = express()
dotEnv.config()

void connectDB()

// console.log(port)
const max = Config.rateLimit.maximum

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again later.'
})

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    'X-Requested-With',
    'Content-Type, Authorization',
    'Access-Control-Allow-Headers',
    'at',
    'rt'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.options('*', cors(corsOptions))
app.use(router, limiter)
app.use(helmet())
app.use(errorConverter)
app.use(errorHandler)

app.listen(Config.serverPort, () => {
  console.log(`ductape-apps-api application is running on port ${Config.serverPort}.`)
  console.log(`Environment is set to ${Config.enviroment}.`)
  console.log(`Localhost address is http://localhost:${Config.serverPort}.`)
  console.log(`Rate limit is set to ${Config.rateLimit.maximum} requests per 15 minutes.`)
  console.log('Press Ctrl+C to quit.')
  // log jwt secret and expiration
  console.log()
})
