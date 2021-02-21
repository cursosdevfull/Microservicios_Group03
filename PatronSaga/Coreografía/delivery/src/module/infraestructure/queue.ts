import { Channel } from 'amqplib';
import RabbitBootstrap from '../../bootstrap/rabbit.bootstrap';
import { RepositoryQueue } from '../application/repository-queue';

export class Queue implements RepositoryQueue {
	async sendMessage(message: any) {
		const channel: Channel = RabbitBootstrap.getChannel();
		const messageAsString = JSON.stringify(message);

		const queueName = 'ORDER_DELIVERED_EVENT';
		await channel.assertQueue(queueName, { durable: true });

		channel.sendToQueue(queueName, Buffer.from(messageAsString));
	}

	async receiveMessage(consumer: any) {
		const channel: Channel = RabbitBootstrap.getChannel();

		// Procesamiento de mensajes provenientes de la cola ORDER_DELIVERED_EVENT
		const queueName = 'ORDER_PREPARED_EVENT';
		await channel.assertQueue(queueName, { durable: true });

		channel.consume(queueName, message => consumer(channel, message), {
			noAck: false,
		});

		// Procesamiento de mensajes de error provenientes del intercambiador FAILED_ERROR_EXCHANGE
		/* 		const exchangeName = 'FAILED_ERROR_EXCHANGE';
		await channel.assertExchange(exchangeName, 'topic', { durable: true });

		const routingKey = '*.order_cancelled.error';
		const assertQueue = await channel.assertQueue('', { exclusive: true });
		channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

		channel.consume(assertQueue.queue, message => consumer(channel, message), {
			noAck: false,
		}); */
	}
}
