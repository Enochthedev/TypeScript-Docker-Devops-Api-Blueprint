import { User, type IUser } from '../../services/user/user.model'
import userService from '../user/user.service'
import { type IUserdata } from '../../interfaces/users/user.interface'
import { createUserValidator } from '../../util/validator/user.service.validator'
import ApiError from '../../util/ApiError'
import type Metadata from '../../interfaces/MetaData'
import TokenService from '../../util/CreateToken'
import ApiResponse from '../../util/ApiResponse'
import { type ValidationError } from '../../util/ValidationError'
import { type LoginResponse, type SignupResponse } from '../../interfaces/auth/auth.response.interface'
import { loginValidator } from '../../util/validator/auth.service.validator'
import { type JwtPayload } from 'jsonwebtoken'
import { TokenType } from '../../interfaces/auth/token.interface'
import { type CreateUserResponse } from '../../interfaces/users/user.response.interface'
import Config from '../../configs/Config'

const authService = {
  /**
     * @method login
     * @async
     * @returns {Promise<ApiResponse<LoginResponse>>}
     * @param {Object} reqBody
     */
  login: async (reqBody: any): Promise<ApiResponse<LoginResponse>> => {
    try {
      // Validate user data using loginValidator
      await loginValidator.validateAsync(reqBody)

      // Check if user exists
      const user: IUser | null = (await User.findOne({ email: reqBody.email }))

      if (user == null) {
        throw new ApiError(400, 'User not found')
      }

      // Check if password matches and return error if it doesn't
      const isMatch = await user.matchPasswords(reqBody.password as string)
      if (!isMatch) {
        throw new ApiError(400, 'Invalid credentials')
      }

      // Assign metadata
      const metadata: Metadata = {
        userId: user.id.toString(),
        username: user.userName,
        role: user.userType
      }
      // assign Iusrdata to user
      const userdata: IUserdata = {
        userId: user.id.toString(),
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        isActive: user.isActive
      }

      // Generate JWT token
      const token = await TokenService.generateJWT(metadata as JwtPayload, TokenType.ACCESS)
      const refreshToken = await TokenService.generateJWT(metadata as JwtPayload, TokenType.REFRESH)
      // Return success response with token and user object
      return new ApiResponse(200, {
        message: 'User logged in successfully',
        token,
        refreshToken,
        userdata
      })
    } catch (error) {
      if (Config.enviroment === 'local') {
        console.log(error)
      }
      const validationError = error as ValidationError

      if (validationError === null || validationError === undefined) {
        throw new Error('Validation error occurred')
      }

      throw new ApiError(400, validationError.message)
    }
  },
  signup: async (reqBody: any): Promise<ApiResponse<SignupResponse>> => {
    try {
      // Validate user data using createUserValidator
      await createUserValidator.validateAsync(reqBody)

      // Delegate the creation to createUser method
      const response: ApiResponse<CreateUserResponse> = await userService.createUser(reqBody)

      return new ApiResponse<SignupResponse>(201, {
        message: response.data.message,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        user: response.data.user
      })
    } catch (error) {
      console.error(error)
      const validationError = error as ValidationError

      if (validationError == null) {
        throw new Error('Validation error occurred')
      }

      if ((validationError.isJoi ?? false) && (validationError.details != null)) {
        throw new ApiError(400, validationError.details[0].message)
      }

      if (error instanceof ApiError) {
        throw error
      }

      // Fallback for other types of errors
      throw new ApiError(500, 'Internal server error')
    }
  },
  refreshAccessToken: async (refreshToken: string): Promise<ApiResponse<{ token: string }>> => {
    try {
      const decoded = await TokenService.verifyJWT(refreshToken, TokenType.REFRESH)
      const metadata: Metadata = { userId: decoded.userId, username: decoded.username as string, role: decoded.role as string }
      const newAccessToken = await TokenService.generateJWT(metadata as JwtPayload, TokenType.ACCESS)
      return new ApiResponse(200, { token: newAccessToken })
    } catch (error) {
      if (Config.enviroment === 'local') {
        console.error(error)
      }
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(500, 'Internal server error')
    }
  }

}
export default authService
