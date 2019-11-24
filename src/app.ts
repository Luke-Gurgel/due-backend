import express, { Application } from 'express'
import loaders from './loaders'

export default class App {
	public app: Application

	constructor() {
		this.app = express()
		this.configure()
	}

	private async configure(): Promise<void> {
		await loaders(this.app)
	}

	public startServer(): void {
		this.app.listen(process.env.PORT, () => {
			console.log('server running on port ' + process.env.PORT)
		})
	}
}
