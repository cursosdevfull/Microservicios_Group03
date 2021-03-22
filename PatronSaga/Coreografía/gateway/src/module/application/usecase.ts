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
			this.queue.receiveMessage(
				async (channel: amqp.Channel, message: any, isError: boolean) => {
					const messageAsJSON = JSON.parse(message.content.toString());

					const status = isError ? 'CANCELLED' : 'APPROVED';
					const orderEntity: Partial<OrderEntity> = { status };

					await this.operation.update(
						messageAsJSON.data.transaction,
						orderEntity
					);

					channel.ack(message);
				}
			);
		});
	}
}
