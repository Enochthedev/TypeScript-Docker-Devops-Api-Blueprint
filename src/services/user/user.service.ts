import { User } from './user.model'
import { type IUserdata } from '../../interfaces/users/user.interface'
import ApiError from '../../util/ApiError'
import type Metadata from '../../interfaces/MetaData'
import TokenService from '../../util/CreateToken'
import ApiResponse from '../../util/ApiResponse'
import { createUserValidator, checkUserNameValidator, getUsersValidator } from '../../util/validator/user.service.validator'
import { type CreateUserResponse, type GetUserResponse, type GetUserByIdResponse, type CheckUserNameResponse } from '../../interfaces/users/user.response.interface'
import { type ValidationError } from '../../util/ValidationError'
import { type JwtPayload } from 'jsonwebtoken'
import { TokenType } from '../../interfaces/auth/token.interface'

// define the user data that should be passed out as a response

const userService = {
  /**
   * @method createUser
   * @async
   * @returns {Promise<ApiResponse<CreateUserResponse>>}
   */
  createUser: async (reqBody: any): Promise<ApiResponse<CreateUserResponse>> => {
    try {
      // Validate user data using createUserValidator
      await createUserValidator.validateAsync(reqBody)

      // Check for existing email and username in a single query
      const existingUser = await User.findOne({
        $or: [{ email: reqBody.email }]
      })

      if (existingUser != null) {
        if (existingUser.email === reqBody.email) {
          const existingField = 'email'
          throw new ApiError(400, `User with ${existingField} already exists`)
        }
      }

      // check if username is null or undefined and use firstnameLastname as username
      if (reqBody.userName == null || reqBody.userName === undefined) {
        reqBody.userName = `${reqBody.firstName}${reqBody.lastName}`
        // use check username validator to validate username
        let usernameAvailable = false
        while (!usernameAvailable) {
          const existingUsername = await User.findOne({ userName: reqBody.userName })
          if (existingUsername == null) {
            usernameAvailable = true
          } else {
            reqBody.userName = `${reqBody.userName}${Math.floor(Math.random() * 1000)}`
          }
        }
      }

      const user = new User(reqBody)

      // Save the user in the database
      const savedUser = await user.save()

      // metadata for token
      const metadata: Metadata = {
        userId: user.id.toString(),
        username: user.userName,
        role: user.userType
      }

      // Generate JWT token
      const token = await TokenService.generateJWT(metadata as JwtPayload, TokenType.ACCESS)
      const refreshToken = await TokenService.generateJWT(metadata as JwtPayload, TokenType.REFRESH)

      const userObject: IUserdata = {
        userId: savedUser.id.toString(),
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        userName: savedUser.userName,
        userType: savedUser.userType,
        isActive: savedUser.isActive
      }
      // Return success response with token and user object
      return new ApiResponse(201, {
        message: 'User created successfully',
        token,
        refreshToken,
        user: userObject
      })
    } catch (error) {
      console.error(error)
      const validationError = error as ValidationError

      if (validationError === null || validationError === undefined) {
        throw new Error('Validation error occurred')
      }
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (validationError && (validationError.isJoi ?? false) && (validationError.details != null)) {
        throw new ApiError(400, validationError.details[0].message)
      }

      if (error instanceof ApiError) {
        throw error
      }

      // Handle case where validationError may be null or undefined

      // Fallback for other types of errors
      throw new ApiError(500, 'Internal server error')
    }
  },
  /**
   * @method getUser
   * @async
   * @returns {Promise<ApiResponse<GetUserResponse>>}
   */
  getUsers: async (reqBody: any): Promise<ApiResponse<GetUserResponse>> => {
    try {
      // Validate user data using getUserValidator
      await getUsersValidator.validateAsync(reqBody)

      // query parameters
      const { page = 1, limit = 10, firstName, lastName, email, userName, userType } = reqBody

      // Build query object dynamically
      const query: any = {}

      if (firstName !== undefined) {
        query.firstName = firstName
      }
      if (lastName !== undefined) {
        query.lastName = lastName
      }
      if (email !== undefined) {
        query.email = email
      }
      if (userName !== undefined) {
        query.userName = userName
      }
      if (userType !== undefined) {
        query.userType = userType
      }

      // get users, use query params to filter
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const users = await User.find(query)
        .skip((page - 1) * limit)
        .limit(limit as number) // limit the number of users returned

      const mappedUsers: IUserdata[] = users.map(user => ({
        userId: user.id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        userType: user.userType,
        isActive: user.isActive
      }))
      // if the amount of users is zero return response saying no users gotten (not error)
      if (mappedUsers.length === 0) {
        return new ApiResponse(200, {
          message: 'No users found',
          users: mappedUsers
        })
      }

      // Return success response with users
      return new ApiResponse(200, {
        message: 'Users retrieved successfully',
        users: mappedUsers
      })
    } catch (error) {
      console.error(error)
      const validationError = error as ValidationError

      if (validationError === null || validationError === undefined) {
        throw new Error('Validation error occurred')
      }
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (validationError && validationError.isJoi && validationError.details) {
        throw new ApiError(400, validationError.details[0].message)
      }

      if (error instanceof ApiError) {
        throw error
      }

      // Handle case where validationError may be null or undefined

      // Fallback for other types of errors
      throw new ApiError(500, 'Internal server error')
    }
  },
  /**
   * @method checkUserName
   * @async
   * @returns {Promise<ApiResponse<CheckUserNameResponse>>}
   *
   */
  checkUserName: async (reqBody: any): Promise<ApiResponse<CheckUserNameResponse>> => {
    try {
      // Validate user data using checkUserNameValidator
      await checkUserNameValidator.validateAsync(reqBody)

      // Find user by username
      const user = await User.findOne({ userName: reqBody.userName })

      // if user is not found, return 404 error
      if (user == null) {
        return new ApiResponse(200, {
          available: true
        })
      }
      // Return success response with user
      return new ApiResponse(200, {
        available: false
      })
    } catch (error) {
      console.error(error)
      const validationError = error as ValidationError

      if (validationError === null || validationError === undefined) {
        throw new Error('Validation error occurred')
      }
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (validationError && validationError.isJoi && validationError.details) {
        throw new ApiError(400, validationError.details[0].message)
      }

      if (error instanceof ApiError) {
        throw error
      }

      // Handle case where validationError may be null or undefined

      // Fallback for other types of errors
      throw new ApiError(500, 'Internal server error')
    }
  },
  /**
   * @method getUserById
   * @async
   * @returns {Promise<ApiResponse<GetUserByIdResponse>>}
   */

  getUserById: async (reqBody: any): Promise<ApiResponse<GetUserByIdResponse>> => {
    try {
      // Validate user data using getUserByIdValidator

      // await getUserByIdValidator.validateAsync(reqBody.params.userId)
      // console.log(reqBody.params.userId)
      // // Find user by ID
      // const user = await User.findById(reqBody.params.userId)
      // if (user == null) {
      //   throw new ApiError(404, 'User not found')
      // }

      // const userObject: IUser = {
      //   userId: user.id.toString(),
      //   email: user.email,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   userName: user.userName,
      //   userType: user.userType,
      //   isActive: user.isActive
      // }

      // // Return success response with user
      return new ApiResponse(102, {
        message: 'api in progresss',
        user: []
      })
    } catch (error) {
      console.error(error)
      const validationError = error as ValidationError

      if (validationError === null || validationError === undefined) {
        throw new Error('Validation error occurred')
      }
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (validationError && validationError.isJoi && validationError.details) {
        throw new ApiError(400, validationError.details[0].message)
      }

      if (error instanceof ApiError) {
        throw error
      }

      // Handle case where validationError may be null or undefined

      // Fallback for other types of errors
      throw new ApiError(500, 'Internal server error')
    }
  }
}

export default userService
