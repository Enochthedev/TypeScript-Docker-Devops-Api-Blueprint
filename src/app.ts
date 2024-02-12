import express from 'express'
import * as dotEnv from 'dotenv'
import router from './routes/routes.Config'
import cors from 'cors'
import { errorConverter, errorHandler } from './middleware/error'
import { rateLimit } from 'express-rate-limit'

const app = express()
dotEnv.config()
const port = (process.env.PORT != null) ? parseInt(process.env.PORT, 10) : 5000
// console.log(port)
const max = process.env.RateLimitMax !== undefined ? parseInt(process.env.RateLimitMax) : 100

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again later.'
})

app.use(cors())

app.use(router, limiter)

app.use(errorConverter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`ductape-apps-api application is running on port ${port}.`)
  console.log(`Environment is set to ${process.env.NODE_ENV}.`)
  console.log(`Localhost address is http://localhost:${port}.`)
  console.log(`Rate limit is set to ${max} requests per 15 minutes.`)
  console.log('Press Ctrl+C to quit.')
})
