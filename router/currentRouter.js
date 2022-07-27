import { Router } from 'express';
import currentController from '../controllers/current-controller.js';

const currentRouter = new Router();

currentRouter.post('/create', currentController.createCurrent);
currentRouter.delete('/delete/:id', currentController.deleteCurrentById);
currentRouter.get('/get/', currentController.getCurrentById);

currentRouter.post('/check', currentController.checkCurrent);

export default currentRouter;
