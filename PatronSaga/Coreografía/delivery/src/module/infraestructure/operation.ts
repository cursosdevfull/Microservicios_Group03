import { Repository } from '../application/repository';
import { DeliveryEntity } from '../domain/delivery.entity';
import DeliveryModel from './delivery.model';

export class Operation implements Repository {
	async insert(deliveryEntity: DeliveryEntity): Promise<DeliveryEntity> {
		const delivery: any = await DeliveryModel.create(deliveryEntity);
		return delivery;
	}

	async update(transaction: string, deliveryEntity: Partial<DeliveryEntity>) {
		await DeliveryModel.findOneAndUpdate({ transaction }, deliveryEntity);
	}
}
