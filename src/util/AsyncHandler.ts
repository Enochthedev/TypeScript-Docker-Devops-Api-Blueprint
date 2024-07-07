import { type Request, type Response, type NextFunction } from 'express'

// Utility function to handle async errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

export default asyncHandler
