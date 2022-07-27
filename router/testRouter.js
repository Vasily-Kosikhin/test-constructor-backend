import { Router } from 'express';
import testController from '../controllers/test-controller.js';

const testRouter = new Router();
testRouter.post('/create', testController.createTest);
testRouter.get('/get', testController.getAllTests);
testRouter.get('/get/:id', testController.getTestById);
testRouter.put('/update', testController.updateTest);
testRouter.delete('/delete/:id', testController.deleteTestById);

testRouter.get('/full/:id', testController.getFullTestById);

// testRouter.get('/completed', TestController.getCompletedTests);
// testRouter.get('/completed/:id', TestController.getCompletedTestById);

export default testRouter;
