import express from 'express'
import * as dotEnv from 'dotenv'
import router from './routes/routes.Config'
import cors from 'cors'
import { errorConverter, errorHandler } from './middleware/error'
import { rateLimit } from 'express-rate-limit'

const app = express()
const port = process.env.PORT !== '' ? process.env.PORT : '5000'

dotEnv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
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
})
