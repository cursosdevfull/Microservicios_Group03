import { DeliveryEntity } from '../domain/delivery.entity';

export interface Repository {
	insert(deliveryEntity: DeliveryEntity): Promise<DeliveryEntity>;
	update(transaction: string, deliveryEntity: Partial<DeliveryEntity>): void;
}
