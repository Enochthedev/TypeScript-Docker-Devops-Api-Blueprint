import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import ApiError from '../util/ApiError'

const JWT_SECRET = process.env.JWT_SECRET !== '' ? process.env.JWT_SECRET : ''

interface CustomRequest extends Request {
  userData?: any
}

const authMiddleware = (
  req: CustomRequest,
  _: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (token === null || token === undefined || token === '') {
      throw new ApiError(Number(httpStatus.UNAUTHORIZED), 'Missing token')
    }
    // check if JWT SECRET is set
    if (JWT_SECRET === '' || JWT_SECRET === undefined) {
      throw new ApiError(Number(httpStatus.UNAUTHORIZED), 'JWT secret is not set')
    }
    const decoded = jwt.verify(token, JWT_SECRET) as Record<string, any>
    req.userData = decoded
    next()
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      throw new ApiError(Number(httpStatus.UNAUTHORIZED), 'Jwt expired')
    }
    throw new ApiError(Number(httpStatus.UNAUTHORIZED), 'Auth Failed')
  }
}

export default authMiddleware
