export interface LoginResponse {
  message: string
  token: string
  refreshToken: string
  user?: any
}

export interface SignupResponse {
  message: string
  token: string
  refreshToken: string
  user?: any
}

export interface Create2FAResponse {
  message: string
  secret: string
}
