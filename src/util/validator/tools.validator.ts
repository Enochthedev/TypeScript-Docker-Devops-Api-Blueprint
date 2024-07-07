import Joi from 'joi'

export const SendMail = Joi.object({
  senderAddress: Joi.string().required(),
  mailSubject: Joi.string().required(),
  message: Joi.string().required()
})
