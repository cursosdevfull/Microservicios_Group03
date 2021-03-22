import { TokenService } from './module/application/token';

const env = process.env;
console.log(`${env.ORDER_HOST}/order`);

const app = {
	routes: [
		{
			prefix: '/api',
			target: `${env.ORDER_HOST}/order`,
			middlewares: [TokenService.validateToken],
		},
		{
			prefix: '/auth',
			target: `${env.AUTH_HOST}/auth`,
		},
	],
};

export default app;
