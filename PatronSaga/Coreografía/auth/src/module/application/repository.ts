import { AuthEntity } from '../domain/auth.entity';

export interface Repository {
	login(authEntity: AuthEntity): Promise<AuthEntity>;
	
}
