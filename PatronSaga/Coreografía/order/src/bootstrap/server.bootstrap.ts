import http from 'http';
import { AddressInfo } from 'net';
import { Application } from 'express';
//import yenv from 'yenv';
import { Initialize } from './initialize.interface';

// const env = yenv();
const env = process.env;
interface Address extends AddressInfo {
	port: number;
}
export default class ServerBootstrap implements Initialize {
	constructor(private app: Application) {}

	async initialize(): Promise<any> {
		const promiseServer = new Promise((resolve, reject) => {
			const server: http.Server = http.createServer(this.app);
			server
				.listen(env.PORT)
				.on('listening', () => {
					console.log(
						`Server is running on port:  ${(server.address() as Address).port}`
					);
					resolve(true);
				})
				.on('error', err => {
					console.log(err);
					reject(err);
				});
		});

		await promiseServer;
	}
}
