import { Router } from 'express';
import answerController from '../controllers/answer-controller.js';

const answerRouter = new Router();

answerRouter.post('/create', answerController.createAnswer);
answerRouter.post('/empty', answerController.createEmptyAnswer);
answerRouter.delete('/delete/:id', answerController.deleteAnswerById);
answerRouter.get('/get/:id', answerController.getAnswerById);
answerRouter.get('/all/:id', answerController.getAnswerByQuestionId);
answerRouter.put('/update', answerController.updateAnswer);

export default answerRouter;
