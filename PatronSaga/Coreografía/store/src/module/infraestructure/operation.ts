import { Repository } from '../application/repository';
import { StoreEntity } from '../domain/store.entity';
import StoreModel from './store.model';

export class Operation implements Repository {
	async insert(storeEntity: StoreEntity): Promise<StoreEntity> {
		const store: any = await StoreModel.create(storeEntity);
		return store;
	}

	async update(transaction: string, storeEntity: Partial<StoreEntity>) {
		await StoreModel.findOneAndUpdate({ transaction }, storeEntity);
	}
}
