import User from 'src/models/user'
import UserDAL from '../data-access/user-dal'
import Publisher from 'src/pub-sub/publisher'
import ImageHandlingService from 'src/services/image'
import {
	AppEvent,
	CreateUserDto,
	CreateUserPayload,
	LoginUserDto,
	LoginUserPayload,
	LogoutUserDto,
	UpdateUserDto,
	UpdateUserPayload,
	UserUpdateValidFields,
} from 'src/types'

export default class UserService extends Publisher {
	public static async createUser(userDto: CreateUserDto): Promise<CreateUserPayload> {
		const newUser = new User(userDto)
		await newUser.save()
		const token = await newUser.generateJwt()

		this.publish(AppEvent.USER_SIGNUP, newUser)

		return { token, user: newUser }
	}

	public static async loginUser({ email, password }: LoginUserDto): Promise<LoginUserPayload> {
		const user = await UserDAL.findByCredentials(email, password)
		const token = await user.generateJwt()
		return { user, token }
	}

	public static async logoutUser({ user, token, allDevices }: LogoutUserDto): Promise<void> {
		allDevices ? (user.tokens = []) : (user.tokens = user.tokens.filter(tok => tok.token !== token))
		await user.save()
	}

	public static async updateUser({
		user,
		fields,
		avatar,
	}: UpdateUserDto): Promise<UpdateUserPayload> {
		if (avatar) {
			user.avatar = await ImageHandlingService.handleUserAvatar(avatar)
		}

		for (const key in fields) {
			const field = key as keyof UserUpdateValidFields
			user.set(field, fields[field], { strict: 'throw' })
		}

		await user.save()
		return { user }
	}
}
