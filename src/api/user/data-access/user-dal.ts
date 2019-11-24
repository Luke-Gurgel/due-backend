import bcrypt from 'bcryptjs'
import User from 'src/models/user'
import { UserDoc } from 'src/types'

export default class UserDAL {
	public static async isEmailTaken(email: string): Promise<boolean> {
		const user = await User.findOne({ email })
		return user !== null
	}

	public static async findByCredentials(email: string, password: string): Promise<UserDoc> {
		const user = await User.findOne({ email })
		if (!user) throw Error('Unable to log in:400')

		const passwordsMatch = await bcrypt.compare(password, user.password)
		if (!passwordsMatch) throw Error('Unable to log in:400')

		return user
	}
}
