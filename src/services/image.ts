import sharp from 'sharp'

export default class ImageHandlingService {
	public static async resizeImage(
		image: Buffer | string,
		width: number,
		height: number,
	): Promise<Buffer> {
		const buffer = await sharp(image)
			.resize(width, height)
			.png()
			.toBuffer()

		return buffer
	}
}
