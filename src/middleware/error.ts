import httpStatus from 'http-status'
import mongoose from 'mongoose'
// import config from '../../../mainService/src/config/config';
import ApiError from '../util/ApiError'
import Config from '../configs/Config'
import { type NextFunction, type Request, type Response } from 'express'

const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      (error.statusCode !== undefined && error.statusCode !== null && error.statusCode !== 0)
        ? error.statusCode
        : (error instanceof mongoose.Error
            ? httpStatus.BAD_REQUEST
            : httpStatus.INTERNAL_SERVER_ERROR)
    const message = error.message ?? (httpStatus[statusCode] ?? 'Unknown error')
    error = new ApiError(Number(statusCode), message as string, false, error.stack as string)
  }
  next(error)
}

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let { statusCode, message } = err
  if (Config.enviroment === 'prod' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR].toString()
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(Config.enviroment === 'dev' && { stack: err.stack })
  }

  res.status(statusCode).send(response)
}

const Forbidden = (message: string): ApiError => new ApiError(httpStatus.FORBIDDEN, message)

export {
  errorConverter,
  errorHandler,
  Forbidden
}
