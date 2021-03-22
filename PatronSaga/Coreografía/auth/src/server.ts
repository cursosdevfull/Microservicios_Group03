import ServerBootstrap from './bootstrap/server.bootstrap';
import app from './app';
import { DatabaseBootstrap } from './bootstrap/database.bootstrap';

const start = async () => {
	const server = new ServerBootstrap(app);
	const database = new DatabaseBootstrap();

	try {
		await server.initialize();
		await database.initialize();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
