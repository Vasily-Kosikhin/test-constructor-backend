import { Router } from 'express';
import completedController from '../controllers/completed-controller.js';

const completedRouter = new Router();

completedRouter.post('/create', completedController.createCompleted);
completedRouter.delete('/delete/:id', completedController.deleteCompletedById);
completedRouter.get('/get/', completedController.getCompletedById);
completedRouter.get('/all/', completedController.getAllCompleted);
export default completedRouter;
