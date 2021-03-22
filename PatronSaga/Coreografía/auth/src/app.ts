import express from 'express';
import { Errors } from './helpers/errors.helper';
import { router as AuthRouter } from './module/infraestructure/route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', AuthRouter);
app.get('/health-check', (req, res) => res.send('I am alive'));

app.use(Errors.pathNotFoundError);

app.use(Errors.genericError);

export default app;
