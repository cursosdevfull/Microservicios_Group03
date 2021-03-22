import { Repository } from '../application/repository';
import { OrderEntity } from '../domain/order.entity';
import OrderModel from './order.model';

export class Operation implements Repository {
	async insert(orderEntity: OrderEntity): Promise<OrderEntity> {
		const order: any = await OrderModel.create(orderEntity);
		return order;
	}

	async update(transaction: string, orderEntity: Partial<OrderEntity>) {
		await OrderModel.findOneAndUpdate({ transaction }, orderEntity);
	}
}
