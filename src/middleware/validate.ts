import Joi from 'joi'
import httpStatus from 'http-status'
import pick from '../util/Pick'
import { type Request, type Response, type NextFunction } from 'express'
import ApiError from '../util/ApiError'

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema: Record<string, any> = pick(schema, ['params', 'query', 'body'])
  const object = pick(req, Object.keys(validSchema))
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object)

  if (error !== null && error !== undefined) {
    const errorMessage: string = error.details.map((details: any) => details.message).join(', ')
    next(new ApiError(Number(httpStatus.BAD_REQUEST), errorMessage))
    return
  }
  Object.assign(req, value)
  next()
}

export default validate
