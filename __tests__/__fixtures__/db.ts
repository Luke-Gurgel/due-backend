import User from 'src/models/user'
import { Wedding } from 'src/models/wedding'
import { userOne, userTwo, userThree } from './users'
import { weddingOne, weddingTwo, weddingThree } from './weddings'

export const setupDB = async (): Promise<void> => {
	await Wedding.deleteMany(null)
	await User.deleteMany(null)
	await new User(userOne).save()
	await new User(userTwo).save()
	await new User(userThree).save()
	await new Wedding(weddingOne).save()
	await new Wedding(weddingTwo).save()
	await new Wedding(weddingThree).save()
}

export const clearDB = async (): Promise<void> => {
	await Wedding.deleteMany(null)
	await User.deleteMany(null)
}
