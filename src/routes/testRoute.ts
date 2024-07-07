import express from 'express'
import paginateMiddleware from '../middleware/paginate'
import TestController from '../controllers/testController'
import AsyncHandler from '../util/AsyncHandler'

const router = express.Router()

router.use(paginateMiddleware())

// Use the controller method in the route
router.get('/', AsyncHandler(TestController.getTestData.bind(TestController)))
router.get('/upTime', AsyncHandler(TestController.getUpTime.bind(TestController)))

export default router
