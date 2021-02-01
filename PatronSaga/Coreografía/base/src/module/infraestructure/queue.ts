import { Channel } from 'amqplib';
import RabbitBootstrap from '../../bootstrap/rabbit.bootstrap';
import { RepositoryQueue } from '../application/repository-queue';

export class Queue implements RepositoryQueue {
	async sendMessage(message: any) {}

	async receiveMessage(consumer: any) {}
}
