import { OrderEntity } from '../domain/order.entity';

export interface Repository {
	insert(orderEntity: OrderEntity): Promise<OrderEntity>;
	update(transaction: string, orderEntity: Partial<OrderEntity>): void;
}
