import express, { Application, Router } from 'express'
import userRouter from 'src/api/user/routes/user-router'
import weddingRouter from 'src/api/wedding/routes/wedding-router'

export default (app: Application): void => {
	app.get('/status', (_, res) => res.status(200).send({ hello: 'hi' }))
	app.head('/status', (_, res) => res.status(200).end())

	app.use(express.json())

	const rootRouter = Router()
	rootRouter.use(userRouter)
	rootRouter.use(weddingRouter)

	app.use(rootRouter)
}
