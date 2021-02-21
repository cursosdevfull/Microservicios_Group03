import * as amqp from 'amqplib';
import { EventEmitter } from 'events';
import { EventsHelper } from '../../helpers/events.helper';
import { PaymentBuilder, PaymentEntity } from '../domain/payment.entity';
import { Repository } from './repository';
import { RepositoryQueue } from './repository-queue';

export class UseCase {
	constructor(private operation: Repository, private queue: RepositoryQueue) {}

	async insert(paymentEntity: PaymentEntity) {
		const result = await this.operation.insert(paymentEntity);
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

					const status = isError ? 'CANCELLED' : 'APPROVED';

					if (!isError) {
						const paymentEntity: PaymentEntity = new PaymentBuilder()
							.addName(name)
							.addItemCount(itemCount)
							.addTransaction(transaction)
							.addStatus(status);

						await this.insert(paymentEntity);
					} else {
						await this.operation.update(transaction, { status });
					}

					channel.ack(message);
				}
			);
		});
	}
}
