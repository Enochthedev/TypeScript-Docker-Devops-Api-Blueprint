import { Router } from 'express'
import TestRoute from './testRoute'
import UserRoute from './userRoute'
import AuthRoute from './authRoute'

const router = Router()

router.use('/test', TestRoute)
router.use('/user', UserRoute)
router.use('/auth', AuthRoute)
// router.use('/review', ReviewRoute)
// router.use('/admin', AdminRoute)

export default router
