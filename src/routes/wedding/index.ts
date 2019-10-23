import { Router } from 'express'
import { createWedding } from './create'
import { auth } from 'src/middlewares'

const weddingRouter = Router()

weddingRouter.route('/wedding/create').post(auth, createWedding)

export default weddingRouter
