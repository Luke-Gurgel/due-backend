import { Application } from 'express'
import expressLoader from './express'
import mongooseLoader from './mongoose'

export default async (app: Application): Promise<void> => {
	expressLoader(app)
	await mongooseLoader()
}
