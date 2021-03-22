import * as amqp from 'amqplib';
import { EventEmitter } from 'events';
import yenv from 'yenv';
import { EventsHelper } from '../helpers/events.helper';
import { Initialize } from './initialize.interface';

const env = yenv();

let channel: any;

export default class RabbitBootstrap implements Initialize {
	async initialize(): Promise<any> {
		const connection = await amqp.connect(`amqp://${env.RABBIT_HOST}`);
		channel = await connection.createChannel();

		console.log('Connection successful to Rabbitmq');

		const emitter: EventEmitter = EventsHelper.handler();
		emitter.emit('connected rabbit', true);
	}

	static getChannel() {
		return channel;
	}

	static addQueue(nameQueue: string) {
		channel.assertQueue(nameQueue, { durable: true });
	}
}
