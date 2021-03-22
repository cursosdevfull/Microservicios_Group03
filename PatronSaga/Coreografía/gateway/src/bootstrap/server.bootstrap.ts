import { Initialize } from './initialize.interface';
import gateway from 'fast-gateway';

const env = process.env;

export default class ServerBootstrap implements Initialize {
	constructor(private app: any) {}

	async initialize(): Promise<any> {
		const promiseServer = new Promise((resolve, reject) => {
			const server = gateway(this.app);

			server
				.start(+env.PORT)
				.then(() => {
					console.log('Gateway is running on port ' + env.PORT);
					resolve(true);
				})
				.catch(error => {
					console.log(error);
					reject(error);
				});
		});

		await promiseServer;
	}
}
