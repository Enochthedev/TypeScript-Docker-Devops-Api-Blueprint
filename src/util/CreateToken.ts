import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken'
import Config from '../configs/Config'
import { Forbidden } from '../middleware/error'
import { TokenType } from '../interfaces/auth/token.interface'

const TokenService = {
  generateJWT: async (data: JwtPayload, type: TokenType): Promise<string> => {
    const secret =
      type === TokenType.REFRESH
        ? Config.JWTHeader.refreshTokenSecret
        : Config.JWTHeader.accessTokenSecret

    const expiresIn =
      type === TokenType.REFRESH
        ? Config.JWTHeader.refreshTokenExpiration
        : Config.JWTHeader.accessTokenExpiration

    const token = jwt.sign(data, secret, { expiresIn } satisfies SignOptions)
    return token
  },
  async verifyJWT (token: string, type: TokenType): Promise<JwtPayload> {
    if (token.length === 0) {
      throw Forbidden('Invalid or expired token')
    }

    const secret: string =
      type === TokenType.REFRESH
        ? Config.JWTHeader.refreshTokenSecret
        : Config.JWTHeader.accessTokenSecret

    try {
      const decoded = jwt.verify(token, secret) as JwtPayload

      if (((decoded?.sub) == null) || typeof decoded.role !== 'string' || ((decoded.exp != null) && Date.now() >= decoded.exp * 1000)) {
        throw Forbidden('Invalid or expired token')
      }

      return decoded
    } catch (error) {
      throw Forbidden('Invalid or expired token')
    }
  }
  /**
   * remaining tokens will go here
   * list
   * 2fa token generation
   * 2fa token verification
   * magiclink token generation
   * magiclink token verification
   * password reset token generation
   * password reset token verification
   */

}

export default TokenService
