import User from 'src/models/user'
import { Wedding } from 'src/models/wedding'

export const clearDB = async (): Promise<void> => {
	await Wedding.deleteMany(null)
	await User.deleteMany(null)
}
