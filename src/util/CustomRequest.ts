import { type Request } from 'express'

interface CustomRequest extends Request {
  pagination?: {
    page: number
    limit: number
  }
}

export default CustomRequest
