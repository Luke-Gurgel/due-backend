import mongoose from 'mongoose'
import 'src/models/user'
import 'src/models/wedding'

if (process.env.MONGODB_URL) {
	mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
}
