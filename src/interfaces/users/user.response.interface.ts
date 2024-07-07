import { type IUserdata } from './user.interface'

export interface CreateUserResponse {
  message: string
  token: string
  refreshToken: string
  user?: any
}

export interface GetUserResponse {
  message: string
  users: IUserdata[]
}

export interface GetUserByIdResponse {
  // returns a single user
  user: any
}

export interface CheckUserNameResponse {
  // returns true if username is available
  available: boolean
}
