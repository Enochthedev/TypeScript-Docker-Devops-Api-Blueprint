import ApiError from '../util/ApiError'
import httpStatus from 'http-status'
import ApiResponse from '../util/ApiResponse'
import Success from '../util/SuccessResponse'

// interface GetRequestPayload {
// }// this is a valid place holder for the request payload, you can change it to match your request payload

const staticData = [
  { id: 1, username: 'admin', role: 'admin' },
  { id: 2, username: 'john_doe', role: 'user' },
  { id: 3, username: 'jane_doe', role: 'user' },
  { id: 4, username: 'joe_doe', role: 'user' },
  { id: 5, username: 'jake_doe', role: 'user' },
  { id: 6, username: 'jim_doe', role: 'user' },
  { id: 7, username: 'jerry_doe', role: 'user' },
  { id: 8, username: 'jill_doe', role: 'user' },
  { id: 9, username: 'jessie_doe', role: 'user' },
  { id: 10, username: 'josh_doe', role: 'user' },
  { id: 11, username: 'jason_doe', role: 'user' },
  { id: 12, username: 'jimmy_doe', role: 'user' },
  // write 5 more data here
  { id: 13, username: 'jimmy_doe', role: 'user' },
  { id: 14, username: 'jimmy_doe', role: 'user' },
  { id: 15, username: 'jimmy_doe', role: 'user' },
  { id: 16, username: 'jimmy_doe', role: 'user' },
  { id: 17, username: 'jimmy_doe', role: 'user' }

]// remove this line after implementing the service, this is just a placeholder for the data and so you can see the response format and tests

class TestService {
  public async getAllUserService (payload: any): Promise<ApiResponse<any>> {
    try {
      const data = staticData
      return new ApiResponse(httpStatus.OK, Success(data))
    } catch (error: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', true)
    }
  }

//   public async getTestServiceById (id: number): Promise
}

export default new TestService()
