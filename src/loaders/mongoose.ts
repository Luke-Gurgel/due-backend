import mongoose, { Connection } from 'mongoose'

export default async (): Promise<Connection | void> => {
	if (!process.env.MONGODB_URL) {
		return console.log('Missing mongodb url env variable')
	}

	const connection = await mongoose.connect(process.env.MONGODB_URL, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})

	return connection.connection
}
