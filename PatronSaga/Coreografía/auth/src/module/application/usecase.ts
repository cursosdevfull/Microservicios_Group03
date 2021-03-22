import { AuthEntity } from '../domain/auth.entity';
import { Repository } from './repository';
import { TokenService } from './token';

export class UseCase {
	constructor(private operation: Repository) {}

	async login(authEntity: AuthEntity) {
		const result = await this.operation.login(authEntity);
		if (result) {
			return TokenService.generateToken();
		} else {
			return null;
		}
	}

	validateToken(token: string) {
		return TokenService.validateToken(token);
	}
}
