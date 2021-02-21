import { StoreEntity } from '../domain/store.entity';

export interface Repository {
	insert(storeEntity: StoreEntity): Promise<StoreEntity>;
	update(transaction: string, storeEntity: Partial<StoreEntity>): void;
}
