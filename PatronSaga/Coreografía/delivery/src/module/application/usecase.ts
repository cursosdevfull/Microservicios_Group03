import * as amqp from 'amqplib';
import { EventEmitter } from 'events';
import { EventsHelper } from '../../helpers/events.helper';
import { DeliveryBuilder, DeliveryEntity } from '../domain/delivery.entity';
import { Repository } from './repository';
import { RepositoryQueue } from './repository-queue';

export class UseCase {
	constructor(private operation: Repository, private queue: RepositoryQueue) {}

	async insert(deliveryEntity: DeliveryEntity) {
		const result = await this.operation.insert(deliveryEntity);
		this.queue.sendMessage({
			type: 'PAYMENT_CREATED',
			data: result,
		});
		return result;
	}

	receiveMessages() {
		const emitter: EventEmitter = EventsHelper.handler();
		emitter.on('connected rabbit', () => {
			this.queue.receiveMessage(
				async (channel: amqp.Channel, message: any, isError: boolean) => {
					const messageAsJSON = JSON.parse(message.content.toString());

					const { name, itemCount, transaction } = messageAsJSON.data;

					if (!isError) {
						const deliveryEntity: DeliveryEntity = new DeliveryBuilder()
							.addName(name)
							.addItemCount(itemCount)
							.addTransaction(transaction)
							.addStatus('APPROVED');

						await this.insert(deliveryEntity);
					} else {
					}

					channel.ack(message);
				}
			);
		});
	}
}
