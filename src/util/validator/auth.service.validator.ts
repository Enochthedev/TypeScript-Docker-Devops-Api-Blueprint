import Joi from 'joi'
import { createUserValidator } from './user.service.validator'

export const loginValidator = Joi.object({
  email: Joi.string().email(),
  username: Joi.string(),
  password: Joi.string().required()
}).xor('email', 'username')

export const signupValidator = createUserValidator

export const create2FAValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}).required()

export const verify2FAValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  code: Joi.string().required()
}).required()

export const resetPasswordValidator = Joi.object({
  email: Joi.string().email().required()
}).required()

export const changePasswordValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  newPassword: Joi.string().required()
}).required()
