import express from 'express'
import paginateMiddleware from '../middleware/paginate'
import AsyncHandler from '../util/AsyncHandler'
import AuthController from '../services/auth/auth.controller'

const router = express.Router()

router.use(paginateMiddleware())

const authController = new AuthController()

router.post('/login', AsyncHandler(authController.login.bind(AuthController)))
router.post('/signup', AsyncHandler(authController.signup.bind(AuthController)))
router.post('/refreshToken', AsyncHandler(authController.refreshToken.bind(AuthController)))

export default router
