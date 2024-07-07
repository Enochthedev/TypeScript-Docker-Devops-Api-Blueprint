import express from 'express'
import paginateMiddleware from '../middleware/paginate'
import UserController from '../services/user/user.controller'
import AsyncHandler from '../util/AsyncHandler'

const router = express.Router()
router.use(paginateMiddleware())

const userController = new UserController()

router.post('/create', AsyncHandler(userController.createUser.bind(userController)))
router.get('/', AsyncHandler(userController.getUsers.bind(userController)))
router.get('/:userId', AsyncHandler(userController.getUserById.bind(userController)))
router.post('/check/', AsyncHandler(userController.checkUserName.bind(userController)))

export default router
