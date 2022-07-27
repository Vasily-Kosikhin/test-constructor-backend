import { Router } from 'express';
import questionController from '../controllers/question-controller.js';

const questionRouter = new Router();

questionRouter.post('/create', questionController.createQuestion);
questionRouter.post('/empty', questionController.createEmptyQuestion);
questionRouter.delete('/delete/:id', questionController.deleteQuestionById);
questionRouter.delete('/clear/:id', questionController.clearQuestionById);
questionRouter.get('/get/:id', questionController.getQuestionByTestId);
questionRouter.get('/refresh/:id', questionController.refreshQuestionById);
questionRouter.put('/update', questionController.updateQuestion);

questionRouter.get('/pagination', questionController.getFewQuestions);

// questionRouter.get('/get/:id', questionController.getAnswersById);
// questionRouter.get('/answer/:id', questionController.getAnswerByQuestionId);

export default questionRouter;
