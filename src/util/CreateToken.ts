import jwt from 'jsonwebtoken'
import type MetaData from '../interfaces/MetaData'

const JWT_SECRET = process.env.JWT_SECRET ?? ''// nullish coalescing operator
const JWT_EXPIRATION = process.env.JWT_EXPIRATION !== '' ? process.env.JWT_EXPIRATION : ''

const createToken = (data: MetaData): string => {
  if (JWT_SECRET === null || JWT_SECRET === undefined || JWT_SECRET === '' ||
    JWT_EXPIRATION === null || JWT_EXPIRATION === undefined || JWT_EXPIRATION === '') {
    throw new Error('JWT_SECRET or JWT_EXPIRATION is not set')
  }
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRATION })
  return token
}

export default createToken
