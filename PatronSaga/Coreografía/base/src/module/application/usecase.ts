import * as amqp from 'amqplib';
import { EventEmitter } from 'events';
import { EventsHelper } from '../../helpers/events.helper';
import { OrderBuilder, OrderEntity } from '../domain/order.entity';
import { Repository } from './repository';
import { RepositoryQueue } from './repository-queue';

export class UseCase {
	constructor(private operation: Repository, private queue: RepositoryQueue) {}

	async insert(orderEntity: OrderEntity) {
		const result = await this.operation.insert(orderEntity);
		this.queue.sendMessage({
			type: 'ORDER_CREATED',
			data: result,
		});
		this.receiveMessages();
		return result;
	}

	receiveMessages() {
		const emitter: EventEmitter = EventsHelper.handler();
		emitter.on('connected rabbit', () => {
			this.queue.receiveMessage(async (channel: amqp.Channel, message: any) => {
				console.log(message.fields.routingKey);
				console.log(message.content.toString());
				channel.ack(message);
			});
		});
	}
}
