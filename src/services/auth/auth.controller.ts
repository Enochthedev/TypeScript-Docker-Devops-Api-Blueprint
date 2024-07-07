import { type NextFunction, type Request, type Response } from 'express'
import ApiError from '../../util/ApiError'
import authService from './auth.service'

class AuthController {
  private readonly authService: typeof authService
  static login: any

  constructor () {
    this.authService = authService
  }

  /**
   * @method login
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   * @description Logs in a user
   */
  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.login(req.body)
      res.status(result.status).json(result.data)
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ status: error.status, message: error.message })
      } else {
        next(error)
      }
    }
  }

  /**
   * @method signup
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   * @description Registers a new user
   */
  public signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.signup(req.body)
      res.status(result.status).json(result.data)
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ status: error.status, message: error.message })
      } else {
        next(error)
      }
    }
  }

  /**
   * @method refreshToken
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   * @description Refreshes a user's token
   */
  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.refreshAccessToken(req.body.refreshToken as string)
      res.status(result.status).json(result.data)
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ status: error.status, message: error.message })
      } else {
        next(error)
      }
    }
  }
}

export default AuthController
