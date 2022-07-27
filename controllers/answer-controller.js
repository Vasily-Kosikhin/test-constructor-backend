import ApiError from '../exeptions/api-error.js';
import answerService from '../service/answer-service.js';
import answerModel from '../models/answer-model.js';

class AnswerController {
  async createAnswer(req, res, next) {
    try {
      const { value, correct, question_id } = req.body;
      console.log('BODY -', req.body);
      const answerData = await answerService.createAnswer(
        value,
        correct,
        question_id
      );
      return res.json(answerData);
    } catch (error) {
      next(error);
    }
  }

  async createEmptyAnswer(req, res, next) {
    try {
      const { correct, question_id } = req.body;
      console.log('BODY -', req.body);
      const answerData = await answerService.createEmptyAnswer(
        correct,
        question_id
      );
      return res.json(answerData);
    } catch (error) {
      next(error);
    }
  }

  async deleteAnswerById(req, res, next) {
    try {
      const id = req.params.id;
      const answer = await answerService.deleteAnswerById(id);
      return res.json(`Вопрос ${answer.value} удален`);
    } catch (error) {
      next(error);
    }
  }

  async getAnswerById(req, res, next) {
    try {
      const id = req.params.id;
      const answer = await answerModel.findById(id);
      if (!answer) {
        throw ApiError.BadRequest(`Вопрос не найден!`);
      }
      return res.json(answer);
    } catch (error) {
      next(error);
    }
  }

  async getAnswerByQuestionId(req, res, next) {
    try {
      const id = req.params.id;
      console.log('IDDDD', id);
      const answer = await answerModel.find({ question_id: id });
      if (!answer) {
        throw ApiError.BadRequest(`Вопрос не найден!`);
      }
      return res.json(answer);
    } catch (error) {
      next(error);
    }
  }

  async updateAnswer(req, res, next) {
    try {
      const { id, value, correct } = req.body;
      console.log(req.body);
      const answer = await answerModel.findById(id);
      if (!answer) {
        throw ApiError.BadRequest(`Ответ не найден!`);
      }
      answer.value = value;
      answer.correct = correct;
      await answer.save();
      return res.json(answer);
    } catch (error) {
      next(error);
    }
  }
}

export default new AnswerController();
