import sharp from 'sharp'

export default class ImageHandlingService {
	public static async handleUserAvatar(avatar: Express.Multer.File): Promise<Buffer> {
		const buffer = await sharp(avatar.buffer)
			.resize(80, 80)
			.png()
			.toBuffer()

		return buffer
	}
}
