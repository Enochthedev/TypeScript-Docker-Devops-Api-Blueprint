import { type Response, type NextFunction } from 'express'
import TestService from '../services/testService'
import type CustomRequest from '../util/CustomRequest'

class TestController {
  public async getTestData (req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      // Extract pagination information from the request object
      const { page, limit } = req.pagination ?? { page: 1, limit: 10 }

      // Call the service method to get the data
      const response = await TestService.getAllUserService({ page, limit })

      // Send the response to the client
      res.status(response.status).json(response)
    } catch (error) {
      // Handle errors
      next(error)
    }
  }
}

export default new TestController()
