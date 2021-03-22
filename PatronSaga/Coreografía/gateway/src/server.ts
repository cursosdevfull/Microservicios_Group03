import ServerBootstrap from './bootstrap/server.bootstrap';
import app from './app';

const start = async () => {
	const server = new ServerBootstrap(app);

	try {
		await server.initialize();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
