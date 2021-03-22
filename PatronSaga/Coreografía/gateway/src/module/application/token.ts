import request from 'request';

export class TokenService {
	static async validateToken(req: any, res: any, next: any) {
		// "authorization": "Bearer xxxxxxx"
		const headerAuthorization: any[] = req.headers['authorization']?.split(' ');
		if (headerAuthorization && headerAuthorization.length > 1) {
			let datos = '';
			const token = headerAuthorization[1];

			request
				.get(`${process.env.AUTH_HOST}/validate-token/${token}`)
				.on('data', chuck => (datos += chuck))
				.on('end', () => {
					const response = JSON.parse(datos);
					if (response.status === 200) {
						next();
					} else {
						const responseMessage = {
							status: 401,
							message: 'Token invalid',
						};

						res.writeHead(401, { 'content-type': 'application/json' });
						res.end(JSON.stringify(responseMessage));
					}
				});
		} else {
			const responseMessage = {
				status: 401,
				message: 'User is not logged2',
			};

			res.writeHead(401, { 'content-type': 'application/json' });
			res.end(JSON.stringify(responseMessage));
		}
	}
}
