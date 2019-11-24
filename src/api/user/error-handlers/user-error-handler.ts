import { Response } from 'express'

export default class UserErrorHandler {
	private response: Response

	constructor(error: Error, response: Response) {
		this.response = response
		this.handleError(error)
	}

	private handleError(error: Error): Response | void {
		if (error.message) {
			const [message, statusCode] = error.message.split(':')
			const parsedCode = parseInt(statusCode)
			if (!isNaN(parsedCode)) {
				return this.response.status(parsedCode).send({ error: message })
			}
		}

		this.response.status(500).send({ error })
	}
}
