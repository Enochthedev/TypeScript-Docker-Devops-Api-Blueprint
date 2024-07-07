export interface ValidationError extends Error {
  isJoi?: boolean
  details?: Array<{ message: string }>
}
