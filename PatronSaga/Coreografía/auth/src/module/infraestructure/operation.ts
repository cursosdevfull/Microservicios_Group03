import { Repository } from '../application/repository';
import { AuthEntity } from '../domain/auth.entity';
import AuthModel from './auth.model';

export class Operation implements Repository {
	async login(authEntity: AuthEntity): Promise<AuthEntity> {
		const auth: any = await AuthModel.find({email: authEntity.email, password: authEntity.password})
		return auth;
	}
}
