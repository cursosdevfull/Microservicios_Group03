import { PaymentEntity } from '../domain/payment.entity';

export interface Repository {
	insert(paymentEntity: PaymentEntity): Promise<PaymentEntity>;
	update(transaction: string, paymentEntity: Partial<PaymentEntity>): void;
}
