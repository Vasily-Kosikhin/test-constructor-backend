import testService from '../service/test-service.js';
import ApiError from '../exeptions/api-error.js';
import questionService from '../service/question-service.js';
import questionModel from '../models/question-model.js';
import testModel from '../models/test-model.js';

class QuestionController {
  async createQuestion(req, res, next) {
    try {
      const { description, inputType, answerQuantity, test_id } = req.body;
      const questionData = await questionService.createQuestion(
        description,
        inputType,
        answerQuantity,
        test_id
      );
      return res.json(questionData);
    } catch (error) {
      next(error);
    }
  }

  async createEmptyQuestion(req, res, next) {
    try {
      const { inputType, answerQuantity, test_id } = req.body;
      console.log(`BODY`, req.body);
      const questionData = await questionService.createEmptyQuestion(
        inputType,
        answerQuantity,
        test_id
      );
      return res.json(questionData);
    } catch (error) {
      next(error);
    }
  }

  async deleteQuestionById(req, res, next) {
    try {
      const id = req.params.id;
      const question = await questionService.deleteQuestionById(id);
      return res.json(`Вопрос ${question.description} удален`);
    } catch (error) {
      next(error);
    }
  }

  async clearQuestionById(req, res, next) {
    try {
      const id = req.params.id;
      const question = await questionService.clearQuestionById(id);
      return res.json(`Вопрос ${question.description} удален`);
    } catch (error) {
      next(error);
    }
  }

  async getQuestionByTestId(req, res, next) {
    try {
      const id = req.params.id;
      console.log(id);
      const question = await questionModel.find({ test_id: id });
      if (!question) {
        throw ApiError.BadRequest(`Вопрос не найден!`);
      }
      return res.json(question);
    } catch (error) {
      next(error);
    }
  }

  async refreshQuestionById(req, res, next) {
    try {
      const id = req.params.id;
      const question = await questionModel.findById(id);
      res.json(question);
    } catch (error) {
      next(error);
    }
  }

  async updateQuestion(req, res, next) {
    try {
      const { id, description, inputType } = req.body;
      console.log(id);
      const question = await questionModel.findById(id);
      if (!question) {
        throw ApiError.BadRequest(`Вопрос не найден!`);
      }
      question.description = description;
      question.inputType = inputType;
      await question.save();
      return res.json(question);
    } catch (error) {
      next(error);
    }
  }

  async getFewQuestions(req, res, next) {
    try {
      const { test_id, limit, page } = req.query;

      const questions = await questionModel
        .find({ test_id })
        .skip(page)
        .limit(limit);
      if (!questions) {
        throw ApiError.BadRequest(`Вопрос не найден!`);
      }

      return res.json(questions);
    } catch (error) {
      next(error);
    }
  }
}

export default new QuestionController();
