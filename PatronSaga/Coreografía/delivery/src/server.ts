import ServerBootstrap from './bootstrap/server.bootstrap';
import RabbitBootstrap from './bootstrap/rabbit.bootstrap';
import app from './app';
import { DatabaseBootstrap } from './bootstrap/database.bootstrap';

const start = async () => {
	const server = new ServerBootstrap(app);
	const database = new DatabaseBootstrap();
	const rabbit = new RabbitBootstrap();

	try {
		await server.initialize();
		await database.initialize();
		await rabbit.initialize();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
