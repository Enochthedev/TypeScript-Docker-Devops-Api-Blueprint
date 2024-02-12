import express from 'express'
import paginateMiddleware from '../middleware/paginate'
import TestController from '../controllers/testController'

const router = express.Router()

router.use(paginateMiddleware())

// Use the controller method in the route
router.get('/', TestController.getTestData)

export default router
