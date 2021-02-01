import { Repository } from '../application/repository';
import { OrderEntity } from '../domain/order.entity';
import OrderModel from './order.model';

export class Operation implements Repository {
	async insert(orderEntity: OrderEntity): Promise<OrderEntity> {}

	async update(transaction: string, orderEntity: OrderEntity) {}
}
