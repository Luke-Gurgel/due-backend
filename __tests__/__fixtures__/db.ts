import User from 'src/models/user'
import { Wedding, Guest } from 'src/models/wedding'

export const clearDB = async (): Promise<void> => {
	await User.deleteMany(null)
	await Wedding.deleteMany(null)
	await Guest.deleteMany(null)
}
