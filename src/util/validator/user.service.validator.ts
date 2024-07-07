import Joi from 'joi'

export const createUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string(),
  userType: Joi.string().valid('CRITIC', 'VIEWER').default('VIEWER')
}).options({
  // Exclude unknown keys (e.g., confirmPassword) from the validated value
  stripUnknown: true
})

export const getUsersValidator = Joi.object({
  // give query parameters
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  userName: Joi.string().optional(),
  userType: Joi.string().valid('CRITIC', 'VIEWER').optional()
})//

export const getUserByIdValidator = Joi.object({
  userId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/).messages({
    'string.pattern.base': 'Invalid user ID format'
  })
})

export const checkUserNameValidator = Joi.object({
  userName: Joi.string().required()
})
