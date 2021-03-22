import express, { Request, Response } from 'express';
import { OrderBuilder, OrderEntity } from '../domain/order.entity';
import { Errors } from '../../helpers/errors.helper';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from '../application/repository';
import { Operation } from './operation';
import { UseCase } from '../application/usecase';
import { RepositoryQueue } from '../application/repository-queue';
import { Queue } from './queue';

const router = express.Router();

const operation: Repository = new Operation();
const queue: RepositoryQueue = new Queue();
const useCase: UseCase = new UseCase(operation, queue);

useCase.receiveMessages();

router.post(
	'/',
	Errors.asyncError(async (req: Request, res: Response) => {
		const { name, itemCount } = req.body;
		const transaction = uuidv4();

		const orderEntity: OrderEntity = new OrderBuilder()
			.addName(name)
			.addItemCount(itemCount)
			.addTransaction(transaction)
			.addStatus('PENDING');

		const result = await useCase.insert(orderEntity);
		res.json(result);
	})
);

router.get(
	'/',
	Errors.asyncError(async (req: Request, res: Response) => {
		const { name, itemCount } = req.body;
		const transaction = uuidv4();

		const orderEntity: OrderEntity = new OrderBuilder()
			.addName(name)
			.addItemCount(itemCount)
			.addTransaction(transaction)
			.addStatus('PENDING');

		const result = await useCase.insert(orderEntity);
		res.json(result);
	})
);

export { router };
