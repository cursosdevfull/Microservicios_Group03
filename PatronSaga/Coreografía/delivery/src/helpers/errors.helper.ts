import { NextFunction, Request, Response } from 'express';
/* import yenv from "yenv"
const env = yenv()
env.NODE_ENV="development" */

export interface IError extends Error {
	status?: number;
}

export class Errors {
	static asyncError(
		ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>
	) {
		return (req: Request, res: Response, next: NextFunction) =>
			ftn(req, res, next).catch(err => {
				let error: IError;

				if (err.code) {
					error = new Error('Database error');
					error.status = 500;
					error.message = err.name;
					error.stack = err;
				} else {
					error = new Error('Async Error');
					error.status = err.status;
					error.message = err.message;
					error.stack = err.stack;
				}
				// res.status(500).json({ status: 500, err });
				next(error);
			});
	}

	static pathNotFoundError(req: Request, res: Response, next: NextFunction) {
		// res.status(404).json({ status: 404, message: "Path not found" });
		const err: IError = new Error('Path not found');
		err.status = 404;
		next(err);
	}

	static genericError(
		err: IError,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const objError: IError = {
			name: err.name,
			status: err.status,
			message: err.message,
		};
		console.log(process.env.NODE_ENV);
		if (process.env.NODE_ENV === 'development') {
			objError.stack = err.stack;
		}

		res.status(err.status).json(objError);
	}
}
