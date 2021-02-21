export class StoreBuilder {
	name: string;
	itemCount: number;
	transaction: string;
	status: 'PENDING' | 'APPROVED' | 'CANCELLED';

	addName(name: string) {
		this.name = name;
		return this;
	}

	addItemCount(itemCount: number) {
		this.itemCount = itemCount;
		return this;
	}

	addTransaction(transaction: string) {
		this.transaction = transaction;
		return this;
	}

	addStatus(status: any) {
		this.status = status;
		return this;
	}

	build() {
		return new StoreEntity(this);
	}
}

export class StoreEntity {
	name: string;
	itemCount: number;
	transaction: string;
	status: 'PENDING' | 'APPROVED' | 'CANCELLED';

	constructor(ob: StoreBuilder) {
		this.name = ob.name;
		this.itemCount = ob.itemCount;
		this.transaction = ob.transaction;
		this.status = ob.status;
	}
}
