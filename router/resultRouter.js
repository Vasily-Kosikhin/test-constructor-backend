import { Router } from 'express';
import questionController from '../controllers/question-controller.js';
import resultController from '../controllers/result-controller.js';

const resultRouter = new Router();

resultRouter.post('/create', resultController.createResult);
resultRouter.get('/get/:id', resultController.getResult);
resultRouter.delete('/delete/:id', resultController.deleteResult);

export default resultRouter;
