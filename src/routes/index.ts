import { Router } from 'express'
import userRouter from './user'
import weddingRouter from './wedding'

const rootRouter = Router()

rootRouter.use(userRouter)
rootRouter.use(weddingRouter)

export default rootRouter
