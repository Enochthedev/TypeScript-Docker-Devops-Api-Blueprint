import ApiError from '../util/ApiError'
import httpStatus from 'http-status'
import ApiResponse from '../util/ApiResponse'

interface GetRequestPayload {
  page?: number
  limit?: number
}

class TestService {
  public async getTestService (payload: GetRequestPayload): Promise<ApiResponse<any>> {
    try {
      const page = payload.page ?? 1
      const limit = payload.limit ?? 10
      const data = {
        success: true,
        page,
        limit
      }
      return new ApiResponse(httpStatus.OK, data)
    } catch (error: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, String(error.message))
    }
  }
}

export default new TestService()
