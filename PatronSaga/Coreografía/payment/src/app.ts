import express from 'express';
import { Errors } from './helpers/errors.helper';
import { Repository } from './module/application/repository';
import { RepositoryQueue } from './module/application/repository-queue';
import { UseCase } from './module/application/usecase';
import { Operation } from './module/infraestructure/operation';
import { Queue } from './module/infraestructure/queue';

const app = express();

const operation: Repository = new Operation();
const queue: RepositoryQueue = new Queue();
const useCase: UseCase = new UseCase(operation, queue);

useCase.receiveMessages();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req, res) => res.send('I am alive'));

app.use(Errors.pathNotFoundError);

app.use(Errors.genericError);

export default app;
