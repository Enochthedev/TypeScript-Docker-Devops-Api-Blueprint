/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from 'dotenv'
import type jwt from 'jsonwebtoken'

dotenv.config()

const getEnvVariable = (name: string, defaultValue?: string): string => {
  const value = process.env[name]
  if (value == null) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    throw new Error(`Environment variable ${name} is not defined`)
  }
  return value
}

const getEnvVariableAsNumber = (name: string, defaultValue?: number): number => {
  const value = process.env[name]
  if (value == null) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    throw new Error(`Environment variable ${name} is not defined`)
  }
  const numberValue = parseInt(value, 10)
  if (isNaN(numberValue)) {
    throw new Error(`Environment variable ${name} is not a valid number`)
  }
  return numberValue
}

const Config = {
  serverPort: getEnvVariable('PORT'),
  enviroment: getEnvVariable('NODE_ENV'),
  rateLimit: {
    maximum: getEnvVariable('RATE_LIMIT_MAX') as unknown as number
  },
  Mailgun: {
    mailGunDomain: getEnvVariable('MAIL_GUN_DOMAIN'),
    mailGunApiKey: getEnvVariable('MAIL_GUN_API_KEY')
  },
  mongo: {
    url: getEnvVariable('MONGO_URL')
  },
  JWTHeader: {
    issuer: getEnvVariable('JWT_ISSUER'),
    audience: getEnvVariable('JWT_AUDIENCE'),
    algorithm: getEnvVariable('JWT_ALGORITHM') as jwt.Algorithm,
    accessTokenSecret: getEnvVariable('ACCESS_TOKEN_SECRET'),
    refreshTokenSecret: getEnvVariable('REFRESH_TOKEN_SECRET'),
    accessTokenExpiration: getEnvVariable('ACCESS_TOKEN_EXPIRATION'),
    refreshTokenExpiration: getEnvVariable('REFRESH_TOKEN_EXPIRATION')
  }
  // TokenExpiry: {
  //   accessToken: getEnvVariableAsNumber('ACCESS_TOKEN_EXPIRY'),
  //   refreshToken: getEnvVariableAsNumber('REFRESH_TOKEN_EXPIRY'),
  //   rememberMe: getEnvVariableAsNumber('REMEMBER_ME_EXPIRY')
  // },
  // Mail: {
  //   user: getEnvVariable('MAIL_USER'),
  //   password: getEnvVariable('MAIL_PASSWORD'),
  //   host: getEnvVariable('MAIL_HOST'),
  //   service: getEnvVariable('MAIL_SERVICE'),
  //   port: getEnvVariable('MAIL_PORT')
  // },
  // Cloud: {
  //   folder: getEnvVariable('CLOUDINARY_FOLDER'),
  //   name: getEnvVariable('CLOUDINARY_CLOUD_NAME'),
  //   secret: getEnvVariable('CLOUDINARY_API_SECRET'),
  //   key: getEnvVariable('CLOUDINARY_API_KEY')
  // },
  // AWS: {
  //   accessKeyId: getEnvVariable('AWS_ACCESS_KEY_ID'),
  //   bucket: getEnvVariable('AWS_BUCKET'),
  //   bucketRegion: getEnvVariable('AWS_BUCKET_REGION'),
  //   region: getEnvVariable('AWS_REGION'),
  //   secretAccessKey: getEnvVariable('AWS_SECRET_ACCESS_KEY')
  // },
  // serverBaseURL: getEnvVariable('SERVER_BASE_URL'),
  // frontendBaseURL: getEnvVariable('FRONTEND_BASE_URL'),
  // BcryptSalt: getEnvVariableAsNumber('BCRYPT_SALT')
}

export default Config
