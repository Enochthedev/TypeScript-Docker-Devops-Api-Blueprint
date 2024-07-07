import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Config from '../configs/Config'
import httpStatus from 'http-status'
import ApiError from '../util/ApiError'

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

    const decoded = jwt.verify(token, Config.JWTHeader.accessTokenSecret) as Record<string, any>
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
