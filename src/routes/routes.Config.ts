import { Router } from 'express'
import TestRoute from './testRoute'

const router = Router()

router.use('/test', TestRoute)

export default router
