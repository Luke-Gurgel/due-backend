import App from 'src/app'
import User from 'src/models/user'
import Wedding from 'src/models/wedding'
import Guest from 'src/models/guest'

export const app = new App().app

export const clearDB = async (): Promise<void> => {
	await User.deleteMany(null)
	await Wedding.deleteMany(null)
	await Guest.deleteMany(null)
}
