import express, { Request, Response } from 'express';
import { AuthBuilder, AuthEntity } from '../domain/auth.entity';
import { Errors } from '../../helpers/errors.helper';
import { Repository } from '../application/repository';
import { Operation } from './operation';
import { UseCase } from '../application/usecase';

const router = express.Router();

const operation: Repository = new Operation();
const useCase: UseCase = new UseCase(operation);

router.post(
	'/login',
	Errors.asyncError(async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const authEntity: AuthEntity = new AuthBuilder()
			.addEmail(email)
			.addPassword(password);

		const result = await useCase.login(authEntity);
		if (result) {
			res.json({ token: result });
		} else {
			res.status(409).send('Credentials are invalid');
		}
	})
);

router.get(
	'/validate-token/:token',
	Errors.asyncError(async (req: Request, res: Response) => {
		const { token } = req.params;

		const result = useCase.validateToken(token);
		if (result) {
			res.json({ status: 200, message: 'Token valid' });
		} else {
			res.status(401).json({ status: 401, message: 'Token invalid' });
		}
	})
);

export { router };
