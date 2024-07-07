import { type NextFunction, type Request, type Response } from 'express'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Types } from 'mongoose'
import userService from './user.service'
import ApiError from '../../util/ApiError'

class UserController {
  private readonly userService: typeof userService

  constructor () {
    this.userService = userService
  }

  /**
   * @method createUser
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.userService.createUser(req.body)
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
   * @method getUsers
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.userService.getUsers(req.body)
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
   * @method getUserById
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.userService.getUserById(req.params.userId)
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
   * @method checkUserName
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public checkUserName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.userService.checkUserName(req.body)
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

export default UserController
