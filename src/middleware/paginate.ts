import { type Response, type NextFunction } from 'express'
import type CustomRequest from '../util/CustomRequest'

interface PaginationOptions {
  defaultPage?: number
  defaultLimit?: number
}

const paginateMiddleware = (options: PaginationOptions = {}): ((req: CustomRequest, res: Response, next: NextFunction) => void) => {
  const { defaultPage = 1, defaultLimit = 10 } = options

  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    const pageQueryParam = req.query.page as string | undefined
    const limitQueryParam = req.query.limit as string | undefined

    const page = pageQueryParam !== undefined ? parseInt(pageQueryParam, 10) : defaultPage
    const limit = limitQueryParam !== undefined ? parseInt(limitQueryParam, 10) : defaultLimit

    // Attach pagination properties to the request object
    req.pagination = { page, limit }

    next()
  }
}

export default paginateMiddleware
