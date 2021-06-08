import { Router } from 'express';

import SessionController from './controllers/SessionController';


const routes = new Router();

routes.post('/sessions', SessionController.store);

export default routes;