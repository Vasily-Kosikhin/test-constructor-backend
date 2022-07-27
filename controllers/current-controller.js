import ApiError from '../exeptions/api-error.js';
import answerModel from '../models/answer-model.js';
import currentModel from '../models/current-model.js';
import questionModel from '../models/question-model.js';
import currentService from '../service/current-service.js';

class CurrentController {
  async createCurrent(req, res, next) {
    try {
      const { test_id, email } = req.body;
      console.log(req.body);
      const current = await currentModel.findOne({ test_id });
      if (current) {
        return res.json(current);
      }

      const total = await questionModel.find({ test_id });
      const currentData = await currentService.createCurrent(
        test_id,
        email,
        total.length
      );
      return res.json(currentData);
    } catch (error) {
      next(error);
    }
  }

  async deleteCurrentById(req, res, next) {
    try {
      const id = req.params.id;
      console.log(`62ddeb6683a8faf7e72d7e6c`, id);
      await currentService.deleteCurrentById(id);
      return res.json(`Прохождение удалено`);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentById(req, res, next) {
    try {
      const { id, email } = req.query;
      console.log(req.query);
      const current = await currentModel.findOne({ test_id: id, email });
      if (!current) {
        throw ApiError.BadRequest(`Тест не найден!`);
      }
      return res.json(current);
    } catch (error) {
      next(error);
    }
  }

  async checkCurrent(req, res, next) {
    try {
      const { email, test_id, question_id, answer_id, asnwer_value } = req.body;

      const checkResult = await currentService.checkCurrent(
        email,
        test_id,
        question_id,
        answer_id,
        asnwer_value
      );

      if (checkResult.total - checkResult.wrong - checkResult.right === 0) {
        const completed = await currentService.finishTest(checkResult);
        return res.json({ completed, finish: true });
      }
      return res.json({ checkResult, finish: false });
    } catch (error) {
      next(error);
    }
  }
}

export default new CurrentController();
