import jwt from 'jwt-simple';
import moment from 'moment';

export class TokenService {
	static generateToken() {
		const payload = {
			iat: moment().unix(),
			exp: moment().add(30, 'minutes').unix(),
		};

		const token = jwt.encode(payload, process.env.KEYWORD_SECRET);
		return token;
	}

	static validateToken(token: string) {
		try {
			const payload = jwt.decode(token, process.env.KEYWORD_SECRET);
			return payload;
		} catch (error) {
			return null;
		}
	}
}
