import { Repository } from '../application/repository';
import { PaymentEntity } from '../domain/payment.entity';
import PaymentModel from './payment.model';

export class Operation implements Repository {
	async insert(paymentEntity: PaymentEntity): Promise<PaymentEntity> {
		const payment: any = await PaymentModel.create(paymentEntity);
		return payment;
	}

	async update(transaction: string, paymentEntity: Partial<PaymentEntity>) {
		await PaymentModel.findOneAndUpdate({ transaction }, paymentEntity);
	}
}
